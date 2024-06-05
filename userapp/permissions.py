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

