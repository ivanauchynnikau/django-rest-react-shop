from django.urls import path
from order.views import OrderCreateView, OrderDetailView, OrderUserListAPIView


app_name = 'order'

urlpatterns = [
    path('create/', OrderCreateView.as_view({'post': 'create'})),
    path('user/', OrderUserListAPIView.as_view()),
    path('<int:pk>/', OrderDetailView.as_view()),
]

