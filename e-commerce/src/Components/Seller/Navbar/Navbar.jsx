// Navbar.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user }) => {
    return (
        <header className="header">
            <div className="header-left">
                <h1 className="seller-heading">Seller Dashboard</h1>
            </div>
            <div className="header-right">
                <div className="user-profile">
                    <img src={user.avatar} alt="User Avatar" className="avatar" />
                    <span className="username">{user.username}</span>
                </div>
                <div className="notifications">
                    <FontAwesomeIcon icon={faBell} />
                    <span className="badge">5</span> {/* Replace with actual notification count */}
                </div>
                
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button><FontAwesomeIcon icon={faSearch} /></button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
