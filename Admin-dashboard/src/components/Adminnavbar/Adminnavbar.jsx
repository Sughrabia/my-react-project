import React from 'react';
import './adminnavbar.css';

const Adminnavbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src="logo-url" alt="DressDynamo Logo" className="navbar-logo" />
        <span className="navbar-brand">DressDynamo</span>
      </div>

      <div className="navbar-right">
        <img src="profile-url" alt="Profile" className="navbar-profile" />
      </div>
    </div>
  );
};

export default Adminnavbar;
