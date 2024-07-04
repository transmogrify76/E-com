import React from 'react';
import './OrderIndividual.css'; // Import your custom CSS for styling


const OrderIndividual = () => {
  // Dummy customer data
  const customer = {
    name: 'Esha Ghosal',
    email: 'ghosal.esha@example.com',
    phone: '4612385296',
    address: 'Kolkata , India',
    landmark: 'Mani Casadona',
    country: 'India',
    state: 'West Bengal',
    city: 'Kolkata',
    pin: '7000032',
    district: 'North 24 pgs'
  };

  // Dummy order summary data
  const orderSummary = [
    { id: 1, name: 'Product A', quantity: 2, size: 'Medium', status: 'Pending', payment: 'COD', stockPrice: '2000', discount: '200', refund: '0', totalPrice: '1800' },
    { id: 2, name: 'Product B', quantity: 1, size: 'Large', status: 'Shipped', payment: 'Debit Card', stockPrice: '2000', discount: '200', refund: '0', totalPrice: '1800' },
    // Add more products as needed
  ];

  return (
    <div className="order-individual-container">
      <br />
      <h3>Customer Details</h3>
      <div className="customer-details">
        <table className="table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{customer.name}</td>
              <th>Email</th>
              <td>{customer.email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{customer.phone}</td>
              <th>Address</th>
              <td>{customer.address}</td>
            </tr>
            <tr>
              <th>Landmark</th>
              <td>{customer.landmark}</td>
              <th>Country</th>
              <td>{customer.country}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{customer.state}</td>
              <th>City</th>
              <td>{customer.city}</td>
            </tr>
            <tr>
              <th>Pin</th>
              <td>{customer.pin}</td>
              <th>District</th>
              <td>{customer.district}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      <div className="order-summary">
        <div className="order-summary-header">
          <h3 className="order-summary-title">Order Summary</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Stock Price</th>
              <th>Discount</th>
              <th>Refund</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orderSummary.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.size}</td>
                <td>{product.stockPrice}</td>
                <td>{product.discount}</td>
                <td>{product.refund}</td>
                <td>{product.totalPrice}</td>
                <td>{product.status}</td>
                <td>{product.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderIndividual;
