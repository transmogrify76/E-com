

// Orderr.jsx

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Orderr.css'; // Import CSS file for styling
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faFilePdf, faEye, faTruck, faBell, faBoxOpen, faClipboardList, faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';
// import { Button } from 'react-bootstrap'; // Import Bootstrap components
// import CreateShippingModal from '../CreateShippingModal/CreateShippingModal'; // Import the CreateShippingModal component

// const Orderr = () => {
//     const user = {
//         username: 'John Doe',
//         avatar: 'https://via.placeholder.com/150',
//     };

//     const notificationsCount = 5;
//     const [searchOrderId, setSearchOrderId] = useState('');
//     const [orders, setOrders] = useState([
//         { id: 1, purchaseDate: '2023-01-01 12:30 PM', customerName: 'abc', total: 850, status: 'Pending' },
//         { id: 2, purchaseDate: '2023-01-02 10:45 AM', customerName: 'xyz', total: 700, status: 'Shipped' },
//         { id: 3, purchaseDate: '2023-01-03 04:15 PM', customerName: 'pqr', total: 400, status: 'Cancelled' }
//     ]);

//     const [showCreateShippingModal, setShowCreateShippingModal] = useState(false);

//     const handleSearch = () => {
//         // Perform search logic based on searchOrderId
//         // Example: Fetch orders from API based on searchOrderId
//         // For demo, let's filter based on order ID containing the search string
//         const filteredOrders = orders.filter(order => order.id.toString().includes(searchOrderId));
//         setOrders(filteredOrders);
//     };

//     const exportToPDF = () => {
//         // Logic to export orders to PDF
//         // Example: Using a PDF generation library or API
//         alert('Exporting to PDF...');
//     };

//     const handleView = (orderId) => {
//         window.location.href ='./OrderIndividual'
//     };

//     const handleShip = (orderId) => {
//         window.location.href ='./Dispatch'
//     };

//     const handleShowCreateShippingModal = () => {
//         setShowCreateShippingModal(true);
//     };

//     const handleCloseCreateShippingModal = () => {
//         setShowCreateShippingModal(false);
//     };

//     const handleCreateOrder = (newOrderData) => {
//         // Logic to handle creation of a new order
//         // This function will be passed to CreateShippingModal component
//         console.log('Creating new order:', newOrderData);
//         // For demo purposes, you can add the new order to the existing orders state
//         const newOrder = {
//             id: orders.length + 1,
//             ...newOrderData,
//         };
//         setOrders([...orders, newOrder]);
//         handleCloseCreateShippingModal(); // Close modal after creating order
//     };

//     return (
//         <div className="app-container">
           

//             {/* Sidebar navigation */}
          
//             {/* Main content */}
//             <div className="seller-orders">
//                 <div className="seller-orders-header">
//                     <div className="search-section">
//                         <input
//                             type="text"
//                             placeholder="Search by Order ID"
//                             value={searchOrderId}
//                             onChange={(e) => setSearchOrderId(e.target.value)}
//                         />
//                         <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
//                     </div>
//                     <div className="export-section">
//                         <button onClick={exportToPDF}><FontAwesomeIcon icon={faFilePdf} /> Export to PDF</button>
//                     </div>
//                     <div className="create-order-button">
//                         <Button variant="primary" onClick={handleShowCreateShippingModal}>Create Shipping Request</Button>
//                     </div>
//                 </div>

//                 <div className="order-table">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Order ID</th>
//                                 <th>Purchased On</th>
//                                 <th>Customer Name</th>
//                                 <th>Total</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map(order => (
//                                 <tr key={order.id}>
//                                     <td>{order.id}</td>
//                                     <td>{order.purchaseDate}</td>
//                                     <td>{order.customerName}</td>
//                                     <td>₹{order.total}</td>
//                                     <td>{order.status}</td>
//                                     <td>
//                                         <button onClick={() => handleView(order.id)}><FontAwesomeIcon icon={faEye} /> View</button>
//                                         {order.status !== 'Cancelled' && (
//                                             <button onClick={() => handleShip(order.id)}><FontAwesomeIcon icon={faTruck} /> Shipping details</button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Create Shipping Modal */}
//             <CreateShippingModal
//                 show={showCreateShippingModal}
//                 handleClose={handleCloseCreateShippingModal}
//                 handleCreateOrder={handleCreateOrder}
//             />
//         </div>
//     );
// };

// export default Orderr;

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilePdf, faEye, faTruck } from '@fortawesome/free-solid-svg-icons';
import './Orderr.css'; // Ensure the correct path to your CSS file
import CreateShippingModal from '../CreateShippingModal/CreateShippingModal'; // Assuming the correct path to your modal component

const Orderr = () => {
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

    const handleView = (orderId) => {
        // Example of navigation to individual order view
        window.location.href = `./OrderIndividual/${orderId}`;
    };

    const handleShip = (orderId) => {
        // Example of navigation to shipping details page
        window.location.href = `./Dispatch/${orderId}`;
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

    return (
        <div className="app-container">
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
            <CreateShippingModal
                show={showCreateShippingModal}
                handleClose={handleCloseCreateShippingModal}
                handleCreateOrder={handleCreateOrder}
            />
        </div>
    );
};

export default Orderr;
