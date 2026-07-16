import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'Available' | 'Checked Out';
  publishedYear: number;
  genre: string;
}

// Mock book data - 10 records with status indicators
const mockBooks: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', status: 'Available', publishedYear: 1925, genre: 'Fiction' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', status: 'Checked Out', publishedYear: 1960, genre: 'Fiction' },
  { id: '3', title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', status: 'Available', publishedYear: 1949, genre: 'Dystopian' },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0-14-143951-8', status: 'Checked Out', publishedYear: 1813, genre: 'Romance' },
  { id: '5', title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0-316-76948-0', status: 'Available', publishedYear: 1951, genre: 'Fiction' },
  { id: '6', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', isbn: '978-0-544-00341-5', status: 'Available', publishedYear: 1954, genre: 'Fantasy' },
  { id: '7', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', isbn: '978-0-439-70818-8', status: 'Checked Out', publishedYear: 1997, genre: 'Fantasy' },
  { id: '8', title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '978-0-547-92822-7', status: 'Available', publishedYear: 1937, genre: 'Fantasy' },
  { id: '9', title: 'Fahrenheit 451', author: 'Ray Bradbury', isbn: '978-1-451-67331-9', status: 'Checked Out', publishedYear: 1953, genre: 'Science Fiction' },
  { id: '10', title: 'Brave New World', author: 'Aldous Huxley', isbn: '978-0-06-085052-4', status: 'Available', publishedYear: 1932, genre: 'Science Fiction' }
];

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = mockBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Library Catalog</h1>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Dashboard
        </button>
      </div>

      {/* Search functionality */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search books by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Books table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Title</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Author</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Genre</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Year</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr
                key={book.id}
                onClick={() => handleRowClick(book.id)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{book.title}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{book.author}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{book.genre}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{book.publishedYear}</td>
                <td style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  color: book.status === 'Available' ? 'green' : 'red',
                  fontWeight: 'bold'
                }}>
                  {book.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', color: '#666' }}>
        Showing {filteredBooks.length} of {mockBooks.length} books
      </div>
    </div>
  );
};

export default CatalogPage;
