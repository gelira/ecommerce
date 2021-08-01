from rest_framework_simplejwt.views import TokenViewBase
from rest_framework.views import (
    APIView, 
    Response
)
from acesso.serializers import (
    AccesTokenSerializer,
    CreateClienteSerializer
)

class AccessTokenView(TokenViewBase):
    serializer_class = AccesTokenSerializer

class CreateClienteView(APIView):
    def post(self, request):
        ser = CreateClienteSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        data = ser.save()
        return Response(data)
