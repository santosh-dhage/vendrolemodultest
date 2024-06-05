import json
from re import sub
from django import template
from django.db.models import fields
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse, FileResponse
# from ITSM.utils import logger
from django.conf import settings
from django.contrib import messages
from django.http import Http404
from django.contrib.auth.decorators import login_required
import datetime
from django.http import HttpResponse, JsonResponse
from xlwt import Workbook
import os, sys
from django.core.mail import EmailMessage, send_mail
from django.conf import settings
from rest_framework.permissions import AllowAny,IsAuthenticatedOrReadOnly,IsAuthenticated
from django.template.loader import render_to_string
from saasapp.models import *
from django.views.decorators.csrf import ensure_csrf_cookie
from tenant.models import Tenant, Domain 
from userapp.models import User
from django.http import HttpResponsePermanentRedirect
from rest_framework.response import Response
# from .utils import *
from datetime import date
from cryptography.fernet import Fernet
key = Fernet.generate_key()
fernet = Fernet(key)
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode ,urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
# from .token import account_activation_token
import bcrypt
from django.db import connection, connections
from django_otp.oath import totp
from django.contrib.auth.hashers import make_password
import time
from django.core.mail import EmailMultiAlternatives
from rest_framework.decorators import api_view,permission_classes

def otpGeneration(request):
    try:  
        if request.method == 'GET':
            username=request.session.get('username')
            email = request.session.get('email')
            secret_key = b'JBSWY3DPEHPK3PXP'
            otp1=totp(key=secret_key,step=30,digits=6)
            print(type(otp1))
            while len(str(otp1))!=6:            
                otp1=totp(key=secret_key,step=30,digits=6)
            request.session['otp']=otp1
            mail_subject = 'Verify your OTP.'
            message = "Hello"
            # message = render_to_string('saasapp/otp_email.html', {
            #     'otp': otp1,  
            #     'username':username          
            # })
            to_email = email
            email = EmailMultiAlternatives(
                mail_subject, message, to=[to_email]
            )
            from django.template import loader
            html_template = loader.get_template("saasapp/otp_email.html")
            dynamic_data = {'otp': otp1,'username':username}
            html_template = html_template.render(dynamic_data)
            email.attach_alternative(html_template, 'text/html')
            email.send()
            return render(request , 'saasapp/otp_page.html')
        elif request.method=='POST':
            otp1=request.session.get('otp')
            otp2=int(request.POST.get('otp'))
            print(type(otp2))
            if otp1 == otp2:      
                username=request.session.get('site')
                email = request.session.get('email')      
                password=request.session.get('password')
                first_name=request.session.get('first_name')
                last_name=request.session.get('last_name')
                contact_no=request.session.get('contact_no')
                organization_name=request.session.get('Organization_Name')
                zip_code=request.session.get('zip_code')
                industry_sector=request.session.get('industry_sector')
                country=request.session.get('country')
                address1=request.session.get('address')
                address2=request.session.get('address2')
                city=request.session.get('City')
                state=request.session.get('state')
                site=request.session.get('site')		
                plan_name=request.session.get('plan_name')
                user_obj = User.objects.create_user(username=username,password=password,role='itsmadmin',plan=plan_name,is_active = False)
                admin_obj= adminRegistration.objects.create(user=user_obj,first_name=first_name,last_name=last_name,email_id=email,contact_no=contact_no)
                com_obj = companyRegistration.objects.create(user=admin_obj,organization_name=organization_name,zip_code=zip_code,industry_sector=industry_sector,country=country,address1=address1,address2=address2,city=city,state=state,site=site)
                tenant_obj = Tenant.objects.create(user=user_obj, schema_name=site,is_active=True)
                domain_obj = Domain.objects.create(tenant=tenant_obj, domain=site + '.localhost')
                com_obj.save()
                domain_obj.save()
                cursor =connection.cursor()            
                cursor.execute("INSERT INTO "+site+".free_user (first_name,last_name,email,is_superuser,is_staff,username,password,is_active, role,plan,date_joined) VALUES (%s,%s,%s,False,False,%s,%s,True,'itsmadmin',%s,%s) ", [first_name,last_name,email, username ,make_password(password),plan_name,datetime.datetime.now()])                
                
                # create notification object..            

                return redirect('http://' + site + '.localhost:8000/login/')
            else:
                messages.info(request, 'OTP does not match')
                return render(request , 'saasapp/otp_page.html')
    except Exception as e:
        # logger(str(e), 'e')
        return HttpResponse(str(e))


def contactussubmit(request):
    try:
        if request.method=='POST':
            name=request.POST.get('name')
            email=request.POST.get('email')
            subject=request.POST.get('subject')
            message=request.POST.get('message')
            mobileno=request.POST.get('contactno')               
            contactus_obj= contactus.objects.create(name=name,email=email,mobileno=mobileno,
            subject=subject,message=message)
            contactus_obj.save()      
            return redirect('home')
        return render(request,'saasapp/landing-page.html')
    except Exception as e:
        # logger(str(e), 'e')
        return HttpResponse(str(e))
from django.db import connection, transaction

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def registration(request): 
#     if request.method == 'POST': 
#         try:
#             data = request.data
#             email = data.get('email').lower()    
#             password = data.get('password')
#             first_name = data.get('first_name')
#             last_name = data.get('last_name')
#             contact_no = data.get('contact_no')
#             organization_name = data.get('organization_name')
#             zip_code = data.get('zip_code')
#             industry_sector = data.get('industry_sector')
#             country = data.get('country')
#             address1 = data.get('address')
#             address2 = data.get('address2')
#             city = data.get('city')
#             state = data.get('state')
#             site = data.get('site')
            
