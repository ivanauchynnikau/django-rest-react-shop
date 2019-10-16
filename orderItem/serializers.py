from rest_framework import serializers
from orderItem.models import OrderItem


class OrderItemDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            'order',
            'item',
            'amount',
            'price'
        )


class OrderItemsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            'order',
            'item',
            'amount',
            'price',
        )
