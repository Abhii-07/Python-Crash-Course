"""
URL configuration for zomato_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# zomato_backend/urls.py

# zomato_backend/urls.py

from django.urls import path, include
from zomato_app.views import (
    DishListView,
    DishCreateView,
    DishDeleteView,
    DishUpdateAvailabilityView,
    OrderCreateView,
    OrderListView,
    OrderUpdateStatusView,
)

urlpatterns = [
    # path('', home_view, name='home'),
    # path('support/', support_page, name='support'),
    # path('chatbot/', chatbot_view, name='chatbot'),

    # API endpoints
    path('api/dishes/', DishListView.as_view(), name='dish-list'),
    path('api/dishes/add/', DishCreateView.as_view(), name='dish-create'),
    path('api/dishes/remove/<int:dish_id>/', DishDeleteView.as_view(), name='dish-delete'),
    path('api/dishes/update/<int:dish_id>/', DishUpdateAvailabilityView.as_view(), name='dish-update-availability'),

    path('api/orders/', OrderListView.as_view(), name='order-list'),
    path('api/orders/add/', OrderCreateView.as_view(), name='order-create'),
    # path('api/orders/add/', OrderCreateView.as_view(), name='order-create'),
    path('api/orders/update/<int:pk>/', OrderUpdateStatusView.as_view(), name='order-update-status'),
]



