from ast import Mod
from re import T
from django.db import models
from matplotlib.pyplot import cla
from userapp.models import User
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
# from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.conf import settings

import datetime
from datetime import timedelta
from datetime import datetime as dt

today = datetime.date.today()


# Create your models here.
class adminRegistration(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    email_id = models.EmailField(null=True, blank=True)
    contact_no = models.CharField(max_length=15, null=True, blank=True)


class companyRegistration(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization_name = models.CharField(max_length=100, null=True, blank=True)
    address1 = models.CharField(max_length=100, null=True, blank=True)
    address2 = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    industry_sector = models.CharField(max_length=100, null=True, blank=True)
    zip_code = models.CharField(max_length=6, null=True, blank=True)
    site = models.CharField(max_length=30, null=True, blank=True)



#### User Payment History
class PayHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    paystack_charge_id = models.CharField(max_length=100,
                                          default='',
                                          blank=True)
    paystack_access_code = models.CharField(max_length=100,
                                            default='',
                                            blank=True)
    payment_for = models.ForeignKey('Membership',
                                    on_delete=models.SET_NULL,
                                    null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    paid = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


#### Membership
class Membership(models.Model):
    MEMBERSHIP_CHOICES = (('Enterprise', 'Enterprise'), ('Standard',
                                                         'Standard'),
                          ('Basic', 'Basic'), ('Free', 'Free'))
    PERIOD_DURATION = (
        ('Days', 'Days'),
        ('Week', 'Week'),
        ('Months', 'Months'),
    )
    slug = models.SlugField(null=True, blank=True)
    membership_type = models.CharField(choices=MEMBERSHIP_CHOICES,
                                       default='Free',
                                       max_length=30)
    duration = models.PositiveIntegerField(default=7)
    duration_period = models.CharField(max_length=100,
                                       default='Day',
                                       choices=PERIOD_DURATION)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.membership_type


#### User Membership
class UserMembership(models.Model):
    user = models.OneToOneField(User,
                                related_name='user_membership',
                                on_delete=models.CASCADE)
    membership = models.ForeignKey(Membership,
                                   related_name='user_membership',
                                   on_delete=models.SET_NULL,
                                   null=True)
    reference_code = models.CharField(max_length=100, default='', blank=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=UserMembership)
def create_subscription(sender, instance, *args, **kwargs):
    if instance:
        Subscription.objects.create(
            user_membership=instance,
            expires_in=dt.now().date() +
            timedelta(days=instance.membership.duration))


#### User Subscription
class Subscription(models.Model):
    user_membership = models.ForeignKey(UserMembership,
                                        related_name='subscription',
                                        on_delete=models.CASCADE,
                                        default=None)
    expires_in = models.DateField(null=True, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.user_membership.user.username


@receiver(post_save, sender=Subscription)
def update_active(sender, instance, *args, **kwargs):
    if instance.expires_in < today:
        subscription = Subscription.objects.get(id=instance.id)
        subscription.delete()

class contactus(models.Model):
    name=models.CharField(max_length=50,blank=True,null=True)
    email=models.EmailField(blank=True,null=True)
    subject=models.CharField(max_length=50,blank=True,null=True)
    message=models.CharField(max_length=100,blank=True,null=True)
    mobileno=models.CharField(max_length=15,blank=True,null=True)
    date=models.DateField(null=True,auto_now=True)
    fisrtname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    attachment = models.FileField(upload_to='attachments/', blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    created_by = models.IntegerField(blank=True, null=True)
    updated_by = models.IntegerField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.fisrtname} - {self.subject}'
    
class Complaint(models.Model):
    name=models.CharField(max_length=50,blank=True,null=True)
    email=models.EmailField(blank=True,null=True)
    mobileno=models.CharField(max_length=15,blank=True,null=True)
    title = models.CharField(max_length=100,blank=True, null=True)
    description = models.TextField(blank=True,null=True)
    date=models.DateField(null=True,auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    created_by = models.IntegerField(blank=True, null=True)
    updated_by = models.IntegerField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, default='Pending',blank=True, null=True)
    priority = models.CharField(max_length=20, default='Low',blank=True, null=True)

from tenant.models import Tenant
class ClientFeedback(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE,blank=True,null=True)
    firstname=models.CharField(max_length=50,blank=True,null=True)
    lastname=models.CharField(max_length=50,blank=True,null=True)
    email=models.EmailField(blank=True,null=True)
    mobile_no=models.CharField(max_length=15,blank=True,null=True)
    feedback=models.CharField(max_length=500,blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True,blank=True,null=True)
    created_by=models.IntegerField(blank=True,null=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(blank=True,null=True)
    rating = models.IntegerField(blank=True, null=True)  # Rating out of 5
    is_resolved = models.BooleanField(default=False,blank=True, null=True)  # Indicates if feedback is resolved
    resolved_at = models.DateTimeField(blank=True, null=True)  # Timestamp when feedback is resolved
    resolution_notes = models.TextField(blank=True, null=True) 
    

class ToolFeedback(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE,blank=True,null=True)
    firstname=models.CharField(max_length=50,blank=True,null=True)
    lastname=models.CharField(max_length=50,blank=True,null=True)
    email=models.EmailField(blank=True,null=True)
    mobile_no=models.CharField(max_length=15,blank=True,null=True)
    feedback=models.CharField(max_length=500,blank=True,null=True)
    feacture_request=models.CharField(max_length=50,blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True,blank=True,null=True)
    created_by=models.IntegerField(blank=True,null=True)
    updated_by = models.IntegerField(blank=True,null=True)
    updated_at = models.DateTimeField(blank=True,null=True)
    rating = models.IntegerField(blank=True, null=True)
    is_resolved = models.BooleanField(default=False)
    resolved_at = models.DateTimeField(blank=True, null=True)
    resolution_notes = models.TextField(blank=True, null=True)


class Module(models.Model):
    module = models.CharField(max_length=100,blank=True, null=True)
    is_active = models.BooleanField(default=True,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    created_by = models.IntegerField(blank=True, null=True)
    updated_by = models.IntegerField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now_add=True,blank=True, null=True)


class ModuleMapping(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE,blank=True,null=True)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True, blank=True)
    module_type = models.ForeignKey(Module, on_delete=models.CASCADE,blank=True,null=True)
    is_active = models.BooleanField(default=True,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    created_by = models.IntegerField(blank=True, null=True)
    updated_by = models.IntegerField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now_add=True,blank=True, null=True)
