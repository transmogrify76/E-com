import React from 'react';
import { Link } from 'react-router-dom';
import './Invoices.css'; // Ensure you have this CSS file in the appropriate path

const InvoiceOverview = () => {
  const invoices = [
    { invoiceNumber: 'INV-001', customerName: 'John Doe', total: 104 },
    { invoiceNumber: 'INV-002', customerName: 'Jane Smith', total: 150 },
    // Add more dummy invoices as needed
  ];

  return (
    <div className="invoice-container">
      <h2>Invoices Overview</h2>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Customer Name</th>
            <th>Total (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.invoiceNumber}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.customerName}</td>
              <td>₹{invoice.total}</td>
              <td>
                <Link to={`/invoice/${invoice.invoiceNumber}`} className="view-link">View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceOverview;
