from rest_framework import serializers
from estoque import models

class LojaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Loja
        fields = [
            'id',
            'nome'
        ]
