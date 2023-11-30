from django.urls import path

from . import views

app_name = 'notifications'
urlpatterns = [
    path('', views.NotificationList.as_view(), name='notifications'),
    path('notification/<int:pk>/', views.NotificationRetrieveDelete.as_view(), name='notification'),
]
