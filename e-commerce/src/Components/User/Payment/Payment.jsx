import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css'; // Ensure this is the correct path for your styles
import axios from 'axios';

const Payment = () => {
  const location = useLocation(); // Access location state passed from the Checkout page
  const navigate = useNavigate(); // For redirecting to the Wallet page

  // Extract subtotal, shippingCost, and total from location.state
  const { subtotal, localShippingCost, totalWithShipping, cartItems } = location.state || {};

  // Declare states for payment, loading, and error
  const [paymentMethod, setPaymentMethod] = useState(''); // Initially no payment method selected
  const [loading, setLoading] = useState(false); // Track payment loading state
  const [error, setError] = useState(''); // Track error messages

  // Dynamically get userId from localStorage (replace with your actual authentication method)
  const userId = localStorage.getItem('userId'); // Assumes userId is stored in localStorage during login

  useEffect(() => {
    // If no userId is found, redirect to login page
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]); // The effect depends on userId, so it will run on changes

  // Handle Wallet Payment (redirect to wallet page)
  const handleWalletPayment = async () => {
    setLoading(true); // Start loading
    try {
      const orderPayload = {
        userId: parseInt(userId, 10), // Ensure userId is passed as an integer
        orderedItems: cartItems.map((item) => ({
          productId: item.product.id, // Use the productId from cartItems
          quantity: item.quantity,
          assignedUnits: item.product.assignedUnits, // Assuming assignedUnits is an array
          priceAfterDiscount: item.product.priceAfterDiscount,
        })),
        shipmentCompany: 'FedEx', // Shipping company
        shipmentRequestStatus: 'Pending',
        shipmentStatus: 'Pending',
        invoice: 'INV123456', // Example invoice number
        refundStatus: 'No Refund',
        refundDetails: 'Refund processed on 2024-10-01.',
        shippingCost: localShippingCost,
        orderingStatus: 'Pending', // Order status
        orderFulfillmentStatus: 'Unfulfilled', // Fulfillment status
        prePayment: false, // No pre-payment for Wallet
        paymentStatus: true, // Payment status for Wallet
        totalItemCost: subtotal, // Total cost of items
        totalOrderCost: totalWithShipping, // Total order cost (including shipping)
      };

      // Send POST request to backend API to place the order
      const response = await axios.post('http://localhost:5000/orders', orderPayload);

      if (response.status === 200) {
        // If successful, redirect to Wallet page with total amount passed
        navigate('/Wallet', { state: { totalWithShipping } });
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setError('There was an issue placing the order. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle Cash on Delivery (COD) - Simulate payment, no redirect
  const handleCODPayment = async () => {
    setLoading(true); // Start loading
    try {
      const orderPayload = {
        userId: parseInt(userId, 10), // Ensure userId is passed as an integer
        orderedItems: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          assignedUnits: item.product.assignedUnits,
          priceAfterDiscount: item.product.priceAfterDiscount,
        })),
        shipmentCompany: 'FedEx',
        shipmentRequestStatus: 'Pending',
        shipmentStatus: 'Pending',
        invoice: 'INV123456',
        refundStatus: 'No Refund',
        refundDetails: 'Refund processed on 2024-10-01.',
        shippingCost: localShippingCost,
        orderingStatus: 'Pending',
        orderFulfillmentStatus: 'Unfulfilled',
        prePayment: false,
        paymentStatus: false,
        totalItemCost: subtotal,
        totalOrderCost: totalWithShipping,
      };

      // Send POST request to backend API to place the order
      const response = await axios.post('http://localhost:5000/orders', orderPayload);

      if (response.status === 200) {
        // If successful, show alert for COD
        alert('Order placed successfully with COD!');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setError('There was an issue placing the order. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePaymentClick = () => {
    if (paymentMethod === 'wallet') {
      handleWalletPayment(); // Call Wallet payment handler
    } else if (paymentMethod === 'cod') {
      handleCODPayment(); // Call COD payment handler
    } else {
      setError('Please select a payment method.');
    }
  };

  return (
    <div className="payment-container">
      <section className="payment-info">
        <h2>Payment Information</h2>
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="payment"
              value="wallet"
              checked={paymentMethod === 'wallet'}
              onChange={() => setPaymentMethod('wallet')} // Select wallet option
            />
            Wallet
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')} // Select COD option
            />
            Cash on Delivery (COD)
          </label>
        </div>
      </section>

      <section className="order-review">
        <h2>Order Review</h2>
        <div className="order-summary-review">
          <div className="summary-item">
            <div className="label">Subtotal:</div>
            <div className="value">₹{subtotal}</div>
          </div>
          <div className="summary-item">
            <div className="label">Shipping:</div>
            <div className="value">₹{localShippingCost}</div>
          </div>
          <div className="summary-item">
            <div className="label">Total:</div>
            <div className="value">₹{totalWithShipping}</div>
          </div>
        </div>
        <label>
          <input type="checkbox" required />
          I agree to the <a href="/terms">terms and conditions</a>.
        </label>

        {/* Show error message if any */}
        {error && <p className="error-message">{error}</p>}

        {/* Disable the button if no payment method is selected */}
        <button
          className="place-order-button"
          onClick={handlePaymentClick}
          disabled={loading || !paymentMethod} // Button is disabled if loading or no payment method is selected
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </section>
    </div>
  );
};

export default Payment;
