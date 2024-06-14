"""
Django settings for mqttwinding project.

Generated by 'django-admin startproject' using Django 5.0.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent



# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-er!i@o@_kz68dsr-+m9r_wk8(8ky#ql@a4eb^xpsgn=xqm1ii('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

DATABASE_ROUTERS = ('django_tenants.routers.TenantSyncRouter', )

SHARED_APPS = [
    'django_tenants',  # mandatory
    'tenant',  # you must list the app where your tenant model resides in
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'userapp',
    'machinedataapp',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_otp',
    # we place blog here since we want
    # public schema to have the same structure like tenant apps
    # 'free',
    # 'basic',
    'saasapp',
    #'rest-framework',
    'django.contrib.sitemaps',
]
"""
    These app's data are stored on their specific schemas
"""
TENANT_APPS = [
    # The following Django contrib apps must be in TENANT_APPS
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'userapp',
    'machinedataapp',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_otp',
    'django_extensions',

    # tenant-specific apps
    # 'free',
    # 'basic',
    # 'saasapp',
    #'rest-framework',
]

INSTALLED_APPS = list(SHARED_APPS) + [
    app for app in TENANT_APPS if app not in SHARED_APPS
]
# Application definition


MIDDLEWARE = [
     # django tenant middleware
    'django_tenants.middleware.main.TenantMainMiddleware',

    # custom tenant middleware
    'vendsoft.middleware.TenantMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'userapp.middleware.RemoveApiKeyHeaderMiddleware',
]

ROOT_URLCONF = 'vendsoft.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'build'),os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'vendsoft.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

AUTH_USER_MODEL = 'userapp.User'

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django_tenants.postgresql_backend',
        'NAME': 'vendsoft2',
        'USER':'postgres',
        'PASSWORD':'1234',
        'HOST':'localhost',
        'PORT':'5432'
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
from django.utils import timezone


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT=os.path.join(BASE_DIR,'static')


# media path

# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# STATIC_ROOT=os.path.join(BASE_DIR,'static')
STATICFILES_DIRS=[
    os.path.join(BASE_DIR,'build','static'),
]



MEDIA_URL = '/media/'
DEFAULT_FILE_STORAGE = 'django_tenants.files.storages.TenantFileSystemStorage'
MEDIA_ROOT = os.path.join(BASE_DIR, 'public', 'media')

#tenant
TENANT_MODEL = "tenant.Tenant"

TENANT_DOMAIN_MODEL = "tenant.Domain"

API_KEY = 'f4fd127ec8f0406e'


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST_FRAMEWORK = {
#      'DEFAULT_AUTHENTICATION_CLASSES': (
#      'userapp.verify.JWTAuthentication',
#     ), 
#     # 'DEFAULT_AUTHENTICATION_CLASSES': [
#     #     'rest_framework_simplejwt.authentication.JWTAuthentication',
#     # ], 
# }
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'userapp.verify.JWTAuthentication',

        
    ),
    # 'DEFAULT_PERMISSION_CLASSES': (
    #     'rest_framework.permissions.IsAuthenticated',
    # ),
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file_payment': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'log/payment_logs.log',  # Path to your payment log file
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'payment_logger': {
            'handlers': ['file_payment'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=90),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=90),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,

    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    "JTI_CLAIM": "jti",
}

# SIMPLE_JWT = {
#     "ACCESS_TOKEN_LIFETIME": timedelta(minutes=90),
#     "REFRESH_TOKEN_LIFETIME": timedelta(days=90),
#     "ROTATE_REFRESH_TOKENS": False,
#     "BLACKLIST_AFTER_ROTATION": False,
#     "UPDATE_LAST_LOGIN": False,

   
#     "AUTH_HEADER_TYPES": ("Bearer",),
#     "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
#     "USER_ID_FIELD": "id",
#     "USER_ID_CLAIM": "user_id",
#     "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

#     "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
#     "TOKEN_TYPE_CLAIM": "token_type",
#     "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

#     "JTI_CLAIM": "jti",

    
# }
AUTHENTICATION_CLASSES = [
    'rest_framework.authentication.TokenAuthentication',
    'rest_framework.authentication.SessionAuthentication',
]

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
  "Accept",
  "Accept-Language",
  "Authorization",
  "Cache-Control",
  "Content-Type",
  "DNT",
  "If-Modified-Since",
  "Keep-Alive",
  "Origin",
  "User-Agent",
  "X-Requested-With",
  "X-CSRF-Token",
  "X-XSRF-Token",
  "X-Forwarded-For",
  "X-Real-IP",
  "X-Custom-Header",
  "X-Api-Key"
]


# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_USE_TLS = True
# EMAIL_PORT = 587
# EMAIL_HOST_USER = 'rajputritik030@gmail.com'
# EMAIL_HOST_PASSWORD = 'bwnvrocgqxtzwgzt'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = 'no-reply@itsm-indeftts.com'
EMAIL_HOST = 'smtp.office365.com'
EMAIL_HOST_USER = 'no-reply@itsm-indeftts.com'
EMAIL_HOST_PASSWORD = 'Secure@2022'
EMAIL_USE_TLS = True
EMAIL_PORT = 587


# Example ALLOWED_HOSTS section
# ALLOWED_HOSTS = ['localhost', '127.0.0.1'] #, 'yourfrontend.com'

# # Add or modify the FRONTEND_URL
FRONTEND_URL = 'http://localhost:3000'

# use for er-diagram create
# GRAPH_MODELS = {
#   'all_applications': True,
#   'group_models': True,
# }

# CRONJOBS = [
#     ('50 14 12 2 *', 'mymqttapp.cron'),
#     # ('0 10 * * 6', 'cioexit.corn.weekly_scheduled_job'),
# ]