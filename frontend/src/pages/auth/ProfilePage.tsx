import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Button } from '../../components/ui';
import { User } from '../../mocks/mockData';

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  const handleNavigateToProfile = () => {
    // Already on profile page, could scroll to top or show message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout>
      <div className="profile-page">
        <div className="profile-header">
          <h1>User Profile</h1>
          <nav className="profile-navigation">
            <Button onClick={handleNavigateToDashboard}>
              Go to Dashboard
            </Button>
            <Button onClick={handleNavigateToProfile} className="profile-link">
              Profile
            </Button>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </nav>
        </div>

        <div className="profile-content">
          <h2>Account Details</h2>
          <div className="user-info">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
