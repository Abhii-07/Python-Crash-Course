from django.test import TestCase
from django.urls import reverse
from .weather_data import weather_data

class WeatherViewTest(TestCase):

    def test_valid_city_weather(self):
        response = self.client.get(reverse('weather', kwargs={'city': 'San Francisco'}))
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), weather_data['San Francisco'])

    def test_invalid_city_weather(self):
        response = self.client.get(reverse('weather', kwargs={'city': 'InvalidCity'}))
        self.assertEqual(response.status_code, 404)

    def test_another_valid_city_weather(self):
        response = self.client.get(reverse('weather', kwargs={'city': 'New York'}))
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), weather_data['New York'])

    def test_missing_city_weather(self):
        response = self.client.get(reverse('weather', kwargs={'city': 'Chicago'}))
        self.assertEqual(response.status_code, 404)

    def test_empty_city_name(self):
        response = self.client.get(reverse('weather', kwargs={'city': 'EmptyCity'}))
        self.assertEqual(response.status_code, 404)



