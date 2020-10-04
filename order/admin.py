from django.contrib import admin

# Register your models here.
from django.contrib import admin
from order.models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'state', 'comment']
    list_filter = ['user', 'state', 'comment']
    list_editable = ['comment']
    list_display_links = ['user', 'state']


admin.site.register(Order, OrderAdmin)
