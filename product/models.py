from django.db import models
from category.models import Category
from django.contrib.auth import get_user_model
User = get_user_model()


class Product(models.Model):
    category = models.ForeignKey(Category, default=0, on_delete=models.CASCADE)
    title = models.CharField(verbose_name='Title', max_length=64)
    description = models.CharField(verbose_name='Description', max_length=256)
    price = models.DecimalField(verbose_name='Price', default=0,
                                decimal_places=2, max_digits=8)
    user = models.ForeignKey(User, verbose_name='User', on_delete=models.CASCADE)
