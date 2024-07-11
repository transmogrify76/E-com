import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFolder, FaShoppingCart, FaUser, FaAngleDoubleLeft, FaAngleDoubleRight, FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import './Sidebar.css'; // Import your CSS file for styling

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation(); // Get current location from react-router-dom

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`container ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className={`side-bar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button className="toggle-btn" onClick={toggleExpand}>
          {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/admin-dashboard" className={`nav-link ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}>
              <FaHome className="nav-icon" />
              {isExpanded && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
              <FaBoxOpen className="nav-icon" />
              {isExpanded && <span>Products</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-product" className={`nav-link ${location.pathname === '/add-product' ? 'active' : ''}`}>
              <FaShoppingCart className="nav-icon" />
              {isExpanded && <span>Add Product</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}>
              <FaFolder className="nav-icon" />
              {isExpanded && <span>Categories</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/order" className={`nav-link ${location.pathname === '/order' ? 'active' : ''}`}>
              <FaClipboardList className="nav-icon" />
              {isExpanded && <span> Manage Orders</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>
              <FaUser className="nav-icon" />
              {isExpanded && <span> Manage Users</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sellers" className={`nav-link ${location.pathname === '/sellers' ? 'active' : ''}`}>
              <faStoreAlt className="nav-icon" />
              {isExpanded && <span> Manage Sellers</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className={`nav-link ${location.pathname === '/transactions' ? 'active' : ''}`}>
              < faExchangeAlt className="nav-icon" />
              {isExpanded && <span>Transactions</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
