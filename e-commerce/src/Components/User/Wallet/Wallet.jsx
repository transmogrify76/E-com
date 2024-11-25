import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import React, { useState, useEffect } from 'react'; // Import useEffect and useState
// import './Wallet.css';
// import backgroundImage from '../../Assets/Ecommerce_Frontend_Assets/Assets/background.jpg'; // adjust the path


// const WalletPage = () => {
//   const [balance, setBalance] = useState(0); 
//   const [selectedAmount, setSelectedAmount] = useState(0);

//   // Dynamically load Razorpay script
//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => console.log("Razorpay script loaded!");
//       script.onerror = () => alert("Failed to load Razorpay script");
//       document.body.appendChild(script);
//     };

//     loadRazorpayScript();
//   }, []);

//   const payNow = () => {
//     if (typeof window.Razorpay === "undefined") {
//       alert("Razorpay SDK is not loaded. Please try again later.");
//       return;
//     }

//     const paymentAmount = selectedAmount * 100; 

//     const options = {
//       key: 'rzp_test_nzmqxQYhvCH9rD', // Your test key
//       amount: paymentAmount,
//       currency: 'INR',
//       name: 'E-commerce by Transmogrify',
//       description: 'Wallet Recharge',
//       handler: (response) => {
//         alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
//         setBalance(prevBalance => prevBalance + selectedAmount); 
//       },
//       prefill: {
//         name: 'User Name',
//         email: 'user@example.com',
//         contact: '1234567899',
//       },
//       notes: {
//         address: 'User Address',
//       },
//       theme: {
//         color: '#F37254',
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="wallet-page">
//       <h2>Wallet Balance: ₹{balance}</h2>
//       <div>
//         <button onClick={() => setSelectedAmount(500)}>Add ₹500</button>
//         <button onClick={() => setSelectedAmount(1000)}>Add ₹1000</button>
//       </div>

//       <div>
//         <h3>Selected Amount: ₹{selectedAmount}</h3>
//         <button onClick={payNow} disabled={selectedAmount <= 0}>
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WalletPage;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import axios from 'axios'; // Import axios for API calls
import './Wallet.css';

const WalletPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalWithShipping, orderPayload } = location.state || {}; // Receive order payload and amount from Payment Page
  const [balance, setBalance] = useState(0); // Wallet balance
  const [selectedAmount, setSelectedAmount] = useState(0); // Amount user wants to add to wallet

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

  useEffect(() => {
    // Fetch current balance (Simulating with a static value or you can make an API call)
    const fetchBalance = async () => {
      // Simulating fetching the wallet balance
      setBalance(1000); // Replace with an API call to fetch the actual balance
    };

    fetchBalance();
  }, []);

  const payNow = () => {
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK is not loaded. Please try again later.");
      return;
    }

    const paymentAmount = selectedAmount * 100; // Convert to paise

    const options = {
      key: 'rzp_test_nzmqxQYhvCH9rD', // Your Razorpay test key
      amount: paymentAmount,
      currency: 'INR',
      name: 'E-commerce by Transmogrify',
      description: 'Wallet Recharge',
      handler: async (response) => {
        alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);

        // After payment, update wallet balance and navigate back to payment page
        setBalance(prevBalance => prevBalance + selectedAmount);

        // Assuming you have an API to update the wallet balance on the server
        try {
          // Update wallet balance and order details
          await axios.post('http://localhost:5000/wallet/update', {
            userId: orderPayload.userId, // Pass userId from orderPayload
            amount: selectedAmount,
          });

          // Proceed to place the order on the Payment page after successful wallet recharge
          navigate('/payment-success', { state: { orderPayload } });

        } catch (error) {
          alert('Error updating wallet balance.');
          console.error('Error updating wallet:', error);
        }
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
      </div>
    </div>
  );
};

export default WalletPage;



//the above jsx code is perfectly fine, but i want the exact sam edesign like amazon wallet or something like that so give me a good design and structure not image