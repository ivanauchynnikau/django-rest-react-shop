from django.urls import path
from accounts.views import UserCreateView


app_name = 'accounts'

urlpatterns = [
    # path('login/', UserLoginView.as_view()),
    # path('logout/', UserLogoutView.as_view()),
    path('sign-up/', UserCreateView.as_view({'post': 'create'})),
]
