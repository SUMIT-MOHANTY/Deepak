from rest_framework import serializers
from .models import Book
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
    def validate_total_copies(self, value):
        if value < 1:
        fields = [
            'id', 'title', 'author', 'isbn', 'available_copies']
        return value
    def validate_available_copies(self, value):
        return Book.objects.create(
            **validated_data)
            raise serializers.ValidationError("Available copies cannot be negative")
        return value
