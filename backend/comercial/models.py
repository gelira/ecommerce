from django.db import models

STATUS = [
    ('cancelada', 'Cancelada'),
    ('nova', 'Nova compra'),
    ('separacao', 'Separação'),
    ('transito', 'Em trânsito'),
    ('entregue', 'Entregue'),
]

class Compra(models.Model):
    loja = models.ForeignKey(
        to='estoque.Loja',
        on_delete=models.PROTECT,
        related_name='compras'
    )
    cliente = models.ForeignKey(
        to='acesso.Usuario',
        on_delete=models.PROTECT,
        related_name='compras'
    )
    total = models.FloatField(
        default=0
    )
    status = models.CharField(
        choices=STATUS,
        default='nova',
        max_length=20
    )
    data = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ['-data']

class Item(models.Model):
    produto = models.ForeignKey(
        to='estoque.Produto',
        on_delete=models.PROTECT,
        related_name='itens'
    )
    compra = models.ForeignKey(
        to=Compra,
        on_delete=models.PROTECT,
        related_name='itens'
    )
    quantidade = models.IntegerField()
    preco = models.FloatField()
