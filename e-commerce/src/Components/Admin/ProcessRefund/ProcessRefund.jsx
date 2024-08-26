import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProcessRefund.css'; // Ensure you have this CSS file in the appropriate path

const ProcessRefundPage = ({ refunds, handleProcessRefund, handleViewDetails }) => {
  const { refundId } = useParams();

  // Dummy data for refunds (replace with your actual data)
  const dummyRefunds = [
    { id: 1, orderId: 'ORD-001', customerName: 'Smriti De', refundAmount: 50, status: 'Pending', date: '2024-07-18' },
    { id: 2, orderId: 'ORD-002', customerName: 'Jony Smith', refundAmount: 30, status: 'Processed', date: '2024-07-17' },
    { id: 3, orderId: 'ORD-003', customerName: 'Manik Sen', refundAmount: 25, status: 'Approved', date: '2024-07-16' },
    { id: 4, orderId: 'ORD-004', customerName: 'Emily Banerjee', refundAmount: 40, status: 'Pending', date: '2024-07-15' },
    { id: 5, orderId: 'ORD-005', customerName: 'Saroj Adak', refundAmount: 20, status: 'Rejected', date: '2024-07-14' },
  ];

  // Find the refund with the matching ID
  const [refund, setRefund] = useState(dummyRefunds.find(r => r.id === parseInt(refundId)));

  if (!refund) {
    return <div>Refund not found</div>;
  }

  const handleApproveRefund = () => {
    setRefund({ ...refund, status: 'Approved' });
    console.log('Approving refund', refund.id);
    // Implement API call or backend integration here to update the refund status
  };

  const handleCancelRefund = () => {
    setRefund({ ...refund, status: 'Cancelled' });
    console.log('Canceling refund', refund.id);
    // Implement API call or backend integration here to update the refund status
  };

  return (
    <div className="process-refund-container">
      <div className="header-refunds">
        <h2>Processing Refund #{refund.id}</h2>
        <div className="refund-details">
          <div>Date: {refund.date}</div>
          <div>Order ID: {refund.orderId}</div>
          <div>Customer Name: {refund.customerName}</div>
          <div>Refund Amount: ₹{refund.refundAmount}</div>
          <div>Status: {refund.status}</div>
        </div>
      </div>

      <div className="actions">
        {refund.status === 'Pending' && (
          <>
            <button className="approve-button" onClick={handleApproveRefund}>Approve Refund</button>
            <button className="cancel-button" onClick={handleCancelRefund}>Cancel Refund</button>
          </>
        )}
        <Link to="/refunds" className="back-button">Back to Refund List</Link>
      </div>
    </div>
  );
};

export default ProcessRefundPage;
