from django.db import models


class Category(models.Model):
    title = models.CharField(verbose_name='Title', max_length=64, unique=True)
    description = models.CharField(verbose_name='Description', max_length=256)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.title


