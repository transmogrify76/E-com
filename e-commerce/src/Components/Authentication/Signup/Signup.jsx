import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]); // Keep this line
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:5000/roles'); // Fetching roles
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Filter out roles named 'seller'
        const filteredRoles = data.filter(role => role.name.toLowerCase() !== 'seller');
        setRoles(filteredRoles); // Set filtered roles
      } catch (error) {
        console.error('Error fetching roles:', error.message);
        setError('Failed to load roles. Please try again later.'); // Set error message
      }
    };

    fetchRoles(); // Call fetch function
  }, []); // No need to include setRoles here

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if role is selected
    if (!role) {
      setError('Please select a role');
      return;
    }

    // Prepare the payload based on role selection
    const payload = {
      username,
      password,
      email,
      role: role === '1' ? 'Admin' : 'User',  // Always include email for both roles
    };

    // Determine endpoint based on role
    const endpoint = role === '1' ? 'http://localhost:5000/admin' : 'http://localhost:5000/user/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Redirect to login page on success
        navigate('/login');
      } else {
        const data = await response.json();
        console.error('Registration failed:', data);
        setError(data.message || 'Registration failed. Please try again.'); // Handle error responses
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred during registration. Please try again.'); // Handle network errors
    }
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className='background-image'>
      <div className='card-login' style={{ padding: 0, marginRight: '40%' }}>
        <div className="header_Signup">
          <h2>Signup</h2>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  margin: '10px 0px',
                  padding:'13px',
                  width:'70%'
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
                  borderRadius: '5px', // Add border radius here
                  border: '1px solid ', // Optional: Add border for better visibility
                }}
                required
              />
            </div>

            {/* Email input for both Admin and User roles */}
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  margin: '10px 0px',
                  padding:'13px',
                  width:'70%'
                }}
                required // Make email required for both roles
              />
            </div>

            <div className="input">
              <select
                value={role}
                onChange={handleChange}
                style={{
                  margin: '10px 0px',
                  padding:'13px',
                  width:'80%'
                }}
                required
              >
                <option disabled value="">
                  Select Role
                </option>
                {roles.map((roleItem) => (
                  <option key={roleItem.id} value={roleItem.id}>
                    {roleItem.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="error-message">{error}</p>} {/* Show error message */}

            <div className="submit-container">
              <button type="submit" className="submit">Signup</button>
            </div>

            <div className="login-link">
              <span>Already have an account? </span>
              <Link to="/login" className="login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
