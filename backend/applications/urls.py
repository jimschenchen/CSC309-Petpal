from django.urls import path

from . import views

app_name = "applications"
urlpatterns = [
    path('', views.ApplicationsView.as_view(), name='applications'),
    path('application/<int:pk>/', views.ApplicationView.as_view(), name='application'),
]
