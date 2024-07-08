// import necessary modules and components
import React, { useState, useEffect } from 'react';
import './Accounts.css';

const MyAccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Simulated useEffect to fetch user data (mocking API call)
  useEffect(() => {
    // Simulating fetching user data
    const fetchUserData = () => {
      // Simulated delay to mimic API call
      setTimeout(() => {
        const userData = {
          name: 'Esha Ghosal',
          email: 'eshaghosal@gmail.com',
          address: 'Kolkata,India',
          phoneNumber: '1234512345',
        };
        setUserData(userData);
        setLoading(false);
      }, 1000); // Simulated 1 second delay
    };

    fetchUserData();
  }, []); // Empty dependency array to run effect only once on mount

  const handleLogout = () => {
    // Simulate logging out by resetting user data and setting loading state
    setUserData(null);
    setLoading(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-account-container">
      <h4 className="my-account-title">My Account</h4>
      <div className="user-info-section">
        <h3>User Information</h3>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Address:</strong> {userData.address}</p>
        <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
      </div>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default MyAccountPage;
