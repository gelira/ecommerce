# Generated by Django 3.2.5 on 2021-08-03 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comercial', '0004_remove_item_version_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compra',
            name='status',
            field=models.CharField(choices=[('cancelada', 'Cancelada'), ('nova', 'Nova compra'), ('separacao', 'Separação'), ('transito', 'Em trânsito'), ('entregue', 'Entregue')], default='nova', max_length=20),
        ),
    ]
