from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.conf import settings

from notifications.models import Notification

User = settings.AUTH_USER_MODEL


class Comment(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)

    # content generic foreign key referencing shelter or application
    limit = models.Q(app_label='accounts', model='User') | models.Q(app_label='applications', model='application')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    # timestamp for creation time
    creation_time = models.DateTimeField(auto_now_add=True)

    message = models.TextField()
    image = models.ImageField(null=True)

    notifications = GenericRelation(Notification)


class Rating(models.Model):
    seeker = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rating_seeker")
    shelter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rating_shelter")
    rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
