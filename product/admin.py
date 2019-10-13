from django.contrib import admin
from product.models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'stock', 'available']
    list_filter = ['category', 'available']
    list_editable = ['price', 'stock', 'available']


admin.site.register(Product, ProductAdmin)
