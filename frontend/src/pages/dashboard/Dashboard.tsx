import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  status: 'Available' | 'Checked Out';
}

const Dashboard: React.FC = () => {
  // Mock data for dashboard KPIs
  const totalBooks = 10;
  const availableBooks = 6;
  const checkedOutBooks = 4;

  return (
    <div className="dashboard">
      <h1>Library Dashboard</h1>

      <div className="kpi-summary">
        <div className="kpi-card">
          <h3>Total Books</h3>
          <p>{totalBooks}</p>
        </div>
        <div className="kpi-card">
          <h3>Available</h3>
          <p>{availableBooks}</p>
        </div>
        <div className="kpi-card">
          <h3>Checked Out</h3>
          <p>{checkedOutBooks}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
