from django.db import models
from userapp.models import User
from tenant.models import Tenant
# Create your models here.
class Product(models.Model):
    # name = models.CharField(max_length=100, null=True, blank=True)
    product_type = models.CharField(max_length=50, null=True, blank=True)
    # model_no = models.CharField(max_length=100, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    amount=models.IntegerField(default=0,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    created_by=models.IntegerField(blank=True,null=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)

    
class ModelCapacity(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    model_no = models.CharField(max_length=100, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    created_by=models.IntegerField(blank=True,null=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)

class QrCode(models.Model):
    qr = models.FileField(upload_to='qr_codes_image',null=True,blank=True)
    qr_store_name = models.CharField(max_length =100 , null=True,blank=True)
    qr_store_id = models.CharField(max_length =100 , null=True,blank=True)
    qr_code_id = models.CharField(max_length =100 , null=True,blank=True)
    is_active = models.BooleanField(default=True,null=True, blank=True)
    created_at=models.DateTimeField(auto_now_add=True,blank=True,null=True)
    # created_by=models.IntegerField(blank=True,null=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(blank=True,null=True)

class MachineMaster(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE,related_name='tenant',null=True,blank=True)
    product=models.ForeignKey(Product,on_delete=models.CASCADE,null=True,blank=True,related_name='product')
    machine_id = models.CharField(max_length=100, unique=True,null=True, blank=True)
    rqcode = models.ForeignKey(QrCode,on_delete=models.CASCADE,null=True,blank=True)
    model_number=models.ForeignKey(ModelCapacity,on_delete=models.CASCADE,null=True,blank=True,related_name='modelcapacity')
    payment_type=models.CharField(max_length=100,null=True, blank=True)
    machinelease=models.CharField(max_length=100,null=True, blank=True)
    installation_location = models.CharField(max_length=255, null=True, blank=True)
    manufacturer = models.CharField(max_length=100,null=True, blank=True)
    production_date = models.DateField(null=True, blank=True)
    warranty_expiry_date = models.DateField(null=True, blank=True)
    maintenance_schedule = models.CharField(max_length=255,null=True, blank=True)
    last_maintenance_date = models.DateField(null=True, blank=True)
    power_rating = models.FloatField(null=True, blank=True)

    serial_number = models.CharField(max_length=50,null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    purchase_date = models.DateField(null=True, blank=True)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)
    usage_hours = models.IntegerField(default=0,null=True, blank=True)
    is_active = models.BooleanField(default=True,null=True, blank=True)
    created_at=models.DateTimeField(auto_now_add=True,blank=True,null=True)
    # created_by=models.IntegerField(blank=True,null=True)
    # updated_by = models.IntegerField(blank=True,null=True)
    # updated_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)

    

    def __str__(self):
        return str(self.machine_id)

from django.conf import settings
    
class MachineUserMapping(models.Model):
    machine = models.ForeignKey(MachineMaster, on_delete=models.CASCADE,null=True, blank=True)
    assigned_user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE ,null=True, blank=True,related_name='assigned_users')
    assigned_user_date = models.DateTimeField(null=True, blank=True)
    assigned_customer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True, blank=True,related_name='assigned_customers')
    assigned_customer_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True,null=True, blank=True)
    created_at=models.DateTimeField(auto_now_add=True,blank=True,null=True)
    created_by=models.IntegerField(blank=True,null=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(blank=True,null=True)
    
    

class SiteSettings(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    logo = models.ImageField(upload_to='logos/',null=True, blank=True,default='favicon.jpg')
    favicon = models.ImageField(upload_to='favicons/', null=True, blank=True,default='favicon.ico')


class ColorStore(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='colors', null=True, blank=True)
    color_name = models.CharField(max_length=100, null=True, blank=True)
    color_code = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.color_name
    
    
class Ticket(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    machine_mapping=models.ForeignKey(MachineUserMapping, on_delete=models.CASCADE, null=True, blank=True)
    machine_map=models.ForeignKey(MachineMaster, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(max_length=500,null=True, blank=True)
    notes=models.TextField(max_length=500,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    priority = models.CharField(max_length=10,  default='LOW')
    status = models.CharField(max_length=20, default='CREATED')
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_tickets')
    problem_type = models.CharField(max_length=10, null=True, blank=True)
    ticsrno = models.CharField(max_length=50, unique=True, null=True,blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_tickets', null=True, blank=True)
from django.contrib.auth.models import Permission  
from userapp.models import User  

class CustomPermission(models.Model):
    name = models.CharField(max_length=100)
    codename = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SubModule(models.Model):
    name = models.CharField(max_length=100)
    permissions = models.ManyToManyField(CustomPermission, related_name='submodules', blank=True)

    def __str__(self):
        return self.name

class Module(models.Model):
    name = models.CharField(max_length=100)
    submodules = models.ManyToManyField(SubModule, related_name='modules', blank=True)

    def __str__(self):
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Add unique=True
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='user_roles', blank=True)
    modules = models.ManyToManyField(Module, related_name='roles', blank=True)
    def add_permissions(self, permissions):
        """
        Method to add permissions to the role.
        :param permissions: List of permission objects to be added.
        """
        for module in self.modules.all():
            for submodule in module.submodules.all():
                for permission in permissions:
                    # Ensure permission is a CustomPermission object
                    if isinstance(permission, CustomPermission):
                        submodule.permissions.add(permission)
                    else:
                        # If not a CustomPermission object, try to get it by name
                        try:
                            perm = CustomPermission.objects.get(name=permission['name'], codename=permission['codename'])
                            submodule.permissions.add(perm)
                        except CustomPermission.DoesNotExist:
                            # If permission doesn't exist, create it
                            perm = CustomPermission.objects.create(name=permission['name'], codename=permission['codename'])
                            submodule.permissions.add(perm)

    def __str__(self):
        return self.name

class ExcelFile(models.Model):
    file = models.FileField(upload_to='excel_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)