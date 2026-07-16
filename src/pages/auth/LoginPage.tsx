if (isAuthenticated && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const validateForm = (): boolean => {
    if (!credentials.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!credentials.password.trim()) {
      setError('Password is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleInputChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find matching user from mock data
      const user = mockUsers.find(u => 
        u.email.toLowerCase() === credentials.email.toLowerCase() &&
        u.password === credentials.password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Login user
      await login(credentials, rememberMe);
      
      // Navigate to dashboard on successful login
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here');
  };

  const fillDemoCredentials = (role: 'admin' | 'librarian' | 'patron') => {
    const demoUser = mockUsers.find(u => u.role === role);
    if (demoUser) {
      setCredentials({
        email: demoUser.email,
        password: demoUser.password
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Library Management System
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Sign in to your account
          </h2>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {error && (
              <Alert type="error" message={error} />
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={handleInputChange('email')}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange('password')}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isLoading}
                className="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader size="sm" className="mr-2" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo credentials section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center">
              Demo Accounts (Click to fill):
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('admin')}
                disabled={isLoading}
                className="text-xs"
              >
                Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('librarian')}
                disabled={isLoading}
                className="text-xs"
              >
                Librarian
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('patron')}
                disabled={isLoading}
                className="text-xs"
              >
                Patron
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Contact your librarian
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;