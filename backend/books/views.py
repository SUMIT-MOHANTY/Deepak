from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .models import Book
from .serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchBackend, filters.OrderingFilter]
    filterset_fields = ['author', 'available_copies']
    search_fields = ['title', 'author', 'isbn']
    ordering_fields = ['title', 'author', 'publication_date']
    ordering = ['title']

    @action(detail=False, methods=['get'])
    def available(self, request):
        """Get books with available copies"""
        available_books = Book.objects.filter(available_copies__gt=0)
        serializer = self.get_serializer(available_books, many=True)
        return Response(serializer.data)
