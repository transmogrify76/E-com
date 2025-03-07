
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaShoppingCart, FaUser, FaHeart, FaAngleDoubleLeft, FaAngleDoubleRight, FaWallet, FaThList, FaCog, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import './WholesaleSellerSidebar.css'; // Import the CSS file for styling

const WholesaleSellerSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Toggle between expanded and collapsed sidebar
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`wholesale-seller-sidebar-container ${isExpanded ? 'wholesale-seller-expanded' : 'wholesale-seller-collapsed'}`}>
      <div className={`wholesale-seller-sidebar ${isExpanded ? 'wholesale-seller-expanded' : 'wholesale-seller-collapsed'}`}>
        {/* Toggle button to expand/collapse the sidebar */}
        <button className="wholesale-seller-toggle-btn" onClick={toggleExpand}>
          {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>

        <ul className="wholesale-seller-navbar-nav">
          {/* Dashboard */}
          <li className="wholesale-seller-nav-item">
            <Link to="/wholesale-seller-dashboard" className={`wholesale-seller-nav-link ${location.pathname === '/wholesale-seller-dashboard' ? 'wholesale-seller-active' : ''}`}>
              <FaHome className="wholesale-seller-nav-icon" />
              {isExpanded && <span>Dashboard</span>}
            </Link>
          </li>
          
          {/* Orders */}
          <li className="wholesale-seller-nav-item">
            <Link to="/wholesale-orders" className={`wholesale-seller-nav-link ${location.pathname === '/wholesale-orders' ? 'wholesale-seller-active' : ''}`}>
              <FaClipboardList className="wholesale-seller-nav-icon" />
              {isExpanded && <span> Orders</span>}
            </Link>
          </li>

          {/* Cart */}
          <li className="wholesale-seller-nav-item">
            <Link to="/wholesale-cart" className={`wholesale-seller-nav-link ${location.pathname === '/wholesale-cart' ? 'wholesale-seller-active' : ''}`}>
              <FaBox className="wholesale-seller-nav-icon" />
              {isExpanded && <span>Products</span>}
            </Link>
          </li>

          {/* Wishlist */}
          <li className="wholesale-seller-nav-item">
            <Link to="/wholesale-wishlist" className={`wholesale-seller-nav-link ${location.pathname === '/wholesale-wishlist' ? 'wholesale-seller-active' : ''}`}>
              <FaHeart className="wholesale-seller-nav-icon" />
              {isExpanded && <span>Inventory</span>}
            </Link>
          </li>

          {/* Profile */}
          <li className="wholesale-seller-nav-item">
            <Link to="/my-profile" className={`wholesale-seller-nav-link ${location.pathname === '/my-profile' ? 'wholesale-seller-active' : ''}`}>
              <FaUser className="wholesale-seller-nav-icon" />
              {isExpanded && <span>Reports</span>}
            </Link>
          </li>

          {/* Wallet */}
          <li className="wholesale-seller-nav-item">
            <Link to="/wholesale-seller-profile" className={`wholesale-seller-nav-link ${location.pathname === '/wholesale-seller-profile' ? 'wholesale-seller-active' : ''}`}>
              <FaUser className="wholesale-seller-nav-icon" />
              {isExpanded && <span>Profile</span>}
            </Link>
          </li>

          {/* Category */}
          <li className="wholesale-seller-nav-item">
            <Link to="/wholesale-category" className={`wholesale-seller-nav-link ${location.pathname === '/wholesale-category' ? 'wholesale-seller-active' : ''}`}>
              <FaThList className="wholesale-seller-nav-icon" />
              {isExpanded && <span>Support</span>}
            </Link>
          </li>

          <li className="wholesale-seller-nav-item">
            <Link to="/wholesale-seller-settings" className={`wholesale-seller-nav-link ${location.pathname === '/wholesale-seller-settings' ? 'wholesale-seller-active' : ''}`}>
              <FaCog  className="wholesale-seller-nav-icon" />
              {isExpanded && <span>Settings</span>}
            </Link>
          </li>

          <div className="wholesale-seller-sidebar-footer">
            <Link to="/logout" className="wholesale-seller-logout">
              <FaSignOutAlt className="wholesale-seller-nav-icon" />
              {isExpanded && <span>Logout</span>}
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default WholesaleSellerSidebar;
