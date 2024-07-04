import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHeart, FaShoppingCart, FaBox, FaUser, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import './Sidenav.css'; // Import your CSS file for styling

const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation(); // Get current location from react-router-dom

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`container ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className={`side-navbar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button className="toggle-btn" onClick={toggleExpand}>
          {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <FaHome className="nav-icon" />
              {isExpanded && <span>Home</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className={`nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`}>
              <FaHeart className="nav-icon" />
              {isExpanded && <span>Wishlist</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}>
              <FaShoppingCart className="nav-icon" />
              {isExpanded && <span>Cart</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className={`nav-link ${location.pathname === '/orders' ? 'active' : ''}`}>
              <FaBox className="nav-icon" />
              {isExpanded && <span>Orders</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/account" className={`nav-link ${location.pathname === '/account' ? 'active' : ''}`}>
              <FaUser className="nav-icon" />
              {isExpanded && <span>My Account</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
