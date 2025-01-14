import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WholesaleUserSignup.css';

const WholesaleUserSignup = () => {
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); // State for name
  // State for phone number (though not used in payload)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_KEY = "c9p6Ivm8L4o7WII11PpKYSakefsXrfPqsviGzReDk79lom68Rx4Sg1ev7ckrdiHp7Tsh5iwSQ5SxFxJujlW1Qg";

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
   // Include username if needed for registration
      password,
      email,
      name, // Include name
     // Include phone number if needed
    };

    const endpoint = `${process.env.REACT_APP_BASE_URL}/user-creation`; // Use the correct API endpoint

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`, // Sending the API key in the header
        },
        body: JSON.stringify(payload),
        mode: 'no-cors', // This disables CORS, but this won't let you access the response
      });

      // Handling the response
      if (response.ok) {
        navigate('/wholesaleuser-login'); // Redirect to login on success
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

  return (
    <div className="background-image">
      <div className="card-login" style={{ padding: 0, marginRight: '40%' }}>
        <div className="header_Signup">
          <h2>Signup</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                margin: '10px 0px',
                padding: '13px',
                width: '70%',
              }}
              required
            />
          </div>

          <div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                margin: '10px 0px',
                padding: '13px',
                width: '70%',
              }}
              required
            />
          </div>

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

          {error && <p className="error-message">{error}</p>}

          <div className="submit-container">
            <button type="submit" className="submit">
              Signup
            </button>
          </div>

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
