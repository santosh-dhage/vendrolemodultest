# Generated by Django 5.0.3 on 2024-05-29 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('machinedataapp', '0009_ticket_machine_map'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='priority',
            field=models.CharField(default='LOW', max_length=10),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='status',
            field=models.CharField(default='CREATED', max_length=20),
        ),
    ]
