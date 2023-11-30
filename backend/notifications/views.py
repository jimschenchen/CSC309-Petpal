from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination

from .models import Notification
from .serializers import NotificationSerializer, NotificationRetrieveSerializer
from .permissions import IsOwner


class NotificationList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size_query_param = 'page_size'

    is_read_query_param = 'is_read'
    creation_time_query_param = 'creation_time'

    @swagger_auto_schema(
        operation_description="Get a list of Notifications",
        manual_parameters=[
            openapi.Parameter('is_read', openapi.IN_QUERY,
                              description="Filter by is_read", type=openapi.TYPE_BOOLEAN),
            openapi.Parameter('creation_time', openapi.IN_QUERY,
                              description="Sorted by creation_time with choices ('asc', 'dec')",
                              type=openapi.TYPE_STRING),
        ],
        responses={
            status.HTTP_200_OK: NotificationSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        is_read = self.request.query_params.get(self.is_read_query_param)
        creation_time = self.request.query_params.get(self.creation_time_query_param)

        queryset = Notification.objects.filter(user=self.request.user)

        if is_read == '0':
            queryset = queryset.filter(user=self.request.user, is_read=False)
        elif is_read == '1':
            queryset = queryset.filter(user=self.request.user, is_read=True)

        if creation_time == 'asc':
            queryset = queryset.order_by('creation_time')
        else:
            queryset = queryset.order_by('-creation_time')

        return queryset


class NotificationRetrieveDelete(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwner]
    serializer_class = NotificationRetrieveSerializer

    @swagger_auto_schema(
        operation_description="Retrieve the notification with the given id. The notification is marked 'read' when it is retrieved for the first time",
        responses={
            status.HTTP_200_OK: NotificationRetrieveSerializer(many=False),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'Object Not Found'
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return Notification.objects.all()

    def get_object(self):
        obj = get_object_or_404(Notification, id=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        if not obj.is_read:
            obj.is_read = True
            obj.save()
        return obj
