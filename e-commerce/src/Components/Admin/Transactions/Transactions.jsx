
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './Transactions.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [transactionsPerPage] = useState(10);

  useEffect(() => {
    // Dummy data
    const dummyData = [
      { _id: '1', orderId: '1001', customerName: 'John Doe', amount: 99.99, status: 'pending' },
      { _id: '2', orderId: '1002', customerName: 'Jane Smith', amount: 149.49, status: 'processed' },
      { _id: '3', orderId: '1003', customerName: 'Alice Johnson', amount: 199.99, status: 'shipped' },
      { _id: '4', orderId: '1004', customerName: 'Robert Brown', amount: 249.99, status: 'completed' },
      { _id: '5', orderId: '1005', customerName: 'Emily Davis', amount: 299.99, status: 'canceled' },
      { _id: '6', orderId: '1006', customerName: 'Michael Miller', amount: 349.99, status: 'pending' },
      { _id: '7', orderId: '1007', customerName: 'Sarah Wilson', amount: 399.99, status: 'processed' },
      { _id: '8', orderId: '1008', customerName: 'David Moore', amount: 449.99, status: 'shipped' },
      { _id: '9', orderId: '1009', customerName: 'Laura Taylor', amount: 499.99, status: 'completed' },
      { _id: '10', orderId: '1010', customerName: 'James Anderson', amount: 549.99, status: 'canceled' }
    ];

    setTransactions(dummyData);
    setFilteredTransactions(dummyData);
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [searchTerm, statusFilter, transactions]);

  const filterTransactions = () => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.orderId.includes(searchTerm) ||
        transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }

    setFilteredTransactions(filtered);
  };

  const updateTransactionStatus = (id, status) => {
    setTransactions(transactions.map(transaction =>
      transaction._id === id ? { ...transaction, status } : transaction
    ));
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const pageCount = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const offset = currentPage * transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(offset, offset + transactionsPerPage);

  const handleEdit = (id) => {
    // Placeholder function for edit action
    console.log(`Edit transaction ${id}`);
  };

  const handleDelete = (id) => {
    // Placeholder function for delete action
    console.log(`Delete transaction ${id}`);
    // Ideally, here you would make an API call to delete the transaction
    // For demonstration, let's simulate the deletion locally
    const updatedTransactions = transactions.filter(transaction => transaction._id !== id);
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions); // Update filtered list if applicable
  };

  return (
    <div className="transaction-list-container">
      <h2>Transaction List</h2>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
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
          <option value="processed">Processed</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.orderId}</td>
              <td>{transaction.customerName}</td>
              <td>₹{transaction.amount.toFixed(2)}</td> {/* Display Indian Rupee symbol */}
              <td>{transaction.status}</td>
              <td>
                <select
                  value={transaction.status}
                  onChange={(e) => updateTransactionStatus(transaction._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="processed">Processed</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
                <button onClick={() => handleEdit(transaction._id)}>Edit</button> 
                <button onClick={() => handleDelete(transaction._id)}>Delete</button>
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

export default TransactionList;
