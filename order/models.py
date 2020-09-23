from django.db import models
from accounts.models import MyUser


class Order(models.Model):
    ADDED_TO_CART = 0
    FINISHED = 1
    STATE = (
        (ADDED_TO_CART, 'Added to cart'),
        (FINISHED, 'Finished'),
    )
    user = models.ForeignKey(MyUser, related_name='user', default=0, on_delete=models.CASCADE)
    state = models.IntegerField(verbose_name='Order state', choices=STATE)
    comment = models.CharField(verbose_name='Comment', max_length=256)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return '{}'.format(self.id)
