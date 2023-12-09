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

    def create(self, validated_data):
        validated_data['sender'] = self.context['sender']
        validated_data['shelter'] = self.context['shelter']
        return super().create(validated_data)


class CommentSerializer(serializers.ModelSerializer):
    content_object = CommentRelatedField(read_only=True)
    sender_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'sender', 'content_object', 'message', 'creation_time', 'sender_name', 'rating']
        read_only_fields = ['id', 'sender', 'content_object', 'creation_time', 'sender_name']

    def get_sender_name(self, obj):
        try:
            sender = User.objects.get(id=obj.sender_id)
            return sender.name
        except User.DoesNotExist:
            return None

    def create(self, validated_data):
        validated_data['sender'] = self.context['sender']
        validated_data['content_object'] = self.context['content_object']
        return super().create(validated_data)
