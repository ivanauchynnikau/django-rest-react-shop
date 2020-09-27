from rest_framework import generics
from rest_framework.response import Response

from order.serializers import OrderDetailSerializer, OrderListSerializer
from order.models import Order, MyUser
from order.permissions import IsOwner
from rest_framework import viewsets

from orderItem.models import OrderItem
from product.models import Product
from order.choices import ORDER_STATUSES

from django.core.mail import EmailMultiAlternatives
from djangoRestReactShop.settings import EMAIL_HOST_USER


def send_email(recipient_mail, order_id, product_list):
    message = ''
    for product in product_list:
        message += f'<a href="http://placekitten.com/g/800/800" target="_blank" style="font-size: 30px;">MYSHOP.COM</a>'
        message += f'<p style="font-size: 22px;">{ product["title"] }</p>'
        # TODO how show images in mails?
        # message += f'<div><img src="{ product["image"] }"></div>'
        message += f'<p>Description: { product["description"] }</p>'
        message += f'<p style="font-size: 18px;">Price: { product["price"] }</p>'
        message += f'<br><hr><br>'

    subject = 'Order №{} was created.'.format(order_id)

    msg = EmailMultiAlternatives(subject, subject, EMAIL_HOST_USER, [recipient_mail])
    msg.attach_alternative(message, "text/html")
    msg.send()


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
            order_item = OrderItem.objects.create(item=product, order=order, amount=1, price=product.price)
            order_item.save()

            product_dict = {
                'title': product.title,
                'image': product.image,
                'description': product.description,
                'price': product.price
            }
            product_list.append(product_dict)
        send_email(user_email, order.id, product_list)

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
