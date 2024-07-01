// Orders.jsx
import React, { useState } from 'react';
import './Orderr.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faCog, faChartLine, faClipboardList, faTruck, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
    const user = {
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
    };

    const notificationsCount = 5;
    const [activeMenuItem, setActiveMenuItem] = useState('Orderr'); // Default active menu item is 'Orderr'

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    // Mock data for orders (replace with actual data handling)
    const [orders, setOrders] = useState([
        { id: 1, orderId: 'ORD-001', total: 100, status: 'Pending' },
        { id: 2, orderId: 'ORD-002', total: 150, status: 'In Progress' },
        { id: 3, orderId: 'ORD-003', total: 200, status: 'Shipped' },
        { id: 4, orderId: 'ORD-004', total: 120, status: 'Delivered' }
    ]);

    return (
        <div className="app-container">
            {/* Header */}
            <header className="header">
                <h1>My Orders</h1>
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
            <div className="orders-container">
                <h2>Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Total (₹)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.orderId}</td>
                                <td>₹{order.total}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
