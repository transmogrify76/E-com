
import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { QrReader } from 'react-qr-reader';
import './Shipments.css';

const Shipments = () => {
  const initialShipments = [
    { id: 1, orderNo: 'ORD001', product: 'Product A', status: 'Pending' },
    { id: 2, orderNo: 'ORD002', product: 'Product B', status: 'Pending' },
    { id: 3, orderNo: 'ORD003', product: 'Product C', status: 'Pending' },
  ];

  const initialOrders = [
    { id: 1, customer: 'John Doe', products: ['Product A', 'Product B'], status: 'Pending' },
    { id: 2, customer: 'Jane Smith', products: ['Product C', 'Product D'], status: 'Shipped' },
    { id: 3, customer: 'Mike Johnson', products: ['Product E'], status: 'Delivered' },
  ];

  const [shipments, setShipments] = useState(initialShipments);
  const [qrScanResult, setQrScanResult] = useState('');

  const handleScanQRCode = (data) => {
    if (data) {
      setQrScanResult(data); // Update QR scan result state
      updateProductStatus(data); // Update product status based on scanned data
    }
  };

  const handleErrorQRCode = (err) => {
    console.error(err); // Log error message if QR scan fails
  };

  const updateProductStatus = (productId) => {
    // Simulate updating product status based on scanned QR code (replace with actual logic)
    const updatedShipments = shipments.map(shipment =>
      shipment.orderNo === productId ? { ...shipment, status: 'Shipped' } : shipment
    );
    setShipments(updatedShipments);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = initialOrders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    // For demo purposes, showing alert instead of actual state update
    alert(`Order ID ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div className="shipments-container">
      <Grid container spacing={3}>
        {/* QR Code Scanner Section */}
        <Grid item xs={6}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">QR Code Scanner</Typography>
              <QrReader
                delay={300}
                onError={handleErrorQRCode}
                onScan={handleScanQRCode}
                style={{ width: '100%' }}
              />
              <Typography variant="subtitle1" className="qr-scan-result">
                QR Scan Result: {qrScanResult || 'Waiting for scan...'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipments List Section */}
        <Grid item xs={6}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">Shipments List</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order No.</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shipments.map(shipment => (
                    <TableRow key={shipment.id}>
                      <TableCell>{shipment.orderNo}</TableCell>
                      <TableCell>{shipment.product}</TableCell>
                      <TableCell>{shipment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Manage Order Shipment Section */}
     
        </div>
     
    
  );
};

export default Shipments;
