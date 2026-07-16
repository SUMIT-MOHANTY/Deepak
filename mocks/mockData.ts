if (!username || !password) {
    return null;
  }

  // Simple mock authentication - in production, this would be handled by backend
  const user = mockUsers.find(u => u.username === username && u.isActive);
  
  if (user && password === 'password') { // Mock password check
    return user;
  }
  
  return null;
};

export const getUserById = (id: string): User | null => {
  if (!id) {
    return null;
  }
  
  return mockUsers.find(user => user.id === id) || null;
};

export const getUserByUsername = (username: string): User | null => {
  if (!username) {
    return null;
  }
  
  return mockUsers.find(user => user.username === username) || null;
};

export const getBookById = (id: string): Book | null => {
  if (!id) {
    return null;
  }
  
  return mockBooks.find(book => book.id === id) || null;
};

export const getBorrowRecordsByUserId = (userId: string): BorrowRecord[] => {
  if (!userId) {
    return [];
  }
  
  return mockBorrowRecords.filter(record => record.userId === userId);
};

export const getActiveBorrowRecords = (): BorrowRecord[] => {
  return mockBorrowRecords.filter(record => record.status === 'borrowed' || record.status === 'overdue');
};

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUsername = (username: string): boolean => {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
};

// Default export for convenience
export default {
  users: mockUsers,
  books: mockBooks,
  borrowRecords: mockBorrowRecords,
  authenticateUser,
  getUserById,
  getUserByUsername,
  getBookById,
  getBorrowRecordsByUserId,
  getActiveBorrowRecords,
  isValidEmail,
  isValidUsername,
};