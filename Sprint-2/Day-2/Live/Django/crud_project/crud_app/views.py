# crud_app/views.py
from django.shortcuts import render, redirect
from .data_storage import data, add_entry, update_entry, delete_entry
from django.http import JsonResponse

def delete_entry(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        if name in data:
            del data[name]
            return JsonResponse({'message': f'Successfully deleted entry for {name}'})
        else:
            return JsonResponse({'message': f'Entry for {name} does not exist'})


def create(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        age = request.POST.get('age')
        city = request.POST.get('city')
        add_entry(name, age, city)
        return redirect('read')
    return render(request, 'crud_app/create.html')

def read(request):
    context = {'data': data}
    return render(request, 'crud_app/read.html', context)
def update(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        new_age = request.POST.get('new_age')
        new_city = request.POST.get('new_city')
        
        # Fetch the existing data for the specified name
        entry_data = data.get(name, {})
        existing_age = entry_data.get('age', '')
        existing_city = entry_data.get('city', '')
        
        # Perform the update
        update_entry(name, new_age, new_city)
        
        return redirect('read')
    
    return render(request, 'crud_app/update.html')

def delete_name(name):
    if name in data:
        del data[name]
        return JsonResponse({'message': f'Successfully deleted entry for {name}'})
    else:
        return JsonResponse({'message': f'Entry for {name} does not exist'})
    
def delete(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        
        # Call the delete_entry function
        delete_name(name)
        
        return redirect('read')
    
    return render(request, 'crud_app/delete.html')







