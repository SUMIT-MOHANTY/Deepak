if (isAuthPage) {
    return <>{children || <Outlet />}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          onMenuClick={toggleSidebar}
          onLogout={handleLogout}
        />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {children || <Outlet />}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span>© 2024 Library Management System</span>
                <Link 
                  to="/help" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Help
                </Link>
                <Link 
                  to="/privacy" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
              <div className="mt-2 sm:mt-0">
                <span>Version 1.0.0</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;