# zomato_app/views.py
from decimal import Decimal
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Dish, Order
from .serializers import DishSerializer, OrderSerializer

# Views for rendering HTML pages

# def home_view(request):
#     context = {}
#     return render(request, 'zomato_app/home.html', context)

# def support_page(request):
#     return render(request, 'zomato_app/support_page.html')

# def chatbot_view(request):
#     # Your chatbot view logic here
#     pass

# API Views

class DishListView(generics.ListCreateAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer

class DishCreateView(generics.CreateAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer

class DishDeleteView(generics.DestroyAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer

    def get_object(self):
        dish_id = self.kwargs.get('dish_id')
        return get_object_or_404(Dish, pk=dish_id)

class DishUpdateAvailabilityView(generics.UpdateAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer

    def get_object(self):
        dish_id = self.kwargs.get('dish_id')
        return get_object_or_404(Dish, pk=dish_id)

class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        selected_dishes = request.data.get('selected_dishes', [])
        total_amount = Decimal('0.00')
        selected_dish_objects = []

        for dish_id in selected_dishes:
            dish = get_object_or_404(Dish, pk=dish_id, availability=True)
            selected_dish_objects.append(dish)
            total_amount += dish.price

        if not selected_dish_objects:
            return Response({"error_message": "Invalid or unavailable dish selected."}, status=status.HTTP_400_BAD_REQUEST)

        order_data = {
            "customer_name": request.data.get("customer_name"),
            "final_amount": total_amount,
            "dishes": selected_dish_objects,
        }

        serializer = self.get_serializer(data=order_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderListView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderUpdateStatusView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

