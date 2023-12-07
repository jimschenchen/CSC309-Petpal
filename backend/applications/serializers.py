from rest_framework import serializers
from applications.models import Application
from pets.models import Pet


class ApplicationSerializer(serializers.ModelSerializer):
    """
    Serializer for Application model
    """
    from_user = serializers.PrimaryKeyRelatedField(read_only=True)
    to_user = serializers.PrimaryKeyRelatedField(read_only=True)

    pet_name = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = "__all__"
        # extra_fields = ['pet_name']

        # def get_fields(self):
        #     fields = super(ApplicationSerializer, self).get_fields()
        #     # Add extra fields here
        #     fields.update(self.Meta.extra_fields)
        #     return fields

        def get_pet_name(self, obj):
            # try:
            #     pet = Pet.objects.get(id=obj.pet_id)
            #     return pet.name
            # except Pet.DoesNotExist:
            #     return None
            return "1"


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