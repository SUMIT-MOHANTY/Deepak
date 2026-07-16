# Django Library Management System

A comprehensive library management system built with Django backend and modern frontend.

## Features

- **User Management**: Registration, authentication, and profile management
- **Book Management**: Add, edit, delete, and search books
- **Loan Management**: Check out and return books with due date tracking
- **Audit Logs**: Complete audit trail of all system activities

## Models

### Users
- Custom user model with library-specific fields
- Role-based permissions (Admin, Librarian, Member)
- Profile information and preferences

### Books
- Complete book information (title, author, ISBN, genre)
- Availability status and location tracking
- Category and tag management

### Loans
- Book checkout and return tracking
- Due date management and overdue alerts
- Fine calculation and payment tracking

### Audit Logs
- Complete system activity logging
- User action tracking
- Data change history

## Database Configuration

The system uses SQLite for development with the following configuration:
echo 'Fix completed successfully'
