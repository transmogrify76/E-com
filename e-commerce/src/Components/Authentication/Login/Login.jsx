import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
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
            
            let response;
            if (username === 'adminuser') {
        
                response = await fetch('http://localhost:5000/admin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                
                response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            const data = await response.json();

            
            console.log('Response from server:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            
            localStorage.setItem('accessToken', data.access_token); 

            
            const decodedToken = jwtDecode(data.access_token);
            const userId = decodedToken.sub; 
            const userUsername = decodedToken.username; 
            const userRole = decodedToken.role; 
            localStorage.setItem('userId', userId);
            if (userRole === 'Admin') {
                navigate('/admin-dashboard'); 
            } else if (userRole === 'Seller') {
                navigate('/seller-dashboard');
            } else {
                navigate('/dashboard', { state: { userId, userUsername } }); 
            }

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
