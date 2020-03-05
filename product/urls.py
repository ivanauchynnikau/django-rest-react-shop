from django.urls import path, include
from product.views import ProductListView, ProductCreateView, ProductDetailView


app_name='product'

urlpatterns = [
    path('', ProductListView.as_view()),
    path('create/', ProductCreateView.as_view()),
    path('<int:pk>/', ProductDetailView.as_view()),
]

