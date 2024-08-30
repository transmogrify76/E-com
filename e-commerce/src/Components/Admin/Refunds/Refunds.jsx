import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Refunds.css'; // Ensure you have this CSS file in the appropriate path

const RefundsPage = () => {
  const [refunds] = useState([
    {
      id: 1,
      orderId: 'ORD-001',
      customerName: 'Smriti De',
      refundAmount: 50,
      status: 'Pending',
      date: '2024-07-18', // Add more details as needed
    },
    {
      id: 2,
      orderId: 'ORD-002',
      customerName: 'Jony Smith',
      refundAmount: 30,
      status: 'Processed',
      date: '2024-07-17', // Add more details as needed
    },
    {
      id: 3,
      orderId: 'ORD-003',
      customerName: 'Manik Sen',
      refundAmount: 25,
      status: 'Approved',
      date: '2024-07-16',
    },
    {
      id: 4,
      orderId: 'ORD-004',
      customerName: 'Emily Banerjee',
      refundAmount: 40,
      status: 'Pending',
      date: '2024-07-15',
    },
    {
      id: 5,
      orderId: 'ORD-005',
      customerName: 'Saroj Adak',
      refundAmount: 20,
      status: 'Rejected',
      date: '2024-07-14',
    },
    
  ]);

  return (
    <div className="refunds-container">
      <h2>Refunds Overview</h2>
      <table className="refunds-table">
        <thead>
          <tr>
          <th style={{ color: 'white' }}>Refund ID</th>
          <th style={{ color: 'white' }}>Order ID</th>
            <th style={{ color: 'white' }}>Customer Name</th>
            <th style={{ color: 'white' }}>Refund Amount (₹)</th>
            <th style={{ color: 'white' }}>Status</th>
            <th style={{ color: 'white' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map((refund) => (
            <tr key={refund.id}>
              <td>{refund.id}</td>
              <td>{refund.orderId}</td>
              <td>{refund.customerName}</td>
              <td>₹{refund.refundAmount}</td>
              <td>{refund.status}</td>
              <td>
                <Link to={`/refunds/${refund.id}`}>
                  <button>Process Refund</button>
                </Link>
                {/* <button onClick={() => handleViewDetails(refund.id)}>View Details</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefundsPage;
