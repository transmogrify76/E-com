// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Orders.css';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]); // State to store orders
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(''); // Error handling state
//   const [productDetails, setProductDetails] = useState({}); // Store product details

//   // Get userId from localStorage or redirect to login if not available
//   const userId = localStorage.getItem('userId');
  
//   useEffect(() => {
//     if (!userId) {
//       // Redirect to login if user is not logged in
//       window.location.href = '/login';
//       return;
//     }

//     // Fetch orders for the logged-in user
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/orders', {
//           params: { userId: userId },
//         });

//         if (response.status === 200) {
//           setOrders(response.data); // Set orders state with fetched orders
//           // Fetch product details for each ordered item
//           response.data.forEach(order => {
//             order.orderedItems.forEach(item => {
//               fetchProductDetails(item.productId); // Fetch product details by productId
//             });
//           });
//         }
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//         setError('Failed to fetch order history. Please try again later.');
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchOrders();
//   }, [userId]); // Dependency array: fetch orders when userId is set

//   // Fetch product details (name, size, color) using productId
//   const fetchProductDetails = async (productId) => {
//     if (!productDetails[productId]) {  // Avoid fetching if product details are already in state
//       try {
//         const response = await axios.get(`http://localhost:5000/products/${productId}`);
//         if (response.status === 200) {
//           setProductDetails((prevDetails) => ({
//             ...prevDetails,
//             [productId]: response.data, // Store product details with productId as key
//           }));
//         }
//       } catch (err) {
//         console.error('Error fetching product details:', err);
//       }
//     }
//   };

//   // Function to format order status
//   const formatStatus = (status) => {
//     switch (status) {
//       case 'Pending':
//         return 'Pending'; // Show "Pending" for orders that are placed
//       case 'Shipped':
//         return 'Shipped';
//       case 'Dispatched':
//         return 'Dispatched';
//       case 'Delivered':
//         return 'Delivered';
//       case 'Cancelled':
//         return 'Cancelled';
//       default:
//         return 'Unknown Status';
//     }
//   };

//   // Handle order cancellation using PATCH request
//   const handleCancelOrder = async (orderId) => {
//     try {
//       const response = await axios.patch(`http://localhost:5000/orders/${orderId}`, {
//         orderingStatus: 'Cancelled', // Update order status to "Cancelled"
//       });

//       if (response.status === 200) {
//         // Re-fetch orders to update the status or locally update
//         setOrders(orders.map(order => 
//           order.id === orderId ? { ...order, orderingStatus: 'Cancelled' } : order
//         ));
//       }
//     } catch (err) {
//       console.error('Error canceling order:', err);
//       setError('Failed to cancel the order. Please try again later.');
//     }
//   };

//   return (
//     <div className="order-history-container">
//       <h2>Order History</h2>

//       {loading ? (
//         <p>Loading your orders...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <table className="order-history-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Order Date</th>
//               <th>Products</th>
//               <th>Total Price</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr key={order.id}>
//                   <td>{order.id}</td>
//                   <td>{new Date(order.orderedAt).toLocaleDateString()}</td>
//                   <td>
//                     {order.orderedItems.map((item, idx) => (
//                       <div key={idx}>
//                         <strong>{productDetails[item.productId]?.name || "Loading..."}</strong><br />
//                         Size: {productDetails[item.productId]?.productDetails.find(detail => detail.key === 'size')?.value || "N/A"}<br />
//                         Color: {productDetails[item.productId]?.productDetails.find(detail => detail.key === 'color')?.value || "N/A"}
//                       </div>
//                     ))}
//                   </td>
//                   <td>₹{order.totalOrderCost}</td>
//                   <td>{formatStatus(order.orderingStatus)}</td>
//                   <td>
//                     {order.orderingStatus === 'Pending' && (
//                       <button 
//                         onClick={() => handleCancelOrder(order.id)} 
//                         className="cancel-order-button">
//                         Cancel Order
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: 'center' }}>No orders found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error handling state
  const [productDetails, setProductDetails] = useState({}); // Store product details

  // Get userId from localStorage or redirect to login if not available
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    if (!userId) {
      // Redirect to login if user is not logged in
      window.location.href = '/login';
      return;
    }

    // Fetch orders for the logged-in user
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders', {
          params: { userId: userId },
        });

        if (response.status === 200) {
          setOrders(response.data); // Set orders state with fetched orders
          // Fetch product details for each ordered item
          response.data.forEach(order => {
            order.orderedItems.forEach(item => {
              fetchProductDetails(item.productId); // Fetch product details by productId
            });
          });
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch order history. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, [userId]); // Dependency array: fetch orders when userId is set

  // Fetch product details (name, size, color) using productId
  const fetchProductDetails = async (productId) => {
    if (!productDetails[productId]) {  // Avoid fetching if product details are already in state
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`);
        if (response.status === 200) {
          setProductDetails((prevDetails) => ({
            ...prevDetails,
            [productId]: response.data, // Store product details with productId as key
          }));
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      }
    }
  };

  // Function to format order status
  const formatStatus = (status) => {
    switch (status) {
      case 'Pending':
        return 'Pending'; // Show "Pending" for orders that are placed
      case 'Shipped':
        return 'Shipped';
      case 'Dispatched':
        return 'Dispatched';
      case 'Delivered':
        return 'Delivered';
      case 'Cancelled':
        return 'Cancelled';
      default:
        return 'Unknown Status';
    }
  };

  // Handle order cancellation using PATCH request
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/orders/${orderId}`, {
        orderingStatus: 'Cancelled', // Update order status to "Cancelled"
      });

      if (response.status === 200) {
        // Re-fetch orders to update the status or locally update
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, orderingStatus: 'Cancelled' } : order
        ));
      }
    } catch (err) {
      console.error('Error canceling order:', err);
      setError('Failed to cancel the order. Please try again later.');
    }
  };

  return (
    <div className="order-history-container">
      <h2>Order History</h2>

      {loading ? (
        <p>Loading your orders...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="order-history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Address</th> {/* Add Address column */}
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.orderedAt).toLocaleDateString()}</td>
                  <td>{order.address || "Not Provided"}</td> {/* Display the address */}
                  <td>
                    {order.orderedItems.map((item, idx) => (
                      <div key={idx}>
                        <strong>{productDetails[item.productId]?.name || "Loading..."}</strong><br />
                        Size: {productDetails[item.productId]?.productDetails.find(detail => detail.key === 'size')?.value || "N/A"}<br />
                        Color: {productDetails[item.productId]?.productDetails.find(detail => detail.key === 'color')?.value || "N/A"}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalOrderCost}</td>
                  <td>{formatStatus(order.orderingStatus)}</td>
                  <td>
                    {order.orderingStatus === 'Pending' && (
                      <button 
                        onClick={() => handleCancelOrder(order.id)} 
                        className="cancel-order-button">
                        Cancel Order
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
