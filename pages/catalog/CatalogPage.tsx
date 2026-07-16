if (!books) return [];

    let filtered = books.filter((book) => {
      const matchesSearch = !filters.search || 
        book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        book.author.toLowerCase().includes(filters.search.toLowerCase()) ||
        book.isbn.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || book.status === filters.status;
      const matchesGenre = !filters.genre || book.genre.toLowerCase().includes(filters.genre.toLowerCase());
      const matchesAuthor = !filters.author || book.author.toLowerCase().includes(filters.author.toLowerCase());

      return matchesSearch && matchesStatus && matchesGenre && matchesAuthor;
    });

    // Sort books
    filtered.sort((a, b) => {
      let aValue: string | number = a[sortBy];
      let bValue: string | number = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [books, filters, sortBy, sortOrder]);

  const uniqueGenres = useMemo(() => {
    if (!books) return [];
    return Array.from(new Set(books.map(book => book.genre))).sort();
  }, [books]);

  const uniqueAuthors = useMemo(() => {
    if (!books) return [];
    return Array.from(new Set(books.map(book => book.author))).sort();
  }, [books]);

  const handleFilterChange = (key: keyof CatalogFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      genre: '',
      author: ''
    });
  };

  const getStatusIcon = (status: BookStatus) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'checked_out':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'reserved':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: BookStatus): 'success' | 'warning' | 'info' | 'default' => {
    switch (status) {
      case 'available':
        return 'success';
      case 'checked_out':
        return 'warning';
      case 'reserved':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatStatus = (status: BookStatus): string => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'checked_out':
        return 'Checked Out';
      case 'reserved':
        return 'Reserved';
      default:
        return status;
    }
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  if (loading && !books) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage 
          message="Failed to load book catalog" 
          onRetry={fetchBooks}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Library Catalog</h1>
        <p className="text-gray-600">Browse and search our collection of books</p>
      </div>

      {/* Filters Section */}
      <Card className="mb-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search books..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="checked_out">Checked Out</option>
            <option value="reserved">Reserved</option>
          </Select>

          <Select
            value={filters.genre}
            onValueChange={(value) => handleFilterChange('genre', value)}
          >
            <option value="">All Genres</option>
            {uniqueGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Select>

          <Select
            value={filters.author}
            onValueChange={(value) => handleFilterChange('author', value)}
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {filteredAndSortedBooks.length} of {books?.length || 0} books
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="flex items-center space-x-1"
            >
              <Filter className="h-4 w-4" />
              <span>Clear Filters</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(value) => {
                const [field, order] = value.split('-') as [typeof sortBy, typeof sortOrder];
                setSortBy(field);
                setSortOrder(order);
              }}
            >
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="author-asc">Author (A-Z)</option>
              <option value="author-desc">Author (Z-A)</option>
              <option value="publishedYear-desc">Year (Newest)</option>
              <option value="publishedYear-asc">Year (Oldest)</option>
              <option value="status-asc">Status</option>
            </Select>
          </div>
        </div>
      </Card>

      {/* Books Grid */}
      {filteredAndSortedBooks.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more books.
          </p>
          <Button onClick={clearFilters}>Clear All Filters</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <Card
              key={book.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => handleBookClick(book.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(book.status)}
                  <Badge variant={getStatusColor(book.status)}>
                    {formatStatus(book.status)}
                  </Badge>
                </div>
                <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {book.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>{book.genre}</span>
                <span>{book.publishedYear}</span>
              </div>

              {book.description && (
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {book.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">ISBN: {book.isbn}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookClick(book.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {loading && books && (
        <div className="flex items-center justify-center py-8">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CatalogPage;