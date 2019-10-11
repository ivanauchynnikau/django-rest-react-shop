from rest_framework import serializers
from product.models import Product


class ProductDetailSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Product
        fields = ('category', 'title', 'description', 'price', 'user')


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('category', 'title', 'description', 'price', 'user')
