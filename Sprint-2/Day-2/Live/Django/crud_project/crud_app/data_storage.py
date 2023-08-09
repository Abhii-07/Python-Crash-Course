# crud_app/data_storage.py

data = {}

def add_entry(name, age, city):
    data[name] = {'age': age, 'city': city}

def update_entry(name, new_age, new_city):
    if name in data:
        data[name]['age'] = new_age
        data[name]['city'] = new_city

def delete_entry(name):
    if name in data:
        del data[name]
