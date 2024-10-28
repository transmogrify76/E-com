import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css'; 

const SellerAccountPage = () => {
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      const sellerId = localStorage.getItem('sellerId'); 
      const accessToken = localStorage.getItem('accessToken'); 

      if (!sellerId || !accessToken) {
        console.error('Seller ID or access token not found');
        navigate('/login'); 
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/sellers/${sellerId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}` 
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching seller data: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setSellerData(data);
        setLoading(false); 
      } catch (error) {
        setError(error.message);
        setLoading(false); 
        console.error('Error fetching seller data:', error);
      }
    };

    fetchSellerData();
  }, [navigate]);
  if (loading) return <p>Loading...</p>; 

  if (error) return <p>Error: {error}</p>; 

  return (
    <div className="seller-account-page">
      <h2>Seller Account</h2>

      <section className="account-section">
        <h5>Personal Information</h5>
        <div className="user-info-section">
          <p><strong>Name:</strong> {sellerData.name || 'N/A'}</p>
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
          <p><strong>contact Person :</strong> {sellerData.contactPerson || 'N/A'}</p>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountPage;
