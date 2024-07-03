// Payment.js

import React, { useState } from 'react';
import './Payment.css'; // Make sure this path is correct

const Payment = () => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setPaymentProcessing(true);
    try {
      // Simulate API call to payment gateway
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = Math.random() < 0.8; // Simulate 80% success rate
          if (success) {
            resolve();
          } else {
            reject(new Error('Payment failed. Please try again.'));
          }
        }, 2000); // Simulate 2 seconds delay
      });
      setPaymentSuccess(true); // Simulate successful payment
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <section className="payment-info">
        <h2>Payment Information</h2>
        <br></br>
        {/* Payment method selection - Dummy data */}
        <div className="payment-methods">
          <label>
            <input type="radio" name="payment" value="credit-card" checked />
            Credit Card/Debit Card
          </label>
          <label>
            <input type="radio" name="payment" value="paypal" />
             UPI
          </label>
          <label>
            <input type="radio" name="payment" value="paypal" />
             Cash on delivery
          </label>
        </div>
        {/* Credit card details form - Dummy data */}
        <form>
          <label>Card Number:</label>
          <input type="text" placeholder="1234 5678 9012 3456" />
          <label>Expiration Date:</label>
          <input type="text" placeholder="MM/YYYY" />
          <label>CVV:</label>
          <input type="text" placeholder="123" />
          <label>Billing Address:</label>
          <textarea placeholder="123 Street, City, Country" />
        </form>
      </section>

      <section className="order-review">
        <h2>Order Review</h2>
        {/* Order summary - Dummy data */}
        <div className="order-summary-review">
          <div className="summary-item">
            <div className="label">Subtotal:</div>
            <div className="value">90.00</div>
          </div>
          <div className="summary-item">
            <div className="label">Shipping:</div>
            <div className="value">₹500.00</div>
          </div>
          <div className="summary-item">
            <div className="label">Total:</div>
            <div className="value">₹695.00</div>
          </div>
        </div>
        {/* Terms and conditions checkbox - Dummy data */}
        <label>
          <input type="checkbox" /> I agree to the <a href="/terms">terms and conditions</a>.
        </label>
        {/* Place order button - Dummy data */}
        <button
          className="place-order-button"
          onClick={handlePayment}
          disabled={paymentProcessing}
        >
          {paymentProcessing ? 'Processing...' : 'Place Order'}
        </button>
        {/* Payment status messages - Dummy data */}
        {paymentError && <p className="payment-message payment-error">{paymentError}</p>}
        {paymentSuccess && <p className="payment-message payment-success">Payment successful!</p>}
      </section>
    </div>
  );
};

export default Payment;
