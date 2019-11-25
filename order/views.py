import datetime

from rest_framework import generics
from rest_framework.response import Response

from order.serializers import OrderDetailSerializer, OrderListSerializer
from order.models import Order, User
from order.permissions import IsOwner
from rest_framework import viewsets

from orderItem.models import OrderItem
from product.models import Product


class OrderCreateView(viewsets.ViewSet):
    permission_classes = (IsOwner, )

    def create(self, request):
        # print something to console
        # print(request.data)

        # get data from request
        product_id = request.data['data']['productId']

        # create new user (Product model need user)
        user = User.objects.create(username=datetime.datetime.now())

        # get product by id
        product = Product.objects.get(id=product_id)

        #  TODO move '0' separated file, '0' is ADDED_TO_CART = 0 from product model
        order = Order.objects.create(state=0, user=user)
        # save object to db
        order.save()

        # create many order items
        order_item = OrderItem.objects.create(item=product, order=order)
        order_item1 = OrderItem.objects.create(item=product, order=order)
        order_item2 = OrderItem.objects.create(item=product, order=order)

        # save order items to db
        order_item.save()
        order_item1.save()
        order_item2.save()

        # get order from db
        order_item_list = OrderItem.objects.filter(order=order)
        # order_item_list = OrderItem.objects.filter(order_id=order.id)

        # reformat django queryset to json will returns {item_id: 1, item_id: 2, ...}
        order_item_list_json = order_item_list.values('item_id')

        # get user data that related to procut my manyToMany connection
        # reformat django queryset and to json will returns {user_id: 1, user_id: 2, ...}
        # order_item_list_json = order_item_list.values('order__user_id')

        return Response(status=200, data=order_item_list_json)


class OrderListView(generics.ListAPIView):
    serializer_class = OrderListSerializer
    queryset = Order.objects.all()
    permission_classes = (IsOwner, )


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()
    permission_classes = (IsOwner, )

    # TODO how to show order items here?
