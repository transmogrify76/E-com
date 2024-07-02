// RevenueGenerate.jsx
import React, { useState } from 'react';
import './RevenueGenerate.css'; // Ensure to adjust path as per your project structure
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faCog, faChartLine, faClipboardList, faTruck, faBoxOpen } from '@fortawesome/free-solid-svg-icons';


const RevenueGenerate = () => {
    const user = {
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
    };

    const notificationsCount = 5;

    // Default active menu item
    const [activeMenuItem, setActiveMenuItem] = useState('ExistingProducts'); 

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    // Mock data for revenue statistics (replace with actual data handling)
    const [revenueData, setRevenueData] = useState([
        { id: 1, month: 'January', revenue: 1000 },
        { id: 2, month: 'February', revenue: 1500 },
        { id: 3, month: 'March', revenue: 1800 },
        { id: 4, month: 'April', revenue: 1200 },
        { id: 5, month: 'May', revenue: 2000 },
        { id: 6, month: 'June', revenue: 2500 }
    ]);

    return (
        <div className="app-container">
           
          


            {/* Side Navigation (sidenav) */}
         
           
            {/* Main Content */}
            <div className="revenue-generate-container">
                <h2>Revenue Statistics</h2>
                <table className="revenue-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Revenue (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revenueData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.month}</td>
                                <td>{data.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="revenue-chart">
                    {revenueData.map((data) => (
                        <div key={data.id} className="bar" style={{ height: `${data.revenue / 10}px` }}>
                            <span className="bar-label">{data.month}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RevenueGenerate;
