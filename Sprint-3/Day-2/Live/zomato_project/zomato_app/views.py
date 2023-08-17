from decimal import Decimal 
from django.shortcuts import render, redirect
from .models import Dish, Order

def home_view(request):
    context = {}  
    return render(request, 'zomato_app/home.html', context)

def menu_view(request):
    menu = Dish.objects.all()
    print("Menu Items:", menu)  
    context = {'menu': menu}
    return render(request, 'zomato_app/menu.html', context)



def add_dish(request):
    if request.method == 'POST':
        name = request.POST['name']
        price = float(request.POST['price'])
        availability = request.POST.get('availability', False) == 'on'  
        new_dish = Dish(name=name, price=price, availability=availability)
        new_dish.save()
        return redirect('menu')
    return render(request, 'zomato_app/add_dish.html')


def remove_dish(request, dish_id):
    try:
        dish = Dish.objects.get(pk=dish_id)
        dish.delete()
    except Dish.DoesNotExist:
        pass  
    return redirect('menu')

def update_availability(request, dish_id):
    try:
        dish = Dish.objects.get(pk=dish_id)
        dish.availability = not dish.availability
        dish.save()
    except Dish.DoesNotExist:
        pass  
    return redirect('menu')


def take_order(request):
    if request.method == 'POST':
        selected_dishes = request.POST.getlist('selected_dishes')
        total_amount = Decimal('0.00')
        selected_dish_objects = []

        for dish_id in selected_dishes:
            try:
                selected_dish = Dish.objects.get(pk=dish_id, availability=True)
                selected_dish_objects.append(selected_dish)
                total_amount += selected_dish.price
            except Dish.DoesNotExist:
                context = {'error_message': "Invalid or unavailable dish selected."}
                return render(request, 'zomato_app/take_order.html', context)

        if not selected_dish_objects:
            context = {'error_message': "No valid dishes selected."}
            return render(request, 'zomato_app/take_order.html', context)

        order = Order.objects.create(
            customer_name=request.POST['customer_name'],
            final_amount=total_amount
        )

        order.dishes.add(*selected_dish_objects)

        return redirect('review_orders')

    menu = Dish.objects.filter(availability=True)
    context = {'menu': menu}
    return render(request, 'zomato_app/take_order.html', context)




def update_order_status(request, order_id):
    try:
        order = Order.objects.get(pk=order_id)
        if request.method == 'POST':
            new_status = request.POST['new_status']
            order.status = new_status
            order.save()
    except Order.DoesNotExist:
        pass  
    return redirect('review_orders')

def review_orders(request):
    orders = Order.objects.all()
    context = {'orders': orders}
    print("orders Items:", orders)  
    return render(request, 'zomato_app/review_orders.html', context)


def exit_system(request):
    global orders
    orders = {}  
    return redirect('menu')
