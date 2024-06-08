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

from rest_framework.exceptions import PermissionDenied

class CustomPermissionRequired(permissions.BasePermission):
    # message = "You have only view permission and you do not have permission to perform this action."
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            # Allow all requests if the user's role is 2
            if request.user.role == '2':
                return True
            
            # Otherwise, check for custom permissions
            required_permissions = self.get_required_permissions(view, request.method)
            user_permissions = request.user.permissions.values_list('codename', flat=True)
            
            # Check if user has any of the required permissions
            if set(required_permissions).intersection(set(user_permissions)):
                return True
            else:
                # Construct custom error message
                missing_permissions = list(set(required_permissions) - set(user_permissions))
                message = f'You do not have permission to perform this action. Missing permissions: {missing_permissions}'
                raise PermissionDenied(detail=message)

    def get_required_permissions(self, view, method):
        # Define this function to return a list of required permissions for each action
        if method in ['GET', 'OPTIONS', 'HEAD']:
            return ['view_permission']
        elif method == 'POST':
            return ['add_permission']
        elif method in ['PUT', 'PATCH']:
            return ['change_permission']
        elif method == 'DELETE':
            return ['delete_permission']
        return []
    
    