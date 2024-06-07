from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from machinedataapp.views import UserRolesModulesAndSubModulesAPIView

def add_roles_modules_permissions(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        # Fetch roles, modules, sub-modules, and permissions for the logged-in user
        user_roles_modules = UserRolesModulesAndSubModulesAPIView()
        user_roles_modules.request = request
        user_roles_modules_format = user_roles_modules.get(request).data

        # Call the original view function
        response = view_func(request, *args, **kwargs)

        # Merge the user data with the roles, modules, sub-modules, and permissions data
        if response.status_code == status.HTTP_200_OK and 'result' in response.data:
            for user_data in response.data['result']:
                user_data['roles'] = [role for role in user_roles_modules_format if role['role_name'] in user_data['roles']]
        
        return response
    return wrapper
