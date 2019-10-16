from rest_framework import serializers
from order.models import Order
from orderItem.serializers import OrderItemDetailSerializer


class OrderDetailSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    items = OrderItemDetailSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            'user',
            'state',
            'comment',
            'items'
        )


class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'user',
            'state',
            'comment',
            'items'
        )
