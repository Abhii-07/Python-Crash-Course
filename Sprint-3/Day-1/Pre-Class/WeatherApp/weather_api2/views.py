from django.http import JsonResponse, HttpResponseNotFound
from django.views import View
from .weather_data import weather_data

class WeatherDetailView(View):

    def get(self, request, city):
        city_data = weather_data.get(city)
        if city_data:
            return JsonResponse(city_data)
        else:
            return HttpResponseNotFound()
