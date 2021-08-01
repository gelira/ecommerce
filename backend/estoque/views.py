from rest_framework.views import (
    APIView, 
    Response
)

from estoque.models import Loja
from estoque.serializers import LojaSerializer

class LojaView(APIView):
    def get(self, request):
        loja_id = request.GET.get('id')
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
