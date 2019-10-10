from rest_framework import generics
from product.serializers import ProductDetail


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductDetail
