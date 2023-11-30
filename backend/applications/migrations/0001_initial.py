# Generated by Django 4.2 on 2023-11-19 23:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("pets", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Application",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        help_text="The name of the applicant", max_length=100
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        help_text="The email of the applicant", max_length=100
                    ),
                ),
                (
                    "additional_information",
                    models.CharField(
                        blank=True,
                        help_text="Additional information provided by the applicant",
                        max_length=400,
                    ),
                ),
                (
                    "last_updated_time",
                    models.DateTimeField(
                        auto_now=True,
                        help_text="The last time the application was updated",
                    ),
                ),
                (
                    "created_time",
                    models.DateTimeField(
                        auto_now_add=True,
                        help_text="The time when the application was created",
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("Accepted", "Accepted"),
                            ("Denied", "Denied"),
                            ("Withdrawn", "Withdrawn"),
                        ],
                        default="Pending",
                        help_text="The current status of the application",
                        max_length=10,
                    ),
                ),
                (
                    "from_user",
                    models.ForeignKey(
                        help_text="The user who is applying for the pet",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="applications_from_user",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "pet",
                    models.ForeignKey(
                        help_text="The pet that the application is for",
                        on_delete=django.db.models.deletion.CASCADE,
                        to="pets.pet",
                    ),
                ),
                (
                    "to_user",
                    models.ForeignKey(
                        help_text="The user who is receiving the application",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="applications_to_user",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
