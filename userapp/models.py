# Create your models here.
from django.contrib.auth.models import AbstractUser, BaseUserManager,User
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and return a superuser with an email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)

ROLES = (
        ('1', 'Superuser'),
        ('2', 'Admin'),
        ('3', 'Customer'),
        ('4', 'User'),
    )
class User(AbstractUser):    
    username=None
    organization=models.CharField(max_length=100,null=True,blank=True)
    spoc_id=models.CharField(max_length=50,null=True,blank=True)
    name=models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    mobile_no = models.CharField(max_length=15, blank=True, null=True)
    address1 = models.TextField(blank=True, null=True)
    address2 = models.TextField(blank=True, null=True)
    pincode = models.CharField(max_length=10,blank=True,null=True)
    state = models.CharField(max_length=100,blank=True,null=True)
    country = models.CharField(max_length=100,blank=True,null=True)
    landmark = models.CharField(max_length=100,blank=True, null=True)
    otp=models.CharField(max_length=6,blank=True, null=True)
    role=models.CharField(max_length=1, choices=ROLES,default='4',blank=True, null=True)
    created_at= models.DateTimeField(auto_now_add=True,blank=True,null=True)
    created_by = models.IntegerField(null=True, blank=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(blank=True,null=True)
    status=models.BooleanField(default=True,null=True,blank=True)
    profile_img=models.ImageField(upload_to='images/',null=True,blank=True,default='anonymous.jpg')



    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


    
from tenant.models import Tenant
class MQTTData(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE,blank=True,null=True)
    topic = models.CharField(max_length=255)
    payload = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
    created_at= models.DateTimeField(auto_now_add=True)  

    # Define fields for the data extracted from the payload
    m_id = models.CharField(max_length=50, blank=True, null=True)
    capacity = models.IntegerField(blank=True, null=True)
    stock = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    mode = models.CharField(max_length=50,blank=True,null=True)

    def __str__(self):
        return f"{self.topic} - {self.timestamp}"
    
class MStatus(models.Model):
    m_id = models.CharField(max_length=50)
    capacity = models.IntegerField()
    stock = models.IntegerField()
    status = models.CharField(max_length=50)
    mode = models.CharField(max_length=50,blank=True,null=True)
    created_at= models.DateTimeField(auto_now_add=True,blank=True,null=True)  
    created_by=models.IntegerField(blank=True,null=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(blank=True,null=True)


    def __str__(self):
        return self.m_id
from django.utils import timezone
 
class RefillStockHistory(models.Model):
    machine_id_store = models.CharField(max_length=50,blank=True,null=True)
    stock_before_refill = models.IntegerField(blank=True,null=True)
    stock_after_refill = models.IntegerField(blank=True,null=True)
    refill_date = models.DateTimeField(default=timezone.now,blank=True,null=True)
    total_refill=models.IntegerField(default=0,blank=True,null=True)
    created_at= models.DateTimeField(auto_now_add=True,blank=True,null=True)  
    created_by=models.IntegerField(blank=True,null=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(blank=True,null=True)    

class MOrder(models.Model):
    machine_id = models.CharField(max_length=50,blank=True,null=True)
    aid = models.CharField(max_length=50,blank=True,null=True)
    tid = models.CharField(max_length=50,blank=True,null=True)
    rid = models.CharField(max_length=50,blank=True,null=True)
    qty = models.IntegerField(blank=True,null=True)
    created_at= models.DateTimeField(auto_now_add=True,blank=True,null=True)
    created_by=models.IntegerField(blank=True,null=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(blank=True,null=True)


    def __str__(self):
        return self.machine_id
    

class PaymentHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True,null=True)
    machine_status = models.ForeignKey(MStatus, on_delete=models.CASCADE,blank=True,null=True)
    machine_payment_mode = models.CharField(max_length=10,blank=True,null=True)
    transaction_id = models.CharField(max_length=100,blank=True,null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)
    timestamp = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.machine_status} - {self.amount}  - {self.timestamp}'

class PaymentConfiguration(models.Model):
    merchant_id = models.CharField(max_length=255,blank=True,null=True)
    merchant_name = models.CharField(max_length=255,blank=True,null=True)
    simulator_key_profile = models.CharField(max_length=255,blank=True,null=True)
    salt_key = models.CharField(max_length=255,blank=True,null=True)
    salt_index = models.CharField(max_length=255,blank=True,null=True)
    provider_id = models.CharField(max_length=255,blank=True,null=True)
    callback_url = models.URLField(blank=True,null=True)
    simulator_qr_profile = models.CharField(max_length=255,blank=True,null=True)
    qrcode_id = models.CharField(max_length=255,blank=True,null=True)
    store_id = models.CharField(max_length=255,blank=True,null=True)
    terminal_id = models.CharField(max_length=255,blank=True,null=True)
    timestamp = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    

    def __str__(self):
        return f"{self.merchant_name} - {self.provider_id} - {self.store_id}"
    


class CustomEmail(models.Model):
    default_from_email = models.EmailField(max_length=1000, null=True,blank=True)
    email_host = models.CharField(max_length=100, null=True, blank=True)
    email_port = models.IntegerField(null=True, blank=True)
    email_host_user = models.EmailField(null=True, blank=True)
    email_host_password = models.CharField(max_length=100, null=True, blank=True)
    email_use_tls = models.BooleanField(default=True,null=True,blank=True)
    email_fail_silently = models.BooleanField(default=False,null=True,blank=True)
    use_ssl = models.BooleanField(null=True,blank=True)

    def __str__(self):
        return self.email_host_user
