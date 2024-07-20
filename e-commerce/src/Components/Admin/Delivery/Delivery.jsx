// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactPaginate from 'react-paginate';
// import './Delivery.css';

// const DeliveryList = () => {
//   const [deliveries, setDeliveries] = useState([]);
//   const [filteredDeliveries, setFilteredDeliveries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(0);
//   const [deliveriesPerPage] = useState(10);

//   // Simulated dummy data for demonstration
//   const dummyData = [
//     { _id: 1, orderId: 'ORD-001', deliveryPerson: 'John Doe', date: '2024-07-17', status: 'pending' },
//     { _id: 2, orderId: 'ORD-002', deliveryPerson: 'Jane Smith', date: '2024-07-16', status: 'in transit' },
//     { _id: 3, orderId: 'ORD-003', deliveryPerson: 'Michael Johnson', date: '2024-07-15', status: 'delivered' },
//     { _id: 4, orderId: 'ORD-004', deliveryPerson: 'Emily Brown', date: '2024-07-14', status: 'canceled' },
//     { _id: 5, orderId: 'ORD-005', deliveryPerson: 'David Lee', date: '2024-07-13', status: 'in transit' },
//     { _id: 6, orderId: 'ORD-006', deliveryPerson: 'Sarah Wilson', date: '2024-07-12', status: 'delivered' },
//     { _id: 7, orderId: 'ORD-007', deliveryPerson: 'Chris Martin', date: '2024-07-11', status: 'pending' },
//     { _id: 8, orderId: 'ORD-008', deliveryPerson: 'Emma Garcia', date: '2024-07-10', status: 'pending' },
//     { _id: 9, orderId: 'ORD-009', deliveryPerson: 'James Taylor', date: '2024-07-09', status: 'delivered' },
//     { _id: 10, orderId: 'ORD-010', deliveryPerson: 'Olivia Anderson', date: '2024-07-08', status: 'in transit' },
//     { _id: 11, orderId: 'ORD-011', deliveryPerson: 'William Martinez', date: '2024-07-07', status: 'canceled' },
//     { _id: 12, orderId: 'ORD-012', deliveryPerson: 'Ava Rodriguez', date: '2024-07-06', status: 'delivered' },
//   ];

//   useEffect(() => {
//     // For demonstration purposes, setting the dummy data directly
//     setDeliveries(dummyData);
//     setFilteredDeliveries(dummyData);
//   }, []);

//   useEffect(() => {
//     filterDeliveries();
//   }, [searchTerm, statusFilter, deliveries]);

//   const filterDeliveries = () => {
//     let filtered = deliveries;

//     if (searchTerm) {
//       filtered = filtered.filter(delivery =>
//         delivery.orderId.includes(searchTerm) ||
//         delivery.deliveryPerson.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(delivery => delivery.status === statusFilter);
//     }

//     setFilteredDeliveries(filtered);
//   };

//   const updateDeliveryStatus = async (id, status) => {
//     try {
//       // Simulated update - not functional without backend integration
//       const updatedDeliveries = deliveries.map(delivery =>
//         delivery._id === id ? { ...delivery, status } : delivery
//       );
//       setDeliveries(updatedDeliveries);
//       setFilteredDeliveries(updatedDeliveries);
//     } catch (error) {
//       console.error('Error updating delivery status:', error);
//     }
//   };

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected);
//   };

//   const pageCount = Math.ceil(filteredDeliveries.length / deliveriesPerPage);
//   const offset = currentPage * deliveriesPerPage;
//   const currentDeliveries = filteredDeliveries.slice(offset, offset + deliveriesPerPage);

//   return (
//     <div className="delivery-list-container">
//       <h2>Delivery List</h2>
//       <div className="search-filter-container">
//         <input
//           type="text"
//           placeholder="Search by Order ID or Delivery Person"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="status-filter"
//         >
//           <option value="">All Statuses</option>
//           <option value="pending">Pending</option>
//           <option value="in transit">In Transit</option>
//           <option value="delivered">Delivered</option>
//           <option value="canceled">Canceled</option>
//         </select>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Delivery Person</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentDeliveries.map(delivery => (
//             <tr key={delivery._id}>
//               <td>{delivery.orderId}</td>
//               <td>{delivery.deliveryPerson}</td>
//               <td>{delivery.date}</td>
//               <td>{delivery.status}</td>
//               <td>
//                 <select
//                   value={delivery.status}
//                   onChange={(e) => updateDeliveryStatus(delivery._id, e.target.value)}
//                   className="status-select"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="in transit">In Transit</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="canceled">Canceled</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <ReactPaginate
//         previousLabel={'previous'}
//         nextLabel={'next'}
//         breakLabel={'...'}
//         breakClassName={'break-me'}
//         pageCount={pageCount}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={handlePageClick}
//         containerClassName={'pagination'}
//         activeClassName={'active'}
//       />
//     </div>
//   );
// };

// export default DeliveryList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Delivery.css';

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [deliveriesPerPage] = useState(10);

  // Dummy data for demonstration
  const dummyData = [
    { _id: 1, orderId: 'ORD-001', deliveryPerson: 'John Doe', date: '2024-07-17', status: 'pending' },
    { _id: 2, orderId: 'ORD-002', deliveryPerson: 'Jane Smith', date: '2024-07-16', status: 'in transit' },
    { _id: 3, orderId: 'ORD-003', deliveryPerson: 'Michael Johnson', date: '2024-07-15', status: 'delivered' },
    { _id: 4, orderId: 'ORD-004', deliveryPerson: 'Emily Brown', date: '2024-07-14', status: 'canceled' },
    { _id: 5, orderId: 'ORD-005', deliveryPerson: 'David Lee', date: '2024-07-13', status: 'in transit' },
    { _id: 6, orderId: 'ORD-006', deliveryPerson: 'Sarah Wilson', date: '2024-07-12', status: 'delivered' },
    { _id: 7, orderId: 'ORD-007', deliveryPerson: 'Chris Martin', date: '2024-07-11', status: 'pending' },
    { _id: 8, orderId: 'ORD-008', deliveryPerson: 'Emma Garcia', date: '2024-07-10', status: 'pending' },
    { _id: 9, orderId: 'ORD-009', deliveryPerson: 'James Taylor', date: '2024-07-09', status: 'delivered' },
    { _id: 10, orderId: 'ORD-010', deliveryPerson: 'Olivia Anderson', date: '2024-07-08', status: 'in transit' },
    { _id: 11, orderId: 'ORD-011', deliveryPerson: 'William Martinez', date: '2024-07-07', status: 'canceled' },
    { _id: 12, orderId: 'ORD-012', deliveryPerson: 'Ava Rodriguez', date: '2024-07-06', status: 'delivered' },
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

  const updateDeliveryStatus = async (id, status) => {
    try {
      // Simulated update - not functional without backend integration
      const updatedDeliveries = deliveries.map(delivery =>
        delivery._id === id ? { ...delivery, status } : delivery
      );
      setDeliveries(updatedDeliveries);
      setFilteredDeliveries(updatedDeliveries);
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const handleDelete = (id) => {
    try {
      // Simulated deletion - not functional without backend integration
      const updatedDeliveries = deliveries.filter(delivery => delivery._id !== id);
      setDeliveries(updatedDeliveries);
      setFilteredDeliveries(updatedDeliveries);
    } catch (error) {
      console.error('Error deleting delivery:', error);
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
      </div>
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
                <select
                  value={delivery.status}
                  onChange={(e) => updateDeliveryStatus(delivery._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="in transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
                <button onClick={() => handleDelete(delivery._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
