import React, { useState, useEffect } from 'react';
import './Accounts.css'

const MyAccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated useEffect to fetch user data (mocking API call)
  useEffect(() => {
    // Simulating fetching user data
    const fetchUserData = () => {
      // Simulated delay to mimic API call
      setTimeout(() => {
        const userData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          address: '123 Main St, City, Country',
          phoneNumber: '123-456-7890',
          orders: [
            { id: 1, date: '2024-06-01', total: 50.0 },
            { id: 2, date: '2024-06-05', total: 80.0 },
          ],
        };
        setUserData(userData);
        setLoading(false);
      }, 1000); // Simulated 1 second delay
    };

    fetchUserData();
  }, []); // Empty dependency array to run effect only once on mount

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
    </div>
  );
};

export default MyAccountPage;
