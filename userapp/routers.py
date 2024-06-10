# routers.py
from rest_framework.routers import DefaultRouter
from .views import EmptyRootView

class CustomRouter(DefaultRouter):
    def get_api_root_view(self, api_urls=None):
        return EmptyRootView.as_view()