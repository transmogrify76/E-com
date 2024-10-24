import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = { username, password };

        try {
            // Determine the login URL based on user type
            const loginUrl = username === 'adminuser' ? 'http://localhost:5000/admin' : 'http://localhost:5000/login';
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('Response from server:', data); // Debugging line

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Store the access token in localStorage
            localStorage.setItem('accessToken', data.access_token);

            // Decode the JWT token to extract user information
            const decodedToken = jwtDecode(data.access_token);
            const userId = decodedToken.sub; // Extract user ID from token
            const userRole = decodedToken.role; // Extract user role from token

            // Store user ID in localStorage for later use
            localStorage.setItem('userId', userId);

            // If the user is a seller, also store the seller ID
            if (userRole === 'Seller') {
                localStorage.setItem('sellerId', userId); // Store seller ID if applicable
            }

            // Navigate to the appropriate dashboard based on user role
            if (userRole === 'Admin') {
                navigate('/admin-dashboard'); // Redirect to admin dashboard
            } else if (userRole === 'Seller') {
                navigate('/seller-dashboard'); // Redirect to seller dashboard
            } else {
                navigate('/dashboard', { state: { userId } }); // Redirect to user dashboard
            }

        } catch (error) {
            console.error('Login error:', error);
            setError(error.message); // Display error message
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
                                style={{
                                    margin: '10px 0px',
                                    padding: '12px',
                                    width: '70%'
                                }}
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
                                    margin: '10px 0px',
                                    padding: '13px',
                                    width: '70%'
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

