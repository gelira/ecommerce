from rest_framework_simplejwt.views import TokenViewBase
from acesso.serializers import AccesTokenSerializer

class AccessTokenView(TokenViewBase):
    serializer_class = AccesTokenSerializer
