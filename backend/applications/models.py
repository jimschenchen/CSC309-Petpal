from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from notifications.models import Notification
from pets.models import Pet
from django.conf import settings
User = settings.AUTH_USER_MODEL

from comments.models import Comment

# Create your models here.
class Application(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications_from_user', help_text="The user who is applying for the pet")
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications_to_user', help_text="The user who is receiving the application")
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, help_text="The pet that the application is for")
    name = models.CharField(max_length=100, help_text="The name of the applicant")
    email = models.EmailField(max_length=100, help_text="The email of the applicant")
    additional_information = models.CharField(max_length=400, blank=True, help_text="Additional information provided by the applicant")
    last_updated_time = models.DateTimeField(auto_now=True, help_text="The last time the application was updated")
    created_time = models.DateTimeField(auto_now_add=True, help_text="The time when the application was created")

    # Status choices
    PENDING = 'Pending'
    ACCEPTED = 'Accepted'
    DENIED = 'Denied'
    WITHDRAWN = 'Withdrawn'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (DENIED, 'Denied'),
        (WITHDRAWN, 'Withdrawn'),
    ]

    # Status field
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=PENDING,
        help_text="The current status of the application"
    )

    comments = GenericRelation(Comment)
    notifications = GenericRelation(Notification)

    def __str__(self):
        return self.name