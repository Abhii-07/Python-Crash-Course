from django.test import TestCase
from django.urls import reverse
from .weather_data import weather_data

class WeatherViewTest(TestCase):

    def test_get_valid_city(self):
        response = self.client.get(reverse('weather_detail', kwargs={'city': 'San Francisco'}))
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), weather_data['San Francisco'])

    def test_get_invalid_city(self):
        response = self.client.get(reverse('weather_detail', kwargs={'city': 'InvalidCity'}))
        self.assertEqual(response.status_code, 404)
