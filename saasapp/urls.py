from django.contrib import admin
from django.urls import path,include
from saasapp import views
from rest_framework.routers import DefaultRouter
from .views import ContactUsViewSet
router = DefaultRouter()

router.register('contactus',views.ContactUsViewSet,basename='contactus')
router.register('complaint',views.ComplaintViewSet,basename='complaint')
router.register('toolfeedback',views.ToolFeedbackViewSet,basename='toolfeedback')
router.register('clientfeedback',views.ClientFeedbackViewSet,basename='clientfeedback')
router.register('module',views.ModuleViewSet,basename='module')
router.register('ModuleMapping',views.ModuleMappingViewSet,basename='ModuleMapping')

urlpatterns = [
    # Secure media files URl's
    path('registration/',views.registration ,name='registraion'),
    path('api/is-valid-domain/', views.is_valid_domain, name='is-valid-domain'),
    path('saasapp/', include(router.urls)),

    #feedback
    path('api/get_feedback_tenant_wise/', views.get_feedback_tenant_wise, name='get_feedback_tenant_wise'),
    path('api/get_tool_feedback_tenant_wise/', views.get_tool_feedback_tenant_wise, name='get_tool_feedback_tenant_wise'),


    ### saas tenanat data
    path('api/get_data_register_tenant_wise/', views.get_data_register_tenant_wise, name='get_data_register_tenant_wise'),
    path('get_data/', views.get_data, name='get_data'),
    path('update_data/', views.update_data),
    path('get_tenant_all/', views.get_tenant_all, name='get_tenant_all'),
    path('get_module_all/', views.get_module_all, name='get_module_all'),
    path('get_module_mapping_wise/', views.get_module_mapping_wise, name='get_module_mapping_wise'),
    path('get_tenant_module_wise/', views.get_tenant_module_wise, name='get_tenant_module_wise'),
    path('get_organization_data_only/', views.get_organization_data_only, name='get_organization_data_only'),


    #superadadmin code module restric
    path('post_create_module_mapping_tenant_wise/', views.post_create_module_mapping_tenant_wise, name='post_create_module_mapping_tenant_wise'),
    path('update_module_mapping/<int:pk>/', views.update_module_mapping, name='update_module_mapping'),
    # path('partial_update_module_mapping/', views.partial_update_module_mapping, name='partial_update_module_mapping'),
]
