from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.functional import cached_property

User = settings.AUTH_USER_MODEL


class Pet(models.Model):
    # Status Choices
    AVAILABLE = 'available'
    PENDING = 'pending'
    ADOPTED = 'adopted'
    WITHDRAWN = 'withdrawn'
    STATUS_CHOICES = [
        (AVAILABLE, 'Available'),
        (PENDING, 'Pending'),
        (ADOPTED, 'Adopted'),
        (WITHDRAWN, 'Withdrawn'),
    ]

    # Gender Choices
    MALE = 'male'
    FEMALE = 'female'
    OTHER = 'other'
    GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other'),
    ]

    # Size choice
    SMALL = '1'
    MEDIUM = '2'
    LARGE = '3'
    SIZE_CHOICES = [
        (SMALL, 'small'),
        (MEDIUM, 'medium'),
        (LARGE, 'large'),
    ]

    shelter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pets')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=AVAILABLE)
    # image = models.ImageField(upload_to='pets/', null=True, blank=True, default='static/images/default_pet_image.png')

    image = models.ImageField(
        blank=True,
        null=True,
        default='static/images/default_pet_image.png'
    )

    @cached_property
    def default_image(self):
        return 'static/images/default_pet_image.png'  # Path to the default pet image

    def save(self, *args, **kwargs):
        if not self.image:
            self.image = self.default_image
        super().save(*args, **kwargs)

    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    size = models.CharField(max_length=100, choices=SIZE_CHOICES)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    description = models.TextField(blank=True, null=True)
    medical_history = models.TextField(blank=True, null=True)
    behavior = models.TextField(blank=True, null=True)
    addition = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
