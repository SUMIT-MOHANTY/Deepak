import React from 'react';
import { Link } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Library System</h1>
          <div className="space-x-4">
            <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
            <Link to="/profile" className="hover:text-blue-200">Profile</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};
