from django.urls import path
from .views import RegistrationAPIView, LoginAPIView, UserDetailsAPIView


app_name = 'accounts'

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='user_login'),
    path('sign-up/', RegistrationAPIView.as_view(), name='user_sign_up'),
    path('me/', UserDetailsAPIView.as_view(), name='user_details'),
]
