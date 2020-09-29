from rest_framework.response import Response
from accounts.models import MyUser
from rest_framework import viewsets
from django.core.mail import EmailMultiAlternatives
from djangoRestReactShop.settings import EMAIL_HOST_USER, BASE_WEBSITE_URL
from rest_framework.authtoken.models import Token


def send_email(email, password):
    message = ''
    message += f'<a href="{BASE_WEBSITE_URL}" target="_blank" style="font-size: 30px;">DJANGOSHOP.COM</a>'
    message += f'<p>Email: { email }</p>'
    message += f'<p>Password: { password }</p>'
    message += f'<br><hr><br>'

    subject = 'Your account was created.'

    msg = EmailMultiAlternatives(subject, subject, EMAIL_HOST_USER, [email])
    msg.attach_alternative(message, "text/html")
    msg.send()


class UserCreateView(viewsets.ViewSet):
    def create(self, request):
        email = request.data['email']
        password = request.data['password']

        existing_user = MyUser.objects.filter(email__exact=email).first()
        if existing_user:
            # TODO move to constants
            return Response(status=400, data="User with this email already exists")

        user = MyUser.objects.create_user(email)
        user.set_password(password)

        token = Token.objects.create(user=user)
        user.save()

        send_email(email, password)

        # # TODO return message if one of product is not added to order
        return Response(status=200, data={"auth_token": token.key})
