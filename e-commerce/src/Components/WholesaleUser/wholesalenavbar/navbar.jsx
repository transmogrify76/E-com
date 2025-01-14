import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import the corresponding CSS file

const WholesaleNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            <h1>WholesaleStore</h1>
          </Link>
        </div>

        {/* Links */}
        <div className="navbar-links">
          <ul>
            <li>
              <Link to="/" className="navbar-link">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="navbar-link">Shop</Link>
            </li>
            <li>
              <Link to="/categories" className="navbar-link">Categories</Link>
            </li>
            <li>
              <Link to="/my-account" className="navbar-link">My Account</Link>
            </li>
            <li>
              <Link to="/cart" className="navbar-link">Cart</Link>
            </li>
            <li>
              <Link to="/login" className="navbar-link">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default WholesaleNavbar;
