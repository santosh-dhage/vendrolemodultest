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

# class CustomPermissionRequired(permissions.BasePermission):
#     def has_permission(self, request, view):
#         # Check if the user has the necessary custom permissions
#         if request.user.is_authenticated:
#             user_permissions = request.user.custom_permissions.all()
#             required_permission_codenames = CustomPermission.objects.values_list('codename', flat=True)
#             return any(perm in required_permission_codenames for perm in user_permissions)
#         return False




class CustomPermissionRequired(permissions.BasePermission):
    # def has_permission(self, request, view):
    #     if request.user.is_authenticated:
    #         print(request.user, 'check permission')
    #         # Get all custom permissions
    #         custom_permissions = CustomPermission.objects.all()
    #         # Check if the user has any custom permissions associated with role 2
    #         has_permission = any(
    #             perm.id in request.user.custom_permissions.values_list('id', flat=True) and perm.role == '2'
    #             for perm in custom_permissions
    #         )
    #         # Return True if the user doesn't have any such permission
    #         return not has_permission
    #     return False
    
    def has_permission(self, request, view):
        # def has_permission(self, request, view):
            # Check if the user has the necessary custom permissions
        if request.user.is_authenticated:
            print(request.user.role,'give me ')
            # Allow all requests if the user's role is 2
            if request.user.role == '2':
                return True
            # Otherwise, check for custom permissions
            else:
                user_permissions = request.user.permissions.all() if request.user.permissions else None
                required_permission_codenames = CustomPermission.objects.values_list('codename', flat=True)
                return any(perm.codename in required_permission_codenames for perm in user_permissions)
        return False
        # if request.user.is_authenticated:
        #     print(request.user, 'check permission')
        #     # Get the permissions associated with the logged-in user
        #     user_permissions = request.user.permissions.all()
        #     # Print the permissions
        #     print("Permissions assigned to the logged-in user:")
        #     for permission in user_permissions:
        #         print(f"- {permission} check it per mission")
        #     # Your permission logic goes here
        #     # For example, check if the user has the necessary permission
        #     # ...
        #     return True  # Assuming you want to allow access for now
        # return False
