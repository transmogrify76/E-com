
// 
// Orderr.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Orderr.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilePdf, faEye, faTruck, faBell, faBoxOpen, faClipboardList, faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap'; // Import Bootstrap components
import CreateShippingModal from '../CreateShippingModal/CreateShippingModal'; // Import the CreateShippingModal component

const Orderr = () => {
    const user = {
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
    };

    const notificationsCount = 5;
    const [searchOrderId, setSearchOrderId] = useState('');
    const [orders, setOrders] = useState([
        { id: 1, purchaseDate: '2023-01-01 12:30 PM', customerName: 'abc', total: 850, status: 'Pending' },
        { id: 2, purchaseDate: '2023-01-02 10:45 AM', customerName: 'xyz', total: 700, status: 'Shipped' },
        { id: 3, purchaseDate: '2023-01-03 04:15 PM', customerName: 'pqr', total: 400, status: 'Cancelled' }
    ]);

    const [showCreateShippingModal, setShowCreateShippingModal] = useState(false);

    const handleSearch = () => {
        // Perform search logic based on searchOrderId
        // Example: Fetch orders from API based on searchOrderId
        // For demo, let's filter based on order ID containing the search string
        const filteredOrders = orders.filter(order => order.id.toString().includes(searchOrderId));
        setOrders(filteredOrders);
    };

    const exportToPDF = () => {
        // Logic to export orders to PDF
        // Example: Using a PDF generation library or API
        alert('Exporting to PDF...');
    };

    const handleView = (orderId) => {
        window.location.href ='./OrderIndividual'
    };

    const handleShip = (orderId) => {
        window.location.href ='./dispatch'
    };

    const handleShowCreateShippingModal = () => {
        setShowCreateShippingModal(true);
    };

    const handleCloseCreateShippingModal = () => {
        setShowCreateShippingModal(false);
    };

    const handleCreateOrder = (newOrderData) => {
        // Logic to handle creation of a new order
        // This function will be passed to CreateShippingModal component
        console.log('Creating new order:', newOrderData);
        // For demo purposes, you can add the new order to the existing orders state
        const newOrder = {
            id: orders.length + 1,
            ...newOrderData,
        };
        setOrders([...orders, newOrder]);
        handleCloseCreateShippingModal(); // Close modal after creating order
    };

    return (
        <div className="app-container">
            {/* Header */}
            <header className="header">
                <h1>My Orders</h1>
                <div className="header-right">
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        {notificationsCount > 0 && (
                            <span className="badge">{notificationsCount}</span>
                        )}
                    </div>
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>

                    </div>
                </div>
            </header>

            {/* Sidebar navigation */}
            <nav className="sidenav">
                <ul>
                    <li className="active">
                        <Link to="/Orderr">
                            <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/ExistingProduct">
                            <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '8px' }} />
                            Existing Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/Dispatch">
                            <FontAwesomeIcon icon={faTruck} style={{ marginRight: '8px' }} />
                            Dispatch
                        </Link>
                    </li>
                    <li>
                        <Link to="/RevenueGenerate">
                            <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
                            Revenue Generation
                        </Link>
                    </li>
                    <li>
                        <Link to="/Settings">
                            <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Main content */}
            <div className="seller-orders">
                <div className="seller-orders-header">
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            value={searchOrderId}
                            onChange={(e) => setSearchOrderId(e.target.value)}
                        />
                        <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                    <div className="export-section">
                        <button onClick={exportToPDF}><FontAwesomeIcon icon={faFilePdf} /> Export to PDF</button>
                    </div>
                    <div className="create-order-button">
                        <Button variant="primary" onClick={handleShowCreateShippingModal}>Create Shipping Request</Button>
                    </div>
                </div>

                <div className="order-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Purchased On</th>
                                <th>Customer Name</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.purchaseDate}</td>
                                    <td>{order.customerName}</td>
                                    <td>₹{order.total}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button onClick={() => handleView(order.id)}><FontAwesomeIcon icon={faEye} /> View</button>
                                        {order.status !== 'Cancelled' && (
                                            <button onClick={() => handleShip(order.id)}><FontAwesomeIcon icon={faTruck} /> Shipping details</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Shipping Modal */}
            <CreateShippingModal
                show={showCreateShippingModal}
                handleClose={handleCloseCreateShippingModal}
                handleCreateOrder={handleCreateOrder}
            />
        </div>
    );
};

export default Orderr;
