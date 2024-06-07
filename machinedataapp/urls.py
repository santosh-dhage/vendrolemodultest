from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import *
from machinedataapp import views
router = DefaultRouter()
router.register(r'qrcode', QrCodeViewSet, basename='qrcode')
router.register(r'machine-masters', MachineMasterViewSet, basename='machine-master')
router.register(r'machine-user-mapping', MachineUserMappingViewSet, basename='machine-user-mapping')
router.register(r'product', ProductViewSet, basename='product')
router.register(r'modelcapacity', ModelCapacityViewSet, basename='modelcapacity')
router.register(r'colorstore', ColorStoreViewSet, basename='colorstore')
router.register(r'bulkuploadmachinemaster', BulkUploadMachineMasterViewSet, basename='bulkuploadmachinemaster')
# router.register(r'ticket', TicketViewSet, basename='ticket')
router.register(r'roles', RoleViewSet)
router.register(r'modules', ModuleViewSet)
router.register(r'sub-modules', SubModuleViewSet)
router.register(r'role-modules', RoleModuleAssignmentViewSet)


urlpatterns = [
    path('', include(router.urls)),

    path('api/get_created_machine_count/', views.get_created_machine_count, name='get_created_machine_count'),
    
    path('api/machine_user_mapping_by_user/', views.get_machine_user_map_by_user, name='machine-user-mapping-by-user'),
    path('api/machine_user_mapping_by_customer/', views.get_machine_user_map_by_customer, name='machine-user-mapping-by-customer'),
    path('api/get_machine_and_qrcode/', views.get_machine_and_qrcode, name='get_machine_and_qrcode'),
    path('api/get_machine_and_qrcode_for_customer/', views.get_machine_and_qrcode_for_customer, name='get_machine_and_qrcode_for_customer'),
    path('api/get_machine_and_qrcode_for_user/', views.get_machine_and_qrcode_for_user, name='get_machine_and_qrcode_for_user'),
    path('api/get_unused_qrcode/', views.get_unused_qrcode, name='get_unused_qrcode'),
    path('api/get_unused_machine_map/', views.get_unused_machine_map, name='get_unused_machine_map'),
    path('api/get_unused_machine_map_for_customer/', views.get_unused_machine_map_for_customer, name='get_unused_machine_map_for_customer'),
    path('api/machine_user_mapping_by_admin_user/', views.get_machine_and_email_map_user, name='get_machine_and_email_map'),
    path('api/get_machine_and_map_user_all/', views.get_machine_and_map_user_all, name='get_machine_and_map_user_all'),
    path('api/machine_user_mapping_by_admin_customer/', views.get_machine_and_email_map_customer, name='get_machine_and_email_map'),
    path('api/get_machine_and_mapping/', views.get_machine_and_map, name='get_machine_and_mapping'),
    path('api/get_machine_mapping_by_customer_id/<int:machine_id>/', views.get_machine_mapping_by_customer_id, name='get_machine_mapping_by_customer_id'),
    path('api/get_machine_mapping_by_user_id/<int:machine_id>/', views.get_machine_mapping_by_user_id, name='get_machine_mapping_by_user_id'),
    path('api/get_machine_based_on_role/', views.get_machine_based_on_role, name='get_machine_based_on_role'),
    path('api/get_generate_report_for_all_record/', views.get_generate_report_for_all_record, name='get_generate_report_for_all_record'),
    
    
    #dashboard
    path('api/stats/', stats_api, name='stats-api'),
    path('api/machine_mapping_percentage/', machine_mapping_percentage, name='machine-mapping-percentage'),
    path('api/percentage_of_machines_with_qr/', percentage_of_machines_with_qr, name='percentage_of_machines_with_qr'),


    path('users_and_customers_created_in_month/<int:year>/<int:month>/', users_and_customers_created_in_month, name='users_and_customers_created_in_month'),
    path('users_and_customers_created_in_month/', users_and_customers_created_in_month, name='users_and_customers_created_in_month'),
    path('month_wise_percentage/', month_wise_percentage, name='month_wise_percentage'),


    #new 

    path('api/get_assigned_machine_by_user/', views.get_assigned_machine_by_user),
    path('api/get_mstatus_for_assigned_user/', views.get_mstatus_for_assigned_user),
    path('api/get_mstatus_for_assigned_customer/', views.get_mstatus_for_assigned_customer),
    #report
    path('api/read_machine_user_mapping_report_excel/', read_machine_user_mapping_report_excel, name='read_machine_user_mapping_report_excel'),
    path('api/read_machine_customer_mapping_report_excel/', read_machine_customer_mapping_report_excel, name='read_machine_customer_mapping_report_excel'),
    path('api/machine_customer_mapping_report_excel/', machine_customer_mapping_report_excel, name='machine_customer_mapping_report_excel'),
    path('api/machine_user_mapping_report_excel/', machine_user_mapping_report_excel, name='machine_user_mapping_report_excel'),
    path('api/read_machine_user_mapping_report_pdf/', read_machine_user_mapping_report_pdf, name='read_machine_user_mapping_report_pdf'),
    path('api/get_generate_report_for_customer_record/', get_generate_report_for_customer_record, name='get_generate_report_for_customer_record'),
    path('api/get_generate_report_for_user_record/', get_generate_report_for_user_record, name='get_generate_report_for_user_record'),
    

    #report
    path('reports/yesterday/', generate_yesterday_report, name='yesterday_report'),
    path('reports/today/', generate_today_report, name='today_report'),
    path('reports/weekly/', generate_weekly_report, name='weekly_report'),
    path('reports/monthly/', generate_monthly_report, name='monthly_report'),
    path('reports/three_months/', generate_three_months_report, name='three_months_report'),    

            
            
    # admin_customer_dashboard

    path('get_admin_customer_dashboard/', get_admin_customer_dashboard, name='get_admin_customer_dashboard'),    
    path('get_customer_user_machine_mapping_percentage/', get_customer_user_machine_mapping_percentage, name='get_customer_user_machine_mapping_percentage'),    
    path('get_customer_user_percentage_of_machines_with_qr/', get_customer_user_percentage_of_machines_with_qr, name='get_customer_user_percentage_of_machines_with_qr'),    
    path('get_customer_role_dashboard_qr_coin/', get_customer_role_dashboard_qr_coin, name='get_customer_role_dashboard_qr_coin'),    
    path('get_customer_users_created_in_month/', get_customer_users_created_in_month, name='get_customer_users_created_in_month'),    
    
    # admin_customer_dashboard user
    path('get_admin_user_dashboard/', get_admin_user_dashboard, name='get_admin_user_dashboard'),    
    path('get_cutomer_user_dashboard_machine_mapping_percentage/', get_cutomer_user_dashboard_machine_mapping_percentage, name='get_cutomer_user_dashboard_machine_mapping_percentage'),    
    path('get_customer_user_dashboard_percentage_of_machines_with_qr/', get_customer_user_dashboard_percentage_of_machines_with_qr, name='get_customer_user_dashboard_percentage_of_machines_with_qr'),    
    path('get_customer_user_dashboard_role_dashboard_qr_coin/', get_customer_user_dashboard_role_dashboard_qr_coin, name='get_customer_user_dashboard_role_dashboard_qr_coin'),    

    #logo upload
    path('site_settings_api_for_logo/', views.site_settings_api_for_logo, name='site_settings_api_for_logo'),    
    path('tenant_upload_logo/', views.tenant_upload_logo, name='tenant_upload_logo'),    
    # path('update_color/', views.update_color, name='update_color'),    


    #customer role dashboard user 
    path('post_customer_role_user_for_mapping_report_excel/', views.post_customer_role_user_for_mapping_report_excel, name='post_customer_role_user_for_mapping_report_excel'),    
    path('customer_role_user_report_excel_download/', views.customer_role_user_report_excel_download, name='customer_role_user_report_excel_download'),    
    
    
    
    
    path('post_customer_role_user_payment_report_excel/', views.post_customer_role_user_payment_report_excel, name='post_customer_role_user_payment_report_excel'),    
    path('customer_role_payment_report_excel_download/', views.customer_role_payment_report_excel_download, name='customer_role_payment_report_excel_download'),    
    path('customer_refill_machine_report_download/', views.customer_refill_machine_report_download, name='customer_refill_machine_report_download'),    
    path('customer_refill_machine/', views.customer_refill_machine, name='customer_refill_machine'),    

    path('get_product_list/', views.get_product_list, name='get_product_list'),    
    path('get_product_model/', views.get_product_model, name='get_product_model'),    
    path('get_modelcapacity/', views.get_modelcapacity, name='get_modelcapacity'),
    path('get_machine_details_view/<int:id>/', views.get_machine_details_view, name='get_machine_details_view'),


##########
    # login tenant show module 
    path('tenant_list/', views.tenant_list, name='tenant_list'),
    # path('tenant_detail/', views.tenant_detail, name='tenant_detail'),
    # path('module_permissions/', views.module_permissions, name='module_permissions'),


    #########
    path('get_machine_count_for_customer/', views.get_machine_count_for_customer, name='get_machine_count_for_customer'),
    path('get_machine_count_for_user/', views.get_machine_count_for_user, name='get_machine_count_for_user'),
    

    # #report as per tenant logo
    
    path('admin_download_excel_user/', views.admin_download_excel_user, name='admin_download_excel_user'),
    path('admin_download_excel_customer/', views.admin_download_excel_customer, name='admin_download_excel_customer'),
    path('admin_download_excel_refill/<str:machine_id>/', views.admin_download_excel_refill, name='admin_download_excel_refill'),
    path('admin_download_pdf_refill/', views.admin_download_pdf_refill, name='admin_download_pdf_refill'),
    path('download_pdf_customer/', views.download_pdf_customer, name='download_pdf_customer'),
    path('download_pdf_user/', views.download_pdf_user, name='download_pdf_user'),

    path('assigned_customer_machine_count/', views.assigned_customer_machine_count, name='assigned_customer_machine_count'),
    path('get_customer_machine_report_detail_by_id/<str:customer_name>/', views.get_customer_machine_report_detail_by_id, name='get_customer_machine_report_detail_by_id'),
    path('get_customer_machine_report_detail_by_name/<str:customer_name>/', views.get_customer_machine_report_detail_by_name, name='get_customer_machine_report_detail_by_name'),

    # user login refill report
    path('get_stock_by_machine_user_role_refill_excel_download/', views.get_stock_by_machine_user_role_refill_excel_download, name='get_stock_by_machine_user_role_refill_excel_download'),
    path('user_machine_mapping_report_refill/', views.user_machine_mapping_report_refill, name='user_machine_mapping_report_refill'),
    path('user_payment_report_excel_download/', views.user_payment_report_excel_download, name='user_payment_report_excel_download'),
    path('user_payment_report/', views.user_payment_report, name='user_payment_report'),


    # ticket create
    path('create_ticket/', views.create_ticket, name='create_ticket'),
    path('ticket_list/', views.ticket_list, name='ticket_list'),
    path('update_ticket/<int:pk>/', views.update_ticket, name='update_ticket'),
    path('user_machine_mapped/', views.user_machine_mapped, name='user_machine_mapped'),
    path('get_ticket_list_customer/', views.get_ticket_list_customer, name='get_ticket_list_customer'),
    

    #roles 
    # path('upload-excel/', ExcelFileUploadView.as_view(), name='upload-excel'),
    # path('role-modules/<int:role_id>/', get_modules_for_role, name='get-modules-for-role'),
    path('rolewithmodulesorsubmodules/',  RoleWithModulesOrSubModulesAPIView.as_view()),
    path('assignpermissions/',  AssignRoleToUserAPIView.as_view()),
    path('users/module/',  UserRolesModulesAndSubModulesAPIView.as_view()),


]

# class RoleWithModulesOrSubModulesAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         # Check if the logged-in user has the admin role
#         user_profile=request.user
#         if not user_profile.role == '2':
#         #     User.objects.get(role=)
#         # if not request.user(name='Admin').exists():
#             return Response({'error': 'You do not have permission to assign permissions.'}, status=status.HTTP_403_FORBIDDEN)

#         data = request.data
        
#         role_name = data.get('rolename')
#         modules = data.get('modules')

#         # Ensure that role_name is provided
#         if not role_name:
#             return Response({'error': 'Role name is required'}, status=status.HTTP_400_BAD_REQUEST)

#         # user = get_object_or_404(User, id=user_id)
#         role, created = Group.objects.get_or_create(name=role_name)
#         user.groups.add(role)
#         # role, created = Role.objects.get_or_create(name=role_name)
        

#         for module_data in modules:
#             module_name = module_data.get('name')
#             submodules_data = module_data.get('submodules')

#             module, created = Module.objects.get_or_create(name=module_name)

#             for submodule_data in submodules_data:
#                 submodule_name = submodule_data.get('name')
#                 permissions_data = submodule_data.get('permissions')

#                 submodule, created = SubModule.objects.get_or_create(name=submodule_name, module=module)

#                 for permission_data in permissions_data:
#                     permission_name = permission_data.get('name')
#                     codename = permission_data.get('codename')

