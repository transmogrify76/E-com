// Sidenavbar.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBoxOpen, faClipboardList, faTruck } from '@fortawesome/free-solid-svg-icons';

const Sidenavbar = ({ activeMenuItem, handleMenuItemClick }) => {
    return (
        <nav className="sidenav">
            <ul>
                <li className={activeMenuItem === 'ProductDisplay' ? 'active' : ''}>
                    <Link to="/ProductDisplay" onClick={() => handleMenuItemClick('ProductDisplay')}>
                        <FontAwesomeIcon icon={faChartLine} />
                        Product Display
                    </Link>
                </li>
                <li className={activeMenuItem === 'ExistingProduct' ? 'active' : ''}>
                    <Link to="/ExistingProduct" onClick={() => handleMenuItemClick('ExistingProduct')}>
                        <FontAwesomeIcon icon={faBoxOpen} />
                        Existing Products
                    </Link>
                </li>
                <li className={activeMenuItem === 'Orderr' ? 'active' : ''}>
                    <Link to="/Orderr" onClick={() => handleMenuItemClick('Orderr')}>
                        <FontAwesomeIcon icon={faClipboardList} />
                        Orders
                    </Link>
                </li>
                <li className={activeMenuItem === 'Dispatch' ? 'active' : ''}>
                    <Link to="/Dispatch" onClick={() => handleMenuItemClick('Dispatch')}>
                        <FontAwesomeIcon icon={faTruck} />
                        Dispatch
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidenavbar;
