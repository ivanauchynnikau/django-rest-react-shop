from rest_framework import generics
from order.serializers import OrderDetailSerializer, OrderListSerializer
from order.models import Order
from order.permissions import IsOwner


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderDetailSerializer
    permission_classes = (IsOwner, )


class OrderListView(generics.ListAPIView):
    serializer_class = OrderListSerializer
    queryset = Order.objects.all()
    permission_classes = (IsOwner, )


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()
    permission_classes = (IsOwner, )

    # TODO how to show order items here?
