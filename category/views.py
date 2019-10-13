from rest_framework import generics
from category.serializers import CategoryDetail
from rest_framework.permissions import IsAdminUser


class CategoryCreateView(generics.CreateAPIView):
    serializer_class = CategoryDetail
    permission_classes = (IsAdminUser, )

