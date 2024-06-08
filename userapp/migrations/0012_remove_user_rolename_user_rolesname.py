# Generated by Django 5.0.3 on 2024-06-07 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('machinedataapp', '0015_module_submodules_submodule_permissions_and_more'),
        ('userapp', '0011_remove_user_custom_permissions_user_permissions_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='rolename',
        ),
        migrations.AddField(
            model_name='user',
            name='rolesname',
            field=models.ManyToManyField(blank=True, related_name='users_rolesname_permisiiom', to='machinedataapp.role'),
        ),
    ]
