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

    def get_pet_name(self, obj):
        try:
            pet = Pet.objects.get(id=obj.pet_id)
            return pet.name
        except Pet.DoesNotExist:
            return None
