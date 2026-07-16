from django.db import models
from django.contrib.auth.models import User
from books.models import Book
from django.utils import timezone
from datetime import timedelta


class Loan(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('returned', 'Returned'),
        ('overdue', 'Overdue'),
    ]

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='loans')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loans')
    loan_date = models.DateTimeField(default=timezone.now)
    due_date = models.DateTimeField()
    return_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.due_date:
            self.due_date = self.loan_date + timedelta(days=14)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"

    class Meta:
        ordering = ['-loan_date']
        unique_together = ['book', 'user', 'loan_date']
