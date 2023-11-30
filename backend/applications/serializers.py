from rest_framework import serializers
from applications.models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    """
    Serializer for Application model
    """
    from_user = serializers.PrimaryKeyRelatedField(read_only=True)
    to_user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Application
        fields = "__all__"
        # exclude = ['to_user', 'from_user']
        # extra_kwargs = {
        #     'from_user': {'read_only': True},
        #     'to_user': {'read_only': True}
        # }

        # def save(self, **kwargs):
            # print("save")
            # return super().save(**kwargs)
            # pass

        # def is_valid(self, raise_exception=False):
            # print("is_valid")
            # return super().is_valid(raise_exception)
            # pass

        # def create(self, validated_data):
            # automatically save from_user and to_user
            # from_user = self.context['request'].user
            # pet = validated_data.get('pet')
            # to_user= pet.shelter

            # print("create")

            # if not self.context['request'] or not self.context['request'].user:
            #     raise serializers.ValidationError("User must be logged in.")
            # if not pet or not pet.shelter:
            #     raise serializers.ValidationError("Pet or Shelter not found.")

            # application = Application.objects.create(
            #     from_user=from_user,
            #     to_user=to_user,
            #     **validated_data
            # )
            # return application
            # pass