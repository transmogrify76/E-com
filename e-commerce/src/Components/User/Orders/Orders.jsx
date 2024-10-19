import React from 'react';
import './Orders.css'

const Orders = () => {
  // Sample data for demonstration
  const userData = {
    orders: [ 
      { id: 1,productName:'Full sleeve T-shirt', date: '2024-06-14', total: 500.25 , status:'pending'},
      { id: 2,productName:'Full sleeve T-shirt', date: '2024-06-13', total: 370.80, status:'pending'},
      { id: 3,productName:'Full sleeve T-shirt', date: '2024-06-12', total: 100.00, status:'pending'},
    ]
  };

  // Check if userData.orders exists and has at least 
  if (!userData.orders || userData.orders.length === 0) {
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
          </tr>
        </thead>
        <tbody>
          {userData.orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.date}</td>
              <td>₹{order.total.toFixed(2)}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
