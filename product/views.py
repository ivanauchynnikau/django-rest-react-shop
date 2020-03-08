from rest_framework import generics
from product.serializers import ProductDetailSerializer, ProductListSerializer
from product.models import Product
from rest_framework.permissions import IsAdminUser


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductDetailSerializer
    permission_classes = (IsAdminUser, )


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    queryset = Product.objects.all()


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all()
