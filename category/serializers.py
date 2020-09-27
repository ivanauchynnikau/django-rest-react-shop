from rest_framework import serializers
from category.models import Category


class CategoryDetail(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CategoryInProductDetail(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
