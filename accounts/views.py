from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from accounts.serializers import LoginSerializer
from accounts.models import MyUser
from accounts.emailer import send_email


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


class LoginAPIView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        """
        Checks is user exists.
        Email and password are required.
        Returns a JSON web token.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


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
