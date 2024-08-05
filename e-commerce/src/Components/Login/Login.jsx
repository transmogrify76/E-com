import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    // Constructing the payload according to your API
    const payload = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check the response and parse JSON
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Log the full response for debugging
      console.log('Login response:', data);

      // Store the refresh token and access token in localStorage
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);

      // Check user role and redirect accordingly
      const userRole = data.role; // Ensure this matches your API response structure

      console.log('User role:', userRole); // Log user role for debugging

      if (userRole === 'admin') {
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/dashboard'); // Redirect to user dashboard
      }

      // Handle successful login
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
                  width: '80%',
                }}
                required
              />
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
