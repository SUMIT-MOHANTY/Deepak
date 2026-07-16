if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@library.local',
                password='admin123'
            )
            print("Default superuser created: admin/admin123")
    except Exception as e:
        print(f"Error creating superuser: {e}")

def initialize_database():
    """Initialize database with migrations and default data."""
    try:
        # Run migrations
        execute_from_command_line(['manage.py', 'makemigrations'])
        execute_from_command_line(['manage.py', 'migrate'])
        
        # Create superuser
        create_superuser()
        
        print("Database initialized successfully")
        
    except Exception as e:
        print(f"Error initializing database: {e}")
        sys.exit(1)

def run_server(host='127.0.0.1', port='8000'):
    """Run the Django development server."""
    try:
        execute_from_command_line(['manage.py', 'runserver', f'{host}:{port}'])
    except KeyboardInterrupt:
        print("\nServer stopped")
    except Exception as e:
        print(f"Error running server: {e}")
        sys.exit(1)

def main():
    """Main application entry point."""
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == 'init':
            initialize_database()
        elif command == 'runserver':
            host = sys.argv[2] if len(sys.argv) > 2 else '127.0.0.1'
            port = sys.argv[3] if len(sys.argv) > 3 else '8000'
            run_server(host, port)
        elif command == 'migrate':
            execute_from_command_line(['manage.py', 'migrate'])
        elif command == 'makemigrations':
            execute_from_command_line(['manage.py', 'makemigrations'])
        elif command == 'shell':
            execute_from_command_line(['manage.py', 'shell'])
        elif command == 'collectstatic':
            execute_from_command_line(['manage.py', 'collectstatic', '--noinput'])
        else:
            # Pass through to Django management
            execute_from_command_line(['manage.py'] + sys.argv[1:])
    else:
        print("Library Management System")
        print("Available commands:")
        print("  init         - Initialize database and create superuser")
        print("  runserver    - Start development server")
        print("  migrate      - Run database migrations")
        print("  makemigrations - Create new migrations")
        print("  shell        - Open Django shell")
        print("  collectstatic - Collect static files")

if __name__ == '__main__':
    main()