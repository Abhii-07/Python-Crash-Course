from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Dish, Order  # Import your models as needed
from .serializers import DishSerializer, OrderSerializer  # Import your serializers as needed

class DishListViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('dish-list')  # Replace 'dish-list' with your actual URL name
        self.dish_data = {'name': 'Test Dish', 'price': '10.00', 'availability': True}

    def test_list_dishes(self):
        # Create a sample dish
        Dish.objects.create(**self.dish_data)

        # Make a GET request to the API
        response = self.client.get(self.url)

        # Check the response status code and data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Dish')
        # Add more assertions as needed

class DishCreateViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('dish-create')  # Replace 'dish-create' with your actual URL name
        self.valid_dish_data = {'name': 'Test Dish', 'price': '10.00', 'availability': True}

    def test_create_dish(self):
        # Make a POST request to create a dish
        response = self.client.post(self.url, self.valid_dish_data, format='json')

        # Check the response status code and data
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Dish.objects.count(), 1)
        self.assertEqual(Dish.objects.get().name, 'Test Dish')
        # Add more assertions as needed

# Similar test classes can be created for other views
