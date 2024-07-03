

import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import './CreateShippingModal.css';

const CreateShippingModal = ({ show, handleClose, handleCreateOrder }) => {
    const [orderData, setOrderData] = useState({
        productName: '',
        quantity: '',
        size: '',
        stockPrice: '',
        refundPolicy: '',
        pickupAddress: '',
        deliveryAddress: '',
        landmark: '',
        country: '',
        state: '',
        city: '',
        pin: '',
        productWeight: '',
        status: 'Pending', // Default status
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateOrder(orderData); // Pass orderData to parent component for processing
        handleClose(); // Close modal after form submission
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Shipping</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="productId">
                                <Form.Label>Product ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productId"
                                    value={orderData.productId}
                                    onChange={handleChange}
                                    placeholder="Enter product Id"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productName"
                                    value={orderData.productName}
                                    onChange={handleChange}
                                    placeholder="Enter product Name"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                  <Row>
                    <Col>
                     <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={orderData.quantity}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                            required
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            type="text"
                            name="size"
                            value={orderData.size}
                            onChange={handleChange}
                            placeholder="Enter size"
                            required
                        />
                    </Form.Group>
                    </Col>
                    </Row>
                   <Row> 
                    <Col>
                    <Form.Group controlId="productWeight">
                        <Form.Label>Product Weight</Form.Label>
                        <Form.Control
                            type="text"
                            name="productWeight"
                            value={orderData.productWeight}
                            onChange={handleChange}
                            placeholder="Enter product weight"
                            required
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="stockPrice">
                        <Form.Label>Total</Form.Label>
                        <Form.Control
                            type="number"
                            name="stockPrice"
                            value={orderData.stockPrice}
                            onChange={handleChange}
                            placeholder="Enter stock price"
                            required
                        />
                    </Form.Group>
                    </Col>
                    </Row>
                   
                    <Form.Group controlId="refundPolicy">
                        <Form.Label>Refund Policy</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="refundPolicy"
                            value={orderData.refundPolicy}
                            onChange={handleChange}
                            placeholder="Enter refund policy"
                            required
                        />
                    </Form.Group>
                    <Row>
                 <Col>  <Form.Group controlId="pickupAddress">
                        <Form.Label>Pickup Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="pickupAddress"
                            value={orderData.pickupAddress}
                            onChange={handleChange}
                            placeholder="Enter pickup address"
                            required
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="deliveryAddress">
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="deliveryAddress"
                            value={orderData.deliveryAddress}
                            onChange={handleChange}
                            placeholder="Enter delivery address"
                            required
                        />
                    </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                    <Form.Group controlId="landmark">
                        <Form.Label>Landmark</Form.Label>
                        <Form.Control
                            type="text"
                            name="landmark"
                            value={orderData.landmark}
                            onChange={handleChange}
                            placeholder="Enter landmark"
                            required
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={orderData.country}
                            onChange={handleChange}
                            placeholder="Enter country"
                            required
                        />
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={orderData.state}
                            onChange={handleChange}
                            placeholder="Enter state"
                            required
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={orderData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            required
                        />
                    </Form.Group>
                    </Col>
                    </Row>
                    <Form.Group controlId="pin">
                        <Form.Label>Pin Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="pin"
                            value={orderData.pin}
                            onChange={handleChange}
                            placeholder="Enter pin code"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Shipment
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateShippingModal;
