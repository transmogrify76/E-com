import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Order.css';
import { FaSearch, FaEdit, FaTrash, FaShoppingCart } from 'react-icons/fa';

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
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // To track if editing
  const [orderToEdit, setOrderToEdit] = useState(null); // To store order data for editing

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
    setSelectedFilter('all');
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
  };

  const handleEditOrder = (order) => {
    setOrderToEdit(order);
    setIsEditing(true);
  };

  const handleSaveEdit = (order) => {
    const updatedOrders = orders.map(o => (o.id === order.id ? order : o));
    setOrders(updatedOrders);
    setIsEditing(false);
    setOrderToEdit(null);
  };

  const completedOrders = orders.filter(order => order.status === 'Paid');
  const canceledOrders = orders.filter(order => order.status === 'Cancelled');
  const activeOrders = orders.filter(order => order.status !== 'Paid' && order.status !== 'Cancelled');
  const totalOrders = orders.length;
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
        return orders;
    }
  };

  const filteredOrders = getFilteredOrders();

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };

  return (
    <div className="main-container">
      <div className="grid-container">
        <div className="card" style={{ backgroundColor: '#f0f8ff' }} onClick={() => setSelectedFilter('all')}>
          <div className="card-content">
            <h6>Total Orders</h6>
            <div className="progress-circle">
              <span>{totalOrders}</span>
            </div>
            <div className="card-content">
              <span>{totalOrders} orders</span>
              <FaShoppingCart style={{ fontSize: 40, color: '#3f51b5' }} />
            </div>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#e6ffe6' }} onClick={() => setSelectedFilter('active')}>
          <div className="card-content">
            <h6>Active Orders</h6>
            <div className="progress-circle">
              <span>{activePercentage.toFixed(0)}%</span>
            </div>
            <div className="card-content">
              <span>{activeOrders.length} active</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#ffe6e6' }} onClick={() => setSelectedFilter('completed')}>
          <div className="card-content">
            <h6>Completed Orders</h6>
            <div className="progress-circle">
              <span>{completedPercentage.toFixed(0)}%</span>
            </div>
            <div className="card-content">
              <span>{completedOrders.length} completed</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#ffffcc' }} onClick={() => setSelectedFilter('cancelled')}>
          <div className="card-content">
            <h6>Cancelled Orders</h6>
            <div className="progress-circle">
              <span>{canceledPercentage.toFixed(0)}%</span>
            </div>
            <div className="card-content">
              <span>{canceledOrders.length} cancelled</span>
            </div>
          </div>
        </div>

        <div className="search-filters-section">
          <h6>Search Orders</h6>
          <input
            type="text"
            placeholder="Search by customer"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>
            <FaSearch />
          </button>
          <button onClick={handleClearFilters}>Clear Filters</button>
          <div className="manage-orders">
            <button onClick={toggleMenu}>
              Manage Orders
            </button>
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
          <h6>Order List</h6>
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
                    <button className="button" onClick={() => handleEditOrder(order)} style={{ marginRight: '10px' }}>
                      <FaEdit />
                    </button>
                    <button className="button" onClick={() => handleDeleteOrder(order.id)}>
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

        {isEditing && orderToEdit && (
          <div className="edit-modal">
            <h6>Edit Order</h6>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit(orderToEdit);
            }}>
              <input
                type="text"
                value={orderToEdit.customer}
                onChange={(e) => setOrderToEdit({ ...orderToEdit, customer: e.target.value })}
                placeholder="Customer Name"
              />
              <input
                type="text"
                value={orderToEdit.phone}
                onChange={(e) => setOrderToEdit({ ...orderToEdit, phone: e.target.value })}
                placeholder="Phone No."
              />
              <input
                type="datetime-local"
                value={orderToEdit.datetime}
                onChange={(e) => setOrderToEdit({ ...orderToEdit, datetime: e.target.value })}
              />
              <input
                type="number"
                value={orderToEdit.products}
                onChange={(e) => setOrderToEdit({ ...orderToEdit, products: e.target.value })}
                placeholder="Total Products"
              />
              <input
                type="number"
                value={orderToEdit.amount}
                onChange={(e) => setOrderToEdit({ ...orderToEdit, amount: e.target.value })}
                placeholder="Total Amount Paid"
              />
              <select
                value={orderToEdit.status}
                onChange={(e) => setOrderToEdit({ ...orderToEdit, status: e.target.value })}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;
