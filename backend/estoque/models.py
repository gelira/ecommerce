from django.db import models

# Create your models here.
class Loja(models.Model):
    dono = models.ForeignKey(
        to='acesso.Usuario',
        on_delete=models.PROTECT,
        related_name='lojas'
    )
    nome = models.CharField(
        max_length=100
    )
    nome_url = models.CharField(
        max_length=100
    )

class Produto(models.Model):
    loja = models.ForeignKey(
        to=Loja,
        on_delete=models.PROTECT,
        related_name='produtos'
    )
    nome = models.CharField(
        max_length=100
    )
    descricao = models.TextField(
        blank=True
    )
    preco = models.FloatField()

class Foto(models.Model):
    produto = models.OneToOneField(
        to=Produto,
        on_delete=models.PROTECT
    )
    region = models.CharField(
        max_length=100
    )
    bucket = models.CharField(
        max_length=100
    )
    key = models.CharField(
        max_length=100
    )

class Versao(models.Model):
    foto = models.ForeignKey(
        to=Foto,
        on_delete=models.PROTECT,
        related_name='versoes'
    )
    version_id = models.CharField(
        max_length=100
    )
    atual = models.BooleanField(
        default=False
    )
