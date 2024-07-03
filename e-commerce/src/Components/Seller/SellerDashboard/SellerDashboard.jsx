import React, { useState } from 'react';

import './SellerDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell} from '@fortawesome/free-solid-svg-icons';
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
          
            <div className="dashboard-container">
               
                {/* Main content area */}
                <main className="dashboard-main">
                    {renderMainContent()}
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;
