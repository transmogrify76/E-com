import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Dispatch.css';

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
        deliveryInstructions: 'Leave package at the front porch. Contact customer at 123-456-7890 if no one is home.',
    },
    // Other orders...
};

const DispatchPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const shippingDetails = dummyShippingDetails[orderId];

    if (!shippingDetails) {
        return <p>No shipping details found for order ID {orderId}</p>;
    }

    const handleGenerateReport = () => {
        alert('Generating dispatch report...');
        // Implement report generation logic here
    };

    return (
        <div className="dispatch-page">
            <h1>Shipping Details for Order ID: {orderId}</h1>
            <div className="section">
                <h2>Shipping Information</h2>
                <p><strong>Carrier:</strong> {shippingDetails.carrier}</p>
                <p><strong>Tracking Number:</strong> {shippingDetails.trackingNumber}</p>
                <p><strong>Estimated Delivery:</strong> {shippingDetails.estimatedDelivery}</p>
                <p><strong>Address:</strong> {shippingDetails.address}</p>
                <p><strong>Contact:</strong> {shippingDetails.contact}</p>
            </div>
            <div className="section">
                <h2>Status Updates</h2>
                <ul>
                    {shippingDetails.statusUpdates.map((update, index) => (
                        <li key={index}><strong>{update.date}:</strong> {update.event}</li>
                    ))}
                </ul>
            </div>
            <div className="section">
                <h2>Delivery Status</h2>
                <p>{shippingDetails.deliveryStatus}</p>
            </div>
            <div className="section delivery-instructions">
                <h2>Delivery Instructions</h2>
                <p>{shippingDetails.deliveryInstructions}</p>
            </div>
            <div className="actions">
                <Link to={`/EditDispatch/${orderId}`}>
                    <button className="btn btn-primary">Edit Dispatch Details</button>
                </Link>
                <button className="btn btn-secondary" onClick={handleGenerateReport}>
                    Generate Dispatch Report
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/Orderr')}>
                    Return to Orders
                </button>
            </div>
        </div>
    );
};

export default DispatchPage;
