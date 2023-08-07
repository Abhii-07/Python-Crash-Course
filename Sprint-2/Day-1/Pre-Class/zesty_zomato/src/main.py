from menu import initialize_menu, show_menu, add_dish_to_menu, remove_dish_from_menu, update_dish_availability, save_menu
from order import initialize_orders, take_order, update_order_status, save_orders

def print_separator(color_code="\033[94m"):
    print(color_code + "*" * 60 + "\033[0m")

def print_header():
    print_separator("\033[92m")
    print("Welcome to Zomato Chronicles: The Great Food Fiasco!")
    print_separator()

def main():
    print_header()
    
    menu = initialize_menu()
    orders = initialize_orders()

    while True:
        print("\nWhat would you like to do?")
        print("1. \033[93mShow Menu\033[0m")
        print("2. \033[93mAdd Dish to Menu\033[0m")
        print("3. \033[93mRemove Dish from Menu\033[0m")
        print("4. \033[93mUpdate Dish Availability\033[0m")
        print("5. \033[93mTake New Order\033[0m")
        print("6. \033[93mUpdate Order Status\033[0m")
        print("7. \033[93mExit\033[0m")

        choice = input("Enter your choice (1-7): ")

        if choice == "1":
            print_separator()
            print("\033[94mZesty Zomato Menu\033[0m")
            print_separator()
            show_menu(menu)
        elif choice == "2":
            print_separator()
            print("\033[94mAdd Dish to Menu\033[0m")
            print_separator()
            dish_id = int(input("Enter the dish ID: "))
            name = input("Enter the dish name: ")
            price = float(input("Enter the dish price: "))
            add_dish_to_menu(menu, dish_id, name, price)
            save_menu(menu)
        elif choice == "3":
            print_separator()
            print("\033[94mRemove Dish from Menu\033[0m")
            print_separator()
            dish_id = int(input("Enter the dish ID to remove: "))
            remove_dish_from_menu(menu, dish_id)
            save_menu(menu)
        elif choice == "4":
            print_separator()
            print("\033[94mUpdate Dish Availability\033[0m")
            print_separator()
            dish_id = int(input("Enter the dish ID to update: "))
            availability = input("Is the dish available (yes/no): ").lower() == "yes"
            update_dish_availability(menu, dish_id, availability)
            save_menu(menu)
        elif choice == "5":
            print_separator()
            print("\033[94mTake New Order\033[0m")
            print_separator()
            order = take_order(menu)
            if order:
                orders[order["order_id"]] = order
                save_orders(orders)
        elif choice == "6":
            print_separator()
            print("\033[94mUpdate Order Status\033[0m")
            print_separator()
            order_id = input("Enter the order ID: ")
            new_status = input("Enter the new status: ")
            update_order_status(orders, order_id, new_status)
            save_orders(orders)
        elif choice == "7":
            print_separator("\033[91m")
            print("Thank you for using Zomato Chronicles. Have a great day!")
            print_separator("\033[0m")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
