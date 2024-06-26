import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faClipboardList, faChartLine, faCog, faSignOutAlt, faBell, faSearch,faSave,faTimes } from '@fortawesome/free-solid-svg-icons';

import './Setting.css'; // Assuming you have a CSS file for settings

const Setting = () => {
    const user = {
        username: 'Admin', // Replace with actual admin username
        avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
    };

    const [activeMenuItem, setActiveMenuItem] = useState('Setting');

    // Example state variables for settings
    const [theme, setTheme] = useState('light');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [language, setLanguage] = useState('en');
    const [fontSize, setFontSize] = useState('medium'); // New state for font size
    const [colorScheme, setColorScheme] = useState('default'); // New state for color scheme

    const handleSaveSettings = () => {
        // Logic to save settings goes here
        console.log('Settings saved!');
    };

    const handleCancel = () => {
        // Logic to cancel and revert changes if needed
        console.log('Changes cancelled.');
    };

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <h2>Settings</h2>
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="badge">5</span>
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." />
                            <button><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar (sidenav) */}
            <div className="admin-container">
                <nav className="sidenav">
                    <ul>
                        <li className={activeMenuItem === 'Users' ? 'active' : ''}>
                            <Link to="/Users" onClick={() => handleMenuItemClick('Users')}>
                                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
                                Users Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Products' ? 'active' : ''}>
                            <Link to="/Products" onClick={() => handleMenuItemClick('Products')}>
                                <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '8px' }} />
                                Products Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Orders' ? 'active' : ''}>
                            <Link to="/Order" onClick={() => handleMenuItemClick('Order')}>
                                <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                                Orders Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Reports' ? 'active' : ''}>
                            <Link to="/Reports" onClick={() => handleMenuItemClick('Reports')}>
                                <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
                                Reports & Analytics
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Settings' ? 'active' : ''}>
                            <Link to="/Setting" onClick={() => handleMenuItemClick('Settings')}>
                                <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                                Settings
                            </Link>
                        </li>
                        <li>
                            <a href="/Logout">
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="admin-main-content">
                        <div className="settings">
                            <h2>Settings</h2>

                            {/* Theme and Notifications Section */}
                            <div className="setting-section">
                                <h3>Theme & Notifications</h3>
                                <div className="setting-item">
                                    <label>Theme:</label>
                                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <label>Notifications:</label>
                                    <input
                                        type="checkbox"
                                        checked={notificationsEnabled}
                                        onChange={(e) => setNotificationsEnabled(e.target.checked)}
                                    />
                                </div>
                            </div>

                            {/* Language and User Preferences Section */}
                            <div className="setting-section">
                                <h3>Language & User Preferences</h3>
                                <div className="setting-item">
                                    <label>Language:</label>
                                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                                        <option value="en">English</option>
                                        <option value="fr">French</option>
                                        <option value="es">Spanish</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <label>Font Size:</label>
                                    <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <label>Color Scheme:</label>
                                    <select value={colorScheme} onChange={(e) => setColorScheme(e.target.value)}>
                                        <option value="default">Default</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                    </select>
                                </div>
                            </div>

                            {/* Save and Cancel Buttons */}
                            <div className="buttons">
                                <button onClick={handleSaveSettings}>
                                    <FontAwesomeIcon icon={faSave} /> Save
                                </button>
                                <button onClick={handleCancel}>
                                    <FontAwesomeIcon icon={faTimes} /> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Setting;
