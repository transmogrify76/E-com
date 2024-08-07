
// src/Components/Orderr/Orderr.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Orderr.css'; // Import CSS file for styling
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faFilePdf, faEye, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap'; // Import Bootstrap components
import CreateShippingModal from '../CreateShippingModal/CreateShippingModal'; // Import the CreateShippingModal component

const Orderr = () => {
    const [filter, setFilter] = useState('all');
    const [searchOrderId, setSearchOrderId] = useState('');
    const [orders, setOrders] = useState([
        { id: 1, purchaseDate: '2023-01-01 12:30 PM', customerName: 'abc', total: 850, status: 'Pending' },
        { id: 2, purchaseDate: '2023-01-02 10:45 AM', customerName: 'xyz', total: 700, status: 'Shipped' },
        { id: 3, purchaseDate: '2023-01-03 04:15 PM', customerName: 'pqr', total: 400, status: 'Cancelled' },
        { id: 4, purchaseDate: '2023-01-04 11:00 AM', customerName: 'def', total: 1200, status: 'Delivered' },
    ]);

    const [showCreateShippingModal, setShowCreateShippingModal] = useState(false);

    const handleSearch = () => {
        const filteredOrders = orders.filter(order => order.id.toString().includes(searchOrderId));
        setOrders(filteredOrders);
    };

    const exportToPDF = () => {
        alert('Exporting to PDF...');
    };

    const handleShowCreateShippingModal = () => {
        setShowCreateShippingModal(true);
    };

    const handleCloseCreateShippingModal = () => {
        setShowCreateShippingModal(false);
    };

    const handleCreateOrder = (newOrderData) => {
        const newOrder = {
            id: orders.length + 1,
            ...newOrderData,
        };
        setOrders([...orders, newOrder]);
        handleCloseCreateShippingModal();
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

    return (
        <div className="order-container">
            <h1>Orders</h1>
            <div className="order-controls">
                <input
                    type="text"
                    placeholder="Search by Order ID"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    style={{ 
                        padding: '6px', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px', 
                        fontSize: '20px', 
                        width: '300px'
                    }}
                />
               <Button
                    variant="primary"
                    onClick={handleSearch}
                    style={{ marginRight: '350px', marginBottom: '10px' }}
                >
                    <FontAwesomeIcon icon={faSearch} /> Search
                </Button> 
                <Button
                    variant="secondary"
                    onClick={exportToPDF}
                >
                    <FontAwesomeIcon icon={faFilePdf} /> Export to PDF
                </Button>
                <div>            
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        style={{
                            marginRight: '100px', 
                            width: '300px',       
                            height: '40px',       
                            padding: '5px',       
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value="all">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <Button
                        variant="success"
                        onClick={handleShowCreateShippingModal}
                    >
                        Create Shipping Request
                    </Button>
                </div>
            </div>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Purchase Date</th>
                        <th>Customer Name</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.purchaseDate}</td>
                            <td>{order.customerName}</td>
                            <td>{order.total}</td>
                            <td>{order.status}</td>
                            <td>
                                
                                <Link to={`/OrderIndividual/${order.id}`}>
                                    <Button variant="info">
                                        <FontAwesomeIcon icon={faEye} /> View
                                    </Button>
                                </Link>

                                
                                {order.status !== 'Cancelled' && (
                                    <Link to={`/ShippingDetails/${order.id}`}>
                                        <Button variant="warning">
                                            <FontAwesomeIcon icon={faTruck} /> Ship
                                        </Button>
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CreateShippingModal
                show={showCreateShippingModal}
                handleClose={handleCloseCreateShippingModal}
                handleCreateOrder={handleCreateOrder}
            />
        </div>
    );
};

export default Orderr;
