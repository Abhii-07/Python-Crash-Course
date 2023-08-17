from django.test import TestCase
from django.urls import reverse
from .weather_data import weather_data


class WeatherAPITest(TestCase):

    def test_get_valid_city(self):
        response = self.client.get(reverse('weather_detail', kwargs={'city': 'San Francisco'}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'temperature': 14, 'weather': 'Cloudy'})

    def test_get_invalid_city(self):
        response = self.client.get(reverse('weather_detail', kwargs={'city': 'InvalidCity'}))
        self.assertEqual(response.status_code, 404)

    def test_create_weather_data(self):
        new_city_data = {'city': 'Chicago', 'temperature': 25, 'weather': 'Cloudy'}
        response = self.client.post(reverse('weather_detail', kwargs={'city': 'Chicago'}), new_city_data, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('city', response.json())
        self.assertEqual(response.json()['city'], 'Chicago')

    def test_update_weather_data(self):
        updated_weather_data = {'temperature': 30, 'weather': 'Sunny'}
        response = self.client.put(reverse('weather_detail', kwargs={'city': 'San Francisco'}), updated_weather_data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'temperature': 30, 'weather': 'Sunny'})

    def test_delete_weather_data(self):
        response = self.client.delete(reverse('weather_detail', kwargs={'city': 'Los Angeles'}))
        self.assertEqual(response.status_code, 204)
        self.assertFalse('Los Angeles' in weather_data)


