import React, { useState } from 'react';
import './SellerNavbar.css';
import { IoSearch } from 'react-icons/io5';
import { BsBell } from 'react-icons/bs'; // Importing the Bell icon from React Icons
import user from '../../Assests/user.png';
import logo from '../../Assests/Ecommerce_Frontend_Assets/Assets/logo.png';

import { Link } from 'react-router-dom';

function SellerNavbar() {
    const notificationCount = 5; // Example notification count
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p className="logo-text">E-Com</p>
            </div>

            <div className="headerSearch">
                <input type="text" placeholder="Search..." />
                <button className="btn-search"><IoSearch /></button>
            </div>

            <Link to="/notifications" className="notifications">
                <BsBell className="notification-icon" /> {/* Using the React Icons bell icon */}
                {notificationCount > 0 && (
                    <span className="badge">{notificationCount}</span>
                )}
            </Link>

            <div className="dropdown-container" onClick={toggleDropdown}>
                <div className="user-icon">
                    <img src={user} alt="user" />
                </div>
                {isDropdownOpen && (
                    <div className="dropdown-content">
                        <Link to="/SellerAccount">My Profile</Link>
                        <Link to="/login">Log out</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SellerNavbar;
