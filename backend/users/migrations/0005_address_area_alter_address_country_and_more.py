# Generated by Django 5.1.4 on 2025-01-01 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_address_name_address_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='area',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='country',
            field=models.CharField(default='IN', max_length=100),
        ),
        migrations.AlterField(
            model_name='address',
            name='latitude',
            field=models.DecimalField(
                decimal_places=15, default=0.0, max_digits=18),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='address',
            name='longitude',
            field=models.DecimalField(
                decimal_places=15, default=0.0, max_digits=18),
            preserve_default=False,
        ),
    ]
