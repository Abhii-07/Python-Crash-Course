# utils/data_manager.py

import json

MENU_FILE = "D:\Masai-Github-Repos\Python-Crash-Course\Sprint-2\Day-1\Pre-Class\zesty_zomato\data\menu.json"
ORDERS_FILE = "D:\Masai-Github-Repos\Python-Crash-Course\Sprint-2\Day-1\Pre-Class\zesty_zomato\data\orders.json"

def load_menu_data():
    try:
        with open(MENU_FILE, "r") as file:
            menu_data = json.load(file)
    except FileNotFoundError:
        menu_data = {}
    return menu_data

def save_menu_data(menu_data):
    with open(MENU_FILE, "w") as file:
        json.dump(menu_data, file)

def load_order_data():
    try:
        with open(ORDERS_FILE, "r") as file:
            order_data = json.load(file)
    except FileNotFoundError:
        order_data = {}
    return order_data

def save_order_data(order_data):
    with open(ORDERS_FILE, "w") as file:
        json.dump(order_data, file)
