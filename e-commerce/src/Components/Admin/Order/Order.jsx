import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Order.css';
import { FaSearch, FaEdit, FaTrash, FaShoppingCart } from 'react-icons/fa'; // Import React Icons

const AdminOrder = () => {
  const initialOrders = [
    { id: 1, customer: 'John Doe', phone: '123-456-7890', datetime: '2024-07-11 10:30 AM', products: 3, amount: 150.00, status: 'Paid' },
    { id: 2, customer: 'Jane Smith', phone: '234-567-8901', datetime: '2024-07-10 12:00 PM', products: 2, amount: 100.50, status: 'Pending' },
    { id: 3, customer: 'Michael Johnson', phone: '345-678-9012', datetime: '2024-07-09 03:45 PM', products: 4, amount: 220.25, status: 'Processing' },
    { id: 4, customer: 'Emily Davis', phone: '456-789-0123', datetime: '2024-07-08 11:15 AM', products: 1, amount: 75.00, status: 'Cancelled' },
    { id: 5, customer: 'Sarah Adams', phone: '567-890-1234', datetime: '2024-07-07 09:00 AM', products: 5, amount: 300.75, status: 'Paid' },
    { id: 6, customer: 'David Wilson', phone: '678-901-2345', datetime: '2024-07-06 02:30 PM', products: 2, amount: 100.50, status: 'Cancelled' },
    { id: 7, customer: 'Sophia Brown', phone: '789-012-3456', datetime: '2024-07-05 04:30 PM', products: 3, amount: 180.00, status: 'Processing' },
    { id: 8, customer: 'Liam Miller', phone: '890-123-4567', datetime: '2024-07-04 08:45 AM', products: 2, amount: 95.50, status: 'Pending' },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // Track the selected filter
  const [showMenu, setShowMenu] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    const filteredOrders = initialOrders.filter(order =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setOrders(filteredOrders);
  };

  const handleClearFilters = () => {
    setOrders(initialOrders);
    setSearchTerm('');
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
  };

  const handleEditOrder = (orderId) => {
    console.log(`Edit order with ID: ${orderId}`);
  };

  // Calculate percentages for completed and canceled orders
  const completedOrders = initialOrders.filter(order => order.status === 'Paid');
  const canceledOrders = initialOrders.filter(order => order.status === 'Cancelled');
  const activeOrders = initialOrders.filter(order => order.status !== 'Paid' && order.status !== 'Cancelled');
  const totalOrders = initialOrders.length;
  const completedPercentage = (completedOrders.length / totalOrders) * 100;
  const canceledPercentage = (canceledOrders.length / totalOrders) * 100;
  const activePercentage = (activeOrders.length / totalOrders) * 100;

  const getFilteredOrders = () => {
    switch (selectedFilter) {
      case 'completed':
        return completedOrders;
      case 'cancelled':
        return canceledOrders;
      case 'active':
        return activeOrders;
      default:
        return initialOrders;
    }
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="main-container">
    <div className="grid-container">
      <div className="card total-orders" onClick={() => setSelectedFilter('all')}>
        <div className="card-content">
          <h4>Total Orders</h4>
          <div className="progress-circle">
            <span>80%</span>
          </div>
          <div className="card-details">
            <span>{totalOrders} orders</span>
            <FaShoppingCart className="card-icon" />
          </div>
        </div>
      </div>

      <div className="card active-orders" onClick={() => setSelectedFilter('active')}>
        <div className="card-content">
          <h4>Active Orders</h4>
          <div className="progress-circle">
            <span>{activePercentage.toFixed(0)}%</span>
          </div>
          <div className="card-details">
            <span>{activeOrders.length} active</span>
          </div>
        </div>
      </div>

      <div className="card completed-orders" onClick={() => setSelectedFilter('completed')}>
        <div className="card-content">
          <h4>Completed Orders</h4>
          <div className="progress-circle">
            <span>{completedPercentage.toFixed(0)}%</span>
          </div>
          <div className="card-details">
            <span>{completedOrders.length} completed</span>
          </div>
        </div>
      </div>

      <div className="card cancelled-orders" onClick={() => setSelectedFilter('cancelled')}>
        <div className="card-content">
          <h4>Cancelled Orders</h4>
          <div className="progress-circle">
            <span>{canceledPercentage.toFixed(0)}%</span>
          </div>
          <div className="card-details">
            <span>{canceledOrders.length} cancelled</span>
          </div>
        </div>
      </div>

        <div className="search-filters-section">
        <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '20px 0' }}>Search Order</h4>
          <input
            type="text"
            placeholder="Search by customer"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>
            <FaSearch />
          </button><br></br>
          <button onClick={handleClearFilters}>Clear Filters</button>
          <div className="manage-orders">
            <button onClick={() => setShowMenu(!showMenu)}>Manage Orders</button>
            {showMenu && (
              <div className="menu">
                <Link to="/shipments" onClick={() => setShowMenu(false)}>Shipments</Link>
                <Link to="/invoice" onClick={() => setShowMenu(false)}>Invoice</Link>
                <Link to="/refunds" onClick={() => setShowMenu(false)}>Refunds</Link>
              </div>
            )}
          </div>
        </div>

        <div className="table">
        <h6 style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>Order List</h6>

          <table>
            <thead>
              <tr>
                <th>Bill No.</th>
                <th>Customer Name</th>
                <th>Phone No.</th>
                <th>Date Time</th>
                <th>Total Products</th>
                <th>Total Amount Paid</th>
                <th>Paid Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.phone}</td>
                  <td>{order.datetime}</td>
                  <td>{order.products}</td>
                  <td>₹{order.amount.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td>
                    <button 
                      onClick={() => handleEditOrder(order.id)} 
                      style={{ marginRight: '10px', fontSize: '16px' }} // Added margin and increased font size
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteOrder(order.id)} 
                      style={{ fontSize: '16px',color:'red' }} // Increased font size
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8}>No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
