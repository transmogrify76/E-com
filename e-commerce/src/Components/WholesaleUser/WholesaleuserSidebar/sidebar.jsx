import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const WholesaleSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Wholesale User</h2>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li><Link to="/dashboard" className="sidebar-link">Dashboard</Link></li>
          <li><Link to="/orders" className="sidebar-link">My Orders</Link></li>
          <li><Link to="/profile" className="sidebar-link">Profile</Link></li>
          <li><Link to="/cart" className="sidebar-link">Cart</Link></li>
          <li><Link to="/wishlist" className="sidebar-link">Wishlist</Link></li>
          <li><Link to="/login" className="sidebar-link">Logout</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default WholesaleSidebar;
