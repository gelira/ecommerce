from rest_framework_simplejwt.views import TokenViewBase
from rest_framework.views import (
    APIView, 
    Response
)
from acesso.serializers import (
    AccessTokenSerializer,
    CreateClienteSerializer,
    InfoSerializer
)

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
        ser = InfoSerializer(request.user)
        return Response(ser.data)
 