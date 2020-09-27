import datetime

from rest_framework import generics
from rest_framework.response import Response

from order.serializers import OrderDetailSerializer, OrderListSerializer
from order.models import Order, MyUser
from order.permissions import IsOwner
from rest_framework import viewsets

from orderItem.models import OrderItem
from product.models import Product
from order.choices import ORDER_STATUSES


class OrderCreateView(viewsets.ViewSet):
    def create(self, request):
        product_id_list = request.data['data']['productIdsArray']
        user_email = request.data['data']['email']

        user = MyUser.objects.filter(email__exact=user_email).first()  # get user from db
        order = Order.objects.create(state=ORDER_STATUSES.STARTED, user=user)
        order.save()

        for product_id in product_id_list:
            product = Product.objects.get(id=product_id)  # get product by product id
            order_item = OrderItem.objects.create(item=product, order=order, amount=1, price=product.price)
            order_item.save()  # save order items to db

        order = Order.objects.filter(id=order.id)
        order = order.values()

        return Response(status=200, data=order)


class OrderListView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderListSerializer
    queryset = Order.objects.all()
    permission_classes = (IsOwner, )


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()
    permission_classes = (IsOwner, )

    # TODO how to show order items here?
