from rest_framework import serializers
from applications.models import Application
from comments.models import Comment
from accounts.models import User


class CommentRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, User):
            return 'shelter_id:' + str(value.id)
        elif isinstance(value, Application):
            return 'application_id: ' + str(value.id)
        raise Exception('Unexpected type of related object')


class CommentSerializer(serializers.ModelSerializer):
    content_object = CommentRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'sender', 'content_object', 'message', 'creation_time']
        read_only_fields = ['id', 'sender', 'content_object', 'creation_time']
