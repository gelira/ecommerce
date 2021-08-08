from rest_framework.views import (
    APIView, 
    Response
)
from rest_framework.exceptions import (
    AuthenticationFailed,
    PermissionDenied
)
from rest_framework_simplejwt.views import TokenViewBase
from acesso.serializers import (
    AccessTokenSerializer,
    CreateClienteSerializer,
    InfoSerializer
)
from estoque.models import Loja

class AccessTokenView(TokenViewBase):
    serializer_class = AccessTokenSerializer

class CreateClienteView(APIView):
    permission_classes = []

    def post(self, request):
        ser = CreateClienteSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        data = ser.save()
        return Response(data)

class InfoView(APIView):
    def get(self, request):
        self.check_dono_loja()
        ser = InfoSerializer(request.user)
        return Response(ser.data)
 
    def check_dono_loja(self):
        if self.request.user.role == 'cliente':
            return

        loja_id = self.request.GET.get('loja_id')
        if loja_id is None:
            raise AuthenticationFailed('id da loja não especificado')

        if not Loja.objects.filter(pk=loja_id, dono=self.request.user).exists():
            raise PermissionDenied('Você não tem permissão de acessar essa loja')
