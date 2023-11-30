from django.shortcuts import get_object_or_404
from rest_framework import permissions

from applications.models import Application
from accounts.models import User


class IsRelatedUser(permissions.BasePermission):
    message = 'You do not have permission to view this comment'

    def has_object_permission(self, request, view, obj):
        if isinstance(obj.content_object, User):
            return True
        elif isinstance(obj.content_object, Application):
            return request.user == Application.from_user or request.user == Application.to_user


class IsApplicationRelatedUser(permissions.BasePermission):
    message = 'You do not have permission to view and comment on this application'

    def has_permission(self, request, view):
        application_id = view.kwargs.get('application_id')
        application = get_object_or_404(Application, pk=application_id)
        user = request.user
        return application.from_user == user or application.to_user == user
