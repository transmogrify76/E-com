import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subtotal, localShippingCost, totalWithShipping, cartItems, shippingInfo, userAddress } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  // This function is used to handle the wallet payment and initiate the flow.
  const handleWalletPayment = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        userId: parseInt(userId, 10),
        orderedItems: cartItems.map((item) => ({
          productId: item.productId,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          quantity: item.quantity,
        })),
        shippingInfo: shippingInfo,
        totalItemCost: subtotal,
        totalOrderCost: totalWithShipping,
        shippingCost: localShippingCost,
        paymentStatus: false, // Indicating that the payment hasn't been done yet
        address: userAddress,
      };

      // First, we navigate to the wallet page to initiate payment
      navigate('/Wallet', {
        state: {
          totalWithShipping,
          orderPayload,
        },
      });

    } catch (err) {
      setError('There was an issue processing the wallet payment. Please try again.');
      console.error('Error with wallet payment:', err);
    } finally {
      setLoading(false);
    }
  };

  // This function handles COD (Cash on Delivery) payment.
  const handleCODPayment = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        userId: parseInt(userId, 10),
        orderedItems: cartItems.map((item) => ({
          productId: item.productId,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          quantity: item.quantity,
        })),
        shippingInfo: shippingInfo,
        totalItemCost: subtotal,
        totalOrderCost: totalWithShipping,
        shippingCost: localShippingCost,
        paymentStatus: false, // COD, payment is done later
        address: userAddress,
      };

      // Directly create the order with COD payment
      const response = await axios.post('http://localhost:5000/orders', orderPayload);

      if (response.status === 200) {
        alert('Order placed successfully with COD!');
      }
    } catch (err) {
      setError('There was an issue placing the order. Please try again.');
      console.error('Error placing order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClick = () => {
    if (paymentMethod === 'wallet') {
      handleWalletPayment(); // Handle wallet payment, which redirects to the wallet page
    } else if (paymentMethod === 'cod') {
      handleCODPayment(); // Handle COD payment, create order directly
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
              onChange={() => setPaymentMethod('wallet')}
            />
            Wallet
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
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

        {error && <p className="error-message">{error}</p>}

        <button
          className="place-order-button"
          onClick={handlePaymentClick}
          disabled={loading || !paymentMethod}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </section>
    </div>
  );
};

export default Payment;


