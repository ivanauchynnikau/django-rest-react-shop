from django.db import models
from product.models import Product
from order.models import Order


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', null=True, on_delete=models.CASCADE)
    item = models.ForeignKey(Product, related_name='Product', null=True, on_delete=models.CASCADE)
    amount = models.IntegerField(default=0, verbose_name='Amount')
    price = models.DecimalField(verbose_name='Цена', max_digits=10, decimal_places=2, default=0)

    class Meta:
        verbose_name = "Order item"
        verbose_name_plural = "Order items"

    def __str__(self):
        return '{}'.format(self.id)

    def get_cost(self):
        return self.price * self.amount
