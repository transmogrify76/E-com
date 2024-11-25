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
        const response = await axios.get(`http://localhost:5000/orders/user/${userId}`, {
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
        setError('Your Order history is empty');
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
  }
}
export default OrderHistory;




// import React, { useState, useEffect } from 'react';
// import './Orders.css';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [orderError, setOrderError] = useState('');

//   useEffect(() => {
//     // Fetch orders from the API (replace with actual API endpoint)
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/orders');
//         const data = await response.json();
//         if (data && data.orders) {
//           setOrders(data.orders); // Set fetched orders
//         }
//       } catch (error) {
//         setOrderError('Failed to fetch orders');
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleOrderConfirm = async (orderId) => {
//     try {
//       setIsProcessing(true);

//       // Step 1: Call API to process payment (Simulated here)
//       const paymentResponse = await processPayment(orderId);
//       if (!paymentResponse.success) {
//         throw new Error('Payment failed');
//       }

//       // Step 2: Update order status (API call to change order status)
//       const updateResponse = await updateOrderStatus(orderId, 'shipped');
//       if (updateResponse.success) {
//         // Step 3: Send email confirmation (Assumed to be done via backend)
//         await sendEmailConfirmation(orderId);

//         // Step 4: Update the orders state
//         setOrders(orders.map(order => 
//           order.id === orderId ? { ...order, status: 'shipped' } : order
//         ));
//       } else {
//         throw new Error('Failed to update order status');
//       }
//     } catch (error) {
//       setOrderError(error.message);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Simulated Payment Processing API (you would use a payment gateway here)
//   const processPayment = async (orderId) => {
//     // API request to process payment (simulate payment for now)
//     // In real-world, you'd call a payment gateway API like Stripe, PayPal, etc.
//     return new Promise((resolve) => {
//       setTimeout(() => resolve({ success: true }), 1000);
//     });
//   };

//   // API to update the order status to "shipped"
//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status }),
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       throw new Error('Failed to update order status');
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
//   // API to send email confirmation
//   const sendEmailConfirmation = async (orderId) => {
//     try {
//       const response = await fetch('http://localhost:5000/orders/confirmation', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderId }),
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('Error sending email confirmation:', error);
//     }
//   };

//   if (orderError) {
//     return (
//       <div className="order-history-section">
//         <h3>Error</h3>
//         <p>{orderError}</p>
//       </div>
//     );
//   }

//   // Check if orders exist, display if they do, otherwise show message
//   if (!orders || orders.length === 0) {
//     return (
//       <div className="order-history-section">
//         <h3>Order History</h3>
//         <p>No orders found.</p>
//       </div>
//     );
//   }

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
//               <th>Address</th> {/* Add Address column */}
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
//                   <td>{order.address || "Not Provided"}</td> {/* Display the address */}
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
//                 <td colSpan="7" style={{ textAlign: 'center' }}>No orders found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     <div className="order-history-section">
//       <h3>Order History</h3>
//       <table className="order-history-table">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Product name</th>
//             <th>Date</th>
//             <th>Total</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>{order.productName}</td>
//               <td>{order.date}</td>
//               <td>₹{order.total.toFixed(2)}</td>
//               <td>{order.status}</td>
//               <td>
//                 {order.status === 'pending' && !isProcessing ? (
//                   <button onClick={() => handleOrderConfirm(order.id)}>
//                     Confirm Order
//                   </button>
//                 ) : (
//                   <p>Processing...</p>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isProcessing && <p>Processing your order...</p>}
//     </div>
//   );
// };

// export default OrderHistory;
