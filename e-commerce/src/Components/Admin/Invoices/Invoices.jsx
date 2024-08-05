// import React from 'react';
// import './Invoices.css'; // Adjust path as necessary

// const AdminInvoicePage = () => {
//   // Dummy invoice data
//   const invoice = {
//     invoiceNumber: 'INV-001',
//     date: '2024-07-17',
//     customer: {
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       address: '123 Main St, Anytown, USA'
//     },
//     items: [
//       { id: 1, name: 'Product A', quantity: 2, price: 25 },
//       { id: 2, name: 'Product B', quantity: 1, price: 40 }
//     ],
//     subtotal: 90,
//     tax: 9,
//     shipping: 5,
//     total: 104,
//     paymentMethod: 'Credit Card',
//     transactionId: 'ABC123XYZ',
//     shippingAddress: '456 Elm St, Anytown, USA',
//     shippingMethod: 'Express Shipping',
//     comments: 'Please deliver between 9 AM and 5 PM'
//   };

//   const handleEditInvoice = () => {
//     console.log('Editing invoice', invoice.invoiceNumber);
//     // Add logic for editing invoice
//   };

//   const handleSendReminder = () => {
//     console.log('Sending reminder for invoice', invoice.invoiceNumber);
//     // Add logic for sending reminder
//   };

//   const handleCancelOrder = () => {
//     console.log('Canceling order for invoice', invoice.invoiceNumber);
//     // Add logic for canceling order
//   };

//   // Function to format amount in INR
//   const formatCurrencyINR = amount => {
//     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
//   };

//   return (
//     <div className="admin-invoice-container">
//       <div className="header">
//         <div className="company-info">
//           <img src="/path/to/logo.png" alt="Company Logo" />
//           <div>
//             <h2>Company Name Admin Panel</h2>
//             <p>Address Line 1, Address Line 2</p>
//             <p>Phone: +1234567890</p>
//             <p>Email: admin@example.com</p>
//             <p>Website: www.example.com</p>
//           </div>
//         </div>
//         <div className="invoice-details">
//           <h3>Invoice #{invoice.invoiceNumber}</h3>
//           <p>Date: {invoice.date}</p>
//         </div>
//       </div>

//       <div className="billing-details">
//         <h3>Billing Information</h3>
//         <p>Name: {invoice.customer.name}</p>
//         <p>Email: {invoice.customer.email}</p>
//         <p>Address: {invoice.customer.address}</p>
//         {/* Add more billing details as needed */}
//       </div>

//       <div className="order-details">
//         <h3>Order Summary</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Item</th>
//               <th>Quantity</th>
//               <th>Unit Price</th>
//               <th>Total Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoice.items.map(item => (
//               <tr key={item.id}>
//                 <td>{item.name}</td>
//                 <td>{item.quantity}</td>
//                 <td>{formatCurrencyINR(item.price)}</td>
//                 <td>{formatCurrencyINR(item.quantity * item.price)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="order-total">
//           <p>Subtotal: {formatCurrencyINR(invoice.subtotal)}</p>
//           <p>Tax: {formatCurrencyINR(invoice.tax)}</p>
//           <p>Shipping: {formatCurrencyINR(invoice.shipping)}</p>
//           <h3>Total: {formatCurrencyINR(invoice.total)}</h3>
//         </div>
//       </div>

//       <div className="payment-details">
//         <h3>Payment Information</h3>
//         <p>Payment Method: {invoice.paymentMethod}</p>
//         <p>Transaction ID: {invoice.transactionId}</p>
//       </div>

//       <div className="shipping-details">
//         <h3>Shipping Information</h3>
//         <p>Shipping Address: {invoice.shippingAddress}</p>
//         <p>Shipping Method: {invoice.shippingMethod}</p>
//       </div>

//       <div className="additional-notes">
//         <h3>Additional Notes</h3>
//         <p>Terms and Conditions: Lorem ipsum dolor sit amet...</p>
//         <p>Order Comments: {invoice.comments}</p>
//       </div>

//       {/* Admin actions */}
//       <div className="admin-actions">
//         <button onClick={handleEditInvoice}>Edit Invoice</button>
//         <button onClick={handleSendReminder}>Send Reminder</button>
//         <button onClick={handleCancelOrder}>Cancel Order</button>
//         {/* Add more admin actions as needed */}
//       </div>

//       <div className="footer">
//         <p>Contact Information: Phone: +1234567890 | Email: admin@example.com</p>
//         <p>Thank you for using the admin panel!</p>
//       </div>
//     </div>
//   );
// };

// export default AdminInvoicePage;

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
