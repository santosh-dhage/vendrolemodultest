from functools import wraps
from django.http import HttpResponseForbidden
from .permissions import CustomPermissionRequired

def permissions_required(*permissions):
    """
    Decorator to check if the user has the required permissions.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if not CustomPermissionRequired().has_permission(request, None):
                return HttpResponseForbidden("You do not have permission to access this resource.")
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator