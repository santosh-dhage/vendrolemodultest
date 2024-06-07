from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from machinedataapp.views import UserRolesModulesAndSubModulesAPIView

# def add_roles_modules_permissions(view_func):
#     @wraps(view_func)
#     def wrapper(request, *args, **kwargs):
#         # Fetch roles, modules, sub-modules, and permissions for the logged-in user
#         user_roles_modules = UserRolesModulesAndSubModulesAPIView()
#         user_roles_modules.request = request
#         user_roles_modules_format = user_roles_modules.get(request).data

#         # Call the original view function
#         response = view_func(request, *args, **kwargs)

#         # Merge the user data with the roles, modules, sub-modules, and permissions data
#         if response.status_code == status.HTTP_200_OK and 'result' in response.data:
#             for user_data in response.data['result']:
#                 user_data['roles'] = [role for role in user_roles_modules_format if role['role_name'] in user_data['roles']]
        
#         return response
#     return wrapper
from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
# from .views import UserRolesModulesAndSubModulesAPIView
import logging
logger = logging.getLogger(__name__)

def add_roles_modules_permissions(view_func):
    @wraps(view_func)
    def wrapper(view, request, *args, **kwargs):
        try:
            # Create an instance of the UserRolesModulesAndSubModulesAPIView and call its get method
            user_roles_modules_view = UserRolesModulesAndSubModulesAPIView()
            user_roles_modules_response = user_roles_modules_view.list(request).data

            response = view_func(view, request, *args, **kwargs)

            if response.status_code == status.HTTP_200_OK and 'result' in response.data:
                for user_data in response.data['result']:
                    user_data['roles'] = [role for role in user_roles_modules_response if role['role_name'] in user_data.get('roles', [])]

            return response
        except Exception as e:
            logger.error(f"Error in add_roles_modules_permissions: {str(e)}")
            return Response({'success': 0, 'message': 'An error occurred', 'result': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return wrapper
def view_roles_modules_permissions(view_func):
    @wraps(view_func)
    def wrapper(view, request, *args, **kwargs):
        try:
            response = view_func(view, request, *args, **kwargs)
            # Custom logic for view permissions
            return response
        except Exception as e:
            logger.error(f"Error in view_roles_modules_permissions: {str(e)}")
            return Response({'success': 0, 'message': 'An error occurred', 'result': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return wrapper
def update_roles_modules_permissions(view_func):
    @wraps(view_func)
    def wrapper(view, request, *args, **kwargs):
        try:
            response = view_func(view, request, *args, **kwargs)
            # Custom logic for update permissions
            return response
        except Exception as e:
            logger.error(f"Error in update_roles_modules_permissions: {str(e)}")
            return Response({'success': 0, 'message': 'An error occurred', 'result': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return wrapper