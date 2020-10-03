from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import LoginSerializer
from .models import MyUser
from .serializers import RegistrationSerializer
from accounts.emailer import send_email


class RegistrationAPIView(APIView):
    """
    Registers a new user.
    """
    serializer_class = RegistrationSerializer

    def post(self, request):
        """
        Creates a new User object.
        Username, email, and password are required.
        Returns a JSON web token.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        existing_user = MyUser.objects.filter(email__exact=email).first()
        if existing_user:
            return Response({'error': 'User with this email is already registered'}, status=status.HTTP_400_BAD_REQUEST)

        user = MyUser.objects.create_user(email)
        user.set_password(password)
        token = Token.objects.create(user=user).key
        user.save()

        try:
            send_email(email, password)
        except:
            pass

        return Response({'email': email, 'id': user.id, 'auth_token': token}, status=status.HTTP_201_CREATED)


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

        email = serializer.validated_data['email']
        token = serializer.validated_data['auth_token'].key

        user = MyUser.objects.filter(email__exact=email).first()

        return Response({'email': email, 'id': user.id, 'auth_token': token}, status=status.HTTP_200_OK)


class UserDetailsAPIView(APIView):
    def get(self, request):
        if not request.auth:
            return Response({'error': 'Auth data is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not request.auth.key:
            return Response({'error': 'Auth token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Token.objects.get(key=request.auth.key).user
        except Token.DoesNotExist:
            return Response({'error': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None:
            return Response(status=200, data={"email": user.email, "id": user.id})
        else:
            return Response({'error': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        if not request.auth:
            return Response({'error': 'Auth data is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not request.auth.key:
            return Response({'error': 'Auth token is required'}, status=status.HTTP_400_BAD_REQUEST)

        # TODO check does request has first name, last name

        try:
            user = Token.objects.get(key=request.auth.key).user
        except Token.DoesNotExist:
            return Response({'error': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None:
            # TODO update user first name, last name in db
            return Response(status=200, data={"email": user.email, "id": user.id})
        else:
            return Response({'error': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)
