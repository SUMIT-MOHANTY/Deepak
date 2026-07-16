"""Django's command-line utility for administrative tasks."""
import os
import sys
def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'library_core.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    # Custom management commands for library system
    if len(sys.argv) > 1:
        command = sys.argv[1]
        # Handle custom commands
        if command == 'setup_demo_data':
            setup_demo_data()
            return
        elif command == 'check_api':
            check_api_endpoints()
            return
        elif command == 'migrate_and_load':
            execute_from_command_line(['manage.py', 'migrate'])
        os.environ.setdefault(
            'DJANGO_SETTINGS_MODULE', 'library_core.settings')
            setup_demo_data()
            return
    execute_from_command_line(sys.argv)
def setup_demo_data():
    """Setup demo data for library system."""
    import django
    django.setup()
    try:
        from django.contrib.auth.models import User
        from books.models import Book
        print("Setting up demo data...")
        # Create superuser if not exists
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@library.com',
                password='admin123'
            )
            print(" Admin user created")
        # Create demo books if not exists
        demo_books = [
            {
                'title': 'The Great Gatsby',
                'author': 'F. Scott Fitzgerald',
                'isbn': '9780743273565',
                'publication_year': 1925,
                'available_copies': 5
            },
            {
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'isbn': '9780446310789',
                'publication_year': 1960,
                'available_copies': 3
            },
            {
                'title': '1984',
                'author': 'George Orwell',
                'isbn': '9780451524935',
                'publication_year': 1949,
                'available_copies': 4
            },
            {
                'title': 'Pride and Prejudice',
                'author': 'Jane Austen',
                'isbn': '9780141439518',
                'publication_year': 1813,
                'available_copies': 2
            }
        ]
        for book_data in demo_books:
            book, created = Book.objects.get_or_create(
                isbn=book_data['isbn'],
                defaults=book_data
            )
            if created:
                print(f" Created book: {book.title}")
        print(" Demo data setup complete!")
    except Exception as e:
        print(f" Error setting up demo data: {str(e)}")
        sys.exit(1)
def check_api_endpoints():
    """Check if API endpoints are properly configured."""
    import django
    django.setup()
    try:
        from django.test import Client
        client = Client()
        endpoints = [
            '/api/books/',
            '/api/loans/',
            '/api/users/',
            '/admin/'
        ]
        print("Checking API endpoints...")
        for endpoint in endpoints:
            try:
                response = client.get(endpoint)
                status = "" if response.status_code < 500 else ""
                print(f"{status} {endpoint} - Status: {response.status_code}")
            except Exception as e:
                print(f" {endpoint} - Error: {str(e)}")
    except Exception as e:
        print(f" Error checking API endpoints: {str(e)}")
if __name__ == '__main__':
    main()
