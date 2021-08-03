from collections import OrderedDict
from rest_framework import serializers
from django.db import transaction

from comercial.models import Item, Compra

class ItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            'produto',
            'quantidade'
        ]

class ItemRetrieveSerializer(serializers.ModelSerializer):
    produto = serializers.SerializerMethodField()

    def get_produto(self, obj):
        return {
            'id': obj.produto.id,
            'nome': obj.produto.nome,
            'descricao': obj.produto.descricao
        }

    class Meta:
        model = Item
        fields = [
            'produto',
            'quantidade',
            'preco',
            'version_id'
        ]

class CompraCreateSerializer(serializers.ModelSerializer):
    itens = serializers.ListField(
        child=ItemCreateSerializer(),
        allow_empty=False,
        write_only=True
    )
    
    def validate(self, attrs):
        loja = attrs['loja']
        itens_cache = {}

        for item in attrs['itens']:
            produto = item['produto']
            quantidade = item['quantidade']
            
            if produto.loja_id != loja.id:
                raise serializers.ValidationError('Produto não pertencente à loja')
            
            p_id = str(produto.id)

            if p_id not in itens_cache:
                itens_cache[p_id] = {
                    'produto': produto,
                    'quantidade': 0
                }

            itens_cache[p_id]['quantidade'] += quantidade

        itens = []
        
        for key in itens_cache.keys():
            c = itens_cache[key]

            o = OrderedDict()
            o['produto'] = c['produto']
            o['quantidade'] = c['quantidade']

            itens.append(o)

        attrs['itens'] = itens

        return attrs

    def create(self, data):
        with transaction.atomic():
            total = 0

            compra = Compra.objects.create(
                loja=data['loja'],
                cliente=data['cliente']
            )

            for i in data['itens']:
                Item.objects.create(
                    produto=i['produto'],
                    compra=compra,
                    quantidade=i['quantidade'],
                    preco=i['produto'].preco,
                    version_id=i['produto'].get_versao_atual()
                )

                total += (i['quantidade']  * i['produto'].preco)

            compra.total = total
            compra.save()

            return compra

    class Meta:
        model = Compra
        fields = [
            'loja',
            'cliente',
            'total',
            'status',
            'data',
            'itens'
        ]
        extra_kwargs = {
            'total': {
                'read_only': True
            },
            'status': {
                'read_only': True
            },
            'data': {
                'read_only': True
            }
        }

class CompraRetrieveSerializer(serializers.ModelSerializer):
    itens = serializers.SerializerMethodField()
    cliente = serializers.SerializerMethodField()

    def get_cliente(self, obj):
        return {
            'id': obj.cliente.id,
            'nome': obj.cliente.first_name,
            'email': obj.cliente.email
        }

    def get_itens(self, obj):
        itens = []
        
        for item in obj.itens.all():
            ser = ItemRetrieveSerializer(item)
            itens.append(ser.data)
        
        return itens

    class Meta:
        model = Compra
        fields = [
            'id',
            'loja',
            'cliente',
            'total',
            'status',
            'data',
            'itens'
        ]
