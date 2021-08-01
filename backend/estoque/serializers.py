from rest_framework import serializers
from estoque import models

class LojaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Loja
        fields = [
            'id',
            'nome'
        ]

class ProdutoSerializer(serializers.ModelSerializer):
    def validate_loja(self, value):
        if self.instance and self.instance.loja != value:
            raise serializers.ValidationError('Campo não editável')
        return value

    class Meta:
        model = models.Produto
        fields = '__all__'
