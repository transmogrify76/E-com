import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState(''); // State for name
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:5000/roles');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        const filteredRoles = data.filter(role => role.name.toLowerCase() !== 'seller');
        setRoles(filteredRoles);
      } catch (error) {
        console.error('Error fetching roles:', error.message);
        setError('Failed to load roles. Please try again later.');
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!role) {
      setError('Please select a role');
      return;
    }

    const payload = {
      username,
      password,
      email,
      name, // Include name
      phoneNumber, // Include phone number
      role: role === '1' ? 'Admin' : 'User',
    };

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
        navigate('/login');
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
                  padding: '13px',
                  width: '70%'
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

            <div className="input">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  margin: '10px 0px',
                  padding: '13px',
                  width: '70%'
                }}
                required
              />
            </div>

            <div className="input">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{
                  margin: '10px 0px',
                  padding: '13px',
                  width: '70%'
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
                  width: '70%'
                }}
                required
              />
            </div>

            <div className="input">
              <select
                value={role}
                onChange={handleChange}
                style={{
                  margin: '10px 0px',
                  padding: '13px',
                  width: '80%'
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

            {error && <p className="error-message">{error}</p>}

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
