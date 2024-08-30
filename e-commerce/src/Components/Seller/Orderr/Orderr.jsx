import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Orderr.css'; // Import CSS file for styling
import { Button } from 'react-bootstrap'; // Import Bootstrap components
import CreateShippingModal from '../CreateShippingModal/CreateShippingModal'; // Import the CreateShippingModal component
import { FaSearch, FaFilePdf, FaEye, FaTruck } from 'react-icons/fa'; // Import React Icons

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
        const pdfTable = document.getElementById('order-table').outerHTML;
        const blob = new Blob([pdfTable], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.pdf';
        link.click();

        // Clean up
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
            id: orders.length + 1, // Increment ID based on existing orders
            purchaseDate: new Date().toLocaleString(), // Current date and time
            customerName: newOrderData.productName, // Set customer name from the order data
            total: newOrderData.stockPrice, // Set total from the order data
            status: newOrderData.status, // Set status from the order data
        };
        setOrders([...orders, newOrder]); // Add new order to the orders list
        handleCloseCreateShippingModal(); // Close the modal
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
                    <FaSearch /> Search {/* React Icon */}
                </Button>
                <Button
                    variant="secondary"
                    onClick={exportToPDF}
                >
                    <FaFilePdf /> Export to PDF {/* React Icon */}
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
            <table id="order-table" className="order-table">
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
                    <Button variant="info" style={{ marginRight: '10px' }}> {/* Added margin */}
                        <FaEye /> View {/* React Icon */}
                    </Button>
                </Link>
                {order.status !== 'Cancelled' && (
                    <Link to={`/ShippingDetails/${order.id}`}>
                        <Button variant="warning">
                            <FaTruck /> Ship {/* React Icon */}
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
