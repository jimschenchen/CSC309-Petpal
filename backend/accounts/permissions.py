from rest_framework import permissions
from applications.models import Application


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD, or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the profile.
        return obj.id == request.user.id


class CanViewProfile(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Any user can view a shelter's profile
        if obj.is_shelter:
            return True

        # Shelters can view a seeker's profile only if there's an active application
        if request.user.is_shelter:
            return Application.objects.filter(
                to_user=request.user.id, 
                from_user=obj.id,
                status= Application.PENDING
            ).exists()
        # Seekers can only seeker's profile which is their own
        if obj.id == request.user.id:
            return True
        return False


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return IsOwnerOrReadOnly().has_permission(request, view) or \
               permissions.IsAdminUser().has_permission(request, view)