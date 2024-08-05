// import React, { useState, useEffect } from 'react';
// import './Accounts.css';
// import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';

// const MyAccountPage = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   // Simulated useEffect to fetch user data (mocking API call)
//   useEffect(() => {
//     // Simulating fetching user data
//     const fetchUserData = () => {
//       // Simulated delay to mimic API call
//       setTimeout(() => {
//         const userData = {
//           name: 'Esha Ghosal',
//           email: 'eshaghosal@gmail.com',
//           address: 'Kolkata,India',
//           phoneNumber: '1234512345',
//         };
//         setUserData(userData);
//         setLoading(false);
//       }, 1000); // Simulated 1 second delay
//     };

//     fetchUserData();
//   }, []); // Empty dependency array to run effect only once on mount

//   const handleLogout = () => {
//     setShowModal(true);
//   };

//   const confirmLogout = () => {
//     // Perform logout actions here if needed
//     localStorage.removeItem('authToken'); // Clearing authentication token

//     // Redirect to login page or perform any other action after logout
//     // For simplicity, let's just reload the page
//     window.location.reload();
//   };

//   const cancelLogout = () => {
//     setShowModal(false);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="my-account-container">
//       <h4 className="my-account-title">My Account</h4>

//       {/* Personal Information Section */}
//       <section className="account-section">
//         <h5>Personal Information</h5>
//         <div className="user-info-section">
//           <p><strong>Name:</strong> {userData.name}</p>
//           <p><strong>Email:</strong> {userData.email}</p>
//           <p><strong>Address:</strong> {userData.address}</p>
//           <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
//         </div>
//       </section>

//       {/* Payment Modes Section */}
//       <section className="account-section">
//         <h5>Payment Modes</h5>
//         <div className="payment-info-section">
//           <div className="payment-mode">
//             <h6><strong>Card</strong></h6>
//             {/* Card details or settings can be added here */}
//             <p>Card ending in XXXX</p>
//             <p>Expiry: MM/YYYY</p>
//           </div>
//           <div className="payment-mode">
//             <h6><strong>UPI</strong></h6>
//             {/* UPI details or settings can be added here */}
//             <p>Linked UPI ID: example@upi</p>
//           </div>
//         </div>
//       </section>

//       <section className="account-section">
//         <h5>Refund</h5>
//         <div className="refund-info-section">
//           <div className="refund-mode">
//             <h6><strong>Account number</strong></h6>
//             {/* Card details or settings can be added here */}
//             <p> Account number ending in XXXX</p>
//             <p>IFSC : XXXXXXX</p>
//           </div>
//           <div className="payment-mode">
//             <h6><strong>UPI</strong></h6>
//             {/* UPI details or settings can be added here */}
//             <p>Linked UPI ID: example@upi</p>
//           </div>
//         </div>
//       </section>

//       {/* Activity Section */}
//       <section className="account-section">
//         <h5>Activity</h5>
//         <div className="activity-section">
//           <div className="activity-item">
//             <h6><strong>Orders</strong></h6>
//             {/* Orders details or settings can be added here */}
//             <p>View recent orders and track shipments.</p>
//           </div>
//           <div className="activity-item">
//             <h6><strong>Wishlist</strong></h6>
//             {/* Wishlist details or settings can be added here */}
//             <p>Manage your saved items for future purchase.</p>
//           </div>
//         </div>
//       </section>

//       {/* Logout button */}
//       <button onClick={handleLogout}>Logouttttttttt</button>

//       {/* Confirmation Modal */}
//       {showModal && (
//         <ConfirmationModal
//           message="Are you sure you want to logout?"
//           onConfirm={confirmLogout}
//           onCancel={cancelLogout}
//         />
//       )}
//     </div>
//   );
// };

// export default MyAccountPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Accounts.css';

const MyAccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated fetching user data
    const fetchUserData = () => {
      setTimeout(() => {
        const userData = {
          name: 'Esha Ghosal',
          email: 'eshaghosal@gmail.com',
          address: 'Kolkata, India',
          phoneNumber: '1234512345',
        };
        setUserData(userData);
        setLoading(false);
      }, 1000); // Simulated 1-second delay
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('No access token available');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Logout failed:', text);
        throw new Error('Logout failed');
      }

      // Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Redirect to login page after successful logout
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message || error);
    }
  };

  // Display loading message if data is still being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-account-container">
      <h4 className="my-account-title">My Account</h4>

      {/* Personal Information Section */}
      <section className="account-section">
        <h5>Personal Information</h5>
        <div className="user-info-section">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
        </div>
      </section>

      {/* Payment Modes Section */}
      <section className="account-section">
        <h5>Payment Modes</h5>
        <div className="payment-info-section">
          <div className="payment-mode">
            <h6><strong>Card</strong></h6>
            <p>Card ending in XXXX</p>
            <p>Expiry: MM/YYYY</p>
          </div>
          <div className="payment-mode">
            <h6><strong>UPI</strong></h6>
            <p>Linked UPI ID: example@upi</p>
          </div>
        </div>
      </section>

      {/* Refund Section */}
      <section className="account-section">
        <h5>Refund</h5>
        <div className="refund-info-section">
          <div className="refund-mode">
            <h6><strong>Account number</strong></h6>
            <p>Account number ending in XXXX</p>
            <p>IFSC: XXXXXXX</p>
          </div>
          <div className="payment-mode">
            <h6><strong>UPI</strong></h6>
            <p>Linked UPI ID: example@upi</p>
          </div>
        </div>
      </section>

      {/* Activity Section */}
      <section className="account-section">
        <h5>Activity</h5>
        <div className="activity-section">
          <div className="activity-item">
            <h6><strong>Orders</strong></h6>
            <p>View recent orders and track shipments.</p>
          </div>
          <div className="activity-item">
            <h6><strong>Wishlist</strong></h6>
            <p>Manage your saved items for future purchase.</p>
          </div>
        </div>
      </section>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MyAccountPage;
