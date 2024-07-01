

import React, { useState } from 'react';
import './Dispatch.css'; // Ensure to adjust path as per your project structure
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faCog, faChartLine, faClipboardList, faTruck, faBoxOpen } from '@fortawesome/free-solid-svg-icons';


const Dispatch = () => {
    const user = {
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
    };

    const notificationsCount = 5;

    // Default active menu item
    const [activeMenuItem, setActiveMenuItem] = useState('Dispatch');

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    // State to manage dispatch options
    const [dispatchOptions, setDispatchOptions] = useState([
        { id: 1, status: 'Pending' },
        { id: 2, status: 'In Progress' },
        { id: 3, status: 'Shipped' },
        { id: 4, status: 'Delivered' }
    ]);

    // Function to handle click on an option
    const handleOptionClick = (id) => {
        // Update dispatch status (for demonstration, we console log here)
        console.log(`Dispatch option with ID ${id} clicked`);
    };

    return (
        <div className="app-container">
        {/* Header */}
        <header className="header">
            <div className="header-left">
                <h1>Dispatch Management</h1>
                {/* Add any additional header content here */}
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
            <div className="dispatch-container">
                <h2>Dispatch Options</h2>
                <p>Manage order dispatch:</p>
                <ul>
                    {dispatchOptions.map((option) => (
                        <li key={option.id} onClick={() => handleOptionClick(option.id)}>
                            {option.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dispatch;
