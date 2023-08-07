# order.py

import json

import random
from utils.data_manager import load_order_data, save_order_data

def take_order(menu):
    order_id = str(random.randint(1000, 9999))
    customer_name = input("Enter customer name: ")
    ordered_dishes = []
    
    print("Enter dish IDs (separated by commas). Press Enter when finished.")
    dish_ids_input = input("Dish IDs: ").strip()
    dish_ids = [dish_id.strip() for dish_id in dish_ids_input.split(",")]
    for dish_id in dish_ids:
        if dish_id in menu and menu[dish_id]["availability"]:
            ordered_dishes.append(dish_id)
        else:
            print(f"Invalid dish ID '{dish_id}' or dish not available. Please try again.")
            return None
    
    if ordered_dishes:
        total_price = calculate_total_price(menu, ordered_dishes)
        order_data = {
            "order_id": order_id,
            "customer_name": customer_name,
            "dishes": ordered_dishes,
            "status": "received",
            "total_price": total_price
        }
        print("Order successfully placed.")
        print("Order ID:", order_id)
        print("Customer Name:", customer_name)
        print("Ordered Dishes:")
        for dish_id in ordered_dishes:
            print(f"- {menu[dish_id]['name']} (₹{menu[dish_id]['price']})")
        print("Total Price:", total_price)
        return order_data
    else:
        print("No valid dishes in the order. Order canceled.")
        return None

def generate_order_id():
    return random.randint(1000, 9999)


def calculate_total_price(menu, ordered_dishes):
    total_price = sum(menu[dish_id]["price"] for dish_id in ordered_dishes)
    return total_price

def update_order_status(orders, order_id, new_status):
    if order_id in orders:
        orders[order_id]["status"] = new_status
        print(f"Order status updated. Order ID: {order_id}, New Status: {new_status}")
    else:
        print("Invalid order ID. Order not found.")

def initialize_orders():
    order_data = load_order_data()
    return {int(order_id): order_data for order_id, order_data in order_data.items()}


def save_orders(orders):
    orders_data = {str(order_id): order_data for order_id, order_data in orders.items()}
    save_order_data(orders_data)

