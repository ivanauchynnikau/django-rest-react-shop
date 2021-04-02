from django.contrib import admin
from orderItem.models import OrderItem


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['item', 'amount']
    list_filter = ['item', 'amount']
    list_editable = ['amount']
    list_display_links = ['item']


admin.site.register(OrderItem, OrderItemAdmin)
