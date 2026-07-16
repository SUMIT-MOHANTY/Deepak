if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const authenticateUser = (email: string, password: string): User | null => {
    // Mock authentication using mockData
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return null;
    }

    // Simple password validation (in production, this would be handled securely on backend)
    const expectedPassword = user.role.toLowerCase() + '123'; // Simple pattern for mock
    if (password !== expectedPassword) {
      return null;
    }

    return user;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Attempt authentication
      const authenticatedUser = authenticateUser(formData.email, formData.password);
      
      if (!authenticatedUser) {
        setErrors({ general: 'Invalid email or password. Please try again.' });
        return;
      }

      // Login successful
      await login(authenticatedUser);
      
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        general: 'An unexpected error occurred. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = (role: string) => {
    const demoUser = mockUsers.find(u => u.role.toLowerCase() === role.toLowerCase());
    if (demoUser) {
      setFormData({
        email: demoUser.email,
        password: role.toLowerCase() + '123'
      });
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Library Management System
            </h1>
            <h2 className="mt-2 text-center text-xl text-gray-600">
              Sign in to your account
            </h2>
          </div>

          <Card className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errors.general && (
                <Alert variant="error" className="mb-4">
                  {errors.general}
                </Alert>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={errors.email}
                  placeholder="Enter your email"
                  disabled={isSubmitting || isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={errors.password}
                  placeholder="Enter your password"
                  disabled={isSubmitting || isLoading}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isLoading}
                loading={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('Admin')}
                  disabled={isSubmitting || isLoading}
                  className="text-xs"
                >
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('Librarian')}
                  disabled={isSubmitting || isLoading}
                  className="text-xs"
                >
                  Librarian
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('Patron')}
                  disabled={isSubmitting || isLoading}
                  className="text-xs"
                >
                  Patron
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Demo passwords follow the pattern: [role]123</p>
              <p className="mt-1">e.g., admin123, librarian123, patron123</p>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default LoginPage;