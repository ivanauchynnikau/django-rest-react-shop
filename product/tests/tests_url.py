from django.test import TestCase
from django.urls import reverse
from category.models import Category
from product.models import Product
from rest_framework.test import APIClient


class ProductsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(title='category_title', description='category_description')
        self.product = Product.objects.create(category=self.category,
                                              title='product_title',
                                              description='product_description',
                                              in_stock=123,
                                              price=1000)

    def test_get_products_list(self):
        response = self.client.get(reverse('product:product_list'))
        assert response.status_code == 200

    def test_get_product_item(self):
        response = self.client.get(reverse('product:product_item', kwargs={"pk": 1}))
        assert response.status_code == 200

    def test_get_non_existent_product_item(self):
        response = self.client.get(reverse('product:product_item', kwargs={"pk": 100}))
        assert response.status_code == 404
