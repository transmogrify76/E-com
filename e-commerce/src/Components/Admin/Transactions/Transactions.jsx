import React, { useState, useEffect, useMemo } from 'react';
import './Transactions.css'; // Your CSS file

// Transaction Management Component
const TransactionManagement = () => {
    const [transactions, setTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState(''); // New state for status filter

    // Memoizing the dummy transaction data
    const dummyTransactions = useMemo(() => [
        { id: 'T001', customerName: 'John Doe', orderId: 'O001', amount: 150.00, date: '2024-07-01T10:00:00Z', paymentMethod: 'Credit Card', status: 'Completed', reason: null },
        { id: 'T002', customerName: 'Jane Smith', orderId: 'O002', amount: 250.00, date: '2024-07-02T12:30:00Z', paymentMethod: 'PayPal', status: 'Pending', reason: null },
        { id: 'T003', customerName: 'Alice Johnson', orderId: 'O003', amount: 75.50, date: '2024-07-03T09:15:00Z', paymentMethod: 'Debit Card', status: 'Completed', reason: null },
        { id: 'T004', customerName: 'Bob Brown', orderId: 'O004', amount: 300.00, date: '2024-07-04T14:45:00Z', paymentMethod: 'Credit Card', status: 'Failed', reason: 'Insufficient Funds' },
        { id: 'T005', customerName: 'Charlie Green', orderId: 'O005', amount: 120.00, date: '2024-07-05T16:20:00Z', paymentMethod: 'Cash', status: 'Completed', reason: null },
        { id: 'T006', customerName: 'Diana Prince', orderId: 'O006', amount: 80.00, date: '2024-07-06T11:10:00Z', paymentMethod: 'Credit Card', status: 'Refunded', reason: null },
        { id: 'T007', customerName: 'Ethan Hunt', orderId: 'O007', amount: 220.00, date: '2024-07-07T18:30:00Z', paymentMethod: 'PayPal', status: 'Completed', reason: null },
        { id: 'T008', customerName: 'Fiona Glenanne', orderId: 'O008', amount: 45.00, date: '2024-07-08T08:00:00Z', paymentMethod: 'Debit Card', status: 'Pending', reason: null },
        { id: 'T009', customerName: 'George Clooney', orderId: 'O009', amount: 90.00, date: '2024-07-09T15:25:00Z', paymentMethod: 'Credit Card', status: 'Failed', reason: 'Payment Timeout' },
        { id: 'T010', customerName: 'Hannah Montana', orderId: 'O010', amount: 300.00, date: '2024-07-10T19:40:00Z', paymentMethod: 'PayPal', status: 'Completed', reason: null },
    ], []); // Dependency array is empty

    useEffect(() => {
        // Set transactions to dummy data
        setTransactions(dummyTransactions);
        setLoadingTransactions(false);
    }, [dummyTransactions]); // Now this will not cause the warning

    const filteredTransactions = transactions.filter(transaction =>
        (transaction.customerName.toLowerCase().includes(filter.toLowerCase()) ||
            transaction.id.toLowerCase().includes(filter.toLowerCase())) &&
        (statusFilter === '' || transaction.status === statusFilter) // Filter by status
    );

    const handleDelete = (transactionId) => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionId);
        setTransactions(updatedTransactions);
        alert(`Transaction ${transactionId} deleted successfully!`);
    };

    const handleNotifyCustomer = (customerName) => {
        alert(`Notifying ${customerName} about the failed transaction.`);
        // Logic to notify the customer goes here
    };

    const handleViewDetails = (transaction) => {
        alert(`Transaction Details:\n
        ID: ${transaction.id}\n
        Customer: ${transaction.customerName}\n
        Order ID: ${transaction.orderId}\n
        Amount: ₹${transaction.amount.toFixed(2)}\n
        Date: ${new Date(transaction.date).toLocaleDateString()}\n
        Payment Method: ${transaction.paymentMethod}\n
        Status: ${transaction.status}\n
        Reason for Failure: ${transaction.reason || 'N/A'}`);
    };

    return (
        <div className="transaction-management-container">
            <h2>Transaction Management</h2>
            <div className="filter-options">
                <input
                    type="text"
                    placeholder="Search by Transaction ID or Customer Name"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                </select>
            </div>
            {loadingTransactions ? (
                <p>Loading transactions...</p>
            ) : (
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>User/Customer</th>
                            <th>Order ID</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                            <th>Reason for Failure</th> {/* Added column for failure reasons */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.customerName}</td>
                                <td>{transaction.orderId}</td>
                                <td>₹{transaction.amount.toFixed(2)}</td>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td>{transaction.paymentMethod}</td>
                                <td>{transaction.status}</td>
                                <td>{transaction.reason || '-'}</td> {/* Show reason if available, otherwise show '-' */}
                                <td>
                                    <button onClick={() => handleViewDetails(transaction)}>View Details</button>
                                    <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                                    {transaction.status === 'Failed' && (
                                        <button onClick={() => handleNotifyCustomer(transaction.customerName)}>Notify Customer</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredTransactions.length === 0 && (
                            <tr>
                                <td colSpan="9">No transactions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Exporting the component for use
export default TransactionManagement;
