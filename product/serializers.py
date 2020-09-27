from rest_framework import serializers
from product.models import Product
from category.serializers import CategoryInProductDetail


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategoryInProductDetail()

    class Meta:
        model = Product
        fields = (
            'id',
            'category',
            'title',
            'description',
            'image',
            'in_stock',
            'price'
        )


class ProductDetailInOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'title',
            'description',
            'image',
            'price'
        )


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'category',
            'title',
            'description',
            'image',
            'in_stock',
            'price'
        )
