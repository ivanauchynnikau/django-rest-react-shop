from django.test import TestCase
from django.urls import reverse
from accounts.models import MyUser
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

email = 'testuser@example.com'
password = 'password123'


class AccountTests(TestCase):
    def setUp(self):
        self.user = MyUser.objects.create_user(email=email, password=password)
        self.token = Token.objects.create(user=self.user).key
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

    def test_login(self):
        response = self.client.post(reverse('accounts:user_login'), {'email': email, 'password': password})
        assert response.status_code == 200

    def test_get_user(self):
        response = self.client.get(reverse('accounts:user_details'), {'email': email, 'password': password})
        assert response.status_code == 200


class AccountSignUpTest(TestCase):
    def test_sign_up(self):
        response = self.client.post(reverse('accounts:user_sign_up'), {'email': email, 'password': password})
        assert response.status_code == 201
