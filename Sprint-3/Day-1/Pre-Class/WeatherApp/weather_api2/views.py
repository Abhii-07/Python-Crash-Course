from django.views import View
from .weather_data import weather_data
import json
from django.http import JsonResponse, HttpResponseNotFound, HttpResponseBadRequest,HttpResponse


class WeatherDetailView(View):

    def get(self, request, city):
        city_data = weather_data.get(city)
        if city_data:
            return JsonResponse(city_data)
        else:
            return HttpResponseNotFound()

    def post(self, request, city):
        if city in weather_data:
            return HttpResponseBadRequest("City already exists")
        else:
            new_city_data = json.loads(request.body)
            weather_data[city] = new_city_data
            return JsonResponse(new_city_data, status=201)

    def delete(self, request, city):
        if city in weather_data:
            del weather_data[city]
            return HttpResponse(status=204)
        else:
            return HttpResponseNotFound()


    def put(self, request, city):
        city_data = weather_data.get(city)
        if city_data:
            updated_data = json.loads(request.body)
            city_data.update(updated_data)
            return JsonResponse(city_data)
        else:
            return HttpResponseNotFound()