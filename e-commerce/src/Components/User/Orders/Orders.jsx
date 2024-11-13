import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    // Fetch orders from the API (replace with actual API endpoint)
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders');
        const data = await response.json();
        if (data && data.orders) {
          setOrders(data.orders); // Set fetched orders
        }
      } catch (error) {
        setOrderError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  const handleOrderConfirm = async (orderId) => {
    try {
      setIsProcessing(true);

      // Step 1: Call API to process payment (Simulated here)
      const paymentResponse = await processPayment(orderId);
      if (!paymentResponse.success) {
        throw new Error('Payment failed');
      }

      // Step 2: Update order status (API call to change order status)
      const updateResponse = await updateOrderStatus(orderId, 'shipped');
      if (updateResponse.success) {
        // Step 3: Send email confirmation (Assumed to be done via backend)
        await sendEmailConfirmation(orderId);

        // Step 4: Update the orders state
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: 'shipped' } : order
        ));
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      setOrderError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Simulated Payment Processing API (you would use a payment gateway here)
  const processPayment = async (orderId) => {
    // API request to process payment (simulate payment for now)
    // In real-world, you'd call a payment gateway API like Stripe, PayPal, etc.
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 1000);
    });
  };

  // API to update the order status to "shipped"
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  };

  // API to send email confirmation
  const sendEmailConfirmation = async (orderId) => {
    try {
      const response = await fetch('http://localhost:5000/orders/confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending email confirmation:', error);
    }
  };

  if (orderError) {
    return (
      <div className="order-history-section">
        <h3>Error</h3>
        <p>{orderError}</p>
      </div>
    );
  }

  // Check if orders exist, display if they do, otherwise show message
  if (!orders || orders.length === 0) {
    return (
      <div className="order-history-section">
        <h3>Order History</h3>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="order-history-section">
      <h3>Order History</h3>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product name</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.date}</td>
              <td>₹{order.total.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'pending' && !isProcessing ? (
                  <button onClick={() => handleOrderConfirm(order.id)}>
                    Confirm Order
                  </button>
                ) : (
                  <p>Processing...</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isProcessing && <p>Processing your order...</p>}
    </div>
  );
};

export default Orders;
