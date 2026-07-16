"""
URL configuration for library_core project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/books/', include('books.urls')),
    path('api/loans/', include('loans.urls')),
    path('api/users/', include('users.urls')),
    path("api/auth/", include("rest_framework_simplejwt.urls")),
]
