// Orders.jsx
import React, { useState } from 'react';
import './Orderr.css'; // Ensure to adjust path as per your project structure
import { Link } from 'react-router-dom';

const Orders = () => {
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
            <header>
                <h1>My Orders</h1>
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
