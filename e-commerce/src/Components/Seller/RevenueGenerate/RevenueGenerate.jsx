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
             <header className="header">
             <div className="header-left">
           
                <h1>Revenue Generation</h1>
                {/* Add any additional header content here */}
          </div>
          <div className="header-right">
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
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


            {/* Side Navigation (sidenav) */}
         
            <nav className="sidenav">
                <ul>
                    <li className={activeMenuItem === 'ProductUpload' ? 'active' : ''}>
                        <Link to="/seller-dashboard" onClick={() => handleMenuItemClick('ProductUpload')}>
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
