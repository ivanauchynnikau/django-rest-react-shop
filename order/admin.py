# Register your models here.
from django.contrib import admin
from order.models import Order
from orderItem.models import OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem


class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'state', 'comment']
    list_filter = ['user', 'state', 'comment']
    list_editable = ['comment']
    list_display_links = ['user', 'state']
    inlines = [
        OrderItemInline,
    ]


admin.site.register(Order, OrderAdmin)