#             # Check if email, site, and mobile number are unique
#             if User.objects.filter(email=email).exists():
#                 return Response({'success': 0, 'message': 'Email already exists'})
            
#             if companyRegistration.objects.filter(site=site).exists():
#                 return Response({'success': 0, 'message': 'Site name already exists'})
            
#             if adminRegistration.objects.filter(contact_no=contact_no).exists():
#                 return Response({'success': 0, 'message': 'Mobile number already exists'})
            
#             with transaction.atomic():
#                 # Create user
#                 user_obj = User.objects.create_user(email=email, password=password, role=2, address1=address1, first_name=first_name, last_name=last_name, organization=organization_name, mobile_no=contact_no, is_active=False)
                
#                 # Create admin registration
#                 admin_obj = adminRegistration.objects.create(user=user_obj, first_name=first_name, last_name=last_name, email_id=email, contact_no=contact_no)
                
#                 # Create company registration
#                 com_obj = companyRegistration.objects.create(user=user_obj, organization_name=organization_name, zip_code=zip_code, industry_sector=industry_sector, country=country, address1=address1, address2=address2, city=city, state=state, site=site)
                
#                 # Create tenant
#                 tenant_obj = Tenant.objects.create(user=user_obj, schema_name=site, is_active=True)
                
#                 # Create domain
#                 domain_obj = Domain.objects.create(tenant=tenant_obj, domain=site + '.localhost')  # Change this according to your needs
#                 # domain_obj = Domain.objects.create(tenant=tenant_obj, domain=site + '.ivendmsoft.com')  #production
#                 # domain_obj = Domain.objects.create(tenant=tenant_obj, domain=site + '.ivendmsoft-uat.com')  #uat
                
#                 # Insert into userapp_user table
#                 cursor = connection.cursor()
#                 cursor.execute("INSERT INTO {}.userapp_user (first_name, last_name, email, is_superuser, is_staff, password, is_active, role, date_joined) VALUES (%s, %s, %s, False, False, %s, True, 2, %s)".format(site), [first_name, last_name, email, make_password(password), datetime.datetime.now()])
                
#                 return Response({'success': 1, 'message': 'User is created'})
#         except Exception as e:
#             return Response({'success': 0, 'message': str(e)})  # Return the error message for debugging
#     else:
#         return Response({'success': 0, 'message': 'User is not created'})

@api_view(['POST'])
@permission_classes([AllowAny])
def registration(request):
    if request.method == 'POST':
        try:
            data = request.data
            email = data.get('email', '').lower()
            password = data.get('password')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            contact_no = data.get('contact_no')
            organization_name = data.get('organization_name')
            zip_code = data.get('zip_code')
            industry_sector = data.get('industry_sector')
            country = data.get('country')
            address1 = data.get('address')
            address2 = data.get('address2')
            city = data.get('city')
            state = data.get('state')
            site = data.get('site')

            # Check uniqueness of email, site, mobile number, and organization name
            # if User.objects.filter(email=email).exists():
            #     return Response({'success': 0, 'message': 'Email already exists'})
            
            # if companyRegistration.objects.filter(site=site).exists():
            #     return Response({'success': 0, 'message': 'Site name already exists'})
            
            # if adminRegistration.objects.filter(contact_no=contact_no).exists():
            #     return Response({'success': 0, 'message': 'Mobile number already exists'})

            # if adminRegistration.objects.filter(email_id=email).exists():
            #     return Response({'success': 0, 'message': 'Email already exists'})

            # if companyRegistration.objects.filter(organization_name=organization_name).exists():
            #     return Response({'success': 0, 'message': 'Organization name already exists'})

            
            # Create user
            user_obj = User.objects.create_user(
                email=email,
                password=make_password(password),
                role=2,
                
                
                
                is_active=False
            )

            # Create admin registration
            admin_obj = adminRegistration.objects.create(
                user=user_obj,
                first_name=first_name,
                last_name=last_name,
                email_id=email,
                contact_no=contact_no
            )

            # Create company registration
            com_obj = companyRegistration.objects.create(
                user=user_obj,
                organization_name=organization_name,
                zip_code=zip_code,
                industry_sector=industry_sector,
                country=country,
                address1=address1,
                address2=address2,
                city=city,
                state=state,
                site=site
            )

            # Create tenant
            tenant_obj = Tenant.objects.create(
                user=user_obj,
                schema_name=site,
                is_active=True
            )

            # Create domain
            domain_obj = Domain.objects.create(tenant=tenant_obj,domain=site + '.localhost')
            # domain_obj = Domain.objects.create(tenant=tenant_obj, domain=site + '.ivendmsoft.com')  #production
            # domain_obj = Domain.objects.create(tenant=tenant_obj, domain=site + '.ivendmsoft-uat.com')  #uat

            # Insert into userapp_user table
            cursor = connection.cursor()
            cursor.execute(
                "INSERT INTO {}.userapp_user (first_name, last_name, email, is_superuser, is_staff, password, is_active, role, date_joined) VALUES (%s, %s, %s, False, False, %s, True, 2, %s)".format(site),
                [first_name, last_name, email, make_password(password), datetime.datetime.now()]
            )

            return Response({'success': 1, 'message': 'User is created'})
        except Exception as e:
            return Response({'success': 0, 'message': str(e)})
    

