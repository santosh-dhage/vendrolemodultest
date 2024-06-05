from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MQTTDataViewSet, MOrderViewSet, MStatusViewSet, PaymentHistoryViewSet,UserMasterViewSet,ChangePasswordView ,CustomEmailViewSet
from userapp import views
router = DefaultRouter()
router.register(r'users', UserMasterViewSet, basename='users')
router.register(r'mqttdata', MQTTDataViewSet)
router.register(r'morder', MOrderViewSet)
router.register(r'mstatus', MStatusViewSet)
router.register(r'paymenthistory', PaymentHistoryViewSet)
router.register(r'customemail', CustomEmailViewSet)

urlpatterns = [
    path('get_user_master/<int:user_id>/',views.get_user_master,name='get_user_master'),
    path('get_customer_master/<int:customer_id>/',views.get_customer_master,name='get_customer_master'),
    path('login/',views.login_view,name='login'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('login/refresh/',views.refresh_token_view,name='refresh'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
    path('api/mstatusbymachineid/<str:M_Id>/', views.mstatusbymachineid, name='mstatusbymachineid'),
    path('getmstatusdetail/', views.getmstatusdetail, name='getmstatusdetail'),
    path('api/mstatusbymachineid_for_payment/<str:M_Id>/', views.mstatusbymachineid_for_payment, name='mstatusbymachineid'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('forgot-password/',views.forgot_password, name='forgot-password'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
    path('reset-password/', views.reset_password, name='reset-password'),

    path('api/get_customer_list/', views.get_customer_list, name='get_customer_list'),
    path('api/get_user_list/', views.get_user_list, name='get_user_list'),
    path('api/get_user_list/<str:pk>/', views.get_user_list_for_customer, name='get_user_list_for_customer'),

    path('payment/callback/' ,views.paymentcallback, name ='paymentcallback'),
    path('payment/success/' ,views.paymentsuccess, name ='paymentsuccess'),

    path('all-schema-names/', views.all_schema_names, name='all-schema-names'),
    path('get_machine_status/', views.get_machine_status, name='get_machine_status'),
    ######## payemnt api
    path('get_payment_api_view/', views.get_payment_api_view, name='get_payment_api_view'),
    path('get_payment_api_view_user/', views.get_payment_api_view_user, name='get_payment_api_view_user'),
    path('get_qr_coin_view_for_dashboard/', views.get_qr_coin_view_for_dashboard, name='get_qr_coin_view_for_dashboard'),
    path('post_payment_report_excel/', views.post_payment_report_excel, name='post_payment_report_excel'),
    path('get_stock_by_machine_customer_role_refills/', views.get_stock_by_machine_customer_role_refills, name='get_stock_by_machine_customer_role_refills'),
    path('get_stock_by_machine_user_role_refills/', views.get_stock_by_machine_user_role_refills, name='get_stock_by_machine_user_role_refills'),
    
    path('generate_and_download_excel_report_for_user/', views.generate_and_download_excel_report_for_user, name='generate_and_download_excel_report_for_user'),
    path('generate_and_download_excel_report_for_customer/', views.generate_and_download_excel_report_for_customer, name='generate_and_download_excel_report_for_customer'),
    path('post_mis_report_for_user_pdf/', views.post_mis_report_for_user_pdf, name='post_mis_report_for_user_pdf'),
    path('post_mis_report_for_customer_pdf/', views.post_mis_report_for_customer_pdf, name='post_mis_report_for_customer_pdf'),

    # path('report/yesterday/', views.generate_yesterday_report_mis),
    # path('report/today/', views.generate_today_report_mis),
    # path('report/weekly/', views.generate_weekly_report_mis),
    # path('report/1months/', views.generate_monthly_report_mis),
    # path('report/3months/', views.generate_three_months_report_mis),

    path('get_mis_report_for_customer/', views.get_mis_report_for_customer),
    path('get_mis_report_for_user/', views.get_mis_report_for_user),


    # customer dashboard /refill
    path('get_stock_for_all_machine_refills/', views.get_stock_for_all_machine_refills),
    
    path('get_stock/', views.get_stock),
    path('post_stock_for_all_machine_refills_excel/', views.post_stock_for_all_machine_refills_excel),
    path('get_refill_counts/', views.get_refill_counts),
    path('get_refill_counts_per_machine/', views.get_refill_counts_per_machine),
    path('get_stock_capacity_equal_count/', views.get_stock_capacity_equal_count),
    
    path('get_mstatus_detail_for_tenant_customer/', views.get_mstatus_detail_for_tenant_customer),
    path('get_mstatus_detail_for_tenant_customer_user/', views.get_mstatus_detail_for_tenant_customer_user),
    path('get_map_customer_to_user_report/', views.get_map_customer_to_user_report),
    path('get_customer_user_payment_api_view/', views.get_customer_user_payment_api_view),
    
    # customer dashboard report
    path('post_mis_customer_role_for_user_excel/', views.post_mis_customer_role_for_user_excel),
    path('get_customer_role_for_user_download_excel_report/<str:user_id>/', views.get_customer_role_for_user_download_excel_report),
    path('get_customer_role_for_user_download_pdf_report/', views.get_customer_role_for_user_download_pdf_report),
    path('get_customer_role_for_user_download_excel_report/<str:from_date>/<str:to_date>/', views.get_customer_role_for_user_download_excel_report, name='get_customer_dashboard_date_range'),
    # path('get_machine_customer_mappings/', views.get_machine_customer_mappings, name='get_machine_customer_mappings'),

    ###########login user password change
    path('change_password_logged_in/', views.change_password_logged_in, name='change_password_logged_in'),
    path('get_payment_report_excel_download/', views.get_payment_report_excel_download, name='get_payment_report_excel_download'),
    path('stock_capacity_equal_count_per_day/<str:machine_id>/', views.stock_capacity_equal_count_per_day, name='stock_capacity_equal_count_per_day'),
    path('admin_stock_capacity_equal_count_per_day_by_id/<str:machine_id>/', views.admin_stock_capacity_equal_count_per_day_by_id, name='admin_stock_capacity_equal_count_per_day_by_id'),
    path('customer_stock_capacity_equal_count_per_day_by_id/<str:machine_id>/', views.customer_stock_capacity_equal_count_per_day_by_id, name='customer_stock_capacity_equal_count_per_day_by_id'),
    path('post_customer_stock_capacity_equal_count/<str:machine_id>/', views.post_customer_stock_capacity_equal_count, name='post_customer_stock_capacity_equal_count'),
    path('user_stock_capacity_equal_count_per_day_by_id/<str:machine_id>/', views.user_stock_capacity_equal_count_per_day_by_id, name='user_stock_capacity_equal_count_per_day_by_id'),
    path('post_user_stock_capacity_equal_count/<str:machine_id>/', views.post_user_stock_capacity_equal_count, name='post_user_stock_capacity_equal_count'),
    


]




    
