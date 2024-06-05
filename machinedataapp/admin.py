from django.contrib import admin
from .models import MachineMaster,MachineUserMapping,QrCode
# Register your models here.
admin.site.register(MachineMaster)
admin.site.register(QrCode)
admin.site.register(MachineUserMapping)



