import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './SellerDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faCog, faChartLine, faClipboardList, faTruck, faChartBar, faBoxOpen, faUpload } from '@fortawesome/free-solid-svg-icons';
import ProductUpload from '../ProductUpload/ProductUpload';
import ExistingProducts from '../ExistingProduct/ExcistingProduct';
import Orderr from '../Orderr/Orderr';
import Dispatch from '../Dispatch/Dispatch';
import RevenueGenerate from '../RevenueGenerate/RevenueGenerate';
import Settings from '../Settings/Settings';

const SellerDashboard = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('ProductUpload'); // Default active menu item

    // Function to handle menu item click
    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    // Function to render the main content based on activeMenuItem
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
                    <h1>{activeMenuItem}</h1> 
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <span className="username">User Name</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                       
                    </div>
                </div>
            </header>

            {/* Main content */}
            <div className="dashboard-container">
                {/* Sidebar navigation */}
                <nav className="sidenav">
                    <ul>
                        <li className={activeMenuItem === 'ProductUpload' ? 'active' : ''}>
                            <Link to="/seller-dashboard" onClick={() => handleMenuItemClick('ProductUpload')}>
                                <FontAwesomeIcon icon={faUpload} />
                                <span style={{ marginLeft: '8px' }}>Product Upload</span>
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

                {/* Main content area */}
                <main className="dashboard-main">
                    {renderMainContent()}
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;
