from django.urls import path
from accounts.views import RegistrationAPIView, LoginAPIView, UserDetailsView


app_name = 'accounts'

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='user_login'),
    path('sign-up/', RegistrationAPIView.as_view(), name='user_sign_up'),
    path('me/', UserDetailsView.as_view({'get': 'get_user'}), name='get_user'),
]
