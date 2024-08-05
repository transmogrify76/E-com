// src/Components/OrderIndividual/OrderIndividual.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './OrderIndividual.css'; // Import the CSS file

const dummyOrderDetails = {
  1: { 
    id: 1, 
    purchaseDate: '2023-01-01 12:30 PM', 
    customerName: 'abc', 
    total: 850, 
    status: 'Pending', 
    payment: 'Credit Card',
    shippingAddress: '123 Main St, Springfield, IL, 62704',
    estimatedDelivery: '2023-01-10',
    orderNotes: 'Please handle with care.',
    trackingNumber: 'TRACK123456',
    items: [
      { id: '101', name: 'Item 1', quantity: 2, size: 'M', stock: 50, price: 300, discount: 10, refund: 0 },
      { id: '102', name: 'Item 2', quantity: 1, size: 'L', stock: 30, price: 550, discount: 0, refund: 0 }
    ]
  },
  2: { 
    id: 2, 
    purchaseDate: '2023-01-02 10:45 AM', 
    customerName: 'xyz', 
    total: 700, 
    status: 'Shipped', 
    payment: 'PayPal',
    shippingAddress: '456 Elm St, Springfield, IL, 62704',
    estimatedDelivery: '2023-01-12',
    orderNotes: '',
    trackingNumber: 'TRACK654321',
    items: [
      { id: '103', name: 'Item 3', quantity: 1, size: 'S', stock: 20, price: 400, discount: 5, refund: 0 },
      { id: '104', name: 'Item 4', quantity: 2, size: 'M', stock: 10, price: 300, discount: 0, refund: 0 }
    ]
  },
  3: { 
    id: 3, 
    purchaseDate: '2023-01-03 04:15 PM', 
    customerName: 'pqr', 
    total: 400, 
    status: 'Cancelled', 
    payment: 'Bank Transfer',
    shippingAddress: '789 Oak St, Springfield, IL, 62704',
    estimatedDelivery: '2023-01-15',
    orderNotes: 'Refund requested.',
    trackingNumber: '',
    items: [
      { id: '105', name: 'Item 5', quantity: 1, size: 'L', stock: 0, price: 400, discount: 0, refund: 50 }
    ]
  },
  4: { 
    id: 4, 
    purchaseDate: '2023-01-04 11:00 AM', 
    customerName: 'def', 
    total: 1200, 
    status: 'Delivered', 
    payment: 'Credit Card',
    shippingAddress: '101 Pine St, Springfield, IL, 62704',
    estimatedDelivery: '2023-01-08',
    orderNotes: 'Leave at the front door.',
    trackingNumber: 'TRACK789012',
    items: [
      { id: '106', name: 'Item 6', quantity: 1, size: 'XL', stock: 25, price: 600, discount: 0, refund: 0 },
      { id: '107', name: 'Item 7', quantity: 2, size: 'L', stock: 15, price: 600, discount: 0, refund: 0 }
    ]
  },
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};

const OrderIndividual = () => {
  const { orderId } = useParams();
  const orderDetails = dummyOrderDetails[orderId];

  if (!orderDetails) {
    return <p>No order details found for order ID {orderId}</p>;
  }

  return (
    <div className="order-individual-container">
      <h1>Order Details for Order ID: {orderId}</h1>
      <p><strong>Purchase Date:</strong> {orderDetails.purchaseDate}</p>
      <p><strong>Customer Name:</strong> {orderDetails.customerName}</p>
      <p><strong>Total:</strong> {formatCurrency(orderDetails.total)}</p>
      <p><strong>Status:</strong> {orderDetails.status}</p>
      <p><strong>Payment Method:</strong> {orderDetails.payment}</p>
      <p><strong>Shipping Address:</strong> {orderDetails.shippingAddress}</p>
      <p><strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}</p>
      <p><strong>Order Notes:</strong> {orderDetails.orderNotes}</p>
      <p><strong>Tracking Number:</strong> {orderDetails.trackingNumber || 'N/A'}</p>
      <h2>Items:</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Refund</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.items.map((item) => {
            const totalPrice = (item.price - item.discount) * item.quantity;
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.size}</td>
                <td>{item.stock}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{formatCurrency(item.discount)}</td>
                <td>{formatCurrency(item.refund)}</td>
                <td>{formatCurrency(totalPrice)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderIndividual;
