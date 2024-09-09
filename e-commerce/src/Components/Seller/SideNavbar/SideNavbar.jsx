import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUpload, FaBoxOpen, FaClipboardList, FaChartLine, FaCog,FaUser,FaMoneyBillWave, FaListUl, FaStar} from 'react-icons/fa';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

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
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </button>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/seller-dashboard" className={`nav-link ${location.pathname === '/seller-dashboard' ? 'active' : ''}`} onClick={() => handleMenuItemClick('SellerDashboard')}>
                        <FaHome className="nav-icon" />
                        {isExpanded && <span>Seller Dashboard</span>}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/ProductUpload" className={`nav-link ${location.pathname === '/ProductUpload' ? 'active' : ''}`} onClick={() => handleMenuItemClick('ProductUpload')}>
                        <FaUpload className="nav-icon" />
                        {isExpanded && <span>Product Upload</span>}
                    </Link>
                </li>
               
                <li className="nav-item">
                    <Link to="/productmanagement" className={`nav-link ${location.pathname === '/productmanagement' ? 'active' : ''}`} onClick={() => handleMenuItemClick('ProductManagement')}>
                        < FaListUl className="nav-icon" />
                        {isExpanded && <span>Product Management</span>}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/return" className={`nav-link ${location.pathname === '/return' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Return')}>
                        < FaStar className="nav-icon" />
                        {isExpanded && <span>Returns</span>}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/ExistingProduct" className={`nav-link ${location.pathname === '/ExistingProduct' ? 'active' : ''}`} onClick={() => handleMenuItemClick('ExistingProducts')}>
                        <FaBoxOpen className="nav-icon" />
                        {isExpanded && <span>Inventory </span>}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/Pricing" className={`nav-link ${location.pathname === '/Pricing' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Pricing')}>
                        <FaMoneyBillWave className="nav-icon" />
                        {isExpanded && <span>Pricing</span>}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/Orderr" className={`nav-link ${location.pathname === '/Orderr' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Orders')}>
                        <FaClipboardList className="nav-icon" />
                        {isExpanded && <span>Manage Orders</span>}
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <Link to="/Dispatch" className={`nav-link ${location.pathname === '/Dispatch' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Dispatch')}>
                        <FaTruck className="nav-icon" />
                        {isExpanded && <span>Dispatch</span>}
                    </Link>
                </li> */}
                <li className="nav-item">
                    <Link to="/RevenueGenerate" className={`nav-link ${location.pathname === '/RevenueGenerate' ? 'active' : ''}`} onClick={() => handleMenuItemClick('RevenueGeneration')}>
                        <FaChartLine className="nav-icon" />
                        {isExpanded && <span>Revenue Generation</span>}
                    </Link>
                </li>
               
                <li className="nav-item">
                    <Link to="/Settings" className={`nav-link ${location.pathname === '/Settings' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Settings')}>
                        <FaCog className="nav-icon" />
                        {isExpanded && <span>Settings</span>}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/SellerAccount" className={`nav-link ${location.pathname === '/SellerAccount' ? 'active' : ''}`} onClick={() => handleMenuItemClick('SellerAccount')}>
                        <FaUser className="nav-icon" />
                        {isExpanded && <span>My Account</span>}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SideNavbar;
