from rest_framework import serializers

from .models import Pet


class ChoiceField(serializers.ChoiceField):

    def to_representation(self, obj):
        if obj == '' and self.allow_blank:
            return obj
        return self._choices[obj]

    def to_internal_value(self, data):
        # To support inserts with the value
        if data == '' and self.allow_blank:
            return ''

        for key, val in self._choices.items():
            if val == data:
                return key
        self.fail('invalid_choice', input=data)


class PetSerializer(serializers.ModelSerializer):
    size = ChoiceField(choices=Pet.SIZE_CHOICES)

    class Meta:
        model = Pet
        fields = ['id', 'shelter', 'status', 'image', 'name', 'breed', 'color', 'size', 'age', 'gender', 'description',
                  'medical_history', 'behavior', 'addition']
        read_only_fields = ['id', 'shelter']

