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
  2: { 
    id: 2, 
    carrier: 'FedEx', 
    trackingNumber: '123456789012', 
    estimatedDelivery: '2023-01-06', 
    address: '456 Elm St, Shelbyville', 
    contact: 'Jane Smith',
    statusUpdates: [
      { date: '2023-01-02', event: 'Package received by FedEx' },
      { date: '2023-01-03', event: 'In transit to sorting facility' },
      { date: '2023-01-04', event: 'Out for delivery' },
    ],
    deliveryStatus: 'On Time',
  },
  3: { 
    id: 3, 
    carrier: 'DHL', 
    trackingNumber: '987654321098', 
    estimatedDelivery: '2023-01-07', 
    address: '789 Oak St, Capital City', 
    contact: 'Bob Johnson',
    statusUpdates: [
      { date: '2023-01-03', event: 'Package received by DHL' },
      { date: '2023-01-04', event: 'In transit to sorting facility' },
      { date: '2023-01-05', event: 'Out for delivery' },
    ],
    deliveryStatus: 'Delayed',
  },
  4: { 
    id: 4, 
    carrier: 'USPS', 
    trackingNumber: '998877665544', 
    estimatedDelivery: '2023-01-08', 
    address: '101 Maple St, Ogdenville', 
    contact: 'Alice Williams',
    statusUpdates: [
      { date: '2023-01-04', event: 'Package received by USPS' },
      { date: '2023-01-05', event: 'In transit to sorting facility' },
      { date: '2023-01-06', event: 'Out for delivery' },
    ],
    deliveryStatus: 'On Time',
  },
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
        <h1>Shipping Details for Order ID: {orderId}</h1>
        <p><strong>Carrier:</strong> {shippingDetails.carrier}</p>
        <p><strong>Tracking Number:</strong> {shippingDetails.trackingNumber}</p>
        <p><strong>Estimated Delivery:</strong> {shippingDetails.estimatedDelivery}</p>
        <p><strong>Shipping Address:</strong> {shippingDetails.address}</p>
        <p><strong>Contact Person:</strong> {shippingDetails.contact}</p>
        <p><strong>Delivery Status:</strong> {shippingDetails.deliveryStatus}</p>

        <div className="status-updates">
        <h2 style={{ marginLeft: '200px' }}>Status Updates</h2>
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

        <Link to={`/Dispatch/${orderId}`}>
          <button className="dispatch-button">
            Go to Dispatch Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShippingDetails;
