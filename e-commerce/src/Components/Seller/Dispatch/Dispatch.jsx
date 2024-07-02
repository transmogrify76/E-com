

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
