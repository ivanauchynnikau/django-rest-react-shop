from rest_framework import generics
from rest_framework.response import Response

from order.serializers import OrderDetailSerializer, OrderListSerializer
from order.models import Order, MyUser
from order.permissions import IsOwner
from order.emailer import send_email
from rest_framework import viewsets

from orderItem.models import OrderItem
from product.models import Product
from order.choices import ORDER_STATUSES


class OrderCreateView(viewsets.ViewSet):
    def create(self, request):
        product_list = []
        product_id_list = request.data['data']['productIdsArray']
        user_email = request.data['data']['email']

        user = MyUser.objects.filter(email__exact=user_email).first()
        order = Order.objects.create(state=ORDER_STATUSES.STARTED, user=user)
        order.save()

        for product_id in product_id_list:
            product = Product.objects.get(id=product_id)

            # prevent create orderItem if there is no available such products in stock
            if product.in_stock > 0:
                order_item = OrderItem.objects.create(item=product, order=order, amount=1, price=product.price)
                order_item.save()

                product_dict = {
                    'title': product.title,
                    'image': product.image,
                    'description': product.description,
                    'price': product.price
                }
                product_list.append(product_dict)

                # reduce num in_stock for product
                update_in_stock = product.in_stock - 1
                product.in_stock = update_in_stock
                product.save()

        send_email(user_email, order.id, product_list)

        order = Order.objects.filter(id=order.id)
        order = order.values()

        # TODO return error if one of product is not added to order
        return Response(status=200, data=order)


class OrderListView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderListSerializer
    queryset = Order.objects.all()
    permission_classes = (IsOwner, )


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()
    permission_classes = (IsOwner, )
