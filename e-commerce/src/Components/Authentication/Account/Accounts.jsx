import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Accounts.css'; // Ensure this path is correct

const UserAccountPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
      const accessToken = localStorage.getItem('accessToken'); // Retrieve the token

      if (!userId || !accessToken) {
        console.error('User ID or access token not found');
        navigate('/login'); // Redirect to login if no user ID or token found
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Pass token for authorization
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching user data: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false); // Data has been successfully fetched

      } catch (error) {
        setError(error.message);
        setLoading(false); // Data fetching has finished with an error
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <p>Loading...</p>; // Show loading state while fetching

  if (error) return <p>Error: {error}</p>; // Show error message if something goes wrong

  return (
    <div className="user-account-page">
      <h2>User Account</h2>

      <section className="account-section">
        <h5>Personal Information</h5>
        <div className="user-info-section">
          <p><strong>Name:</strong> {userData.name || 'N/A'}</p>
          <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
          {/* <p><strong>Address:</strong> {userData.address || 'N/A'}</p> */}
          <p><strong>Phone Number:</strong> {userData.phoneNumber || 'N/A'}</p>
        </div>
      </section>

      {/* Add more sections if needed */}
    </div>
  );
};

export default UserAccountPage;
