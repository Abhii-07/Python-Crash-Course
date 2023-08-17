from django.urls import path
from .views import WeatherDetailView

urlpatterns = [
    path('weathertask2/<str:city>/', WeatherDetailView.as_view(), name='weather_detail'),
]
