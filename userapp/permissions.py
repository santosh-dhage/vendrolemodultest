from rest_framework import permissions

class userWriteOnly(permissions.BasePermission):
    """
    The request is authenticated as a user, or is a write-only request.
    """

    def has_permission(self, request, view):
        WRITE_METHODS = ["POST",'PUT' ]

        return (
            request.method in WRITE_METHODS or
            request.user
        )

from rest_framework import permissions

from machinedataapp.models import CustomPermission

class CustomPermissionRequired(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the necessary custom permissions
        if request.user.is_authenticated:
            user_permissions = request.user.custom_permissions.all()
            required_permission_codenames = CustomPermission.objects.values_list('codename', flat=True)
            return any(perm in required_permission_codenames for perm in user_permissions)
        return False







