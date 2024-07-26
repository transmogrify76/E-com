
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add the no-scroll class to the body when this component mounts
    document.body.classList.add('no-scroll');
    
    // Clean up by removing the no-scroll class when this component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      username,
      password,
      role,
    };

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store the refresh token and access token in localStorage
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);

      // Handle successful login
      console.log('Login successful:', data);
      navigate('/dashboard'); // Redirect to a protected route after login
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('http://localhost:3000/users/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to refresh token');
    }

    localStorage.setItem('accessToken', data.accessToken);

    return data.accessToken;
  };

  const fetchWithToken = async (url, options = {}) => {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      accessToken = await refreshToken();
    }

    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`
    };

    let response = await fetch(url, options);

    if (response.status === 401) {
      accessToken = await refreshToken();
      options.headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    }

    return response;
  };

  return (
    <div className='background-image'>
      <div className='card-login' style={{ padding: 0, marginRight: '40%' }}>
        <div className="card-header-login">
          <h2>Login</h2>
        </div>
        <div className="card-body-login">
          <form onSubmit={handleLogin}>
            <div className="input">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width:'80%'
                }}
                required
              />
            </div>
            <div className="input">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width:'80%'
                }}
                required
              >
                <option value="" disabled>Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <div className="submit-container">
              <button
                type="submit"
                className="submit"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="forgot-password">
              <Link to="/forgetpassword">Forgot password? Click here</Link>
            </div>
            <div className="signup-link">
              <span>Don't have an account? </span>
              <Link to="/signup" className="signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
