import React from 'react';
import './Dispatch.css'; // Import your CSS file

const DispatchPage = () => {
  // Example order details (replace with your actual data)
  const order = {
    orderNumber: '#1',
    orderDate: 'June 30, 2024',
    shippingAddress: 'Kolkata , India',
    items: ['Item 1', 'Item 2', 'Item 3'],
    totalAmount: '₹ 100',
    dispatchDate: 'July 1, 2024',
    expectedDeliveryDate: 'July 5, 2024',
    courierService: 'AbcShipping',
    trackingNumber: '1234567890'
  };

  return (
    <div className="dispatch-page">
      <div className="dispatch-card">
        <h3>Dispatch Details</h3>

        <div className="dispatch-card-content">
          <div className="dispatch-card-section">
            <h3>Order #{order.orderNumber}</h3>
            <p><strong>Order Date:</strong> {order.orderDate}</p>
            <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
          </div>

          <div className="dispatch-card-section">
            <p><strong>Items Ordered:</strong></p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p><strong>Total Amount:</strong> {order.totalAmount}</p>
          </div>
        </div>
      </div>

      <div className="dispatch-card">
        <div className="dispatch-card-section">
          <h3>Dispatch Information</h3>
          <p><strong>Dispatch Date:</strong> {order.dispatchDate}</p>
          <p><strong>Expected Delivery Date:</strong> {order.expectedDeliveryDate}</p>
          <p><strong>Courier Service:</strong> {order.courierService}</p>
          <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
        </div>
      </div>

      <div className="dispatch-card">
        <div className="dispatch-card-section">
          <h3>Delivery Instructions</h3>
          <p>Ensure that someone is available at the delivery address to accept the package.</p>
        </div>
      </div>

      <div className="dispatch-card">
        <div className="dispatch-card-section">
          <h3>Additional Information</h3>
          <p>For any inquiries or changes, please contact our customer service team at <a href="abcd@gmail.com">abcd@gmail.com</a> or call us at <a href="tel: 1234512345">1234512345</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default DispatchPage;
