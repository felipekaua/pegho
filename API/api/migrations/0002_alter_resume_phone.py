# Generated by Django 5.1.2 on 2024-10-30 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resume',
            name='phone',
            field=models.IntegerField(),
        ),
    ]
