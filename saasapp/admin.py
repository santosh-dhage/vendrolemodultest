from django.contrib import admin
from saasapp.models import Complaint,contactus,companyRegistration, adminRegistration, UserMembership, Membership, Subscription, PayHistory,ModuleMapping,Module
admin.site.register(companyRegistration)
admin.site.register(adminRegistration)
admin.site.register(UserMembership)
admin.site.register(Membership)
admin.site.register(Subscription)
admin.site.register(PayHistory)
admin.site.register(contactus)
admin.site.register(Complaint)
admin.site.register(Module)
admin.site.register(ModuleMapping)

