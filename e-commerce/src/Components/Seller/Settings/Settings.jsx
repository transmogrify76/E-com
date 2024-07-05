// Settings.jsx
import React, { useState } from 'react';
import './Settings.css'; // Ensure to adjust path as per your project structure
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faCog, faChartLine, faClipboardList, faTruck, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const user = {
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
    };

    const notificationsCount = 5;

    // Default active menu item
    const [activeMenuItem, setActiveMenuItem] = useState('Settings'); 

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    return (
        <div className="app-container">
        
           

          
            {/* 
            {/* Main Content */}
            <div className="card settings-card"> 
                <h2 className="settings-heading">Settings</h2>
                <div className="settings-content">
                    <form className="settings-form">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email ID:</label>
                            <input type="email" id="email" name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <button type="submit" className="btn-save">Save Settings</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
