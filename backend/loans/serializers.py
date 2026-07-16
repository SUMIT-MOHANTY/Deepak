from rest_framework import serializers
from .models import Loan
from books.serializers import BookSerializer


class LoanSerializer(serializers.ModelSerializer):
    book_details = BookSerializer(source='book', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Loan
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'loan_date')

    def validate(self, data):
        if data.get('book') and data['book'].available_copies < 1:
            raise serializers.ValidationError("Book is not available for loan")
        return data
