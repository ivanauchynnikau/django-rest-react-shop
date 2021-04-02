from django.test import TestCase
from django.urls import reverse
from accounts.models import MyUser
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


class AccountTests(TestCase):
    def setUp(self):
        self.email = "testuser1@example.com"
        self.password = "password123"
        self.user = MyUser.objects.create_user(email=self.email, password=self.password)

        self.token = Token.objects.create(user=self.user).key
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

    def test_login(self):
        response = self.client.post(reverse('accounts:user_login'), {'email': self.email, 'password': self.password})
        assert response.status_code == 200

    def test_get_user(self):
        response = self.client.get(reverse('accounts:user_details'), {'email': self.email, 'password': self.password})
        assert response.status_code == 200


class AccountSignUpTest(TestCase):
    def test_sign_up(self):
        self.email = "testuser2@example.com"
        self.password = "password123"

        response = self.client.post(reverse('accounts:user_sign_up'), {'email': self.email, 'password': self.password})
        assert response.status_code == 201
