from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import AccessToken

from acesso.models import Usuario

class AccesTokenSerializer(TokenObtainSerializer):
    def get_token(self):
        token = AccessToken.for_user(self.user)
        return str(token)

    def validate(self, attrs):
        super().validate(attrs)
        return {
            'token': self.get_token()
        }

class CreateClienteSerializer(serializers.Serializer):
    nome = serializers.CharField(
        min_length=2,
        max_length=150
    )
    email = serializers.EmailField(
        max_length=150
    )
    senha = serializers.CharField(
        min_length=6
    )

    def validate_email(self, value):
        if Usuario.objects.filter(username=value).exists():
            raise serializers.ValidationError('Email já utilizado')
        return value

    def save(self):
        nome = self.validated_data['nome']
        email = self.validated_data['email']
        senha = self.validated_data['senha']

        u = Usuario.objects.create_user(email, email=email, password=senha, first_name=nome)

        token = AccessToken.for_user(u)

        return {
            'token': str(token)
        }
