// Settings.jsx
import React from 'react';
import './Settings.css'; // Ensure to adjust path as per your project structure
import { Link } from 'react-router-dom';

const Settings = () => {
    return (
        <div className="app-container">
            {/* Header */}
            <header>
                <h1>Settings</h1>
                {/* Add any additional header content here */}
            </header>

            {/* Side Navigation (sidenav) */}
            <nav className="sidenav">
                <ul>
                <li><Link to="/seller-dashboard">Dashboard</Link></li>
                <li><Link to="/ProductUpload">Product Upload</Link></li>
                <li><Link to="/ExistingProduct">Excisting Products</Link></li>
                <li><Link to="/Orderr">Orders</Link></li>
                <li><Link to="/Dispatch">Dispatch</Link></li>
                <li><Link to="/RevenueGenerate">Revenue Generate</Link></li>
                <li><Link to="/Settings">Settings</Link></li>
                    {/* Add more navigation items as needed */}
                </ul>
            </nav>

            {/* Main Content */}
            <div className="settings-container">
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
