import React from 'react';
import { useParams } from 'react-router-dom';
import './AdminInvoice.css'; // Ensure you have this CSS file in the appropriate path

const AdminInvoicePage = () => {
  const { invoiceNumber } = useParams();

  const invoiceData = {
    'INV-001': {
      invoiceNumber: 'INV-001',
      date: '2024-07-17',
      customer: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        address: '123 Main St, Anytown, USA'
      },
      items: [
        { id: 1, name: 'Product A', quantity: 2, price: 25 },
        { id: 2, name: 'Product B', quantity: 1, price: 40 }
      ],
      subtotal: 90,
      tax: 9,
      shipping: 5,
      total: 104,
      paymentMethod: 'Credit Card',
      transactionId: 'ABC123XYZ',
      shippingAddress: '456 Elm St, Anytown, USA',
      shippingMethod: 'Express Shipping',
      comments: 'Please deliver between 9 AM and 5 PM'
    },
    'INV-002': {
      invoiceNumber: 'INV-002',
      date: '2024-07-18',
      customer: {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        address: '456 Elm St, Anytown, USA'
      },
      items: [
        { id: 1, name: 'Product C', quantity: 3, price: 50 },
        { id: 2, name: 'Product D', quantity: 2, price: 25 }
      ],
      subtotal: 200,
      tax: 20,
      shipping: 10,
      total: 230,
      paymentMethod: 'PayPal',
      transactionId: 'XYZ456ABC',
      shippingAddress: '789 Maple St, Anytown, USA',
      shippingMethod: 'Standard Shipping',
      comments: 'Leave at the front door'
    }
    // Add more dummy invoices as needed
  };

  const invoice = invoiceData[invoiceNumber];

  const handleEditInvoice = () => {
    console.log('Editing invoice', invoice.invoiceNumber);
    // Add logic for editing invoice
    alert(`Editing invoice ${invoice.invoiceNumber}`);
    // Implement your edit logic here
  };

  const handleSendReminder = () => {
    console.log('Sending reminder for invoice', invoice.invoiceNumber);
    // Add logic for sending reminder
    alert(`Sending reminder for invoice ${invoice.invoiceNumber}`);
    // Implement your send reminder logic here
  };

  const handleCancelOrder = () => {
    console.log('Canceling order for invoice', invoice.invoiceNumber);
    // Add logic for canceling order
    alert(`Canceling order for invoice ${invoice.invoiceNumber}`);
    // Implement your cancel order logic here
  };

  const formatCurrencyINR = amount => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="admin-invoice-container">
      <div className="header-invoice">
        <div className="company-info">
          <img src="/path/to/logo.png" alt="Company Logo" />
          <div>
            <h3>Company Name </h3>
            <p>Address Line 1, Address Line 2</p>
            <p>Phone: +1234567890</p>
            <p>Email: admin@example.com</p>
            <p>Website: www.example.com</p>
          </div>
        </div>
        <div className="invoice-details">
          <h3>Invoice #{invoice.invoiceNumber}</h3>
          <p>Date: {invoice.date}</p>
        </div>
      </div>

      <div className="billing-details">
        <h3>Billing Information</h3>
        <p>Name: {invoice.customer.name}</p>
        <p>Email: {invoice.customer.email}</p>
        <p>Address: {invoice.customer.address}</p>
      </div>

      <div className="order-details">
        <h3>Order Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrencyINR(item.price)}</td>
                <td>{formatCurrencyINR(item.quantity * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="order-total">
          <p>Subtotal: {formatCurrencyINR(invoice.subtotal)}</p>
          <p>Tax: {formatCurrencyINR(invoice.tax)}</p>
          <p>Shipping: {formatCurrencyINR(invoice.shipping)}</p>
          <h3>Total: {formatCurrencyINR(invoice.total)}</h3>
        </div>
      </div>

      <div className="payment-details">
        <h3>Payment Information</h3>
        <p>Payment Method: {invoice.paymentMethod}</p>
        <p>Transaction ID: {invoice.transactionId}</p>
      </div>

      <div className="shipping-details">
        <h3>Shipping Information</h3>
        <p>Shipping Address: {invoice.shippingAddress}</p>
        <p>Shipping Method: {invoice.shippingMethod}</p>
      </div>

      <div className="additional-notes">
        <h3>Additional Notes</h3>
        <p>Terms and Conditions: Lorem ipsum dolor sit amet...</p>
        <p>Order Comments: {invoice.comments}</p>
      </div>

      <div className="admin-actions">
        <button onClick={handleEditInvoice}>Edit Invoice</button>
        <button onClick={handleSendReminder}>Send Reminder</button>
        <button onClick={handleCancelOrder}>Cancel Order</button>
      </div>

      <div className="footer">
        <p>Contact Information: Phone: +1234567890 | Email: admin@example.com</p>
        <p>Thank you for using the admin panel!</p>
      </div>
    </div>
  );
};

export default AdminInvoicePage;
