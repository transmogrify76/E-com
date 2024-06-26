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
            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <h1>Settings</h1>
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        {notificationsCount > 0 && (
                            <span className="badge">{notificationsCount}</span>
                        )}
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." />
                            <button><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Side Navigation (sidenav) */}
            <nav className="sidenav">
                <ul>
                    <li className={activeMenuItem === 'ProductUpload' ? 'active' : ''}>
                        <Link to="/seller-dashboard" onClick={() => handleMenuItemClick('ProductUpload')}>
                            <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '8px' }} />
                            Existing Products
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'Orderr' ? 'active' : ''}>
                        <Link to="/Orderr" onClick={() => handleMenuItemClick('Orderr')}>
                            <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                            Orders
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'Dispatch' ? 'active' : ''}>
                        <Link to="/Dispatch" onClick={() => handleMenuItemClick('Dispatch')}>
                            <FontAwesomeIcon icon={faTruck} style={{ marginRight: '8px' }} />
                            Dispatch
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'RevenueGeneration' ? 'active' : ''}>
                        <Link to="/RevenueGenerate" onClick={() => handleMenuItemClick('RevenueGeneration')}>
                            <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
                            Revenue Generation
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'Settings' ? 'active' : ''}>
                        <Link to="/Settings" onClick={() => handleMenuItemClick('Settings')}>
                            <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="card settings-card"> {/* Added a class for styling the card */}
                <h2 className="settings-heading">Settings</h2>
                <div className="settings-content">
                    <form className="settings-form">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
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
