import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ShippingDetails.css';

const dummyShippingDetails = {
  1: { 
    id: 1, 
    carrier: 'UPS', 
    trackingNumber: '1Z9999999999999999', 
    estimatedDelivery: '2023-01-05', 
    address: '123 Main St, Springfield', 
    contact: 'John Doe',
    statusUpdates: [
      { date: '2023-01-01', event: 'Package received by UPS' },
      { date: '2023-01-02', event: 'In transit to sorting facility' },
      { date: '2023-01-03', event: 'Out for delivery' },
    ],
    deliveryStatus: 'On Time',
  },
  // Other orders...
};

const ShippingDetails = () => {
  const { orderId } = useParams();
  const shippingDetails = dummyShippingDetails[orderId];
  const [notes, setNotes] = useState('');

  if (!shippingDetails) {
    return <p>No shipping details found for order ID {orderId}</p>;
  }

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="shipping-details-container">
      <div className="shipping-info">
        <h1>Dispatch Details for Order ID: {orderId}</h1>
        <p><strong>Carrier:</strong> {shippingDetails.carrier}</p>
        <p><strong>Tracking Number:</strong> {shippingDetails.trackingNumber}</p>
        <p><strong>Estimated Delivery:</strong> {shippingDetails.estimatedDelivery}</p>
        <p><strong>Shipping Address:</strong> {shippingDetails.address}</p>
        <p><strong>Contact Person:</strong> {shippingDetails.contact}</p>
        <p><strong>Delivery Status:</strong> {shippingDetails.deliveryStatus}</p>

        <div className="status-updates">
          <h2>Status Updates</h2>
          <ul>
            {shippingDetails.statusUpdates.map((update, index) => (
              <li key={index}>
                <p><strong>Date:</strong> {update.date}</p>
                <p><strong>Event:</strong> {update.event}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="map-notes-container">
        <div className="map-container">
          <h2>Shipping Address Map</h2>
          <iframe 
            src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(shippingDetails.address)}&key=YOUR_API_KEY`}
            width="600"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
            title="Shipping Address Map"
          ></iframe>
        </div>
        
        <div className="notes-section">
          <h2>Additional Seller Information</h2>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Enter any additional notes for the dispatch team..."
          />
        </div>

        <div className="actions">
          <Link to={`/Dispatch/${orderId}`}>
            <button className="dispatch-button">
              Go to Shipping Page 
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
