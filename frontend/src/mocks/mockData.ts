export interface User {
  id: number;
  username: string;
  email: string;
  role: 'Admin' | 'Librarian' | 'Patron';
  name: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@library.com",
    role: "Admin",
    name: "System Administrator"
  },
  {
    id: 2,
    username: "librarian",
    email: "librarian@library.com",
    role: "Librarian",
    name: "Head Librarian"
  },
  {
    id: 3,
    username: "patron",
    email: "patron@library.com",
    role: "Patron",
    name: "Library Patron"
  }
];
