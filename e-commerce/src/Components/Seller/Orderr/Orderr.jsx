// import React, { useState, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
// import { FaSearch, FaFilePdf, FaEye, FaTrashAlt } from 'react-icons/fa'; // Importing trash icon for delete
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import axios from 'axios';
// import './Orderr.css'; // Assuming your styling file is here

// const Orderr = () => {
//     const [filter, setFilter] = useState('all');
//     const [searchOrderId, setSearchOrderId] = useState('');
//     const [orders, setOrders] = useState([]);
//     const [userId, setUserId] = useState(localStorage.getItem('userId')); // Get userId from localStorage

//     // Fetch orders from the API based on userId
//     useEffect(() => {
//         if (userId) {
//             const fetchOrders = async () => {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/orders/user/${userId}`, {
//                         headers: {
//                             'If-Modified-Since': '2024-11-21T12:00:00Z' // Add the last modified date from the server or cache
//                         }
//                     });
//                     console.log('API Response:', response.data); // Log the response to see the structure

//                     if (response.status === 304) {
//                         console.log('Data has not been modified since last fetch.');
//                         // Optionally, show a message or skip updating the orders
//                     } else if (response.data && Array.isArray(response.data)) {
//                         setOrders(response.data); // Set orders if the response contains them
//                     } else {
//                         setOrders([]); // Set an empty array if no orders are found
//                     }
//                 } catch (error) {
//                     console.error('Error fetching orders:', error);
//                     setOrders([]); // Set an empty array in case of error
//                 }
//             };

//             fetchOrders();
//         }
//     }, [userId]); // Fetch orders when the component mounts

//     // Search by Order ID
//     const handleSearch = async () => {
//         if (searchOrderId) {
//             try {
//                 const response = await axios.get(`http://localhost:5000/orders/${searchOrderId}`);
//                 console.log('Searched Order Response:', response.data);

//                 if (response.data) {
//                     setOrders([response.data]); // Update orders with the searched order (assuming the response is an object)
//                 } else {
//                     setOrders([]); // Set an empty array if no order is found for that ID
//                 }
//             } catch (error) {
//                 console.error('Error fetching order by ID:', error);
//                 setOrders([]); // Set an empty array in case of error
//             }
//         } else {
//             // If searchOrderId is empty, fetch all orders again
//             const fetchOrders = async () => {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/orders/user/${userId}`);
//                     console.log('API Response:', response.data); // Log the response to see the structure

//                     if (response.data && Array.isArray(response.data)) {
//                         setOrders(response.data); // Set orders if the response contains them
//                     } else {
//                         setOrders([]); // Set an empty array if no orders are found
//                     }
//                 } catch (error) {
//                     console.error('Error fetching orders:', error);
//                     setOrders([]); // Set an empty array in case of error
//                 }
//             };

//             fetchOrders();
//         }
//     };

//     const handleFilterChange = (event) => {
//         setFilter(event.target.value);
//     };

//     const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.orderingStatus === filter);

//     // Handle delete order
//     const handleDeleteOrder = async (orderId) => {
//         try {
//             const response = await axios.delete(`http://localhost:5000/orders/${orderId}`);
//             if (response.status === 200) {
//                 // Remove the deleted order from the orders state
//                 setOrders(orders.filter(order => order.id !== orderId));
//                 alert("Order deleted successfully");
//             }
//         } catch (error) {
//             console.error('Error deleting order:', error);
//             alert('Failed to delete the order. Please try again.');
//         }
//     };

//     return (
//         <div className="order-container">
//             <h1>Orders</h1>
//             <div className="order-controls">
//                 <input
//                     type="text"
//                     placeholder="Search by Order ID"
//                     value={searchOrderId}
//                     onChange={(e) => setSearchOrderId(e.target.value)}
//                     style={{
//                         padding: '6px',
//                         border: '1px solid #ccc',
//                         borderRadius: '4px',
//                         fontSize: '20px',
//                         width: '300px'
//                     }}
//                 />
//                 <Button
//                     variant="primary"
//                     onClick={handleSearch}
//                     style={{ marginRight: '1300px', marginBottom: '8px' }}
//                 >
//                     <FaSearch /> 
//                 </Button>
//                 <Button
//                     variant="secondary"
//                     onClick={() => {/* Export to PDF logic here */}}
//                 >
//                     <FaFilePdf /> Export to PDF
//                 </Button>
//                 <div>
//                     <select
//                         value={filter}
//                         onChange={handleFilterChange}
//                         style={{
//                             marginRight: '100px',
//                             width: '300px',
//                             height: '40px',
//                             padding: '5px',
//                             borderRadius: '4px',
//                             border: '1px solid #ccc'
//                         }}
//                     >
//                         <option value="all">All</option>
//                         <option value="Pending">Pending</option>
//                         <option value="Shipped">Shipped</option>
//                         <option value="Delivered">Delivered</option>
//                         <option value="Cancelled">Cancelled</option>
//                     </select>
//                 </div>
//             </div>

