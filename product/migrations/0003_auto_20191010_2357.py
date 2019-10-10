# Generated by Django 2.2.6 on 2019-10-10 20:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(blank=True, default='Phone', on_delete=django.db.models.deletion.CASCADE, to='category.Category'),
        ),
    ]
