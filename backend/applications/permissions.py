from rest_framework import permissions

from applications.models import Application


class IsSeeker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_pet_seeker

class CanViewApplication(permissions.BasePermission):
    def has_permission(self, request, view):
        pk = view.kwargs.get('pk')
        application = Application.objects.get(pk=pk)

        if request.user.is_shelter:
            return application.to_user.id == request.user.id
        else:
            return application.from_user.id == request.user.id


