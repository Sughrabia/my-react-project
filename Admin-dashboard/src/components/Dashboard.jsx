import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ children }) {
  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/user">users</Link>
          </li>
          <li>
            <Link to="/product">products</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Dashboard;
