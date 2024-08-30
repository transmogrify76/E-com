import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css'; // Import your CSS

const SellerAccountPage = () => {
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      const sellerId = localStorage.getItem('sellerId'); // Retrieve seller ID from local storage
      const accessToken = localStorage.getItem('accessToken'); // Retrieve the token

      if (!sellerId || !accessToken) {
        console.error('Seller ID or access token not found');
        navigate('/login'); // Redirect to login if no seller ID or token found
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/user/sellers/${sellerId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Pass token for authorization
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching seller data: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setSellerData(data);
        setLoading(false); // Data has been successfully fetched

      } catch (error) {
        setError(error.message);
        setLoading(false); // Data fetching has finished with an error
        console.error('Error fetching seller data:', error);
      }
    };

    fetchSellerData();
  }, [navigate]);

  if (loading) return <p>Loading...</p>; // Show loading state while fetching

  if (error) return <p>Error: {error}</p>; // Show error message if something goes wrong

  return (
    <div className="seller-account-page">
      <h2>Seller Account</h2>

      <section className="account-section">
        <h5>Personal Information</h5>
        <div className="user-info-section">
          <p><strong>Name:</strong> {sellerData.contactPerson || 'N/A'}</p>
          <p><strong>Email:</strong> {sellerData.email || 'N/A'}</p>
          <p><strong>Address:</strong> {sellerData.address || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {sellerData.phoneNumber || 'N/A'}</p>
        </div>
      </section>

      <section className="account-section">
        <h5>Store Information</h5>
        <div className="user-info-section">
          <p><strong>Store Name:</strong> {sellerData.companyName || 'N/A'}</p>
          <p><strong>Store Description:</strong> {sellerData.description || 'N/A'}</p>
        </div>
      </section>

      {/* Add more sections as needed */}
    </div>
  );
};

export default SellerAccountPage;
