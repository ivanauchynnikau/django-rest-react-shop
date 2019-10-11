from django.urls import path, include
from product.views import ProductListView, ProductCreateView, ProductDetailView


app_name='product'

urlpatterns = [
    path('all/', ProductListView.as_view()),
    path('product/create/', ProductCreateView.as_view()),
    path('product/detail/<int:pk>/', ProductDetailView.as_view()),
]

