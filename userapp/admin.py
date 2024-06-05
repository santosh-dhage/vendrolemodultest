from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['email', 'name', ]
    list_display = ('name','email', 'mobile_no', 'address1', 'address2', 'pincode', 'state', 'country','landmark','role', 'is_staff', 'is_superuser')
    search_fields = ('email', 'name')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name','mobile_no', 'address1', 'address2', 'pincode', 'state', 'country', 'landmark','role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

admin.site.register(User, CustomUserAdmin)


from .models import MQTTData,MOrder,MStatus,User,PaymentHistory,RefillStockHistory

# Register your models here.
admin.site.register(MQTTData)
admin.site.register(MOrder)
admin.site.register(MStatus)
admin.site.register(PaymentHistory)
admin.site.register(RefillStockHistory)


