from rest_framework.views import (
    APIView, 
    Response
)
from rest_framework.parsers import MultiPartParser
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.decorators import action

from estoque.models import (
    Loja, 
    Produto
)
from estoque.serializers import (
    FotoProdutoSerializer,
    LojaSerializer, 
    ProdutoSerializer
)
from shared.permissions import DonoLojaPermission

class LojaView(APIView):
    permission_classes = []

    def get(self, request):
        loja_id = request.GET.get('loja_id')
        nome_url = request.GET.get('nome_url')

        if not loja_id and not nome_url:
            return Response(status=404)

        if loja_id is not None:
            qs = Loja.objects.filter(id=loja_id)
        else:
            qs = Loja.objects.filter(nome_url=nome_url)

        loja = qs.first()

        if not loja:
            return Response(status=404)

        ser = LojaSerializer(loja)
        return Response(data=ser.data)

class ProdutoViewSet(ModelViewSet):
    serializer_class = ProdutoSerializer

    def get_queryset(self):
        return Produto.objects.filter(loja_id=self.request.GET['loja_id']).all()

    def get_permissions(self):
        permissions = super().get_permissions()

        if self.action not in ['list', 'retrieve']:
            permissions.append(DonoLojaPermission())
        
        return permissions

    @action(methods=['put'], detail=True, url_path='foto', parser_classes=[MultiPartParser])
    def foto_produto(self, request, pk=None):
        produto = self.get_object()
        
        ser = FotoProdutoSerializer(produto, data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save()
        
        return Response(status=204)

    def create(self, request, *args, **kwargs):
        request.data['loja'] = request.GET['loja_id']
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        raise MethodNotAllowed(request.method)
