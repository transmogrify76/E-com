import React from 'react';
import './Orders.css'

const Orders = () => {
  // Sample data for demonstration
  const userData = {
    orders: [
      { id: 1, date: '2024-06-14', total: 50.25 },
      { id: 2, date: '2024-06-13', total: 37.80 },
      { id: 3, date: '2024-06-12', total: 102.00 },
    ]
  };

  // Check if userData.orders exists and has at least one order
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
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {userData.orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>₹{order.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
