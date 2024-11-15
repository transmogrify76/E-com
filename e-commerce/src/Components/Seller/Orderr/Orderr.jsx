import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Orderr.css';
import { Button } from 'react-bootstrap';
import CreateShippingModal from '../CreateShippingModal/CreateShippingModal';
import { FaSearch, FaFilePdf, FaEye, FaTruck, FaTimes, FaCheck } from 'react-icons/fa';

const Orderr = () => {
    const [filter, setFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [orders, setOrders] = useState([
        { id: 1, purchaseDate: '2023-01-01 12:30 PM', customerName: 'abc', total: 850, status: 'Pending', paymentStatus: 'Pending', shippingAddress: '123 Street, City' },
        { id: 2, purchaseDate: '2023-01-02 10:45 AM', customerName: 'xyz', total: 700, status: 'Shipped', paymentStatus: 'Paid', shippingAddress: '456 Avenue, City' },
        { id: 3, purchaseDate: '2023-01-03 04:15 PM', customerName: 'pqr', total: 400, status: 'Cancelled', paymentStatus: 'Failed', shippingAddress: '789 Boulevard, City' },
        { id: 4, purchaseDate: '2023-01-04 11:00 AM', customerName: 'def', total: 1200, status: 'Delivered', paymentStatus: 'Paid', shippingAddress: '101 Road, City' },
    ]);

    const [showCreateShippingModal, setShowCreateShippingModal] = useState(false);

    const handleSearch = () => {
        const filteredOrders = orders.filter(order => 
            order.id.toString().includes(searchQuery) || 
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
            order.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setOrders(filteredOrders);
    };

    const exportToPDF = () => {
        const pdfTable = document.getElementById('order-table').outerHTML;
        const blob = new Blob([pdfTable], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.pdf';
        link.click();

        URL.revokeObjectURL(url);
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
            purchaseDate: new Date().toLocaleString(),
            customerName: newOrderData.productName,
            total: newOrderData.stockPrice,
            status: newOrderData.status,
            paymentStatus: 'Pending',
            shippingAddress: 'New Address',
        };
        setOrders([...orders, newOrder]);
        handleCloseCreateShippingModal();
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handlePaymentFilterChange = (event) => {
        setPaymentFilter(event.target.value);
    };

    const handleSelectOrder = (orderId) => {
        setSelectedOrders((prevState) =>
            prevState.includes(orderId)
                ? prevState.filter((id) => id !== orderId)
                : [...prevState, orderId]
        );
    };

    const handleBulkAction = (action) => {
        if (selectedOrders.length === 0) {
            alert("Please select orders to apply bulk actions.");
            return;
        }
        // Handle actions like marking as shipped, cancelling orders, etc.
        const updatedOrders = orders.map(order => {
            if (selectedOrders.includes(order.id)) {
                if (action === 'mark-shipped') {
                    return { ...order, status: 'Shipped' };
                } else if (action === 'cancel') {
                    return { ...order, status: 'Cancelled' };
                }
                // Other bulk actions can be added here
            }
            return order;
        });
        setOrders(updatedOrders);
        setSelectedOrders([]); // Clear the selected orders after action
    };

    const filteredOrders = orders.filter(order => {
        const statusMatch = filter === 'all' || order.status === filter;
        const paymentMatch = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
        return statusMatch && paymentMatch;
    });

    // Order summary (count of orders based on status)
    const orderSummary = {
        totalOrders: orders.length,
        pendingOrders: orders.filter(order => order.status === 'Pending').length,
        shippedOrders: orders.filter(order => order.status === 'Shipped').length,
        deliveredOrders: orders.filter(order => order.status === 'Delivered').length,
        cancelledOrders: orders.filter(order => order.status === 'Cancelled').length,
    };

    return (
        <div className="order-container">
            <h1>Orders</h1>
            <div className="order-summary">
                <p>Total Orders: {orderSummary.totalOrders}</p>
                <p>Pending: {orderSummary.pendingOrders}</p>
                <p>Shipped: {orderSummary.shippedOrders}</p>
                <p>Delivered: {orderSummary.deliveredOrders}</p>
                <p>Cancelled: {orderSummary.cancelledOrders}</p>
            </div>
            <div className="order-controls">
                <input
                    type="text"
                    placeholder="Search by Order ID, Customer Name, Address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '6px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '16px',
                        width: '300px'
                    }}
                />
                <Button variant="primary" onClick={handleSearch}>
                    <FaSearch /> Search
                </Button>
                <Button variant="secondary" onClick={exportToPDF}>
                    <FaFilePdf /> Export to PDF
                </Button>
                <div>
                    <select value={filter} onChange={handleFilterChange} style={{ marginRight: '10px' }}>
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <select value={paymentFilter} onChange={handlePaymentFilterChange} style={{ marginRight: '10px' }}>
                        <option value="all">All Payments</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>
                    <Button variant="success" onClick={handleShowCreateShippingModal}>
                        Create Shipping Request
                    </Button>
                    <Button variant="danger" onClick={() => handleBulkAction('cancel')}>
                        Cancel Selected Orders
                    </Button>
                    <Button variant="warning" onClick={() => handleBulkAction('mark-shipped')}>
                        Mark as Shipped
                    </Button>
                </div>
            </div>

            <table id="order-table" className="order-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={() => setSelectedOrders(filteredOrders.map(order => order.id))} /></th>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Order Date</th>
                        <th>Shipping Address</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id}>
                            <td><input type="checkbox" onChange={() => handleSelectOrder(order.id)} checked={selectedOrders.includes(order.id)} /></td>
                            <td>{order.id}</td>
                            <td>{order.customerName}</td>
                            <td>{order.purchaseDate}</td>
                            <td>
                                <button onClick={() => alert(order.shippingAddress)}>{order.shippingAddress}</button>
                            </td>
                            <td>{order.total}</td>
                            <td>{order.status}</td>
                            <td>{order.paymentStatus}</td>
                            <td>
                                <Link to={`/OrderIndividual/${order.id}`}>
                                    <Button variant="info" style={{ marginRight: '10px' }}><FaEye /> View</Button>
                                </Link>
                                {order.status !== 'Cancelled' && (
                                    <Link to={`/ShippingDetails/${order.id}`}>
                                        <Button variant="warning" style={{ marginRight: '10px' }}><FaTruck /> Dispatch</Button>
                                    </Link>
                                )}
                                {order.status !== 'Cancelled' && (
                                    <Button variant="danger" onClick={() => handleBulkAction('cancel')}>Cancel Order</Button>
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

