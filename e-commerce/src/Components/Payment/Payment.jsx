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

    //Sujata add

  //  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to COD
const [upiId, setUpiId] = useState('');
const [upiValidationMessage, setUpiValidationMessage] = useState('');

// Function to validate UPI ID
const validateUpiId = () => {
    // Simple regex for UPI ID validation (you can adjust it as needed)
    const isValidUpi = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/.test(upiId);
    setUpiValidationMessage(isValidUpi ? "Valid UPI ID" : "Invalid UPI ID");
};

//ends here



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
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
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
                            value="credit-card" 
                            checked={paymentMethod === 'credit-card'} 
                            onChange={() => setPaymentMethod('credit-card')}
                        />
                        Credit Card/Debit Card
                    </label>
                 
                 
                    
    <div>
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

        {/* Conditional rendering for UPI ID input */}
        {paymentMethod === 'upi' && (
            <div>
                <input 
                    type="text" 
                    placeholder="Enter your UPI ID" 
                    value={upiId} 
                    onChange={(e) => setUpiId(e.target.value)} 
                />
                <button onClick={validateUpiId}>Check UPI ID</button>
                {upiValidationMessage && <p>{upiValidationMessage}</p>}
            </div>
        )}

    </div>
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
                        <div className="value">₹{shippingCost}</div>
                    </div>
                    <div className="summary-item">
                        <div className="label">Total:</div>
                        <div className="value">₹{total}</div>
                    </div>
                </div>
                
                {/* Sujata add */}
                <label>
                    <input type="checkbox" required />
                    I agree to the <a href="https://onedrive.live.com/edit?id=FB22672498EF7806!see915a24f23a425ea43039e7c4397dbf&resid=FB22672498EF7806!see915a24f23a425ea43039e7c4397dbf&cid=fb22672498ef7806&ithint=file%2Cdocx&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3cvYy9mYjIyNjcyNDk4ZWY3ODA2L0VTUmFrZTQ2OGw1Q3BEQTU1OFE1ZmI4QmpvTl92d21UMWNFeDh1TW5TUXVfVWc_ZT1FZ0VScDlc&migratedtospo=true&wdo=2" target="_blank" rel="noopener noreferrer">terms and conditions</a>.
                </label>
                {/* end here */}

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
