from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext_lazy as _
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # content generic foreign key referencing comment or application
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    is_read = models.BooleanField(default=False)

    # identify which action is this notification referring to
    class Action(models.TextChoices):
        UPDATE = "U", _("Update")
        CREATE = "C", _("Create")
    action_code = models.CharField(max_length=2, choices=Action.choices)

    # timestamp for creation time
    creation_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]


def create_notification(user, content_object, action_code):
    notification = Notification(user=user, content_object=content_object, action_code=action_code)
    notification.save()
