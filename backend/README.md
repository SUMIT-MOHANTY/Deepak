# Library Management System

A comprehensive library management system built with Django REST Framework backend and React frontend, featuring JWT authentication, book management, and loan tracking.

##  Features

### Authentication & Authorization
- JWT-based authentication
- User registration and login
- Role-based access control (Admin, Librarian, Member)
- Password reset functionality

### Book Management
- Add, edit, delete books
- Book search and filtering
- ISBN validation
- Category management
- Author management
- Book availability tracking

### Loan Management
- Check out books
- Return books
- Due date tracking
- Overdue notifications
- Loan history
- Fine calculations

### Audit & Reporting
- Complete audit trail
- User activity logs
- System event tracking
- Reporting dashboard

##  Tech Stack

### Backend
- **Framework**: Django 4.2+ with Django REST Framework
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Authentication**: JWT (djangorestframework-simplejwt)
- **API Documentation**: drf-spectacular (OpenAPI/Swagger)

### Frontend
- **Framework**: React 18.2+
- **UI Library**: Material-UI (MUI) 5
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Form Handling**: Formik + Yup
- **State Management**: React Context API

### DevOps
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx (production)
- **Process Manager**: Gunicorn (production)

##  Prerequisites

- Docker 20.0+
- Docker Compose 2.0+
- Node.js 16+ (for local development)
- Python 3.9+ (for local development)
- Git

##  Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
