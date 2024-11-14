
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // To navigate to individual order details
import './Orders.css'; // Assume this is the correct path for your styles

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error handling state

  // Get userId from localStorage or redirect to login if not available
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    if (!userId) {
      // Redirect to login if user is not logged in
      window.location.href = '/login';
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders', {
          params: { userId: userId },
        });

        if (response.status === 200) {
          setOrders(response.data); // Set orders state with fetched orders
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

  // Function to format order status
  const formatStatus = (status) => {
    switch (status) {
      case 'PLACED':
        return 'Order Placed';
      case 'SHIPPED':
        return 'Shipped';
      case 'DISPATCHED':
        return 'Dispatched';
      case 'DELIVERED':
        return 'Delivered';
      default:
        return 'Unknown Status';
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
              <th>Product Name</th>
              <th>Price</th>
              <th>Size</th>
              <th>Color</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.orderedItems[0]?.product?.name}</td>
                  <td>₹{order.totalOrderCost}</td>
                  <td>{order.orderedItems[0]?.selectedSize}</td>
                  <td>{order.orderedItems[0]?.selectedColor}</td>
                  <td>{formatStatus(order.status)}</td>
                  <td>
                    <Link to={`/order/${order.id}`} className="view-order-button">
                      View Details
                    </Link>
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


