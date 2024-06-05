from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from userapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('userapp.urls')),
    path('machine/',include('machinedataapp.urls')),
    path('',views.index ,name='index'),
    # path('tenant/',include('tenant.urls')),
    path('saas/',include('saasapp.urls')), 
] 
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

                    
