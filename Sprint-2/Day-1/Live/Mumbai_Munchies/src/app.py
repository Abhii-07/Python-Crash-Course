import json
from datetime import date

INVENTORY_FILE = "D:\Masai-Github-Repos\Python-Crash-Course\Sprint-2\Day-1\Live\Mumbai_Munchies\data\stock_record.json"
SALES_FILE = "D:\Masai-Github-Repos\Python-Crash-Course\Sprint-2\Day-1\Live\Mumbai_Munchies\data\sales_record.json"


def load_data(file_name):
    with open(file_name, "r") as file:
        return json.load(file)


def save_data(file_name, data):
    with open(file_name, "w") as file:
        json.dump(data, file, indent=4)


def display_data(inventory):
    print("\nMumbai Munchies Inventory")
    print("------------------------------------")
    for snack_id, snack_details in inventory.items():
        print(f"Snack ID: {snack_id}")
        print(f"Snack Name: {snack_details['name']}")
        print(f"Price: {snack_details['price']}")
        print(f"Quantity available: {snack_details['quantity']}")
        print("------------------------------------")


def add_prod(inventory):
    print("------------------------------------")
    print("Enter the snack details:")
    snack_id = input("Enter the snack ID: ")
    name = input("Enter the snack name: ")
    price = float(input("Enter the price: "))
    quantity = int(input("Enter the quantity available: "))

    inventory[snack_id] = {
        "name": name,
        "price": price,
        "quantity": quantity,
    }

    save_data(INVENTORY_FILE, inventory)
    print("Snack added successfully!")
    print("------------------------------------")


def remove_prod(inventory):
    print("------------------------------------")
    snack_id = input("Enter the snack ID to be removed: ")
    if snack_id in inventory:
        name = inventory[snack_id]["name"]
        del inventory[snack_id]
        save_data(INVENTORY_FILE, inventory)
        print("Snack deleted successfully!")
    else:
        print("ID not found")


def update_prod(inventory):
    print("------------------------------------------------------")
    snack_id = input("Enter the snack ID to update quantity: ")
    if snack_id in inventory:
        quantity = int(input("Enter the new quantity available: "))
        inventory[snack_id]["quantity"] = quantity
        save_data(INVENTORY_FILE, inventory)
        print("Quantity updated successfully.")
    else:
        print("Snack ID not found in the inventory.")


def record_sale(sales_records, inventory):
    print("------------------------------------------------------")
    snack_id = input("Enter the snack ID sold: ")
    if snack_id in inventory:
        quantity_sold = int(input("Enter the quantity sold: "))
        snack = inventory[snack_id]
        if snack["quantity"] >= quantity_sold:
            snack_name = snack["name"]
            price = snack["price"]
            sale_date = str(date.today())

            sale_entry = {
                "snack_id": snack_id,
                "date": sale_date,
                "quantity_sold": quantity_sold,
            }

            sales_records.append(sale_entry)

            save_data(SALES_FILE, sales_records)
            print(
                f"{quantity_sold} {snack_name}{'s' if quantity_sold > 1 else ''} sold successfully on {sale_date}."
            )
            inventory[snack_id]["quantity"] -= quantity_sold
            save_data(INVENTORY_FILE, inventory)
        else:
            print("Insufficient quantity available.")
    else:
        print("Snack ID not found in the inventory.")


def main():
    inventory_data = load_data(INVENTORY_FILE)
    sales_records = load_data(SALES_FILE)

    while True:
        print("\n========= Mumbai Munchies Canteen Management =========")
        print("1. Display Inventory")
        print("2. Add Snack to Inventory")
        print("3. Remove Snack from Inventory")
        print("4. Update Snack Quantity")
        print("5. Record Snack Sale")
        print("6. Exit")
        choice = input("Enter your choice (1-6): ")

        if choice == "1":
            display_data(inventory_data)
        elif choice == "2":
            add_prod(inventory_data)
        elif choice == "3":
            remove_prod(inventory_data)
        elif choice == "4":
            update_prod(inventory_data)
        elif choice == "5":
            record_sale(sales_records, inventory_data)
        elif choice == "6":
            print("Exiting the application. Thank you!")
            break
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()