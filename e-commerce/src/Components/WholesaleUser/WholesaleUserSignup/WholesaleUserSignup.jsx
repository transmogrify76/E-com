import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WholesaleUserSignup.css';

const WholesaleUserSignup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default country code for India
  const [phoneNumber, setPhoneNumber] = useState(''); // For storing the 10-digit phone number
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Buyer'); // Default value: 'Buyer'
  const [profileImage, setProfileImage] = useState(null); // For storing profile image
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:3696/auth/sign-up"; // API URL for user registration

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Combine countryCode and phoneNumber to form a complete phone number
    const fullPhoneNumber = countryCode + phoneNumber;

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', fullPhoneNumber); // Send the combined phone number
    formData.append('password', password);
    formData.append('userType', userType); // Ensure 'userType' is one of ['Seller', 'Buyer']
    if (profileImage) formData.append('profileImage', profileImage);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData, // Sending form data with file
      });

      if (response.ok) {
        // Successful registration
        navigate('/wholesaleuser-login'); // Redirect to login page
      } else {
        const data = await response.json();
        console.error('Registration failed:', data);
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred during registration. Please try again.');
    }
  };

  // Handle phone number input and ensure only 10 digits are entered
  const handlePhoneNumberChange = (e) => {
    // Allow only numeric values and limit input to 10 digits
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10); // Remove non-numeric and limit to 10 digits
    setPhoneNumber(value);
  };

  return (
    <div className="background-image">
      <div className="card-login" style={{ padding: 0, marginRight: '40%' }}>
        <div className="header_Signup">
          <h2>Signup</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ margin: '10px 0px', padding: '13px', width: '70%' }}
              required
            />
          </div>

          {/* Email */}
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ margin: '10px 0px', padding: '13px', width: '70%' }}
              required
            />
          </div>

          {/* Phone Number with Country Code Dropdown inside Input */}
          <div className="input">
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      width: '70%',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginLeft:'60px',
      height:'50px'
    }}
  >
    {/* Country Code Dropdown */}
    <select
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      style={{
        padding: '13px',
        width: '30%', // Width of the dropdown
        borderRadius: '5px 0 0 5px', // Rounded left border
        border: 'none', // Remove individual border of dropdown
      }}
    >
      <option value="+91">+91 (India)</option>
      <option value="+1">+1 (USA)</option>
      <option value="+44">+44 (UK)</option>
      <option value="+61">+61 (Australia)</option>
      {/* Add more countries as needed */}
    </select>

    {/* Phone Number Input */}
    <input
      type="tel"
      placeholder="Phone Number"
      value={phoneNumber}
      onChange={handlePhoneNumberChange} // Handle phone number input
      style={{
        padding: '13px',
        width: '70%', // Width of the phone number input
        borderRadius: '0 5px 5px 0', // Rounded right border
        border: 'none', // Remove individual border of input
      }}
      required
    />
  </div>
</div>

          {/* Password */}
          <div style={{ marginBottom: '15px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                margin: '10px 0px',
                padding: '13px',
                width: '70%',
                borderRadius: '5px',
                border: '1px solid ',
              }}
              required
            />
          </div>

          {/* User Type Dropdown */}
          <div className="input">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              style={{ margin: '10px 0px', padding: '13px', width: '70%' }}
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

          {/* Profile Image Upload */}
          <div className="input">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              style={{ margin: '10px 0px', padding: '10px', width: '70%' }}
            />
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit Button */}
          <div className="submit-container">
            <button type="submit" className="submit">
              Signup
            </button>
          </div>

          {/* Login Link */}
          <div className="login-link">
            <span>Already have an account? </span>
            <Link to="/wholesaleuser-login" className="login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WholesaleUserSignup;
