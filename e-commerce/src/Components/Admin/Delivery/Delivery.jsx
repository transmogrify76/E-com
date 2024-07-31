
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './Delivery.css';

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [deliveriesPerPage] = useState(10);
  const [newDelivery, setNewDelivery] = useState({ orderId: '', deliveryPerson: '', date: '', status: 'pending' });
  const [showAddDelivery, setShowAddDelivery] = useState(false);
  const [editDelivery, setEditDelivery] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const dummyData = [
    { _id: 1, orderId: 'ORD-001', deliveryPerson: 'John Doe', date: '2024-07-17', status: 'pending' },
    { _id: 2, orderId: 'ORD-002', deliveryPerson: 'Jane Smith', date: '2024-07-16', status: 'in transit' },
    { _id: 3, orderId: 'ORD-003', deliveryPerson: 'Alice Johnson', date: '2024-07-15', status: 'delivered' },
    { _id: 4, orderId: 'ORD-004', deliveryPerson: 'Bob Brown', date: '2024-07-14', status: 'canceled' },
    { _id: 5, orderId: 'ORD-005', deliveryPerson: 'Charlie Green', date: '2024-07-13', status: 'pending' },
    { _id: 6, orderId: 'ORD-006', deliveryPerson: 'Daisy White', date: '2024-07-12', status: 'in transit' },
    { _id: 7, orderId: 'ORD-007', deliveryPerson: 'Ethan Black', date: '2024-07-11', status: 'delivered' },
    { _id: 8, orderId: 'ORD-008', deliveryPerson: 'Fiona Blue', date: '2024-07-10', status: 'canceled' },
    { _id: 9, orderId: 'ORD-009', deliveryPerson: 'George Grey', date: '2024-07-09', status: 'pending' },
    { _id: 10, orderId: 'ORD-010', deliveryPerson: 'Hannah Pink', date: '2024-07-08', status: 'in transit' },
  ];

  useEffect(() => {
    setDeliveries(dummyData);
    setFilteredDeliveries(dummyData);
  }, []);

  useEffect(() => {
    filterDeliveries();
  }, [searchTerm, statusFilter, deliveries]);

  const filterDeliveries = () => {
    let filtered = deliveries;

    if (searchTerm) {
      filtered = filtered.filter(delivery =>
        delivery.orderId.includes(searchTerm) ||
        delivery.deliveryPerson.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(delivery => delivery.status === statusFilter);
    }

    setFilteredDeliveries(filtered);
  };

  const handleDelete = (id) => {
    const updatedDeliveries = deliveries.filter(delivery => delivery._id !== id);
    setDeliveries(updatedDeliveries);
    setFilteredDeliveries(updatedDeliveries);
  };

  const handleAddDelivery = () => {
    const newDeliveryEntry = {
      _id: deliveries.length + 1,
      ...newDelivery,
    };
    setDeliveries([...deliveries, newDeliveryEntry]);
    setFilteredDeliveries([...filteredDeliveries, newDeliveryEntry]);
    setShowAddDelivery(false);
    setNewDelivery({ orderId: '', deliveryPerson: '', date: '', status: 'pending' });
  };

  const handleEditDelivery = (delivery) => {
    setEditDelivery(delivery);
    setNewStatus(delivery.status);
  };

  const handleUpdateDeliveryStatus = () => {
    if (editDelivery && newStatus) {
      const updatedDeliveries = deliveries.map(delivery =>
        delivery._id === editDelivery._id ? { ...delivery, status: newStatus } : delivery
      );
      setDeliveries(updatedDeliveries);
      setFilteredDeliveries(updatedDeliveries);
      setEditDelivery(null);
      setNewStatus('');
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const pageCount = Math.ceil(filteredDeliveries.length / deliveriesPerPage);
  const offset = currentPage * deliveriesPerPage;
  const currentDeliveries = filteredDeliveries.slice(offset, offset + deliveriesPerPage);

  return (
    <div className="delivery-list-container">
      <h2>Delivery List</h2>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by Order ID or Delivery Person"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="clear-search-btn" onClick={() => setSearchTerm('')}>Clear</button>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>
        <button onClick={() => setShowAddDelivery(true)} className="add-delivery-btn">Add New Delivery</button>
      </div>

      {showAddDelivery && (
        <div className="add-delivery-form">
          <h3>Add New Delivery</h3>
          <input
            type="text"
            placeholder="Order ID"
            value={newDelivery.orderId}
            onChange={(e) => setNewDelivery({ ...newDelivery, orderId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Delivery Person"
            value={newDelivery.deliveryPerson}
            onChange={(e) => setNewDelivery({ ...newDelivery, deliveryPerson: e.target.value })}
          />
          <input
            type="date"
            value={newDelivery.date}
            onChange={(e) => setNewDelivery({ ...newDelivery, date: e.target.value })}
          />
          <select
            value={newDelivery.status}
            onChange={(e) => setNewDelivery({ ...newDelivery, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
          <button onClick={handleAddDelivery}>Add Delivery</button>
          <button onClick={() => setShowAddDelivery(false)}>Cancel</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Delivery Person</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {currentDeliveries.map(delivery => (
    <tr key={delivery._id}>
      <td>{delivery.orderId}</td>
      <td>{delivery.deliveryPerson}</td>
      <td>{delivery.date}</td>
      <td>{delivery.status}</td>
      <td>
        <button onClick={() => handleEditDelivery(delivery)}   style={{ backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }} // Yellow button
                >Update Status</button>
        <button onClick={() => handleDelete(delivery._id)}  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', marginLeft: '10px' }} >Delete</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      {editDelivery && (
        <div className="update-status-modal">
          <h3>Update Status for {editDelivery.orderId}</h3>
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
          <button onClick={handleUpdateDeliveryStatus}>Confirm Update</button>
          <button onClick={() => setEditDelivery(null)} style={{ marginLeft: '10px' }}>Cancel</button>
        </div>
      )}

      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default DeliveryList;
