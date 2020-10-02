from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True, error_messages={"blank": "Email field may not be blank."})
    password = serializers.CharField(max_length=128, write_only=True,
                                     error_messages={"blank": "Password field may not be blank."})

    auth_token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        """
        Validates user data.
        """
        email = data.get('email', None)
        password = data.get('password', None)

        if email is None:
            raise serializers.ValidationError('An email address is required to log in.')

        if password is None:
            raise serializers.ValidationError('A password is required to log in.')

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError('A user with this email and password was not found.')

        token = Token.objects.get(user=user)

        if token is None:
            token = Token.objects.create(user=user)

        return {'auth_token': token}
