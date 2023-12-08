from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from notifications.models import create_notification
from pets.models import Pet
from .models import Application
from .permissions import IsSeeker, CanViewApplication
from .serializers import ApplicationSerializer


# Create your views here.


class ApplicationsView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsSeeker()]
        else:
            return [IsAuthenticated()]

    # example of swagger documentation
    @swagger_auto_schema(
        operation_description="Retrieve a list of applications that the current user has made or received. Shelters and seekers can only view their own applications. \
            Applications could be filtered by status or be sorted by creation time and last update time. Pagination support.",
        manual_parameters=[
            openapi.Parameter('status', openapi.IN_QUERY, description="Filter by status", type=openapi.TYPE_STRING),
            openapi.Parameter('sort_by', openapi.IN_QUERY, description="Sort by 'created_time', '-created_time', 'last_updated_time' or '-last_updated_time'", type=openapi.TYPE_STRING),
            openapi.Parameter('page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER),
            openapi.Parameter('page_size', openapi.IN_QUERY, description="Page Size", type=openapi.TYPE_INTEGER, default=10),
        ],
        responses={
            status.HTTP_200_OK: ApplicationSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized'
        }
    )
    def get(self, request, format=None):
        user = request.user

        # Filter by the current user and optional status
        input_status = request.query_params.get('status')
        # Pet shelter and pet seeker both can see their own applications
        if user.is_shelter:
            if input_status:
                applications = Application.objects.filter(to_user=user, status__iexact=input_status)
            else:
                applications = Application.objects.filter(to_user=user)
        else:
            if input_status:
                applications = Application.objects.filter(from_user=user, status__iexact=input_status)
            else:
                applications = Application.objects.filter(from_user=user)

        # Sorting
        sort_by = request.query_params.get('sort_by', 'last_updated_time') # default sorting by 'last_updated_time'
        if sort_by == '':
            sort_by = 'last_updated_time'
        if sort_by not in ['created_time', 'last_updated_time', '-created_time', '-last_updated_time']:
            return Response({"error": "Invalid sorting parameter."}, status=status.HTTP_400_BAD_REQUEST)
        applications = applications.order_by(sort_by)

        # Pagination
        paginator = PageNumberPagination()
        paginator.page_size = request.query_params.get('page_size', 10)  # set the number of items per page
        # parameter page: 1-x
        result_page = paginator.paginate_queryset(applications, request)
        serializer = ApplicationSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)


    @swagger_auto_schema(
        operation_description="When a pet seeker submits an application for a pet listing that is marked as 'available', the system will automatically generate a notification. \
            Only Seeker can create an application. Seeker can only create one application for each pet.",
        request_body=ApplicationSerializer,
        responses={
            status.HTTP_201_CREATED: ApplicationSerializer,
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'Pet not found'
        }
    )
    def post(self, request, format=None):
        pet_id = request.data.get('pet')

        try:
            pet = Pet.objects.get(id=pet_id)
            if pet.status != 'available':
                return Response({"error": "Pet is not available for application."},
                                status=status.HTTP_400_BAD_REQUEST)

            if Application.objects.filter(from_user=request.user, pet=pet).exists():
                return Response({"error": "You have already applied for this pet."},
                                status=status.HTTP_400_BAD_REQUEST)

            serializer = ApplicationSerializer(data=request.data)

            if serializer.is_valid():
                application = serializer.save(from_user=request.user, to_user=pet.shelter)

                # create notification "application created"
                create_notification(application.to_user, application, 'C')

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Pet.DoesNotExist:
            return Response({"error": "Pet not found."}, status=status.HTTP_404_NOT_FOUND)


class ApplicationView(APIView):
    # permission_classes = [IsAuthenticated]
    def get_permissions(self):
        print(self.request.method)
        if self.request.method == 'GET':
            return [IsAuthenticated(), CanViewApplication()]
        else:
            return [IsAuthenticated()]

    @swagger_auto_schema(
        operation_description="Update the status of an application. Shelter can only update the status of an application from pending to accepted or \
            denied. Pet seeker can only update the status of an application from pending or accepted to withdrawn. After a application being updated, the system will automatically generate a notification. ",
        request_body=ApplicationSerializer,
        responses={
            status.HTTP_200_OK: "Application status updated.",
            status.HTTP_400_BAD_REQUEST: "Invalid status update.",
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'Application not found.'
        }
    )
    def put(self, request, pk, format=None):
        try:
            application = Application.objects.get(pk=pk)
        except Application.DoesNotExist:
            return Response({'error': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        new_status = request.data.get('status')

        if request.data.get('additional_information') != application.additional_information or \
            int(request.data.get('from_user')) != application.from_user.id or \
            int(request.data.get('to_user')) != application.to_user.id or \
            request.data.get('name') != application.name or \
            request.data.get('email') != application.email or \
            int(request.data.get('pet')) != application.pet.id:
                return Response({"error": "Illegal field updated."}, status=status.HTTP_400_BAD_REQUEST)

        # Shelter updating from pending to accepted or denied
        if user == application.to_user and application.status == Application.PENDING:
            if new_status in [Application.ACCEPTED, Application.DENIED]:
                application.status = new_status
                application.save()

                # create notification on application update
                create_notification(application.from_user, application, 'U')

                return Response({"message": "Application status updated."}, status=status.HTTP_200_OK)

        # Pet seeker updating from pending or accepted to withdrawn
        elif user == application.from_user and application.status in [Application.PENDING, Application.ACCEPTED]:
            if new_status == Application.WITHDRAWN:
                application.status = new_status
                application.save()

                # create notification on application update
                create_notification(application.to_user, application, 'U')

                return Response({"message": "Application status updated."}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid status update."}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Retrieve the details of a specific application.",
        responses={
            status.HTTP_200_OK: ApplicationSerializer,
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'Application not found.'
        }
    )
    def get(self, request, pk, format=None):
        try:
            application = Application.objects.get(pk=pk)
            serializer = ApplicationSerializer(application)
            return Response(serializer.data)
        except Application.DoesNotExist:
            return Response({'error': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)
