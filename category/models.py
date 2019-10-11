from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Category(models.Model):
    title = models.CharField(verbose_name='Title', max_length=64, unique=True)
    description = models.CharField(verbose_name='Description', max_length=256)
    user = models.ForeignKey(User, verbose_name='User', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title


