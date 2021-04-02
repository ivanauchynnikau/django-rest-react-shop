import decimal

from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from .serializers import OrderDetailSerializer
from .models import MyUser
from .permissions import IsOwner
from .emailer import send_email
from .choices import OrderStatuses

from orderItem.models import OrderItem

from order.models import Order
from product.models import Product


class OrderCreateView(viewsets.ViewSet):
    def create(self, request):
        product_list = []
        product_id_list = request.data['data']['productIdsArray']
        user_email = request.data['data']['email']

        user = MyUser.objects.filter(email__iexact=user_email).first()
        order = Order.objects.create(state=OrderStatuses.STARTED, user=user)
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

        # TODO return warn if one of product is not added to order
        return Response(status=200, data=order)


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()
    permission_classes = (IsOwner, )


class OrderUserListAPIView(APIView):
    def get(self, request):
        """
        Checks is user exists.
        Auth Token is required.
        Returns user orders list
        """
        if not request.auth:
            return Response({'error': 'Auth data is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not request.auth.key:
            return Response({'error': 'Auth token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Token.objects.get(key=request.auth.key).user
        except Token.DoesNotExist:
            return Response({'error': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        response_array = []
        order_list = (Order.objects.filter(user_id__exact=user.id).values('id', 'state', 'create_date'))

        for order in order_list:
            order_items = OrderItem.objects.filter(order_id__exact=order['id'])
            product_items_list = []

            for order_item in order_items:
                product = Product.objects.filter(id__exact=order_item.item_id).first()

                product_dict = {
                    'image': product.image.url,
                    'title': product.title,
                    'id': product.id,
                    'description': product.description,
                    'price': str(decimal.Decimal(product.price))
                }

                product_items_list.append(product_dict)

            response_order = {
                'id': order['id'],
                'state': order['state'],
                'create_date': order['create_date'].strftime('%Y-%m-%d %H:%M'),
                'product_items': product_items_list
            }

            response_array.append(response_order)

        return Response({'data': response_array}, status=status.HTTP_200_OK)
