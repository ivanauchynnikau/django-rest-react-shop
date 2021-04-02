from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LoginSerializer
from .models import MyUser
from .serializers import RegistrationSerializer
from .emailer import send_email


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

        existing_user = MyUser.objects.filter(email__iexact=email).first()
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

        return Response({
            'email': email,
            'last_name': user.last_name,
            'first_name': user.first_name,
            'id': user.id,
            'auth_token': token
        }, status=status.HTTP_200_OK)


class UserDetailsAPIView(APIView):
    def get(self, request):
        """
        Checks is user exists.
        Auth Token is required.
        Returns Email, First name, Last name, Id.
        """
        if not request.auth:
            return Response({'error': 'Auth data is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not request.auth.key:
            return Response({'error': 'Auth token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Token.objects.get(key=request.auth.key).user
        except Token.DoesNotExist:
            return Response({'error': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None:
            return Response(status=200, data={
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            })
        else:
            return Response({'error': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        """
        Checks is user exists.
        First name, Last name, Auth Token are required.
        Update First name and Last name.
        Returns Email, First name, Last name, Id.
        """
        data = request.data

        if not data:
            return Response({'error': 'Data is required'}, status=status.HTTP_400_BAD_REQUEST)

        auth_token = data['authToken']
        if not auth_token:
            return Response({'error': 'Auth token is required'}, status=status.HTTP_400_BAD_REQUEST)

        first_name = data['firstName']
        if not first_name:
            return Response({'error': 'First name is required'}, status=status.HTTP_400_BAD_REQUEST)

        last_name = data['lastName']
        if not last_name:
            return Response({'error': 'Last name is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Token.objects.get(key=auth_token).user
        except Token.DoesNotExist:
            return Response({'error': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None:
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            return Response(status=200, data={
                "email": user.email,
                "id": user.id,
                'first_name': user.first_name,
                'last_name': user.last_name
            })
        else:
            return Response({'error': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)
