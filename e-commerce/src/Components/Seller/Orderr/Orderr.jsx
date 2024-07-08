import React, { useState } from 'react';
import './Orderr.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilePdf, faEye, faTruck} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap'; // Import Bootstrap components
import CreateShippingModal from '../CreateShippingModal/CreateShippingModal'; // Import the CreateShippingModal component

const Orderr = () => {
    const [filter, setFilter] = useState('all');
    const [searchOrderId, setSearchOrderId] = useState('');
    const [orders, setOrders] = useState([
        { id: 1, purchaseDate: '2023-01-01 12:30 PM', customerName: 'abc', total: 850, status: 'Pending' },
        { id: 2, purchaseDate: '2023-01-02 10:45 AM', customerName: 'xyz', total: 700, status: 'Shipped' },
        { id: 3, purchaseDate: '2023-01-03 04:15 PM', customerName: 'pqr', total: 400, status: 'Cancelled' }
    ]);

    const [showCreateShippingModal, setShowCreateShippingModal] = useState(false);

    const handleSearch = () => {
        // Logic for searching based on searchOrderId
        const filteredOrders = orders.filter(order => order.id.toString().includes(searchOrderId));
        setOrders(filteredOrders);
    };

    const exportToPDF = () => {
        // Logic for exporting orders to PDF
        alert('Exporting to PDF...');
    };

    const handleView = () => {
        // Example of navigation to individual order view
        window.location.href = './OrderIndividual';
    };

    const handleShip = () => {
        // Example of navigation to shipping details page
        window.location.href = './Dispatch';
    };

    const handleShowCreateShippingModal = () => {
        // Open the modal for creating shipping request
        setShowCreateShippingModal(true);
    };

    const handleCloseCreateShippingModal = () => {
        // Close the modal
        setShowCreateShippingModal(false);
    };

    const handleCreateOrder = (newOrderData) => {
        // Logic for creating a new order (e.g., adding to state)
        const newOrder = {
            id: orders.length + 1,
            ...newOrderData,
        };
        setOrders([...orders, newOrder]);
        handleCloseCreateShippingModal(); // Close modal after creation
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
      };

    return (
        <div className="app-container">
           <h4>Manage Orders</h4>
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
                    <div>
                      <label htmlFor="filter">Filter: </label>
                         <select id="filter" value={filter} onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="delivered">Delivered</option>
                            <option value="shipped">Shipped</option>
                            <option value="cancelled">Cancelled</option>
                         </select>
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
                                        <button onClick={() => handleView()}><FontAwesomeIcon icon={faEye} /> View</button>
                                        {order.status !== 'Cancelled' && (
                                            <button onClick={() => handleShip()}><FontAwesomeIcon icon={faTruck} /> Shipping details</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CreateShippingModal
                show={showCreateShippingModal}
                handleClose={handleCloseCreateShippingModal}
                handleCreateOrder={handleCreateOrder}
            />
        </div>
    );
};

export default Orderr;