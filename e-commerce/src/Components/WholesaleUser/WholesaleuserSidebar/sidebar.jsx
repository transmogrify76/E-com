
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaShoppingCart, FaUser, FaHeart, FaAngleDoubleLeft, FaAngleDoubleRight, FaWallet, FaThList,FaCog  } from 'react-icons/fa';
import './sidebar.css'; // Import the CSS file for styling

const WholesaleSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Toggle between expanded and collapsed sidebar
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`wholesale-sidebar-container ${isExpanded ? 'wholesale-expanded' : 'wholesale-collapsed'}`}>
      <div className={`wholesale-sidebar ${isExpanded ? 'wholesale-expanded' : 'wholesale-collapsed'}`}>
        {/* Toggle button to expand/collapse the sidebar */}
        <button className="wholesale-toggle-btn" onClick={toggleExpand}>
          {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>

        <ul className="wholesale-navbar-nav">
          {/* Dashboard */}
          <li className="wholesale-nav-item">
            <Link to="/wholesale-dashboard" className={`wholesale-nav-link ${location.pathname === '/wholesale-dashboard' ? 'wholesale-active' : ''}`}>
              <FaHome className="wholesale-nav-icon" />
              {isExpanded && <span>Dashboard</span>}
            </Link>
          </li>
          
          {/* Orders */}
          <li className="wholesale-nav-item">
            <Link to="/wholesale-orders" className={`wholesale-nav-link ${location.pathname === '/wholesale-orders' ? 'wholesale-active' : ''}`}>
              <FaBox className="wholesale-nav-icon" />
              {isExpanded && <span>My Orders</span>}
            </Link>
          </li>

          {/* Cart */}
          <li className="wholesale-nav-item">
            <Link to="/wholesale-cart" className={`wholesale-nav-link ${location.pathname === '/wholesale-cart' ? 'wholesale-active' : ''}`}>
              <FaShoppingCart className="wholesale-nav-icon" />
              {isExpanded && <span>Cart</span>}
            </Link>
          </li>

          {/* Wishlist */}
          <li className="wholesale-nav-item">
            <Link to="/wholesale-wishlist" className={`wholesale-nav-link ${location.pathname === '/wholesale-wishlist' ? 'wholesale-active' : ''}`}>
              <FaHeart className="wholesale-nav-icon" />
              {isExpanded && <span>Wishlist</span>}
            </Link>
          </li>

          {/* Profile */}
          <li className="wholesale-nav-item">
            <Link to="/my-profile" className={`wholesale-nav-link ${location.pathname === '/my-profile' ? 'wholesale-active' : ''}`}>
              <FaUser className="wholesale-nav-icon" />
              {isExpanded && <span>Profile</span>}
            </Link>
          </li>

          {/* Wallet */}
          <li className="wholesale-nav-item">
            <Link to="/wholesale-wallet" className={`wholesale-nav-link ${location.pathname === '/wholesale-wallet' ? 'wholesale-active' : ''}`}>
              <FaWallet className="wholesale-nav-icon" />
              {isExpanded && <span>Wallet</span>}
            </Link>
          </li>

          {/* Category */}
          <li className="wholesale-nav-item">
            <Link to="/wholesale-category" className={`wholesale-nav-link ${location.pathname === '/wholesale-category' ? 'wholesale-active' : ''}`}>
              <FaThList className="wholesale-nav-icon" />
              {isExpanded && <span>Category</span>}
            </Link>
          </li>
          <li className="wholesale-nav-item">
            <Link to="/wholesaleuser-settings" className={`wholesale-nav-link ${location.pathname === '/wholesaleuser-settings' ? 'wholesale-active' : ''}`}>
              <FaCog  className="wholesale-nav-icon" />
              {isExpanded && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WholesaleSidebar;
