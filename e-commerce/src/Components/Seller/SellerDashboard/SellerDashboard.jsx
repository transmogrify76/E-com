
// SellerDashboard.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SellerDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faCog, faChartLine, faClipboardList, faTruck, faChartBar, faBoxOpen, faUpload } from '@fortawesome/free-solid-svg-icons';
import ExistingProducts from '../ExistingProduct/ExcistingProduct';
import Orderr from '../Orderr/Orderr';
import Dispatch from '../Dispatch/Dispatch';
import RevenueGenerate from '../RevenueGenerate/RevenueGenerate';
import Settings from '../Settings/Settings';
import ProductUpload from '../ProductUpload/ProductUpload'; // Import ProductUpload component

const SellerDashboard = () => {
    const user = {
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
    };

    const notificationsCount = 5;

    const [activeMenuItem, setActiveMenuItem] = useState('ProductUpload'); // Default active menu item

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    const renderMainContent = () => {
        switch (activeMenuItem) {
            case 'ProductUpload':
                return <ProductUpload />;
            case 'ExistingProducts':
                return <ExistingProducts />;
            case 'Orderr':
                return <Orderr />;
            case 'Dispatch':
                return <Dispatch />;
            case 'RevenueGeneration':
                return <RevenueGenerate />;
            case 'Settings':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="seller-dashboard">
            <header className="header">
                <div className="header-left">
                    <h1 className="seller-heading">Seller Dashboard</h1>
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
                </div>
                <div className="header-right">
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

            <div className="dashboard-container">
                <nav className="sidenav">
                    <ul>
                        
                        <li className={activeMenuItem === 'ProductUpload' ? 'active' : ''}>
  <Link to="/seller-dashboard" onClick={() => handleMenuItemClick('ProductUpload')}>
    <FontAwesomeIcon icon={faUpload} />
    <span style={{ marginLeft: '8px' }}> {/* Adjust the space as needed */}
      Product Upload
    </span>
  </Link>
</li>

<li className={activeMenuItem === 'ExistingProducts' ? 'active' : ''}>
  <Link to="/ExistingProduct" onClick={() => handleMenuItemClick('ExistingProducts')}>
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

                <main className="dashboard-main">
                    {renderMainContent()}
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;
