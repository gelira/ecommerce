# Generated by Django 3.2.5 on 2021-08-02 04:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comercial', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compra',
            name='total',
            field=models.FloatField(default=0),
        ),
    ]
