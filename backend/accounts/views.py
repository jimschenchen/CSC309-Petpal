from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.request import Request
from rest_framework.response import Response
from .models import User
from .serializers import UserCreateSerializer, UserUpdateSerializer, UserProfileSerializer, ShelterProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.generics import UpdateAPIView
from .permissions import IsOwnerOrReadOnly, CanViewProfile, IsOwnerOrAdmin
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import DestroyAPIView

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    # example of manual swagger documentation
    @swagger_auto_schema(
        operation_description="create a user by email, password, and confirm password. And you can choose a user type: Shelter or Pet_seeker(This field is optional since we have default type: Pet_seeker). The avatar is optional since we provide two default avatars for Shelter and Seekers ",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL, title='Email', max_length=254, min_length=1),
                'password': openapi.Schema(type=openapi.TYPE_STRING, title='Password', max_length=128, min_length=1),
                'confirm_password': openapi.Schema(type=openapi.TYPE_STRING, title='Confirm Password', min_length=1),
                'user_type': openapi.Schema(type=openapi.TYPE_STRING, title='User Type', enum=['shelter', 'pet_seeker']),
                'avatar': openapi.Schema(type=openapi.TYPE_FILE, title='Avatar'),
            },
            required=['email', 'password', 'confirm_password']
        ),
        responses={
            status.HTTP_201_CREATED: UserProfileSerializer,
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'Pet not found'
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        return UserProfileSerializer

    def perform_create(self, serializer):
        serializer.save()
        
    @swagger_auto_schema(
        operation_description="Get a list of shelters.",
        responses={
            status.HTTP_200_OK: UserProfileSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'shelter not found'
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    def get_queryset(self):
        return User.objects.filter(user_type=User.SHELTER)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            # Allow any access for creating a user
            return []
        # Require authenticated access for all other requests
        return [permission() for permission in self.permission_classes]


class LoginTokenBasedView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    @swagger_auto_schema(
        operation_description="login using email and password then you can get a token",
        responses={
            status.HTTP_200_OK: "got token.",
            status.HTTP_404_NOT_FOUND: 'email or password incorrect.'
        }
    )
    def post(self, request: Request, *args, **kwargs) -> Response:
        return super().post(request, *args, **kwargs)
    
class UserUpdateView(UpdateAPIView):
    
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsOwnerOrReadOnly]
    def get_object(self):
        return self.request.user

    @swagger_auto_schema(
        operation_description="update a user's profile by upload information you want to update.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user_type': openapi.Schema(type=openapi.TYPE_STRING, title='User Type', enum=['shelter', 'pet_seeker']),
                'email': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL, title='Email', max_length=254, min_length=1),
                'name': openapi.Schema(type=openapi.TYPE_STRING, title='Name', max_length=100),
                'address': openapi.Schema(type=openapi.TYPE_STRING, title='Address', max_length=255),
                'phone_number': openapi.Schema(type=openapi.TYPE_STRING, title='Phone Number', max_length=20),
                'description': openapi.Schema(type=openapi.TYPE_STRING, title='Description'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, title='Password', max_length=128, min_length=1),
                'confirm_password': openapi.Schema(type=openapi.TYPE_STRING, title='Confirm Password', min_length=1),
                'avatar': openapi.Schema(type=openapi.TYPE_FILE, title='Avatar'),
            }
        ),
        responses={
            status.HTTP_200_OK: "User's profile updated.",
            status.HTTP_400_BAD_REQUEST: "Invalid update.",
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'User not found.'
        }
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="update a user's profile by upload information you want to update.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user_type': openapi.Schema(type=openapi.TYPE_STRING, title='User Type', enum=['shelter', 'pet_seeker']),
                'email': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL, title='Email', max_length=254, min_length=1),
                'name': openapi.Schema(type=openapi.TYPE_STRING, title='Name', max_length=100),
                'address': openapi.Schema(type=openapi.TYPE_STRING, title='Address', max_length=255),
                'phone_number': openapi.Schema(type=openapi.TYPE_STRING, title='Phone Number', max_length=20),
                'description': openapi.Schema(type=openapi.TYPE_STRING, title='Description'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, title='Password', max_length=128, min_length=1),
                'confirm_password': openapi.Schema(type=openapi.TYPE_STRING, title='Confirm Password', min_length=1),
                'avatar': openapi.Schema(type=openapi.TYPE_FILE, title='Avatar'),
            }
        ),
        responses={
            status.HTTP_200_OK: "User's profile updated.",
            status.HTTP_400_BAD_REQUEST: "Invalid update.",
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'User not found.'
        }
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
class UserProfileView(RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [CanViewProfile]

    def get_queryset(self):
        return User.objects.all()

    def get_object(self):
        # Retrieve the ID from the URL.
        obj = get_object_or_404(User, id=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj
    
    @swagger_auto_schema(
        operation_description="Get a user's profile, when the obj user is a shelter. And when the obj user is a seeker, it only works when the obj user have an active application with the request user or the obj user is request user him or herself",
        responses={
            status.HTTP_200_OK: UserProfileSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'User not found'
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class UserDeleteView(DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self):
        obj = get_object_or_404(User, id=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj


class ShelterListView(generics.ListAPIView):
    queryset = User.objects.filter(user_type=User.SHELTER)
    serializer_class = ShelterProfileSerializer


class ShelterProfileView(RetrieveAPIView):
    serializer_class = ShelterProfileSerializer

    def get_queryset(self):
        return User.objects.filter(user_type=User.SHELTER)
