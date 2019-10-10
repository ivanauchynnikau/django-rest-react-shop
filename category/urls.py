from django.urls import path, include
from category.views import *


app_name='category'

urlpatterns = [
    path('category/create/', CategoryCreateView.as_view())
]
