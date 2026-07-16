from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def validate_total_copies(self, value):
        if value < 1:
            raise serializers.ValidationError("Total copies must be at least 1")
        return value

    def validate_available_copies(self, value):
        if value < 0:
            raise serializers.ValidationError("Available copies cannot be negative")
        return value
