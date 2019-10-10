from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Category(models.Model):
    title = models.CharField(verbose_name='Title', max_length=64)
    description = models.CharField(verbose_name='Description', max_length=256)
    CATEGORIES = [
        (0, 'Phone'),
        (1, 'Tablet'),
    ]
    categories = models.IntegerField(verbose_name='Categories', choices=CATEGORIES)
    user = models.ForeignKey(User, verbose_name='User', on_delete=models.CASCADE)


