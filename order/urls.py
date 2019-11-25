from django.urls import path, include
from order.views import OrderCreateView, OrderListView, OrderDetailView


app_name = 'order'

urlpatterns = [
    path('all/', OrderListView.as_view()),
    path('create/', OrderCreateView.as_view()),
    path('<int:pk>/', OrderDetailView.as_view()),
    path('add-top-card/', OrderDetailView.as_view()),
]

