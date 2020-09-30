from rest_framework.response import Response
from accounts.models import MyUser
from accounts.emailer import send_email
from rest_framework import viewsets
from rest_framework.authtoken.models import Token


# create user, set its token, send sign up email
class UserCreateView(viewsets.ViewSet):
    def create(self, request):
        email = request.data['email']
        password = request.data['password']

        existing_user = MyUser.objects.filter(email__exact=email).first()
        if existing_user:
            return Response(status=400, data={'error_text': 'User with this email is already registered'})

        user = MyUser.objects.create_user(email)
        user.set_password(password)

        token = Token.objects.create(user=user)
        user.save()

        send_email(email, password)

        return Response(status=200, data={"auth_token": token.key})
