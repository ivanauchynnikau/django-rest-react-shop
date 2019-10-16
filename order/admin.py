from django.contrib import admin

# Register your models here.
from django.contrib import admin
from order.models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ['state', 'comment']
    list_filter = ['state', 'comment']
    list_editable = ['comment']
    list_display_links = ['state']


admin.site.register(Order, OrderAdmin)