# @api_view(['POST'])
# @permission_classes([AllowAny])
# @ensure_csrf_cookie    
# def registration(request): 
#     try:   
#         if request.method=='POST': 
#             print(request.data)    
#             email = request.data.get('email').lower()    
#             password=request.data.get('password')
#             first_name=request.data.get('first_name')
#             last_name=request.data.get('last_name')
#             contact_no=request.data.get('contact_no')
#             organization_name=request.data.get('organization_name')
#             zip_code=request.data.get('zip_code')
#             industry_sector=request.data.get('industry_sector')
#             country=request.data.get('country')
#             address1=request.data.get('address')
#             address2=request.data.get('address2')
#             city=request.data.get('city')
#             state=request.data.get('state')
#             site=request.data.get('site')
#             print(site)	
#             # plan_name=request.data.get('plan_name')
#             user_obj = User.objects.create_user(email=email,password=password,role=2,is_active = False)
#             print(user_obj)
#             admin_obj= adminRegistration.objects.create(user=user_obj,first_name=first_name,last_name=last_name,email_id=email,contact_no=contact_no)
#             com_obj = companyRegistration.objects.create(user=user_obj,organization_name=organization_name,zip_code=zip_code,industry_sector=industry_sector,country=country,address1=address1,address2=address2,city=city,state=state,site=site)
#             tenant_obj = Tenant.objects.create(user=user_obj, schema_name=site,is_active=True)
#             domain_obj = Domain.objects.create(tenant=tenant_obj, domain=site + '.localhost')         #localhost
#             # domain_obj = Domain.objects.create(tenant=tenant_obj, domain=site + '.ivendmsoft.com')  #production
#             com_obj.save()
#             admin_obj.save()
#             domain_obj.save()
#             print(domain_obj)
#             cursor =connection.cursor()   
#             print(cursor)         
#             cursor.execute("INSERT INTO "+site+".userapp_user (first_name,last_name,email,is_superuser,is_staff,password,is_active, role,date_joined) VALUES (%s,%s,%s,False,False,%s,True,2,%s) ", [first_name,last_name,email ,make_password(password),datetime.datetime.now()])                
#             print(cursor)
#             # create notification object..            
#             return Response({'success': 1, 'message': 'User is created'})
#         else:
#             return Response({'success': 0, 'message': 'User is not created'})
#         # return redirect('http://' + site + '.localhost:8000/login/')
#     except Exception as e:
#         # logger(str(e), 'e')
#         return Response({'success': 0, 'message': 'User is not created'})

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_data_register_tenant_wise(request):
    print('helo')
    # Check if the request has a tenant schema
    if not hasattr(request, 'tenant'):
        return Response({'error': 'Tenant schema not found in the request'}, status=400)
    print('helo')
    # Initialize an empty list to store results
    combined_results = []
    print('helo3')
    request.tenant
    # Get the logged-in user's tenant
    tenant = request.tenant.user_id
    

    # Establish a cursor
    with connection.cursor() as cursor:
        # Execute your raw SQL query to fetch data from all relevant tables
        cursor.execute("""
            SELECT
                c.id AS company_id,
                c.organization_name,
                c.address1,
                c.address2,
                c.city,
                c.state,
                c.country,
                c.industry_sector,
                c.zip_code,
                c.site AS company_site,
                t.schema_name AS tenant_schema_name,
                a.first_name,
                a.last_name,
                a.email_id,
                a.contact_no
            FROM
                saasapp_companyregistration c
            JOIN
                saasapp_adminregistration a ON c.id = a.user_id
            JOIN
                tenant_tenant t ON a.user_id = t.user_id
            WHERE
                t.user_id = %s
        """, [tenant.user_id])  # Pass the tenant ID as a parameter

        # Fetch all rows from the cursor
        rows = cursor.fetchall()
        

        # Iterate over the rows and format the results as dictionaries
        for row in rows:
            result = {
                'company_id': row[0],
                'organization_name': row[1],
                'address1': row[2],
                'address2': row[3],
                'city': row[4],
                'state': row[5],
                'country': row[6],
                'industry_sector': row[7],
                'zip_code': row[8],
                'company_site': row[9],
                'tenant_schema_name': row[10],
                'first_name': row[11],
                'last_name': row[12],
                'email_id': row[13],
                'contact_no': row[14]
            }
            combined_results.append(result)

    # Return the combined results in the response
    return Response({'success':1,'message':'Data Found','result':combined_results})

   
