
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      username,
      email,
      password,
      fullname,
      address,
      phoneNo,
      role,
    };

    try {
      const response = await fetch('http://localhost:3000/users/register', {
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
        console.error('Registration failed.');
        // Optionally, handle error responses here
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '80%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="number"
                placeholder="Phone No"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
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
