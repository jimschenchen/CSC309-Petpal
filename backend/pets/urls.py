from django.urls import path
from .views import PetListCreateView, PetUpdateDeleteView, PetMetaGetView

app_name = 'pets'

urlpatterns = [
    path('', PetListCreateView.as_view(), name='pet-list-create'),
    path('pet/<int:pk>/', PetUpdateDeleteView.as_view(), name='pet-update-delete'),
    path('meta/', PetMetaGetView.as_view(), name='pet-meta')
]

