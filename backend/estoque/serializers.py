import os
import uuid
from rest_framework import serializers
from estoque.models import (
    Loja,
    Produto,
    Foto,
    Versao
)
from estoque.cliente_aws import get_bucket

class LojaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loja
        fields = [
            'id',
            'nome'
        ]

class ProdutoSerializer(serializers.ModelSerializer):
    foto = serializers.SerializerMethodField(
        read_only=True
    )
    
    def get_foto(self, obj):
        return obj.get_foto_url()

    def validate_loja(self, value):
        if self.instance and self.instance.loja != value:
            raise serializers.ValidationError('Campo não editável')
        return value

    class Meta:
        model = Produto
        fields = [
            'id',
            'nome',
            'descricao',
            'preco',
            'loja',
            'foto'
        ]

class FotoProdutoSerializer(serializers.Serializer):
    foto = serializers.ImageField(
        allow_empty_file=False,
        use_url=False
    )

    def assert_foto(self):
        produto = self.instance
        foto = Foto.objects.filter(produto_id=produto.id).first()

        if not foto:
            foto = Foto.objects.create(
                produto_id=produto.id,
                region=os.getenv('AWS_REGION'),
                bucket=os.getenv('AWS_BUCKET'),
                key=f'{produto.loja_id}/{uuid.uuid4()}'
            )

        return foto

    def save(self):
        file_foto = self.validated_data['foto']
        foto = self.assert_foto()
        bucket = get_bucket()

        obj = bucket.Object(foto.key)
        obj.upload_fileobj(file_foto, ExtraArgs={ 'ACL': 'public-read' })

        Versao.objects.filter(foto_id=foto.id, atual=True).update(atual=False)
        Versao.objects.create(
            foto_id=foto.id,
            version_id=obj.version_id,
            atual=True
        )
