from rest_framework import generics
from orderItem.serializers import OrderItemDetailSerializer, OrderItemsListSerializer
from orderItem.models import OrderItem


class OrderItemCreateView(generics.CreateAPIView):
    serializer_class = OrderItemDetailSerializer


class OrderListView(generics.ListAPIView):
    serializer_class = OrderItemsListSerializer
    queryset = OrderItem.objects.all()


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderItemDetailSerializer
    queryset = OrderItem.objects.all()


