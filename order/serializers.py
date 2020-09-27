from rest_framework import serializers
from order.models import Order
from orderItem.serializers import OrderItemDetailSerializer


class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderItemDetailSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            'state',
            'comment',
            'items',
        )


class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'state',
            'comment',
            'items'
        )
