# Generated by Django 3.2.5 on 2021-08-06 16:53

from django.db import migrations

def initial(apps, schema_editor):
    email1 = 'dono_loja1@teste.com'
    email2 = 'dono_loja2@teste.com'

    Usuario = apps.get_model('acesso', 'Usuario')
    Loja = apps.get_model('estoque', 'Loja')

    dono1 = Usuario.objects.create_user(
        email1,
        email=email1,
        password='abc@123',
        first_name='Dono da Silva',
        role='dono'
    )

    dono2 = Usuario.objects.create_user(
        email2,
        email=email2,
        password='abc@123',
        first_name='Dono de Souza',
        role='dono'
    )

    Loja.objects.create(
        dono=dono1,
        nome='Teste Hubbi Loja 1',
        nome_url='loja1'
    )

    Loja.objects.create(
        dono=dono2,
        nome='Teste Hubbi Loja 2',
        nome_url='loja2'
    )

class Migration(migrations.Migration):

    dependencies = [
        ('acesso', '0001_initial'),
        ('estoque', '0003_alter_produto_options'),
    ]

    operations = [
        migrations.RunPython(initial),
    ]