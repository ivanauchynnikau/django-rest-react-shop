from django.db import models
from accounts.models import MyUser
from order.choices import ORDER_STATUSES


class Order(models.Model):
    STATE = (
        (ORDER_STATUSES.STARTED, 'Added to cart'),
        (ORDER_STATUSES.FINISHED, 'Finished'),
    )
    user = models.ForeignKey(MyUser, related_name='user', default=0, on_delete=models.CASCADE)
    state = models.IntegerField(verbose_name='Order state', choices=STATE)
    create_date = models.DateTimeField(verbose_name='Create date', auto_now_add=True, null=True)
    comment = models.CharField(verbose_name='Comment', max_length=256)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return '{}'.format(self.id)
