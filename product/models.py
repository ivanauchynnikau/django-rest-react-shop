from django.db import models
from category.models import Category
from django.contrib.auth import get_user_model
User = get_user_model()


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products',
                                 default=0, on_delete=models.CASCADE)
    title = models.CharField(verbose_name='Title', max_length=64)
    image = models.ImageField(verbose_name='Image', upload_to='static/images',
                              blank=True, max_length=64)
    description = models.CharField(verbose_name='Description', max_length=256)
    stock = models.PositiveIntegerField(default=0)
    available = models.BooleanField(verbose_name='Is available', default=True)
    price = models.DecimalField(verbose_name='Price', default=0,
                                decimal_places=2, max_digits=8)
    user = models.ForeignKey(User, verbose_name='User', on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.title
