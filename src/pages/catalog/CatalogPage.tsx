if (!books) return;

    let filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort books
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      return 0;
    });

    setFilteredBooks(filtered);
  }, [books, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof Book) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'status-badge status-available';
      case 'checked out':
        return 'status-badge status-checked-out';
      case 'reserved':
        return 'status-badge status-reserved';
      default:
        return 'status-badge status-unknown';
    }
  };

  const getSortIcon = (field: keyof Book) => {
    if (sortField !== field) {
      return '↕️';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="catalog-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading catalog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalog-page">
        <div className="error-container">
          <h2>Error Loading Catalog</h2>
          <p>{error}</p>
          <button onClick={() => fetchBooks()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Library Catalog</h1>
        <p>Browse and search through our collection of books</p>
      </div>

      <div className="catalog-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="results-count">
          {filteredBooks.length} of {books?.length || 0} books
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="no-results">
          <h3>No books found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="catalog-table-container">
          <table className="catalog-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('title')} className="sortable">
                  Title {getSortIcon('title')}
                </th>
                <th onClick={() => handleSort('author')} className="sortable">
                  Author {getSortIcon('author')}
                </th>
                <th onClick={() => handleSort('isbn')} className="sortable">
                  ISBN {getSortIcon('isbn')}
                </th>
                <th onClick={() => handleSort('category')} className="sortable">
                  Category {getSortIcon('category')}
                </th>
                <th onClick={() => handleSort('publicationYear')} className="sortable">
                  Year {getSortIcon('publicationYear')}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status {getSortIcon('status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr 
                  key={book.id} 
                  className="catalog-row" 
                  onClick={() => handleBookClick(book.id)}
                >
                  <td className="book-title">
                    <div className="title-container">
                      <span className="title">{book.title}</span>
                      {book.subtitle && (
                        <span className="subtitle">{book.subtitle}</span>
                      )}
                    </div>
                  </td>
                  <td className="book-author">{book.author}</td>
                  <td className="book-isbn">
                    <code>{book.isbn}</code>
                  </td>
                  <td className="book-category">{book.category}</td>
                  <td className="book-year">{book.publicationYear}</td>
                  <td className="book-status">
                    <span className={getStatusBadgeClass(book.status)}>
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .catalog-page {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .catalog-header {
          margin-bottom: 2rem;
        }

        .catalog-header h1 {
          margin: 0 0 0.5rem 0;
          color: var(--color-text-primary, #333);
        }

        .catalog-header p {
          margin: 0;
          color: var(--color-text-secondary, #666);
        }

        .catalog-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .search-container {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 2.5rem 0.75rem 1rem;
          border: 2px solid var(--color-border, #ddd);
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--color-primary, #007bff);
        }

        .search-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary, #666);
        }

        .results-count {
          color: var(--color-text-secondary, #666);
          font-size: 0.9rem;
        }

        .catalog-table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid var(--color-border, #ddd);
        }

        .catalog-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        .catalog-table th {
          background: var(--color-background-secondary, #f8f9fa);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid var(--color-border, #ddd);
          white-space: nowrap;
        }

        .catalog-table th.sortable {
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s;
        }

        .catalog-table th.sortable:hover {
          background: var(--color-background-tertiary, #e9ecef);
        }

        .catalog-row {
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .catalog-row:hover {
          background: var(--color-background-secondary, #f8f9fa);
        }

        .catalog-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--color-border, #ddd);
          vertical-align: top;
        }

        .title-container {
          display: flex;
          flex-direction: column;
        }

        .title {
          font-weight: 500;
          color: var(--color-text-primary, #333);
        }

        .subtitle {
          font-size: 0.85rem;
          color: var(--color-text-secondary, #666);
          margin-top: 0.25rem;
        }

        .book-isbn code {
          background: var(--color-background-secondary, #f8f9fa);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: 0.85rem;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-available {
          background: #d4edda;
          color: #155724;
        }

        .status-checked-out {
          background: #f8d7da;
          color: #721c24;
        }

        .status-reserved {
          background: #fff3cd;
          color: #856404;
        }

        .status-unknown {
          background: #e2e3e5;
          color: #383d41;
        }

        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--color-border, #ddd);
          border-top: 4px solid var(--color-primary, #007bff);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .retry-button {
          padding: 0.75rem 1.5rem;
          background: var(--color-primary, #007bff);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.2s;
        }

        .retry-button:hover {
          background: var(--color-primary-dark, #0056b3);
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
        }

        .no-results h3 {
          margin: 0 0 0.5rem 0;
          color: var(--color-text-primary, #333);
        }

        .no-results p {
          margin: 0;
          color: var(--color-text-secondary, #666);
        }

        @media (max-width: 768px) {
          .catalog-page {
            padding: 1rem;
          }

          .catalog-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container {
            max-width: none;
          }

          .results-count {
            text-align: center;
          }

          .catalog-table {
            font-size: 0.9rem;
          }

          .catalog-table th,
          .catalog-table td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CatalogPage;