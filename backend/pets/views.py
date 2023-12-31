from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, filters
from rest_framework import permissions
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Pet
from .serializers import PetSerializer

from accounts.models import User


class IsShelterOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow shelters to create, update or delete.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_shelter


class PetListCreateView(generics.ListCreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsShelterOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['shelter', 'status', 'breed', 'age', 'gender', 'name', 'size']
    ordering_fields = ['name', 'age', 'size', 'last_updated_time']
    pagination_class = PageNumberPagination
    pagination_class.page_size_query_param = 'page_size'

    def get_queryset(self):
        queryset = super().get_queryset()

        if 'ordering' not in self.request.query_params:
            # Apply default ordering
            queryset = queryset.order_by('last_updated_time')
        return queryset

    def perform_create(self, serializer):
        serializer.save(shelter=self.request.user)

    @swagger_auto_schema(
        operation_description="Get a list of pets which status are AVAILABLE.",
        responses={
            status.HTTP_200_OK: PetSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
        }
    )
    def get(self, request, *args, **kwargs):
        if request.query_params.get('status', "") == "":
            request.query_params._mutable = True
            request.query_params["status"] = Pet.AVAILABLE
        if request.query_params.get('status', "") == "all":
            request.query_params._mutable = True
            request.query_params["status"] = ""
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a pet using name, breed, color, size, age, gender as required parameters and "
                              "description, medical history, behavior as optional parameters.",
        responses={
            status.HTTP_200_OK: PetSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class PetUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsShelterOrReadOnly]

    @swagger_auto_schema(
        operation_description="Get profile of the pet showing the pet's name, breed, color, size, age, gender, "
                              "description, medical history, and behavior information.",
        responses={
            status.HTTP_200_OK: PetSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="PUT: Update the details of a specific pet.",
        responses={
            status.HTTP_200_OK: PetSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_403_FORBIDDEN: 'Forbidden',
            status.HTTP_404_NOT_FOUND: 'Pet not found'
        }
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="FATCH: Update the details of a specific pet.",
        responses={
            status.HTTP_200_OK: PetSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_403_FORBIDDEN: 'Forbidden',
            status.HTTP_404_NOT_FOUND: 'Pet not found'
        }
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    def perform_update(self, serializer):
        pet = self.get_object()
        if pet.shelter != self.request.user:
            raise PermissionDenied("You do not have permission to update this pet.")
        serializer.save(shelter=pet.shelter)  # Ensure shelter field is not changed

    def perform_destroy(self, instance):
        if instance.shelter != self.request.user:
            raise PermissionDenied("You do not have permission to delete this pet.")
        # ... delete related applications and comments ...
        super().perform_destroy(instance)


class PetMetaGetView(APIView):
    def get(self, request, format=None):
        breed = Pet.objects.values_list('breed', flat=True).distinct()
        breed_list = list(breed)
        gender_list = ["male", "female", "other"]
        size_list = ["small", "medium", "large"]
        age = Pet.objects.values_list('age', flat=True).distinct()
        age_list = list(age)
        status_list = ['available', 'pending', 'adopted', 'withdrawn', 'all']
        shelter = User.objects.filter(user_type=User.SHELTER).values_list('name', 'id').distinct()
        shelter_list = list(shelter)

        return Response({'breed': breed_list, 'gender': gender_list, 'size': size_list, 'age': age_list, 'status': status_list, 'shelter': shelter_list})