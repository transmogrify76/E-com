// Sidenavbar.jsx

// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChartLine, faBoxOpen, faClipboardList, faTruck, faCog, faAngleDoubleLeft, faAngleDoubleRight,faUpload  } from '@fortawesome/free-solid-svg-icons';
// import './SideNavbar.css';

// const Sidenavbar = () => {
//     const [isExpanded, setIsExpanded] = useState(true); // Initially expanded
//     const location = useLocation(); // Get current location from react-router-dom

//     const handleMenuItemClick = (menuItem) => {
//         // Handle any additional logic when a menu item is clicked
//         console.log(`Clicked on ${menuItem}`);
//     };

//     const toggleExpand = () => {
//         setIsExpanded(!isExpanded);
//     };

//     return (
//         <div className={`side-navbar ${isExpanded ? 'expanded' : 'collapsed'}`}>
//             <button className="toggle-btn" onClick={toggleExpand}>
//                 {isExpanded ? <FontAwesomeIcon icon={faAngleDoubleLeft} /> : <FontAwesomeIcon icon={faAngleDoubleRight} />}
//             </button>
//             <ul>
//                 <li className={location.pathname === '/seller-dashboard' ? 'active' : ''}>
//                     <Link to="/seller-dashboard" onClick={() => handleMenuItemClick('ProductUpload')}>
//                         <FontAwesomeIcon icon={faUpload } />
//                         {isExpanded && <span>Product Upload</span>}
//                     </Link>
//                 </li>
//                 <li className={location.pathname === '/ExistingProduct' ? 'active' : ''}>
//                     <Link to="/ExistingProduct" onClick={() => handleMenuItemClick('ExistingProducts')}>
//                         <FontAwesomeIcon icon={faBoxOpen} />
//                         {isExpanded && <span>Existing Product</span>}
//                     </Link>
//                 </li>
//                 <li className={location.pathname === '/Orderr' ? 'active' : ''}>
//                     <Link to="/Orderr" onClick={() => handleMenuItemClick('Orders')}>
//                         <FontAwesomeIcon icon={faClipboardList} />
//                         {isExpanded && <span>Order</span>}
//                     </Link>
//                 </li>
//                 <li className={location.pathname === '/Dispatch' ? 'active' : ''}>
//                     <Link to="/Dispatch" onClick={() => handleMenuItemClick('Dispatch')}>
//                         <FontAwesomeIcon icon={faTruck} />
//                         {isExpanded && <span>Dispatch</span>}
//                     </Link>
//                 </li>
//                 <li className={location.pathname === '/RevenueGenerate' ? 'active' : ''}>
//                     <Link to="/RevenueGenerate" onClick={() => handleMenuItemClick('RevenueGeneration')}>
//                         <FontAwesomeIcon icon={faChartLine} />
//                         {isExpanded && <span>Revenue Generation</span>}
//                     </Link>
//                 </li>
//                 <li className={location.pathname === '/Settings' ? 'active' : ''}>
//                     <Link to="/Settings" onClick={() => handleMenuItemClick('Settings')}>
//                         <FontAwesomeIcon icon={faCog} />
//                         {isExpanded && <span>Setting</span>}
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Sidenavbar;

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
            <li className={`nav-item ${location.pathname === '/seller-dashboard' ? 'active' : ''}`}>
                <Link to="/seller-dashboard" className="nav-link" onClick={() => handleMenuItemClick('ProductUpload')}>
                    <FontAwesomeIcon icon={faUpload} className="nav-icon" />
                    {isExpanded && <span>Product Upload</span>}
                </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/ExistingProduct' ? 'active' : ''}`}>
                <Link to="/ExistingProduct" className="nav-link" onClick={() => handleMenuItemClick('ExistingProducts')}>
                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                    {isExpanded && <span>Existing Product</span>}
                </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/Orderr' ? 'active' : ''}`}>
                <Link to="/Orderr" className="nav-link" onClick={() => handleMenuItemClick('Orders')}>
                    <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
                    {isExpanded && <span>Order</span>}
                </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/Dispatch' ? 'active' : ''}`}>
                <Link to="/Dispatch" className="nav-link" onClick={() => handleMenuItemClick('Dispatch')}>
                    <FontAwesomeIcon icon={faTruck} className="nav-icon" />
                    {isExpanded && <span>Dispatch</span>}
                </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/RevenueGenerate' ? 'active' : ''}`}>
                <Link to="/RevenueGenerate" className="nav-link" onClick={() => handleMenuItemClick('RevenueGeneration')}>
                    <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
                    {isExpanded && <span>Revenue Generation</span>}
                </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/Settings' ? 'active' : ''}`}>
                <Link to="/Settings" className="nav-link" onClick={() => handleMenuItemClick('Settings')}>
                    <FontAwesomeIcon icon={faCog} className="nav-icon" />
                    {isExpanded && <span>Setting</span>}
                </Link>
            </li>
        </ul>
        </div>
    );
};

export default SideNavbar;
