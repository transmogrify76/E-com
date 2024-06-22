

import React, { useState } from 'react';
import './Dispatch.css'; // Ensure to adjust path as per your project structure
import { Link } from 'react-router-dom';

const Dispatch = () => {
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
            <header>
                <h1>Dispatch Management</h1>
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
