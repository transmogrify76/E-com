// AdminDashboard.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faMoneyBillAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Dummy data for demonstration
  const [orders] = useState([
    { _id: 1, orderId: 'ORD-001', productName: 'Product A' },
    { _id: 2, orderId: 'ORD-002', productName: 'Product B' },
    { _id: 3, orderId: 'ORD-003', productName: 'Product C' },
  ]);

  const [transactions] = useState([
    { _id: 1, transactionId: 'TXN-001', amount: 100 },
    { _id: 2, transactionId: 'TXN-002', amount: 200 },
    { _id: 3, transactionId: 'TXN-003', amount: 150 },
  ]);

  const [deliveries] = useState([
    { _id: 1, deliveryId: 'DEL-001', status: 'Delivered' },
    { _id: 2, deliveryId: 'DEL-002', status: 'In transit' },
    { _id: 3, deliveryId: 'DEL-003', status: 'Pending' },
  ]);

  const [customers] = useState([
    { _id: 1, name: 'John Doe' },
    { _id: 2, name: 'Jane Smith' },
    { _id: 3, name: 'Michael Johnson' },
  ]);

  const [sellers] = useState([
    { _id: 1, name: 'Seller 1' },
    { _id: 2, name: 'Seller 2' },
    { _id: 3, name: 'Seller 3' },
  ]);

  const [products] = useState([
    { _id: 1, name: 'Product A', price: 50 },
    { _id: 2, name: 'Product B', price: 75 },
    { _id: 3, name: 'Product C', price: 60 },
  ]);

  // Active menu item state (for demonstration)
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  return (
    <div className="admin-dashboard">
      {activeMenuItem === 'Dashboard' && (
        <>
          <h2>Dashboard Overview</h2>
          <div className="dashboard-widgets">
            <div className="dashboard-widget">
              <h3>Total Users</h3>
              <div className="widget-content">
                <span className="widget-icon"><FontAwesomeIcon icon={faUsers} /></span>
                <span className="widget-data">{customers.length}</span>
              </div>
            </div>
            <div className="dashboard-widget">
              <h3>Total Sellers</h3>
              <div className="widget-content">
                <span className="widget-icon"><FontAwesomeIcon icon={faUsers} /></span>
                <span className="widget-data">{sellers.length}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-widgets">
            <div className="dashboard-widget">
              <h3>Total Products</h3>
              <div className="widget-content">
                <span className="widget-icon"><FontAwesomeIcon icon={faBoxOpen} /></span>
                <span className="widget-data">{products.length}</span>
              </div>
            </div>
            <div className="dashboard-widget">
              <h3>Total Transactions</h3>
              <div className="widget-content">
                <span className="widget-icon"><FontAwesomeIcon icon={faMoneyBillAlt} /></span>
                <span className="widget-data">{transactions.length}</span>
              </div>
            </div>
            <div className="dashboard-widget">
              <h3>Total Deliveries</h3>
              <div className="widget-content">
                <span className="widget-icon"><FontAwesomeIcon icon={faTruck} /></span>
                <span className="widget-data">{deliveries.length}</span>
              </div>
            </div>
            <div className="dashboard-widget">
              <h3>Recent Orders</h3>
              <div className="widget-content">
                <ul className="recent-orders-list">
                  {orders.slice(0, 3).map(order => (
                    <li key={order._id}>#{order.orderId} - {order.productName}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Additional menu items can be added similarly */}
    </div>
  );
};

export default AdminDashboard;
