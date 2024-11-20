import React, { useState, useEffect } from 'react';
import './Wallet.css';

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(0);

  // Dynamically load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => console.log("Razorpay script loaded!");
      script.onerror = () => alert("Failed to load Razorpay script");
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const payNow = () => {
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK is not loaded. Please try again later.");
      return;
    }

    const paymentAmount = selectedAmount * 100;

    const options = {
      key: 'rzp_test_nzmqxQYhvCH9rD', // Your test key
      amount: paymentAmount,
      currency: 'INR',
      name: 'E-commerce by Transmogrify',
      description: 'Wallet Recharge',
      handler: (response) => {
        alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
        setBalance(prevBalance => prevBalance + selectedAmount);
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '1234567899',
      },
      notes: {
        address: 'User Address',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="wallet-page">
      <div className="wallet-container">
        <div className="wallet-header">
          <h2>Wallet Balance</h2>
          <h3>₹{balance}</h3>
        </div>

        <div className="wallet-actions">
          <h4>Add Funds to Your Wallet</h4>
          <div className="amount-buttons">
            <button onClick={() => setSelectedAmount(500)}>Add ₹500</button>
            <button onClick={() => setSelectedAmount(1000)}>Add ₹1000</button>
            <button onClick={() => setSelectedAmount(2000)}>Add ₹2000</button>
          </div>
        </div>

        <div className="selected-amount">
          <h4>Selected Amount: ₹{selectedAmount}</h4>
          <button onClick={payNow} disabled={selectedAmount <= 0} className="pay-now-button">
            Pay Now
          </button>
        </div>

        {/* You can later add a section for Transaction History */}
        {/* <div className="transaction-history">
          <h4>Transaction History</h4>
          <ul>
            <li>Transaction #1 - ₹500 - 01/12/2024</li>
            <li>Transaction #2 - ₹1000 - 01/12/2024</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default WalletPage;

//the above jsx code is perfectly fine, but i want the exact sam edesign like amazon wallet or something like that so give me a good design and structure not image