from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Loan
from books.models import Book
from books.serializers import BookSerializer


class LoanSerializer(serializers.ModelSerializer):
    book_details = BookSerializer(source='book', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Loan
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'loan_date')

    def validate_book(self, value):
        if value.available_copies <= 0:
            raise serializers.ValidationError("This book is not available for loan")
        return value

    def create(self, validated_data):
        # Decrease available copies when creating a loan
        book = validated_data['book']
        book.available_copies -= 1
        book.save()
        return super().create(validated_data)