from rest_framework.viewsets import ModelViewSet
from .serializers import *
from rest_framework import status
class ContactUsViewSet(ModelViewSet):
    queryset = contactus.objects.all().order_by('-id')
    serializer_class = ContactUsSerializer
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # try:
            queryset = contactus.objects.all().order_by('-id')
            serializer = ContactUsSerializer(queryset, many=True)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing ContactUs: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def retrieve(self, request, pk, *args, **kwargs):
        # try:
            user = contactus.objects.get(pk=pk)
            serializer = ContactUsSerializer(user)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error retrieving ContactUs: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found'})

    def create(self, request, *args, **kwargs):
        # try:
            serializer = ContactUsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Log successful creation
            # logging.info(f'Data Created Of Contact us. {serializer.data}')

            return Response({'success': 1, 'message': 'Data Created Successfully', 'result': serializer.data}, status=status.HTTP_201_CREATED)

        # except Exception as e:
        #     logging.error(f'Error creating ContactUs: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Created Data', 'result': serializer.errors}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk, *args, **kwargs):
        # try:
            chp = contactus.objects.get(pk=pk)
            serializer = ContactUsSerializer(chp, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Log successful creation
            # logging.info(f'Data Updated Successfully: {serializer.data}')
            return Response({'success': 1, 'message': 'Data Updated', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing ContactUs: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def destroy(self, request, pk, *args, **kwargs):
        # try:
            user = contactus.objects.get(pk=pk)
            user.delete()
            return Response({'success': 1, 'message': 'Data Deleted'})
        # except contactus.DoesNotExist:
        #     return Response({'success': 0, 'message': 'Not Found'}, status=status.HTTP_404_NOT_FOUND)
        # except Exception as e:
        #     logging.error(f'Error deleting ContactUs: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found'}, status=status.HTTP_400_BAD_REQUEST)


class ComplaintViewSet(ModelViewSet):
    queryset = Complaint.objects.all().order_by('-id')
    serializer_class = ComplaintSerializer
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # try:
            queryset = Complaint.objects.all().order_by('-id')
            serializer = ComplaintSerializer(queryset, many=True)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def retrieve(self, request, pk, *args, **kwargs):
        # try:
            user = Complaint.objects.get(pk=pk)
            serializer = ComplaintSerializer(user)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error retrieving Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found'})

    def create(self, request, *args, **kwargs):
        # try:
            serializer = ComplaintSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Log successful creation
            # logging.info(f'Data Created Of Contact us. {serializer.data}')

            return Response({'success': 1, 'message': 'Data Created Successfully', 'result': serializer.data}, status=status.HTTP_201_CREATED)

        # except Exception as e:
        #     logging.error(f'Error creating Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Created Data', 'result': serializer.errors}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk, *args, **kwargs):
        # try:
            chp = Complaint.objects.get(pk=pk)
            serializer = ComplaintSerializer(chp, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Log successful creation
            # logging.info(f'Data Updated Successfully: {serializer.data}')
            return Response({'success': 1, 'message': 'Data Updated', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def destroy(self, request, pk, *args, **kwargs):
        # try:
            user = Complaint.objects.get(pk=pk)
            user.delete()
            return Response({'success': 1, 'message': 'Data Deleted'})
        # except Complaint.DoesNotExist:
        #     return Response({'success': 0, 'message': 'Not Found'}, status=status.HTTP_404_NOT_FOUND)
        # except Exception as e:
        #     logging.error(f'Error deleting Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'GET'])
def is_valid_domain(request):
    try:
        if request.method == 'POST':
            site = request.data.get('site')
            if site:
                domain_obj = Tenant.objects.filter(schema_name=site).exists()
                if domain_obj:
                    return Response({'success': 1, 'message': 'Valid Domain', 'result': domain_obj})
                else:
                    return Response({'success': 0, 'message': 'Invalid Domain'})
            else:
                return Response({'success': 0, 'message': 'Domain not provided'})
        
        elif request.method == 'GET':
            # Retrieving all schema names
            all_schemas = Tenant.objects.values_list('schema_name', flat=True)
            return Response({'success': 1, 'message': 'All Schema Names', 'result': list(all_schemas)})
        
        else:
            return Response({'success': 0, 'message': 'Invalid request method'})
    
    except Exception as e:
        return Response({'success': 0, 'message': str(e)})

    
class ClientFeedbackViewSet(ModelViewSet):
    queryset = ClientFeedback.objects.all().order_by('-id')
    serializer_class = ClientFeedbackSerializer
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # try:
            queryset = ClientFeedback.objects.all().order_by('-id')
            serializer = ClientFeedbackSerializer(queryset, many=True)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def retrieve(self, request, pk, *args, **kwargs):
        # try:
            user = ClientFeedback.objects.get(pk=pk)
            serializer = ClientFeedbackSerializer(user)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error retrieving Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found'})

    def create(self, request, *args, **kwargs):
        # Ensure that the tenant attribute exists in the request object
        if hasattr(request, 'tenant') and request.tenant:
            try:
                # Create a mutable copy of the request data
                mutable_data = request.data.copy()
                
                # Associate the tenant with the new ClientFeedback object
                mutable_data['tenant'] = request.tenant.id
                
                serializer = ClientFeedbackSerializer(data=mutable_data)
                serializer.is_valid(raise_exception=True)
                serializer.save()

                return Response({'success': 1, 'message': 'Data Created Successfully', 'result': serializer.data}, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response({'success': 0, 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'success': 0, 'message': 'Tenant not found in the request'}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk, *args, **kwargs):
        # try:
            chp = ClientFeedback.objects.get(pk=pk)
            serializer = ClientFeedbackSerializer(chp, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Log successful creation
            # logging.info(f'Data Updated Successfully: {serializer.data}')
            return Response({'success': 1, 'message': 'Data Updated', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def destroy(self, request, pk, *args, **kwargs):
        # try:
            user = ClientFeedback.objects.get(pk=pk)
            user.delete()
            return Response({'success': 1, 'message': 'Data Deleted'})
    
class ToolFeedbackViewSet(ModelViewSet):
    queryset = ToolFeedback.objects.all().order_by('-id')
    serializer_class = ToolFeedbackSerializer
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            queryset = ToolFeedback.objects.all().order_by('-id')
            serializer = ToolFeedbackSerializer(queryset, many=True)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        except Exception as e:
            logging.error(f'Error listing Complaint: {str(e)}')
            return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def retrieve(self, request, pk, *args, **kwargs):
        try:
            user = ToolFeedback.objects.get(pk=pk)
            serializer = ToolFeedbackSerializer(user)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        except Exception as e:
            logging.error(f'Error retrieving Complaint: {str(e)}')
            return Response({'success': 0, 'message': 'Not Found'})

    def create(self, request, *args, **kwargs):
        # Ensure that the tenant attribute exists in the request object
    
        if hasattr(request, 'tenant') and request.tenant:
            try:
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                
                # Associate the tenant with the new ToolFeedback object
                serializer.validated_data['tenant'] = request.tenant
                
                self.perform_create(serializer)

                # Log success message
                logger.info('Data Created Successfully: %s', serializer.data)

                headers = self.get_success_headers(serializer.data)
                return Response({'success': 1, 'message': 'Data Created Successfully', 'result': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

            except Exception as e:
                # Log exception
                logger.exception('Error creating data: %s', str(e))
                
                return Response({'success': 0, 'message': 'Failed to create data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            # Log tenant not found
            logger.warning('Tenant not found in the request')
            
            return Response({'success': 0, 'message': 'Tenant not found in the request'}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk, *args, **kwargs):
        try:
            chp = ToolFeedback.objects.get(pk=pk)
            serializer = ToolFeedbackSerializer(chp, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Log successful creation
            logging.info(f'Data Updated Successfully: {serializer.data}')
            return Response({'success': 1, 'message': 'Data Updated', 'result': serializer.data})
        except Exception as e:
            logging.error(f'Error listing Complaint: {str(e)}')
            return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def destroy(self, request, pk, *args, **kwargs):
        # try:
            user = ToolFeedback.objects.get(pk=pk)
            user.delete()
            return Response({'success': 1, 'message': 'Data Deleted'})
    

@api_view(['GET'])
def get_feedback_tenant_wise(request):
    if request.method == 'GET':
        # Assuming you have a 'tenant' attribute in your request object
        # It's assumed that you're using Django Tenant Schemas or similar multi-tenancy setup
        if hasattr(request, 'tenant') and request.tenant:
            # Construct the SQL query to retrieve feedback for the current tenant from the public schema
            query = """
                SELECT * 
                FROM public.saasapp_clientfeedback 
                WHERE tenant_id = %s
            """
            # Execute the query using a cursor
            with connection.cursor() as cursor:
                cursor.execute(query, [request.tenant.id])
                feedback_data = cursor.fetchall()  # Fetch all rows

            # Convert each row into a dictionary
            formatted_feedback = []
            for row in feedback_data:
                feedback_dict = {
                    'tenant': row[0],  # Assuming the first column is the ID
                    'firstname': row[1],  
                    'lastname': row[2],  
                    'email': row[3],  
                    'mobile_no': row[4],  
                    'feedback': row[5],  
                    
                }
                formatted_feedback.append(feedback_dict)


            # Return the feedback data in the response
            return Response({'success':1,'message':'Data Found','result': formatted_feedback})
        else:
            return Response({'success':0,'message': 'Tenant not found in the request'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'success':0,'message': 'Unsupported method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

@api_view(['GET'])
def get_tool_feedback_tenant_wise(request):
    if request.method == 'GET':
        # Assuming you have a 'tenant' attribute in your request object
        # It's assumed that you're using Django Tenant Schemas or similar multi-tenancy setup
        if hasattr(request, 'tenant') and request.tenant:
            # Construct the SQL query to retrieve feedback for the current tenant from the public schema
            query = """
                SELECT * 
                FROM public.saasapp_toolfeedback 
                WHERE tenant_id = %s
            """
            # Execute the query using a cursor
            with connection.cursor() as cursor:
                cursor.execute(query, [request.tenant.id])
                feedback_data = cursor.fetchall()  # Fetch all rows

            # Convert each row into a dictionary
            formatted_feedback = []
            for row in feedback_data:
                feedback_dict = {
                    'tenant': row[0],  # Assuming the first column is the ID
                    'firstname': row[1],  
                    'lastname': row[2],  
                    'email': row[3],  
                    'mobile_no': row[4],  
                    'feedback': row[5],  
                    
                }
                formatted_feedback.append(feedback_dict)

            # Return the feedback data in the response
            return Response({'success':1,'message':'Data Found','result': formatted_feedback})
        else:
            return Response({'success':0,'message': 'Tenant not found in the request'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'success':0,'message': 'Unsupported method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
class ModuleViewSet(ModelViewSet):
    queryset = Module.objects.all().order_by('-id')
    serializer_class = ModuleSerializer
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # try:
            queryset = Module.objects.all().order_by('-id')
            serializer = ModuleSerializer(queryset, many=True)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def retrieve(self, request, pk, *args, **kwargs):
        # try:
            user = Module.objects.get(pk=pk)
            serializer = ModuleSerializer(user)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error retrieving Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found'})

    def create(self, request, *args, **kwargs):
        try:
            
            serializer = ModuleSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({'success': 1, 'message': 'Data Created Successfully', 'result': serializer.data}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'success': 0, 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def update(self, request, pk, *args, **kwargs):
        # try:
            chp = Module.objects.get(pk=pk)
            serializer = ModuleSerializer(chp, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Log successful creation
            # logging.info(f'Data Updated Successfully: {serializer.data}')
            return Response({'success': 1, 'message': 'Data Updated', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def destroy(self, request, pk, *args, **kwargs):
        # try:
            user = Module.objects.get(pk=pk)
            user.delete()
            return Response({'success': 1, 'message': 'Data Deleted'})
    

class ModuleMappingViewSet(ModelViewSet):
    queryset = ModuleMapping.objects.all().order_by('-id')
    serializer_class = ModuleMappingSerializer
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # try:
            queryset = ModuleMapping.objects.all().order_by('-id')
            serializer = ModuleMappingSerializer(queryset, many=True)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def retrieve(self, request, pk, *args, **kwargs):
        # try:
            user = ModuleMapping.objects.get(pk=pk)
            serializer = ModuleMappingSerializer(user)
            return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error retrieving Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found'})

    def create(self, request, *args, **kwargs):
        try:
            
            serializer = ModuleMappingSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({'success': 1, 'message': 'Data Created Successfully', 'result': serializer.data}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'success': 0, 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def update(self, request, pk, *args, **kwargs):
        # try:
            chp = ModuleMapping.objects.get(pk=pk)
            serializer = ModuleMappingSerializer(chp, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Log successful creation
            # logging.info(f'Data Updated Successfully: {serializer.data}')
            return Response({'success': 1, 'message': 'Data Updated', 'result': serializer.data})
        # except Exception as e:
        #     logging.error(f'Error listing Complaint: {str(e)}')
        #     return Response({'success': 0, 'message': 'Not Found', 'result': serializer.errors})

    def destroy(self, request, pk, *args, **kwargs):
        # try:
            user = ModuleMapping.objects.get(pk=pk)
            user.delete()
            return Response({'success': 1, 'message': 'Data Deleted'})

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_organization_data_only(request):
#     try:
#         logged_in_tenant_id = request.tenant.id
#         print(logged_in_tenant_id)
#         with connection.cursor() as cursor:
#             cursor.execute("""
#                 SELECT 
#                     *
#                 FROM 
#                     saasapp_companyregistration AS c
                
#             """)
#             data = cursor.fetchall()

#             print(data)
            
#             # Process the data if needed
#             processed_data = []
#             for row in data:
#                 # Process each row and append to processed_data list
#                 processed_data.append({
#                         'id': row[0],
#                         'organization_name': row[1]
#                 })
#         return Response({'success': 1,'message':'Data Found','result': processed_data})
        
#     except Exception as e:
#         return Response({'success': 0, 'message': str(e)})
# @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# def get_organization_data_only(request):
#     try:
#         logged_in_tenant_id = request.tenant.id
#         print(logged_in_tenant_id)
        
#         # Retrieve the organization name for the logged-in tenant
#         organization_name = companyRegistration.objects.get(user_id=logged_in_tenant_id).organization_name

#         data={
#             'organization_name': organization_name
#         }
        
#         # Return only the organization name
#         return Response({'success':1,'message':'Data Found','result':data})
        
#     except Exception as e:
#         return Response({'success': 0, 'message': str(e)})
@api_view(['GET'])
def get_organization_data_only(request):
    try:
        logged_in_tenant_id = request.tenant.user_id
        
        
        # Execute SQL query using a cursor
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT organization_name
                FROM saasapp_companyregistration
                WHERE user_id = %s
            """, [logged_in_tenant_id])
            
            # Fetch the result
            row = cursor.fetchone()
            
            # If result is found, extract organization name
            if row:
                organization_name = row[0]
                data = {'organization_name': organization_name}
                return Response({'success': 1, 'message': 'Data Found', 'result': data})
            else:
                return Response({'success': 0, 'message': 'Organization data not found for the logged-in tenant'})
        
    except Exception as e:
        return Response({'success': 0, 'message': str(e)})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_data(request):
    try:
        logged_in_tenant_id = request.tenant.user_id
        print(logged_in_tenant_id)
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT 
                    a.*, 
                    c.*, 
                    t.*
                    
                FROM 
                    saasapp_adminregistration a
                INNER JOIN 
                    saasapp_companyregistration c ON a.user_id = c.user_id
                INNER JOIN 
                    tenant_tenant t ON c.user_id = t.user_id
                
                WHERE 
                    t.user_id = %s;
            """, [logged_in_tenant_id])
            
            data = cursor.fetchall()

         
            
            # Process the data if needed
            processed_data = []
            for row in data:
                # Process each row and append to processed_data list
                processed_data.append({
                        'id': row[0],
                        'first_name': row[1],
                        'last_name': row[2],
                        'email_id': row[3],
                        'contact_no': row[4],
                        # Add other fields from saasapp_adminregistration table
                    
                        
                        'organization_name': row[7],
                        'address1': row[8],
                        'address2': row[9],
                        'city': row[10],
                        'state': row[11],
                        'contry': row[12],
                        'industry_sector': row[13],
                        'zipcode': row[14],
                        'site': row[15],
                        'schema_name': row[18],
                      
                        # 'domain': row[23],
                        #
                    
                })
            
            return Response({'success': 1,'message':'Data Found','result': processed_data})
        
    except Exception as e:
        return Response({'success': 0, 'message': str(e)})

import logging

logger = logging.getLogger(__name__)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_data(request):
    try:
        if request.method in ['PUT', 'PATCH']:
            logged_in_tenant_id = request.tenant.id
            updated_data = request.data
            logger.info("Updated Data: %s", updated_data)
            
            with connection.cursor() as cursor:
                if updated_data.get('first_name'):
                    cursor.execute("""
                        UPDATE saasapp_adminregistration AS a
                        SET
                            first_name = %s
                        WHERE user_id IN (
                            SELECT user_id
                            FROM saasapp_companyregistration
                            WHERE user_id IN (
                                SELECT user_id
                                FROM tenant_tenant
                                WHERE id = %s
                            )
                        )
                    """, [
                        updated_data.get('first_name'),
                        logged_in_tenant_id
                    ])

                if updated_data.get('last_name'):
                    cursor.execute("""
                        UPDATE saasapp_adminregistration AS a
                        SET
                            last_name = %s
                        WHERE user_id IN (
                            SELECT user_id
                            FROM saasapp_companyregistration
                            WHERE user_id IN (
                                SELECT user_id
                                FROM tenant_tenant
                                WHERE id = %s
                            )
                        )
                    """, [
                        updated_data.get('last_name'),
                        logged_in_tenant_id
                    ])
                if updated_data.get('contact_no'):
                    cursor.execute("""
                        UPDATE saasapp_adminregistration AS a
                        SET
                            contact_no = %s
                        WHERE user_id IN (
                            SELECT user_id
                            FROM saasapp_companyregistration
                            WHERE user_id IN (
                                SELECT user_id
                                FROM tenant_tenant
                                WHERE id = %s
                            )
                        )
                    """, [
                        updated_data.get('contact_no'),
                        logged_in_tenant_id
                    ])
                if updated_data.get('email_id'):
                    cursor.execute("""
                        UPDATE saasapp_adminregistration AS a
                        SET
                            email_id = %s
                        WHERE user_id IN (
                            SELECT user_id
                            FROM saasapp_companyregistration
                            WHERE user_id IN (
                                SELECT user_id
                                FROM tenant_tenant
                                WHERE id = %s
                            )
                        )
                    """, [
                        updated_data.get('email_id'),
                        logged_in_tenant_id
                    ])
                if updated_data.get('organization_name'):
                    cursor.execute("""
                        UPDATE saasapp_companyregistration AS c
                        SET
                            organization_name = %s
                        WHERE user_id IN (
                            SELECT user_id
                            FROM tenant_tenant
                            WHERE id = %s
                        )
                    """, [
                        updated_data.get('organization_name'),
                        logged_in_tenant_id
                    ])

                if updated_data.get('address1') or updated_data.get('address2') or updated_data.get('city') or updated_data.get('state') or updated_data.get('country') or updated_data.get('industry_sector') or updated_data.get('zipcode') or updated_data.get('site'):
                    cursor.execute("""
                        UPDATE saasapp_companyregistration AS d
                        SET
                            address1 = %s,
                            address2 = %s,
                            city = %s,
                            state = %s,
                            country = %s,
                            industry_sector = %s,
                            zip_code = %s,
                            site = %s
                        WHERE user_id IN (
                            SELECT user_id
                            FROM tenant_tenant
                            WHERE id = %s
                        )
                    """, [
                        updated_data.get('address1'),
                        updated_data.get('address2'),
                        updated_data.get('city'),
                        updated_data.get('state'),
                        updated_data.get('country'),
                        updated_data.get('industry_sector'),
                        updated_data.get('zip_code'),
                        updated_data.get('site'),
                        logged_in_tenant_id
                    ])

                connection.commit()
                
                return Response({'success': 1, 'message': 'Data Updated Successfully'})
    except Exception as e:
        logger.error("Error updating data: %s", e)
        return Response({'success': 0, 'message': str(e)})   
# @api_view(['GET'])    
# def get_tenant_all(request):
#     try:
#         with connection.cursor() as cursor:
#             cursor.execute("""
#                 SELECT *
#                 FROM tenant_tenant
#             """)
#             tenants = cursor.fetchall()
           
#             tenant_list = []
#             for tenant in tenants:
#                 tenant_dict = {
#                     'id': tenant[0],
#                     'schema_name': tenant[1],
#                 }
#                 tenant_list.append(tenant_dict)
            
#             return JsonResponse({'success':1,'message':'Data Found','result': tenant_list})
#     except Exception as e:
#         return JsonResponse({'success':0,'error': str(e)})
# @api_view(['GET'])
# def get_tenant_all(request):
#     try:
#         with connection.cursor() as cursor:
#             cursor.execute("""
#                 SELECT tenant_tenant.id, tenant_tenant.schema_name, userapp_user.email
#                 FROM tenant_tenant
#                 INNER JOIN userapp_user ON tenant_tenant.user_id = userapp_user.id
#                 WHERE userapp_user.role = '2' 
#             """)
#             tenants = cursor.fetchall()
           
#             tenant_list = []
#             for tenant in tenants:
#                 tenant_dict = {
#                     'id': tenant[0],
#                     'schema_name': tenant[1],
#                     'email': tenant[2]
#                 }
#                 tenant_list.append(tenant_dict)
            
#             return JsonResponse({'success': 1, 'message': 'Data Found', 'result': tenant_list})
#     except Exception as e:
#         return JsonResponse({'success': 0, 'error': str(e)})    

@api_view(['GET'])
def get_tenant_all(request):
    try:
        tenants = Tenant.objects.filter(user__role='2')
        tenant_list = []
        for tenant in tenants:
            email = tenant.user.email if tenant.user else None
            tenant_dict = {
                'id': tenant.id,
                'schema_name': tenant.schema_name,
                'email': email,
                'module':[{'id': module.id, 'name': module.module} for module in Module.objects.all()]
            }
            tenant_list.append(tenant_dict)

        return JsonResponse({'success': 1, 'message': 'Data Found', 'result': tenant_list})
    except Exception as e:
        return JsonResponse({'success': 0, 'error': str(e)})


@api_view(['GET'])
def get_module_all(request):
    try:
        tenants= Module.objects.all()
        tenant_list = []
        for tenant in tenants:
            tenant_dict = {
                'id': tenant.id,
                'module': tenant.module
            }
            tenant_list.append(tenant_dict)

        return JsonResponse({'success': 1, 'message': 'Data Found', 'result': tenant_list})
    except Exception as e:
        return JsonResponse({'success': 0, 'error': str(e)})
        
# @api_view(['GET'])
# def get_tenant_module_wise(request):
#     try:
#         with connection.cursor() as cursor:
#             cursor.execute("""
#                 SELECT *
#                 FROM saasapp_modulemapping    
#             """)
#             tenants = cursor.fetchall()
           
#             tenant_list = []
#             for tenant in tenants:
#                 tenant_dict = {
#                     'id': tenant[0],
#                     'module_type_id': tenant[1],
#                     'tenant_id': tenant[2],
#                     'user_id': tenant[3]
#                 }
#                 tenant_list.append(tenant_dict)
            
#             return JsonResponse({'success': 1, 'message': 'Data Found', 'result': tenant_list})
#     except Exception as e:
#         return JsonResponse({'success': 0, 'error': str(e)})    
# @api_view(['GET'])
# def get_tenant_module_wise(request):
#     try:
#         with connection.cursor() as cursor:
#             cursor.execute("""
#                 SELECT mm.id, mm.module_type_id, t.schema_name, u.email_id
#                 FROM saasapp_modulemapping AS mm
#                 LEFT JOIN tenant_tenant AS t ON mm.tenant_id = t.user_id
#                 LEFT JOIN public.saasapp_adminregistration AS u ON t.user_id = u.user_id
#             """)
#             module_mappings = cursor.fetchall()

#         module_list = []
#         for mapping in module_mappings:
#             module_dict = {
#                 'id': mapping[0],
#                 'module_type_id': mapping[1],
#                 'tenant_name': mapping[2],
#                 'user_email': mapping[3]
#             }
#             module_list.append(module_dict)

#         return JsonResponse({'success': 1, 'message': 'Data Found', 'result': module_list})
#     except Exception as e:
#         return JsonResponse({'success': 0, 'error': str(e)})
@api_view(['GET'])
def get_module_mapping_wise(request):
    try:
        module_mappings = ModuleMapping.objects.all()
        modulemapping=[]
        for module in module_mappings:
            data={
                 
                'tenant':module.tenant.schema_name if module.tenant else None,
                'user_id':module.user_id.email if module.user_id else None,
                'report_type':module.module_type.module if module.module_type else None
            }
            modulemapping.append(data)

        return JsonResponse({'success': 1, 'message': 'Data Found', 'result': modulemapping})
    except Exception as e:
        return JsonResponse({'success': 0, 'error': str(e)})
    
    
@api_view(['GET'])
def get_tenant_module_wise(request):
    try:
        # Assuming you have a way to retrieve the logged-in user's email
        logged_in_user_email = request.tenant.user_id  # Adjust this based on your authentication method
        print(logged_in_user_email,'hello')
        # Get the tenant associated with the logged-in user's email
        logged_in_user_tenant = adminRegistration.objects.get(user_id=logged_in_user_email)

        print(logged_in_user_tenant)

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT mm.user_id_id, mm.module_type_id, t.schema_name, u.email_id
                FROM saasapp_modulemapping AS mm
                LEFT JOIN tenant_tenant AS t ON mm.user_id_id = t.user_id
                LEFT JOIN public.saasapp_adminregistration AS u ON t.user_id = u.user_id
                WHERE mm.user_id_id = %s
            """, [logged_in_user_tenant.user_id])
            module_mappings = cursor.fetchall()

            print(module_mappings)

        if not module_mappings:
            # If no module mappings found, return an empty list for module_type_id
            module = {
                'tenant_name': None,
                'user_email': None,
                'module_type_id': []
            }
        else:
            tenant_name, user_email = module_mappings[0][2], module_mappings[0][3]
            module_type_id = [mapping[1] for mapping in module_mappings]

            module = {
                'tenant_name': tenant_name,
                'user_email': user_email,
                'module_type_id': module_type_id
            }

        return JsonResponse({'success': 1, 'message': 'Data Found', 'result': module})
    except Exception as e:
        return JsonResponse({'success': 0, 'error': str(e)})    


@api_view(['POST'])
def post_create_module_mapping_tenant_wise(request):
    if request.method == 'POST':
        # Extract data from the request
        tenant_id = request.data.get('schema_name')  # Assuming 'schema_name' is the identifier provided
        print(tenant_id)
        user_email = request.data.get('email')
        print(user_email)
        modules = request.data.get('modules', '')  # Assuming 'modules' contains a list of module names, default to empty string
        print(modules)
        is_active = request.data.get('is_active', True)

        # Convert string identifiers to primary keys
        tenant_id = get_pk_from_name(Tenant, tenant_id) if tenant_id else None
        user_id = get_pk_from_email(User, user_email) if user_email else None

        # Split the modules string into individual module names
        modules = [module.strip() for module in modules.split(',') if module.strip()]  # Filter out empty strings

        success_data = []
        error_data = []

        # Delete all existing mappings with the same tenant_id and user_id
        existing_mappings = ModuleMapping.objects.filter(tenant=tenant_id, user_id=user_id)
        existing_mappings.delete()

        for module_name in modules:
            module_id = get_pk_from_module(Module, module_name)

            # Validate data
            if not tenant_id:
                error_data.append({"error": "Invalid tenant ID"})
                continue
            if not user_id:
                error_data.append({"error": "Invalid user ID"})
                continue
            if not module_id:
                error_data.append({"error": f"Invalid module name: {module_name}"})
                continue

            # Create new mapping
            serializer = ModuleMappingSerializer(data={
                "tenant": tenant_id,
                "user_id": user_id,
                "module_type": module_id,
                "is_active": is_active
            })

            if serializer.is_valid():
                serializer.save()
                success_data.append(serializer.data)
            else:
                error_data.append({"error": serializer.errors})


        # Respond with appropriate status and message
        if error_data:
            return Response({'success': 0, 'message': 'Some modules were not saved.', 'errors': error_data},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'success': 1, 'message': 'All modules saved successfully.', 'result': success_data},
                            status=status.HTTP_201_CREATED)

def get_pk_from_name(model_class, name):
    try:
        # Lookup primary key based on name
        instance = model_class.objects.get(schema_name=name)
        return instance.pk
    except model_class.DoesNotExist:
        return None


def get_pk_from_email(model_class, email):
    try:
        # Lookup primary key based on email
        instance = model_class.objects.get(email=email)
        return instance.pk
    except model_class.DoesNotExist:
        return None

import inspect,traceback
def get_pk_from_module(model_class, module):
    try:
        # Lookup primary key based on module name
        instance = model_class.objects.get(module=module)
        return instance.pk
    except model_class.DoesNotExist as e:
        # Get the name of the current function
        current_function = inspect.currentframe().f_code.co_name
        # Log the function name along with the error message
        logger.error(f"Error in function {current_function}: {str(e)}")
        logger.error(traceback.format_exc())  # Log the traceback
        return None
@api_view(['PUT', 'PATCH'])
def update_module_mapping(request, pk):
    try:
        module_mapping = ModuleMapping.objects.get(pk=pk)
    except ModuleMapping.DoesNotExist:
        return Response({'error': 'Module mapping does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ModuleMappingSerializer(module_mapping, data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response({'success':1,'message':'Data Found','result':serializer.data})
    else:
        return Response({'success':0,'message':'Not Found','result':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



