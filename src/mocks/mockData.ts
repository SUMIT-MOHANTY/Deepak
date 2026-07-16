if (!credentials.username || !credentials.password) {
          resolve({
            success: false,
            message: 'Username and password are required'
          });
          return;
        }

        const user = mockUsers.find(
          u => u.username === credentials.username && 
               u.password === credentials.password &&
               u.isActive
        );

        if (user) {
          // Update last login time
          const updatedUser = {
            ...user,
            lastLogin: new Date().toISOString()
          };

          resolve({
            success: true,
            user: updatedUser,
            token: `mock-token-${user.id}-${Date.now()}`,
            message: 'Login successful'
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid username or password'
          });
        }
      }, 1000); // Simulate network delay
    });
  },

  /**
   * Get user by ID
   */
  getUserById: (id: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === id && u.isActive);
        resolve(user || null);
      }, 500);
    });
  },

  /**
   * Get user by username
   */
  getUserByUsername: (username: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.username === username && u.isActive);
        resolve(user || null);
      }, 500);
    });
  },

  /**
   * Update user profile
   */
  updateProfile: (userId: string, updates: Partial<User>): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
          resolve({
            success: false,
            message: 'User not found'
          });
          return;
        }

        // Validate email format if provided
        if (updates.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) {
          resolve({
            success: false,
            message: 'Invalid email format'
          });
          return;
        }

        // Check if username is already taken by another user
        if (updates.username) {
          const existingUser = mockUsers.find(
            u => u.username === updates.username && u.id !== userId
          );
          if (existingUser) {
            resolve({
              success: false,
              message: 'Username already taken'
            });
            return;
          }
        }

        // Update user data
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          ...updates,
          id: mockUsers[userIndex].id, // Prevent ID changes
          role: mockUsers[userIndex].role, // Prevent role changes in profile update
        };

        resolve({
          success: true,
          user: mockUsers[userIndex],
          message: 'Profile updated successfully'
        });
      }, 800);
    });
  },

  /**
   * Logout user (mainly for cleanup)
   */
  logout: (): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Clear any stored authentication data
        resolve({ success: true });
      }, 300);
    });
  }
};

// Helper function to get display name for user
export const getUserDisplayName = (user: User): string => {
  if (!user) return 'Unknown User';
  return `${user.firstName} ${user.lastName}`.trim() || user.username;
};

// Helper function to get role display name
export const getRoleDisplayName = (role: User['role']): string => {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'librarian':
      return 'Librarian';
    case 'patron':
      return 'Library Patron';
    default:
      return 'User';
  }
};

// Export default user for testing
export const defaultTestUser = mockUsers[0];