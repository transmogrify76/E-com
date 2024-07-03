

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faClipboardList, faTruck, faChartLine, faCog, faAngleDoubleLeft, faAngleDoubleRight,faUpload } from '@fortawesome/free-solid-svg-icons';

const SideNavbar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const location = useLocation();

    const handleMenuItemClick = (menuItem) => {
        console.log(`Clicked on ${menuItem}`);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

   


return (
    <div className={`side-navbar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button className="toggle-btn" onClick={toggleExpand}>
            {isExpanded ? <FontAwesomeIcon icon={faAngleDoubleLeft} /> : <FontAwesomeIcon icon={faAngleDoubleRight} />}
        </button>
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/seller-dashboard" className={`nav-link ${location.pathname === '/seller-dashboard' ? 'active' : ''}`} onClick={() => handleMenuItemClick('ProductUpload')}>
                    <FontAwesomeIcon icon={faUpload} className="nav-icon" />
                    {isExpanded && <span>Product Upload</span>}
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/ExistingProduct" className={`nav-link ${location.pathname === '/ExistingProduct' ? 'active' : ''}`} onClick={() => handleMenuItemClick('ExistingProducts')}>
                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                    {isExpanded && <span>Existing Product</span>}
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/Orderr" className={`nav-link ${location.pathname === '/Orderr' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Orders')}>
                    <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
                    {isExpanded && <span>Order</span>}
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/Dispatch" className={`nav-link ${location.pathname === '/Dispatch' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Dispatch')}>
                    <FontAwesomeIcon icon={faTruck} className="nav-icon" />
                    {isExpanded && <span>Dispatch</span>}
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/RevenueGenerate" className={`nav-link ${location.pathname === '/RevenueGenerate' ? 'active' : ''}`} onClick={() => handleMenuItemClick('RevenueGeneration')}>
                    <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
                    {isExpanded && <span>Revenue Generation</span>}
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/Settings" className={`nav-link ${location.pathname === '/Settings' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Settings')}>
                    <FontAwesomeIcon icon={faCog} className="nav-icon" />
                    {isExpanded && <span>Setting</span>}
                </Link>
            </li>
        </ul>
    </div>
);
};

export default SideNavbar;


