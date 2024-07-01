import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faEdit, faTrash, faBell, faSearch, faChartLine, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Order.css'; // Adjust path as per your project structure

const Order = () => {
    const user = {
        username: 'Admin', // Replace with actual admin username
        avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
    };

    const [activeMenuItem, setActiveMenuItem] = useState('Orders');

    // Mock data for orders
    const [orders, setOrders] = useState([
        { id: 1, customer: 'John Doe', total: 150.75, status: 'Pending' },
        { id: 2, customer: 'Jane Smith', total: 99.99, status: 'Processing' },
        { id: 3, customer: 'Michael Johnson', total: 249.50, status: 'Delivered' },
    ]);

    const [editingOrder, setEditingOrder] = useState(null);

    const handleEditOrder = (orderId) => {
        const orderToEdit = orders.find(order => order.id === orderId);
        setEditingOrder(orderToEdit);
    };

    const cancelEdit = () => {
        setEditingOrder(null);
    };

    const saveOrder = (updatedOrder) => {
        const updatedOrders = orders.map(order =>
            order.id === updatedOrder.id ? updatedOrder : order
        );
        setOrders(updatedOrders);
        setEditingOrder(null);
    };

    const handleDeleteOrder = (orderId) => {
        const updatedOrders = orders.filter(order => order.id !== orderId);
        setOrders(updatedOrders);
    };

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <h2>Orders Management</h2>
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="badge">5</span>
                        
                    </div>
                </div>
            </header>

            {/* Sidebar (sidenav) */}
            <div className="admin-container">
                <nav className="sidenav">
                    <ul>
                        <li className={activeMenuItem === 'Users' ? 'active' : ''}>
                            <Link to="/Users" onClick={() => handleMenuItemClick('Users')}>
                                <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                                Users Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Products' ? 'active' : ''}>
                            <Link to="/Products" onClick={() => handleMenuItemClick('Products')}>
                                <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                                Products Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Orders' ? 'active' : ''}>
                            <Link to="/Order" onClick={() => handleMenuItemClick('Orders')}>
                                <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                                Orders Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Reports' ? 'active' : ''}>
                            <Link to="/Reports" onClick={() => handleMenuItemClick('Reports')}>
                                <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
                                Reports & Analytics
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Settings' ? 'active' : ''}>
                            <Link to="/Setting" onClick={() => handleMenuItemClick('Setting')}>
                                <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                                Settings
                            </Link>
                        </li>
                        <li>
                            <a href="/Logout">
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="admin-main-content">
                        {/* Orders Management */}
                        <div className="orders-management">
                            <h2>Orders Management</h2>
                            <div className="orders-list">
                                {orders.map(order => (
                                    <div className="order-item" key={order.id}>
                                        {editingOrder && editingOrder.id === order.id ? (
                                            <div>
                                                <p><strong>Customer:</strong> {order.customer}</p>
                                                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                                                <p><strong>Status:</strong> {order.status}</p>
                                                <div className="order-actions">
                                                    <button onClick={() => saveOrder(editingOrder)}>Save</button>
                                                    <button onClick={cancelEdit}>Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <p><strong>Customer:</strong> {order.customer}</p>
                                                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                                                <p><strong>Status:</strong> {order.status}</p>
                                                <div className="order-actions">
                                                    <button onClick={() => handleEditOrder(order.id)}>
                                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteOrder(order.id)}>
                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Order;
