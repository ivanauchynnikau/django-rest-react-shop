from django.test import TestCase
from django.urls import reverse


class MainTests(TestCase):
    def test_get_default_template(self):
        response = self.client.get(reverse('home'))
        self.assertTemplateUsed(response, 'index.html')