#                     # Create or get the custom permission
#                     custom_permission, created = CustomPermission.objects.get_or_create(
#                         name=permission_name, 
#                         codename=codename, 
#                         submodule=submodule
#                     )

#                     # Create a corresponding entry in the built-in Permission model
#                     content_type = ContentType.objects.get_for_model(CustomPermission)
#                     permission, created = Permission.objects.get_or_create(
#                         codename=codename,
#                         name=permission_name,
#                         content_type=content_type
#                     )
#         return Response({'message': 'Role and module and sub module create successfully'}, status=status.HTTP_200_OK)


# class AssignPermissionsAPIView(APIView):
#     def post(self, request):
#         data = request.data
#         user_id = data.get('user_id')
#         role_name = data.get('role_name')

#         # Retrieve the user based on the provided user ID
#         user = get_object_or_404(User, id=user_id)

#         # Retrieve the role based on the provided role name
#         role = get_object_or_404(Role, name=role_name)

#         # Retrieve the permissions associated with the specified role
#         # permissions = CustomPermission.objects.filter(submodule__module__group=role)
#         permissions = CustomPermission.objects.filter(submodule__module__role=role)

#         # Assign the permissions to the user
#         user.user_permissions.set(permissions)

#         return Response({'message': 'Permissions assigned successfully'}, status=status.HTTP_200_OK)