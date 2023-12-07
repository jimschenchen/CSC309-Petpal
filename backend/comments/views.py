from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, serializers, status
from rest_framework.generics import RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from datetime import datetime

from accounts.models import User
from applications.models import Application
from comments.models import Comment
from notifications.models import create_notification
from .permissions import IsRelatedUser, IsApplicationRelatedUser
from .serializers import CommentSerializer


class ShelterCommentListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    pagination_class.page_size_query_param = 'page_size'

    @swagger_auto_schema(
        operation_description="Get a list of comments under shelter. Create comments using POST request",
        responses={
            status.HTTP_200_OK: CommentSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'shelter not found'
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create comments under shelter, then the system will automatically generate a "
                              "notification.",
        responses={
            status.HTTP_200_OK: CommentSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'application not found'
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def get_queryset(self):
        shelter_id = self.kwargs.get('shelter_id')
        shelter = get_object_or_404(User, pk=shelter_id, user_type=User.SHELTER)
        return Comment.objects.filter(content_type__model='user', object_id=shelter.id).order_by('-creation_time')

    def perform_create(self, serializer):
        sender = self.request.user

        shelter_id = self.kwargs.get('shelter_id')
        shelter = get_object_or_404(User, pk=shelter_id, user_type=User.SHELTER)

        message = serializer.validated_data.get('message')

        comment = Comment(sender=sender, content_object=shelter, message=message)
        comment.save()

        # create notification for shelter
        create_notification(shelter, comment, 'C')


class ApplicationCommentListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsApplicationRelatedUser]
    pagination_class = PageNumberPagination
    pagination_class.page_size_query_param = 'page_size'

    @swagger_auto_schema(
        operation_description="Get a list of comments under application.",
        responses={
            status.HTTP_200_OK: CommentSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'application not found'
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create comments under application, then the system will automatically generate a "
                              "notification.",
        responses={
            status.HTTP_200_OK: CommentSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'application not found'
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def get_queryset(self):
        application_id = self.kwargs['application_id']
        application = get_object_or_404(Application, pk=application_id)

        # Ensure only related users can view the comments
        if self.request.user != application.from_user and self.request.user != application.to_user:
            raise serializers.ValidationError("You do not have permission to view these comments.")

        return Comment.objects.filter(content_type__model='application',
                                      object_id=application.id).order_by('-creation_time')

    def perform_create(self, serializer):
        application_id = self.kwargs['application_id']
        application = get_object_or_404(Application, pk=application_id)

        sender = self.request.user

        message = serializer.validated_data.get('message')
        comment = serializer.save(sender=sender, content_object=application, message=message)

        # create notification for shelter
        if self.request.user == application.from_user:
            create_notification(application.to_user, comment, 'C')
        else:
            create_notification(application.from_user, comment, 'C')

        # update application modified time
        application.last_updated_time = datetime.now()
        application.save()


class SpecificCommentView(RetrieveAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsRelatedUser]

    @swagger_auto_schema(
        operation_description="Get a specific comment with the given id.",
        responses={
            status.HTTP_200_OK: CommentSerializer(many=True),
            status.HTTP_400_BAD_REQUEST: 'Bad Request',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_404_NOT_FOUND: 'comment not found'
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return Comment.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        comment = get_object_or_404(queryset, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, comment)
        return comment
