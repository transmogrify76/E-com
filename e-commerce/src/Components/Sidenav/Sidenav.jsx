import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHeart, FaList, FaShoppingCart, FaBox, FaUser, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import './Sidenav.css'; // Import your CSS file for styling

const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`side-navbar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={toggleExpand}>
        {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
      </button>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <FaHome className="nav-icon" />
            {isExpanded && <span>Home</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/wishlist" className="nav-link">
            <FaHeart className="nav-icon" />
            {isExpanded && <span>Wishlist</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/categories" className="nav-link">
            <FaList className="nav-icon" />
            {isExpanded && <span>Categories</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            <FaShoppingCart className="nav-icon" />
            {isExpanded && <span>Cart</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/orders" className="nav-link">
            <FaBox className="nav-icon" />
            {isExpanded && <span>Orders</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/account" className="nav-link">
            <FaUser className="nav-icon" />
            {isExpanded && <span>My Account</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
