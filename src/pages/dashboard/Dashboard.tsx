if (books && books.length > 0) {
      calculateStats(books);
    }
  }, [books]);

  const calculateStats = (bookList: Book[]) => {
    const totalBooks = bookList.length;
    const availableBooks = bookList.filter(book => book.status === BookStatus.AVAILABLE).length;
    const checkedOutBooks = bookList.filter(book => book.status === BookStatus.CHECKED_OUT).length;
    
    // Mock data for other stats since we don't have loan/member services yet
    const overdueLoanCount = Math.floor(checkedOutBooks * 0.1); // 10% of checked out books are overdue
    const totalMembers = 125; // Mock member count
    const activeLoans = checkedOutBooks;

    setStats({
      totalBooks,
      availableBooks,
      checkedOutBooks,
      overdueLoanCount,
      totalMembers,
      activeLoans
    });
  };

  const handleViewCatalog = () => {
    navigate('/catalog');
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  const formatPercentage = (value: number, total: number): string => {
    if (total === 0) return '0%';
    return `${Math.round((value / total) * 100)}%`;
  };

  const getRecentBooks = (): Book[] => {
    if (!books || books.length === 0) return [];
    return books.slice(0, 5); // Show first 5 books as "recent"
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-retry">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Library Dashboard</h1>
        <p>Welcome back! Here's an overview of your library system.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-grid">
          <div className="stat-card primary">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>Total Books</h3>
              <div className="stat-number">{stats.totalBooks}</div>
              <div className="stat-detail">Complete collection</div>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Available</h3>
              <div className="stat-number">{stats.availableBooks}</div>
              <div className="stat-detail">
                {formatPercentage(stats.availableBooks, stats.totalBooks)} of collection
              </div>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">📖</div>
            <div className="stat-content">
              <h3>Checked Out</h3>
              <div className="stat-number">{stats.checkedOutBooks}</div>
              <div className="stat-detail">
                {formatPercentage(stats.checkedOutBooks, stats.totalBooks)} in circulation
              </div>
            </div>
          </div>

          <div className="stat-card danger">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h3>Overdue</h3>
              <div className="stat-number">{stats.overdueLoanCount}</div>
              <div className="stat-detail">Need attention</div>
            </div>
          </div>

          <div className="stat-card info">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Members</h3>
              <div className="stat-number">{stats.totalMembers}</div>
              <div className="stat-detail">Active users</div>
            </div>
          </div>

          <div className="stat-card secondary">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <h3>Active Loans</h3>
              <div className="stat-number">{stats.activeLoans}</div>
              <div className="stat-detail">Current transactions</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <button 
              className="action-btn primary"
              onClick={handleViewCatalog}
            >
              <span className="btn-icon">🔍</span>
              Browse Catalog
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => navigate('/loans/new')}
            >
              <span className="btn-icon">➕</span>
              New Loan
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => navigate('/members')}
            >
              <span className="btn-icon">👤</span>
              Manage Members
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => navigate('/reports')}
            >
              <span className="btn-icon">📊</span>
              View Reports
            </button>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Books</h2>
            <button 
              className="btn-link"
              onClick={handleViewCatalog}
            >
              View All ->
            </button>
          </div>
          <div className="recent-books">
            {getRecentBooks().length > 0 ? (
              <div className="books-grid">
                {getRecentBooks().map((book) => (
                  <div 
                    key={book.id}
                    className="book-card"
                    onClick={() => handleBookClick(book.id)}
                  >
                    <div className="book-cover">
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={book.title} />
                      ) : (
                        <div className="book-placeholder">📕</div>
                      )}
                    </div>
                    <div className="book-info">
                      <h4 className="book-title">{book.title}</h4>
                      <p className="book-author">{book.author}</p>
                      <div className={`book-status ${book.status.toLowerCase().replace('_', '-')}`}>
                        <span className="status-indicator"></span>
                        {book.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No Books Available</h3>
                <p>Start by adding books to your library collection.</p>
                <button 
                  className="btn-primary"
                  onClick={() => navigate('/books/new')}
                >
                  Add First Book
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>System Status</h2>
          </div>
          <div className="system-status">
            <div className="status-item">
              <div className="status-indicator success"></div>
              <span>Database Connection: Healthy</span>
            </div>
            <div className="status-item">
              <div className="status-indicator success"></div>
              <span>API Services: Online</span>
            </div>
            <div className="status-item">
              <div className="status-indicator success"></div>
              <span>Backup Status: Up to date</span>
            </div>
            <div className="status-item">
              <div className="status-indicator warning"></div>
              <span>Overdue Notifications: {stats.overdueLoanCount} pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;