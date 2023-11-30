from rest_framework import serializers
from django.urls import reverse

from .models import Notification
from comments.models import Comment
from applications.models import Application


class NotificationRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Comment):
            return 'comment_id:' + str(value.id)
        elif isinstance(value, Application):
            return 'application_id: ' + str(value.id)
        raise Exception('Unexpected type of related object')


class NotificationSerializer(serializers.ModelSerializer):
    content_object = NotificationRelatedField(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'user', 'content_object', 'action_code', 'is_read', 'creation_time']


class NotificationRetrieveSerializer(serializers.ModelSerializer):
    content_url = serializers.SerializerMethodField()
    content_object = NotificationRelatedField(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'user', 'content_object', 'action_code', 'content_url', 'creation_time']

    def get_content_url(self, obj):
        if isinstance(obj.content_object, Application):
            return reverse('applications:application', kwargs={'pk': obj.object_id})
        elif isinstance(obj.content_object, Comment):
            return reverse('comments:comment', kwargs={'pk': obj.object_id})
        raise Exception('Unexpected type of content object')
