import React, { useState } from 'react';
import { FaCamera, FaCheckCircle, FaTrash, FaEdit } from 'react-icons/fa'; // Importing icons
import './Shipments.css'; // Import your CSS styles

const AdminPanelShipments = () => {
  const initialShipments = [
    { id: 1, orderNo: 'ORD001', product: 'Product A', status: 'Pending' },
    { id: 2, orderNo: 'ORD002', product: 'Product B', status: 'Shipped' },
    { id: 3, orderNo: 'ORD003', product: 'Product C', status: 'Delivered' },
  ];

  const [shipments, setShipments] = useState(initialShipments);
  const [qrScanResult, setQrScanResult] = useState('');

  const handleScanQRCode = () => {
    // Simulate a QR code scan result
    const simulatedResult = 'ORD001'; // Example scanned order number
    setQrScanResult(simulatedResult);
    updateProductStatus(simulatedResult);
  };

  const updateProductStatus = (orderNo) => {
    const updatedShipments = shipments.map((shipment) => 
      shipment.orderNo === orderNo ? { ...shipment, status: 'Shipped' } : shipment
    );
    setShipments(updatedShipments);
  };

  const handleDeleteShipment = (id) => {
    const updatedShipments = shipments.filter(shipment => shipment.id !== id);
    setShipments(updatedShipments);
  };

  return (
    <div className="shipments-container">
      <div className="qr-scanner-section">
        <h2><FaCamera /> QR Code Scanner</h2>
        <p className="qr-scan-result">QR Scan Result: {qrScanResult || 'Waiting for scan...'}</p>
        <button className="button-scan" onClick={handleScanQRCode}>Simulate QR Scan</button>
      </div>

      <div className="shipments-list-section">
        <h2><FaCheckCircle /> Shipments List</h2>
        <table className="shipments-table">
          <thead>
            <tr>
              <th>Order No.</th>
              <th>Product</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map(shipment => (
              <tr key={shipment.id}>
                <td>{shipment.orderNo}</td>
                <td>{shipment.product}</td>
                <td>{shipment.status}</td>
                <td>
                  <button className="button-edit">
                    <FaEdit /> Edit
                  </button>
                  <button className="button-delete" onClick={() => handleDeleteShipment(shipment.id)}>
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanelShipments;