//             <table className="order-table">
//                 <thead>
//                     <tr>
//                         <th>Order ID</th>
//                         <th>Created Date</th>
//                         <th>Customer Name</th>
//                         <th>Address</th>
//                         <th>Total Price</th>
//                         <th>Ordered Items</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredOrders.length > 0 ? (
//                         filteredOrders.map(order => (
//                             <tr key={order.id}>
//                                 <td>{order.id}</td>
//                                 <td>{new Date(order.orderedAt).toLocaleString()}</td>
//                                 <td>{order.user?.name || "N/A"}</td>
//                                 <td>{order.address}</td>
//                                 <td>{order.totalOrderCost || "N/A"}</td>
//                                 <td>
//                                     <ul>
//                                         {order.orderedItems.map((item, index) => (
//                                             <li key={index}>
//                                                 Product ID: {item.productId}, 
//                                                 Quantity: {item.quantity}, 
//                                                 Price: {item.priceAfterDiscount}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </td>
//                                 <td>{order.orderingStatus}</td>
//                                 <td>
//                                     <Link to={`/OrderIndividual/${order.id}`}>
//                                         <Button variant="info" style={{ marginRight: '10px' }}>
//                                             <FaEye /> View
//                                         </Button>
//                                     </Link>
//                                     {order.orderingStatus !== 'Cancelled' && (
//                                         <Button
//                                             variant="danger"
//                                             style={{ marginRight: '10px' }}
//                                             onClick={() => handleDeleteOrder(order.id)}
//                                         >
//                                             <FaTrashAlt /> Delete
//                                         </Button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="8" style={{ textAlign: 'center' }}>No orders found.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Orderr;

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaSearch, FaFilePdf, FaEye, FaTrashAlt } from 'react-icons/fa'; // Importing trash icon for delete
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import './Orderr.css'; // Assuming your styling file is here

const Orderr = () => {
    const [filter, setFilter] = useState('all');
    const [searchOrderId, setSearchOrderId] = useState('');
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('userId')); // Get userId from localStorage
    const [totalCancelledOrders, setTotalCancelledOrders] = useState(0); // State for total cancelled orders

    // Fetch total cancelled orders from the analytics API
    useEffect(() => {
        const fetchCancelledOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/analytics?sellerId=3&type=totalOrdersCancelled');
                if (response.data && response.data.data) {
                    setTotalCancelledOrders(response.data.data.totalOrdersCancelled);
                }
            } catch (error) {
                console.error('Error fetching cancelled orders:', error);
            }
        };

        fetchCancelledOrders();
    }, []); // Run this effect only once when the component mounts

    // Fetch orders from the API based on userId
    useEffect(() => {
        if (userId) {
            const fetchOrders = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/orders/user/${userId}`, {
                        headers: {
                            'If-Modified-Since': '2024-11-21T12:00:00Z' // Add the last modified date from the server or cache
                        }
                    });
                    console.log('API Response:', response.data); // Log the response to see the structure

                    if (response.status === 304) {
                        console.log('Data has not been modified since last fetch.');
                    } else if (response.data && Array.isArray(response.data)) {
                        setOrders(response.data); // Set orders if the response contains them
                    } else {
                        setOrders([]); // Set an empty array if no orders are found
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    setOrders([]); // Set an empty array in case of error
                }
            };

            fetchOrders();
        }
    }, [userId]); // Fetch orders when the component mounts

    // Search by Order ID
    const handleSearch = async () => {
        if (searchOrderId) {
            try {
                const response = await axios.get(`http://localhost:5000/orders/${searchOrderId}`);
                console.log('Searched Order Response:', response.data);

                if (response.data) {
                    setOrders([response.data]); // Update orders with the searched order (assuming the response is an object)
                } else {
                    setOrders([]); // Set an empty array if no order is found for that ID
                }
            } catch (error) {
                console.error('Error fetching order by ID:', error);
                setOrders([]); // Set an empty array in case of error
            }
        } else {
            // If searchOrderId is empty, fetch all orders again
            const fetchOrders = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/orders/user/${userId}`);
                    console.log('API Response:', response.data); // Log the response to see the structure

                    if (response.data && Array.isArray(response.data)) {
                        setOrders(response.data); // Set orders if the response contains them
                    } else {
                        setOrders([]); // Set an empty array if no orders are found
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    setOrders([]); // Set an empty array in case of error
                }
            };

            fetchOrders();
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value); // Update filter when user selects a new filter
    };

    const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.orderingStatus === filter);

    // Handle delete order
    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/orders/${orderId}`);
            if (response.status === 200) {
                setOrders(orders.filter(order => order.id !== orderId));
                alert("Order deleted successfully");
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Failed to delete the order. Please try again.');
        }
    };

    return (
        <div className="order-container">
            <h1>Orders</h1>

            {/* Display Total Cancelled Orders only when filter is 'Cancelled' */}
            {filter === 'Cancelled' && (
                <div className="cancelled-orders-info">
                    <h3>Total Cancelled Orders: <span>{totalCancelledOrders}</span></h3>
                </div>
            )}

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
                    style={{ marginRight: '1300px', marginBottom: '8px' }}
                >
                    <FaSearch /> 
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {/* Export to PDF logic here */}}
                >
                    <FaFilePdf /> Export to PDF
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
                </div>
            </div>

            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Created Date</th>
                        <th>Customer Name</th>
                        <th>Address</th>
                        <th>Total Price</th>
                        <th>Ordered Items</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.orderedAt).toLocaleString()}</td>
                                <td>{order.user?.name || "N/A"}</td>
                                <td>{order.address}</td>
                                <td>{order.totalOrderCost || "N/A"}</td>
                                <td>
                                    <ul>
                                        {order.orderedItems.map((item, index) => (
                                            <li key={index}>
                                                Product ID: {item.productId}, 
                                                Quantity: {item.quantity}, 
                                                Price: {item.priceAfterDiscount}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{order.orderingStatus}</td>
                                <td>
                                    <Link to={`/OrderIndividual/${order.id}`}>
                                        <Button variant="info" style={{ marginRight: '10px' }}>
                                            <FaEye /> View
                                        </Button>
                                    </Link>
                                    {order.orderingStatus !== 'Cancelled' && (
                                        <Button
                                            variant="danger"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => handleDeleteOrder(order.id)}
                                        >
                                            <FaTrashAlt /> Delete
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center' }}>No orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Orderr;
