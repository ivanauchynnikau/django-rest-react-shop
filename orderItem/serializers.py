from rest_framework import serializers
from orderItem.models import OrderItem
from product.serializers import ProductDetailInOrderItemSerializer


class OrderItemDetailSerializer(serializers.ModelSerializer):
    item = ProductDetailInOrderItemSerializer()

    class Meta:
        model = OrderItem
        fields = (
            'order',
            'item',
            'amount',
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
