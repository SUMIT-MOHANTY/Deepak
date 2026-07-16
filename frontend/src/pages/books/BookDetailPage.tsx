import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'Available' | 'Checked Out';
  publishedYear: number;
  genre: string;
}

// Mock book data
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

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const book = mockBooks.find(b => b.id === id);

  if (!book) {
    return (
      <div style={{ padding: '20px' }}>
        <button onClick={() => navigate('/catalog')} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
           Back to Catalog
        </button>
        <h1>Book Not Found</h1>
        <p>The requested book could not be found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <button onClick={() => navigate('/catalog')} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
         Back to Catalog
      </button>

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
        <h1>{book.title}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 20px', marginTop: '20px' }}>
          <strong>Author:</strong>
          <span>{book.author}</span>

          <strong>ISBN:</strong>
          <span>{book.isbn}</span>

          <strong>Published:</strong>
          <span>{book.publishedYear}</span>

          <strong>Genre:</strong>
          <span>{book.genre}</span>

          <strong>Status:</strong>
          <span style={{
            color: book.status === 'Available' ? 'green' : 'red',
            fontWeight: 'bold'
          }}>
            {book.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
