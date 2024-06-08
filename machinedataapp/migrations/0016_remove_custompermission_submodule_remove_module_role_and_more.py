# Generated by Django 5.0.3 on 2024-06-08 04:24

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('machinedataapp', '0015_module_submodules_submodule_permissions_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='custompermission',
            name='submodule',
        ),
        migrations.RemoveField(
            model_name='module',
            name='role',
        ),
        migrations.RemoveField(
            model_name='role',
            name='permissions',
        ),
        migrations.RemoveField(
            model_name='submodule',
            name='module',
        ),
        migrations.AddField(
            model_name='role',
            name='modules',
            field=models.ManyToManyField(blank=True, related_name='roles', to='machinedataapp.module'),
        ),
        migrations.AlterField(
            model_name='module',
            name='submodules',
            field=models.ManyToManyField(blank=True, related_name='modules', to='machinedataapp.submodule'),
        ),
        migrations.AlterField(
            model_name='role',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='user_roles', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='submodule',
            name='permissions',
            field=models.ManyToManyField(blank=True, related_name='submodules', to='machinedataapp.custompermission'),
        ),
    ]