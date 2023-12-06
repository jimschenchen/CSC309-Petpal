from rest_framework import serializers
from django.urls import reverse

from .models import Notification
from comments.models import Comment
from accounts.models import User
from applications.models import Application


class NotificationRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Comment):
            if isinstance(value.content_object, User):
                return {'type': 'comment-shelter'}
            elif isinstance(value.content_object, Application):
                return {'type':'comment-application', 
                        'application_id': value.content_object.id,
                        'pet_name': value.content_object.pet.name}
        elif isinstance(value, Application):
            return {'type': 'application',
                    'pet_name': value.pet.name}
        raise Exception('Unexpected type of related object')


class NotificationSerializer(serializers.ModelSerializer):
    content_url = serializers.SerializerMethodField()
    content_object = NotificationRelatedField(read_only=True)
    
    class Meta:
        model = Notification
        fields = ['id', 'user', 'content_url', 'content_object', 'action_code', 'is_read', 'creation_time']

    def get_content_url(self, obj):
        if isinstance(obj.content_object, Application):
            return reverse('applications:application', kwargs={'pk': obj.object_id})
        elif isinstance(obj.content_object, Comment):
            return reverse('comments:comment', kwargs={'pk': obj.object_id})
        raise Exception('Unexpected type of content object')
    

class NotificationRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'is_read']
