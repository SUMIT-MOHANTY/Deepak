if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchBooks();
  }, [isAuthenticated, navigate, fetchBooks]);

  useEffect(() => {
    if (books.length > 0) {
      const availableCount = books.filter(book => book.status === 'Available').length;
      const checkedOutCount = books.filter(book => book.status === 'Checked Out').length;
      
      setStats({
        totalBooks: books.length,
        availableBooks: availableCount,
        checkedOutBooks: checkedOutCount,
        totalUsers: 25 // Mock data - would come from API in real implementation
      });
    }
  }, [books]);

  const handleViewCatalog = () => {
    navigate('/catalog');
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          Error loading dashboard: {error}
        </div>
      </div>
    );
  }

  const recentBooks = books.slice(0, 5);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Library Dashboard</h1>
        <p>Welcome back, {user?.firstName || 'User'}!</p>
      </div>

      {/* KPI Summary Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon books-icon"></div>
          <div className="kpi-content">
            <h3>Total Books</h3>
            <div className="kpi-value">{stats.totalBooks}</div>
          </div>
        </div>

        <div className="kpi-card available">
          <div className="kpi-icon available-icon"></div>
          <div className="kpi-content">
            <h3>Available</h3>
            <div className="kpi-value">{stats.availableBooks}</div>
          </div>
        </div>

        <div className="kpi-card checked-out">
          <div className="kpi-icon checked-out-icon"></div>
          <div className="kpi-content">
            <h3>Checked Out</h3>
            <div className="kpi-value">{stats.checkedOutBooks}</div>
          </div>
        </div>

        <div className="kpi-card users">
          <div className="kpi-icon users-icon"></div>
          <div className="kpi-content">
            <h3>Total Users</h3>
            <div className="kpi-value">{stats.totalUsers}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Quick Actions</h2>
        </div>
        <div className="quick-actions">
          <button 
            className="action-button primary"
            onClick={handleViewCatalog}
          >
            Browse Catalog
          </button>
          <button 
            className="action-button secondary"
            onClick={() => navigate('/books/add')}
          >
            Add New Book
          </button>
          <button 
            className="action-button secondary"
            onClick={() => navigate('/loans')}
          >
            View Loans
          </button>
        </div>
      </div>

      {/* Recent Books */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Books</h2>
          <button 
            className="view-all-button"
            onClick={handleViewCatalog}
          >
            View All
          </button>
        </div>
        
        {recentBooks.length > 0 ? (
          <div className="books-grid">
            {recentBooks.map((book: Book) => (
              <div 
                key={book.id}
                className="book-card"
                onClick={() => handleBookClick(book.id)}
              >
                <div className="book-cover">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt={book.title} />
                  ) : (
                    <div className="book-cover-placeholder">
                      {book.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="book-info">
                  <h4 className="book-title">{book.title}</h4>
                  <p className="book-author">{book.author}</p>
                  <div className={`book-status ${book.status.toLowerCase().replace(' ', '-')}`}>
                    {book.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No books available. Add some books to get started!</p>
            <button 
              className="action-button primary"
              onClick={() => navigate('/books/add')}
            >
              Add First Book
            </button>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>System Status</h2>
        </div>
        <div className="status-grid">
          <div className="status-item">
            <span className="status-label">Database</span>
            <span className="status-indicator online">Online</span>
          </div>
          <div className="status-item">
            <span className="status-label">API</span>
            <span className="status-indicator online">Online</span>
          </div>
          <div className="status-item">
            <span className="status-label">Last Backup</span>
            <span className="status-time">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;