# Generated by Django 5.0.3 on 2024-06-08 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('machinedataapp', '0016_remove_custompermission_submodule_remove_module_role_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]