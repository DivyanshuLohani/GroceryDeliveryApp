# Generated by Django 5.1.4 on 2025-01-04 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('delivery', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deliverypartner',
            name='city',
            field=models.CharField(max_length=12),
        ),
    ]
