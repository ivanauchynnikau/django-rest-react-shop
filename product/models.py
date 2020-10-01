from django.db import models
from category.models import Category


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products',
                                 default=0, on_delete=models.CASCADE)
    title = models.CharField(verbose_name='Title', max_length=64)
    image = models.ImageField(verbose_name='Image', upload_to='images',
                              blank=True, max_length=64)
    description = models.CharField(verbose_name='Description', max_length=256)
    in_stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(verbose_name='Price', default=0,
                                decimal_places=2, max_digits=8)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.title
