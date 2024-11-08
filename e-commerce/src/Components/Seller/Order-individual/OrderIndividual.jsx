import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    trackingNumber: '',
    items: [
      { id: '101', name: 'Item 1', quantity: 2, size: 'M', stock: 50, price: 300, discount: 10, refund: 0 },
      { id: '102', name: 'Item 2', quantity: 1, size: 'L', stock: 30, price: 550, discount: 0, refund: 0 },
      { id: '103', name: 'Item 3', quantity: 3, size: 's', stock: 310, price: 5510, discount: 10, refund: 0 }
    ]
  },

  // other dummy orders...
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};

const generateTrackingNumber = () => {
  return `TRACK${Math.floor(Math.random() * 1000000)}`; // Simple tracking number generator
};

const OrderIndividual = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [shippingRequest, setShippingRequest] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    productId: '',
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
    courier: '',
    trackingId: '',
  });
  const [selectedCourier, setSelectedCourier] = useState('');
  const [generatedTrackingNumber, setGeneratedTrackingNumber] = useState('');

  const [orderDetails, setOrderDetails] = useState(dummyOrderDetails[orderId]);

  useEffect(() => {
    // Fetch the actual order details from an API or update the state
    // Assuming dummy data for now
    setOrderDetails(dummyOrderDetails[orderId]);
  }, [orderId]);

  const couriers = ['DHL', 'FedEx', 'UPS', 'India Post']; // List of courier partners

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value
    });
  };

  const handleCourierSelection = (e) => {
    setSelectedCourier(e.target.value);
  };

  const handleConfirmSelection = () => {
    const trackingNumber = generateTrackingNumber();
    setGeneratedTrackingNumber(trackingNumber);
    setShippingDetails({
      ...shippingDetails,
      courier: selectedCourier,
      trackingId: trackingNumber
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the order status to 'Shipped' and submit shipping details
    const updatedOrderDetails = {
      ...orderDetails,
      status: 'Shipped',
      trackingNumber: generatedTrackingNumber
    };

    // Simulate an API call to update the order
    // e.g., fetch(`/api/orders/${orderId}`, { method: 'PATCH', body: JSON.stringify(updatedOrderDetails) });

    // Update local state
    setOrderDetails(updatedOrderDetails);
    setShippingRequest(true);

    // Redirect to Orderr page
    navigate('/Orderr');
  };

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

      {orderDetails.status === 'Pending' && (
        <>
          {!shippingRequest ? (
            <div>
              <h2>Create Shipping Request</h2>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <legend>Product Details</legend>
                  <label>
                    Product ID:
                    <input
                      type="text"
                      name="productId"
                      value={shippingDetails.productId}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Product Name:
                    <input
                      type="text"
                      name="productName"
                      value={shippingDetails.productName}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      name="quantity"
                      value={shippingDetails.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Size:
                    <input
                      type="text"
                      name="size"
                      value={shippingDetails.size}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Stock Price:
                    <input
                      type="text"
                      name="stockPrice"
                      value={shippingDetails.stockPrice}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Refund Policy:
                    <input
                      type="text"
                      name="refundPolicy"
                      value={shippingDetails.refundPolicy}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Address Details</legend>
                  <label>
                    Pickup Address:
                    <input
                      type="text"
                      name="pickupAddress"
                      value={shippingDetails.pickupAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Delivery Address:
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={shippingDetails.deliveryAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Landmark:
                    <input
                      type="text"
                      name="landmark"
                      value={shippingDetails.landmark}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Country:
                    <input
                      type="text"
                      name="country"
                      value={shippingDetails.country}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    State:
                    <input
                      type="text"
                      name="state"
                      value={shippingDetails.state}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    City:
                    <input
                      type="text"
                      name="city"
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    PIN:
                    <input
                      type="text"
                      name="pin"
                      value={shippingDetails.pin}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Courier Details</legend>
                  <label>
                    Courier Partner:
                    <select value={selectedCourier} onChange={handleCourierSelection} required>
                      <option value="">Select a courier</option>
                      {couriers.map((courier, index) => (
                        <option key={index} value={courier}>{courier}</option>
                      ))}
                    </select>
                  </label>
                  <button type="button" onClick={handleConfirmSelection}>Confirm Selection</button>
                  <label>
                    Product Weight:
                    <input
                      type="text"
                      name="productWeight"
                      value={shippingDetails.productWeight}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Tracking ID:
                    <input
                      type="text"
                      name="trackingId"
                      value={generatedTrackingNumber}
                      readOnly
                    />
                  </label>
                </fieldset>
                <button type="submit">Submit Shipping Request</button>
              </form>
            </div>
          ) : (
            <p>Shipping request has been created for this order.</p>
          )}
        </>
      )}

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