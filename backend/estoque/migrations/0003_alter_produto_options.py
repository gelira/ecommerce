# Generated by Django 3.2.5 on 2021-08-02 03:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('estoque', '0002_alter_loja_nome_url'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='produto',
            options={'ordering': ['nome']},
        ),
    ]
