from rest_framework.response import Response
from accounts.models import MyUser
from accounts.emailer import send_email
from rest_framework import viewsets
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


class UserSignUpView(viewsets.ViewSet):
    """ create user, set its token, send sign up email """
    def sign_up(self, request):
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


class UserLoginView(viewsets.ViewSet):
    def login(self, request):
        email = request.data['email']
        password = request.data['password']

        user = authenticate(password=password, email=email)
        token = Token.objects.get(user=user)

        if user is not None:
            return Response(status=200, data={"auth_token": token.key})
        else:
            return Response(status=400, data={'error_text': 'Email or password is invalid'})


class UserDetailsView(viewsets.ViewSet):
    def get_user(self, request):
        try:
            user = Token.objects.get(key=request.auth.key).user
        except Token.DoesNotExist:
            return Response(status=400, data={'error_text': 'User does not exists'})

        if user is not None:
            return Response(status=200, data={"email": user.email, "id": user.id})
        else:
            return Response(status=400, data={'error_text': 'User does not exists'})
