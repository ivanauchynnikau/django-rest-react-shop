import datetime

from rest_framework import generics
from rest_framework.response import Response

from order.serializers import OrderDetailSerializer, OrderListSerializer
from order.models import Order, MyUser
from order.permissions import IsOwner
from rest_framework import viewsets

from orderItem.models import OrderItem
from product.models import Product


class OrderCreateView(viewsets.ViewSet):
    def create(self, request):
        product_id_list = request.data['data']['productIdsArray']
        user_email = request.data['data']['user_email']

        # user = MyUser.objects.create(username=datetime.datetime.now())  # create new user
        # TODO do we need to find user like this?
        user = MyUser.objects.filter(email__exact=user_email)  # get user from db
        # 0 = ADDED_TO_CART state
        order = Order.objects.create(state=0, user=user)  # save object to db
        order.save()  # save object to db

        for product_id in product_id_list:
            product = Product.objects.get(id=product_id)  # get product by id
            order_item = OrderItem.objects.create(item=product, order=order)  # create order item
            order_item.save()  # save order items to db

        order = Order.objects.filter(id=order.id)
        order = order.values()

        # get user data that related to product my manyToMany connection
        # reformat django queryset and to json will returns {user_id: 1, user_id: 2, ...}
        # order_item_list_json = order_item_list.values('order__user_id')
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
