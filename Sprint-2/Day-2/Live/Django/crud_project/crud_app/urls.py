from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create, name='create'),
    path('read/', views.read, name='read'),
    path('update/', views.update, name='update'),
    path('delete/', views.delete, name='delete'),
    path('delete_entry/', views.delete_entry, name='delete_entry')
]
