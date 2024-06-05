
from django.db import models
from django.contrib.auth.models import User
from django_tenants.models import DomainMixin, TenantMixin
from django.conf import settings


class Tenant(TenantMixin):
    #user = models.ForeignKey(Companydetail, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL,
                             null=True)
    is_active = models.BooleanField(default=False, blank=True)
    created_on = models.DateField(auto_now_add=True)
    # logo = models.ImageField(upload_to='tenant_logos/', null=True, blank=True, default='path/to/default/logo.png')


    # default true, schema will be automatically created and
    # synced when it is saved
    auto_create_schema = True
    """
    USE THIS WITH CAUTION!
    Set this flag to true on a parent class if you want the schema to be
    automatically deleted if the tenant row gets deleted.
    """
    auto_drop_schema = True

    class Meta:
        ordering = ('-user', '-is_active')


class Domain(DomainMixin):
    #name = models.CharField(max_length=50,null=True,blank=True)
    pass



