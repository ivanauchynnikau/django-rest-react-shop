from django.urls import path
from category.views import *


app_name='category'

urlpatterns = [
    path('create/', CategoryCreateView.as_view())
]
