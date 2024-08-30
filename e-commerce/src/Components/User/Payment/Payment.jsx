import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './Payment.css'; // Ensure this path is correct

const Payment = () => {
    const { shippingCost, getTotalCartAmount } = useContext(ShopContext);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('credit-card'); // Default payment method
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        billingAddress: ''
    });
    const [upiDetails, setUpiDetails] = useState({
        upiId: ''
    });

    const subtotal = getTotalCartAmount();
    const total = subtotal + shippingCost; // Calculate total based on context

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
                }, 2000);
            });
            setPaymentSuccess(true); // Simulate successful payment
        } catch (error) {
            setPaymentError(error.message);
        } finally {
            setPaymentProcessing(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (paymentMethod === 'credit-card') {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        } else if (paymentMethod === 'upi') {
            setUpiDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        }
    };

    return (
        <div className="payment-container">
            <section className="payment-info">
            <h2 style={{ marginLeft: '280px',color: '#39083f'}}>Payment Information</h2>
                <div className="payment-methods">
                    <label>
                        <input 
                            type="radio" 
                            name="payment" 
                            value="credit-card" 
                            checked={paymentMethod === 'credit-card'} 
                            onChange={() => setPaymentMethod('credit-card')}
                        />
                        Credit Card/Debit Card
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="payment" 
                            value="upi" 
                            checked={paymentMethod === 'upi'} 
                            onChange={() => setPaymentMethod('upi')}
                        />
                        UPI
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="payment" 
                            value="cod" 
                            checked={paymentMethod === 'cod'} 
                            onChange={() => setPaymentMethod('cod')}
                        />
                        Cash on Delivery
                    </label>
                </div>
                {paymentMethod === 'credit-card' && (
                    <form>
                        <label>Card Number:</label>
                        <input 
                            type="text" 
                            name="cardNumber" 
                            value={cardDetails.cardNumber} 
                            placeholder="1234 5678 9012 3456" 
                            onChange={handleInputChange}
                        />
                        <label>Expiration Date:</label>
                        <input 
                            type="text" 
                            name="expirationDate" 
                            value={cardDetails.expirationDate} 
                            placeholder="MM/YYYY" 
                            onChange={handleInputChange}
                        />
                        <label>CVV:</label>
                        <input 
                            type="text" 
                            name="cvv" 
                            value={cardDetails.cvv} 
                            placeholder="123" 
                            onChange={handleInputChange}
                        />
                        <label>Billing Address:</label>
                        <textarea 
                            name="billingAddress" 
                            value={cardDetails.billingAddress} 
                            placeholder="123 Street, City, Country" 
                            onChange={handleInputChange}
                        />
                    </form>
                )}
                {paymentMethod === 'upi' && (
                    <form>
                        <label>UPI ID:</label>
                        <input 
                            type="text" 
                            name="upiId" 
                            value={upiDetails.upiId} 
                            placeholder="example@upi" 
                            onChange={handleInputChange}
                        />
                    </form>
                )}
            </section>

            <section className="order-review">
                <h2 style={{ marginLeft: '280px'}}>Order Review</h2>
                <div className="order-summary-review">
                    <div className="summary-item">
                        <div className="label">Subtotal:</div>
                        <div className="value">₹{subtotal}</div>
                    </div>
                    <div className="summary-item">
                        <div className="label">Shipping:</div>
                        <div className="value">₹{shippingCost}</div>
                    </div>
                    <div className="summary-item">
                        <div className="label">Total:</div>
                        <div className="value">₹{total}</div>
                    </div>
                </div>
                <label>
                    <input type="checkbox" required />
                    I agree to the <a href="/term">terms and conditions</a>.
                </label>
                <button
                    className="place-order-button"
                    onClick={handlePayment}
                    disabled={paymentProcessing}
                >
                    {paymentProcessing ? 'Processing...' : 'Place Order'}
                </button>
                {paymentError && <p className="payment-message payment-error">{paymentError}</p>}
                {paymentSuccess && <p className="payment-message payment-success">Payment successful!</p>}
            </section>
        </div>
    );
};

export default Payment;
