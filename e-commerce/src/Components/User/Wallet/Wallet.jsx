import React, { useState, useEffect } from 'react'; // Import useEffect and useState
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
      <h2>Wallet Balance: ₹{balance}</h2>
      <div>
        <button onClick={() => setSelectedAmount(500)}>Add ₹500</button>
        <button onClick={() => setSelectedAmount(1000)}>Add ₹1000</button>
      </div>

      <div>
        <h3>Selected Amount: ₹{selectedAmount}</h3>
        <button onClick={payNow} disabled={selectedAmount <= 0}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default WalletPage;

