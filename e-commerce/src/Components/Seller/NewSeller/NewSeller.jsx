import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure this package is installed
import './NewSeller.css';

const NewSeller = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    password: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  const [userId, setUserId] = useState(null);
  const [userUsername, setUserUsername] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the token

    if (accessToken) {
      try {
        // Decode the JWT token to get user ID and username
        const decodedToken = jwtDecode(accessToken);
        console.log(decodedToken); // Log the decoded token for debugging

        // Map the decoded token data to state
        setUserId(decodedToken.sub); // Set userId from the 'sub' field in the token
        setUserUsername(decodedToken.username); // Set username from the token
        setUserRole(decodedToken.role); // Set role from the token

        // If the user is already a seller, redirect to the seller dashboard
        if (decodedToken.role === 'Seller') {
          navigate('/seller-dashboard'); // Redirect to seller dashboard
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        navigate('/login'); // Redirect to login if token is invalid
      }
    } else {
      navigate('/login'); // Redirect to login if no token is present
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value // Update form data dynamically
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      id: userId, // Include userId in the payload
      username: userUsername, // Include username in the payload
      roleId: 3, // Assuming this is the default role ID for sellers
      isSeller: true // Default value for isSeller
    };

    try {
      const response = await fetch('http://localhost:5000/user/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Add Authorization header
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Save seller ID in local storage for later use
      localStorage.setItem('sellerId', data.id); // Save the seller ID from the response

      console.log('Seller updated successfully:', data);
      navigate('/seller-dashboard'); // Redirect to the seller dashboard after success

    } catch (error) {
      console.error('Error updating seller:', error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };

  const handleBecomeSellerClick = () => {
    // Check if user role is already seller
    if (userRole === 'Seller') {
      navigate('/seller-dashboard'); // Redirect to seller dashboard if already a seller
    } else {
      // User is not a seller, show signup form
      navigate('/NewSeller'); // Redirect to signup page
    }
  };

  return (
    <div className="new-seller-form-container">
      <h2 style={{ marginLeft: '330px' }}>New Seller Sign Up</h2>
      <p>Username: {userUsername}</p>
      <form className="new-seller-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Company Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter your company description"
            value={formData.description} // Fixed this to the correct variable
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person</label>
          <input
            type="text"
            className="form-control"
            id="contactPerson"
            placeholder="Enter contact person's name"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            className="form-control"
            id="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Become Seller
        </button>
      </form>
      <button className="btn btn-secondary" onClick={handleBecomeSellerClick}>
        Go to Seller Dashboard
      </button>
    </div>
  );
};

export default NewSeller;
