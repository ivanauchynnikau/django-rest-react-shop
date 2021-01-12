from django.contrib import admin
from product.models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'in_stock']
    list_filter = ['category']
    list_editable = ['price', 'in_stock']


admin.site.register(Product, ProductAdmin)
