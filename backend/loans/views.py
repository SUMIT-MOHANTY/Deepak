from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.utils import timezone
from .models import Loan
from .serializers import LoanSerializer


class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'user', 'book']
    ordering_fields = ['loan_date', 'due_date', 'return_date']
    ordering = ['-loan_date']

    def get_queryset(self):
        # Users can only see their own loans unless staff
        if self.request.user.is_staff:
            return Loan.objects.all()
        return Loan.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def return_book(self, request, pk=None):
        """Mark a loan as returned"""
        loan = self.get_object()
        if loan.status == 'returned':
            return Response({'error': 'Book already returned'}, status=400)

        loan.return_date = timezone.now()
        loan.status = 'returned'
        loan.save()

        # Increase available copies
        loan.book.available_copies += 1
        loan.book.save()

        serializer = self.get_serializer(loan)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_loans(self, request):
        """Get current user's loans"""
        user_loans = Loan.objects.filter(user=request.user)
        serializer = self.get_serializer(user_loans, many=True)
        return Response(serializer.data)
