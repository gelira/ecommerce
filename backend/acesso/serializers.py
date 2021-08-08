from rest_framework import serializers
from rest_framework.exceptions import (
    AuthenticationFailed,
    PermissionDenied
)
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import AccessToken

from acesso.models import Usuario
from estoque.models import Loja

class AccessTokenSerializer(TokenObtainSerializer):
    def get_token(self):
        token = AccessToken.for_user(self.user)
        return str(token)

    def check_dono_loja(self):
        if self.user.role == 'cliente':
            return

        loja_id = self.context['request'].GET.get('loja_id')
        if loja_id is None:
            raise AuthenticationFailed('id da loja não especificado')

        if not Loja.objects.filter(pk=loja_id, dono=self.user).exists():
            raise PermissionDenied('Você não tem permissão de acessar essa loja')

    def validate(self, attrs):
        super().validate(attrs)
        self.check_dono_loja()
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

class InfoSerializer(serializers.ModelSerializer):
    nome = serializers.SerializerMethodField()

    def get_nome(self, obj):
        return obj.first_name

    class Meta:
        model = Usuario
        fields = [
            'id',
            'nome',
            'email',
            'role'
        ]