import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFolder, FaShoppingCart, FaUser, FaAngleDoubleLeft, FaAngleDoubleRight, FaBoxOpen, FaClipboardList, FaUserFriends, FaMoneyBillAlt, FaTruck } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdList } from 'react-icons/md';
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
            <Link to="/add-product" className={`nav-link ${location.pathname === '/add-product' ? 'active' : ''}`}>
              <FaBoxOpen className="nav-icon" />
              {isExpanded && <span>Add Product</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/list-product" className={`nav-link ${location.pathname === '/list-product' ? 'active' : ''}`}>
              <FaShoppingCart className="nav-icon" />
              {isExpanded && <span>Product List</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}>
              <FaFolder className="nav-icon" />
              {isExpanded && <span>Categories</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inventory" className={`nav-link ${location.pathname === '/inventory' ? 'active' : ''}`}>
              <FaClipboardList className="nav-icon" />
              {isExpanded && <span>Inventory</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/order" className={`nav-link ${location.pathname === '/order' ? 'active' : ''}`}>
              < MdList  className="nav-icon" />
              {isExpanded && <span>Manage Orders</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>
              <FaUser className="nav-icon" />
              {isExpanded && <span>Manage Users</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sellers" className={`nav-link ${location.pathname === '/sellers' ? 'active' : ''}`}>
              <FaUserFriends className="nav-icon" />
              {isExpanded && <span>Manage Sellers</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className={`nav-link ${location.pathname === '/transactions' ? 'active' : ''}`}>
              <FaMoneyBillAlt className="nav-icon" />
              {isExpanded && <span>Transactions</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/delivery" className={`nav-link ${location.pathname === '/delivery' ? 'active' : ''}`}>
              <FaTruck className="nav-icon" />
              {isExpanded && <span>Delivery</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/adaccount" className={`nav-link ${location.pathname === '/adaccount' ? 'active' : ''}`}>
              <FaUser className="nav-icon" />
              {isExpanded && <span>My Account</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/adsettings" className={`nav-link ${location.pathname === '/adsettings' ? 'active' : ''}`}>
              <AiOutlineSetting className="nav-icon" />
              {isExpanded && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
