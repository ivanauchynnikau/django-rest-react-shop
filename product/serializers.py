from rest_framework import serializers
from product.models import Product


class ProductDetailSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    category = serializers.SerializerMethodField()

    def get_category(self, obj):
        return obj.title

    class Meta:
        model = Product
        fields = (
            'category',
            'title',
            'description',
            'price',
            'image',
            'id',
            'user'
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
            'available',
            'stock',
            'price',
            'user'
        )
