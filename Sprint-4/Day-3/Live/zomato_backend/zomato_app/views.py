# zomato_app/views.py
from decimal import Decimal
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Dish, Order
from django.db.models import Sum
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



# class OrderCreateView(generics.CreateAPIView):
#     serializer_class = OrderSerializer

#     def create(self, request, *args, **kwargs):
#         selected_dish_ids = request.data.get('selected_dishes', [])
        
#         # Use Django's Sum function to calculate the total amount
#         total_amount = Dish.objects.filter(pk__in=selected_dish_ids).aggregate(total=Sum('price'))['total']
        
#         if total_amount is None:
#             return Response({"error_message": "Invalid or unavailable dish selected."}, status=status.HTTP_400_BAD_REQUEST)

#         order_data = {
#             "customer_name": request.data.get("customer_name"),
#             "final_amount": total_amount,
#         }

#         serializer = self.get_serializer(data=order_data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
        
#         # Add the selected dishes to the order
#         order = serializer.instance
#         order.dishes.add(*selected_dish_ids)
        
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class OrderListView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderUpdateStatusView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

