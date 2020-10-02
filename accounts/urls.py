from django.urls import path
from accounts.views import UserSignUpView, LoginAPIView, UserDetailsView


app_name = 'accounts'

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='user_login'),
    path('sign-up/', UserSignUpView.as_view({'post': 'sign_up'}), name='user_sign_up'),
    path('me/', UserDetailsView.as_view({'get': 'get_user'}), name='get_user'),
]
