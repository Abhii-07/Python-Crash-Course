# menu.py

import json
from utils.data_manager import load_menu_data, save_menu_data

def show_menu(menu):
    for dish_id, dish_info in menu.items():
        availability = "Available" if dish_info["availability"] else "Not Available"
        print(f"{dish_id}. {dish_info['name']} - ₹{dish_info['price']} ({availability})")

def add_dish_to_menu(menu, dish_id, name, price):
    menu[dish_id] = {
        "name": name,
        "price": price,
        "availability": True
    }
    print(f"{name} added to the menu.")

def remove_dish_from_menu(menu, dish_id):
    if dish_id in menu:
        dish_name = menu[dish_id]["name"]
        del menu[dish_id]
        print(f"{dish_name} removed from the menu.")
    else:
        print("Invalid dish ID. Dish not found in the menu.")

def update_dish_availability(menu, dish_id, availability):
    if dish_id in menu:
        menu[dish_id]["availability"] = availability
        status = "available" if availability else "unavailable"
        print(f"Dish availability updated. Now {menu[dish_id]['name']} is {status}.")
    else:
        print("Invalid dish ID. Dish not found in the menu.")

def initialize_menu():
    menu_data = load_menu_data()
    return menu_data

def save_menu(menu):
    save_menu_data(menu)
