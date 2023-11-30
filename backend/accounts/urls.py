from django.urls import path
from .views import UserListCreateView, LoginTokenBasedView, UserUpdateView, UserProfileView, UserDeleteView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Creating a user
    path('users/', UserListCreateView.as_view(), name='create_list_user'),
    
    # Listing users (simply 'users/' with GET method)

    #login
    path('token/', LoginTokenBasedView.as_view(), name='login'),

    # Refresh token 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Updating user (using 'user/' with PATCH or PUT method)
    path('user/', UserUpdateView.as_view(), name='user_update'),

    # Retrieving user profile (using 'users/<int:pk>/profile/
    path('users/<int:pk>/profile/', UserProfileView.as_view(), name='user_profile'),
    
    path('users/<int:pk>/', UserDeleteView.as_view(), name='user-detail'),

]

