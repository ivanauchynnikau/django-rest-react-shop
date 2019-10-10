from rest_framework import generics
from category.serializers import CategoryDetail


class CategoryCreateView(generics.CreateAPIView):
    serializer_class = CategoryDetail
