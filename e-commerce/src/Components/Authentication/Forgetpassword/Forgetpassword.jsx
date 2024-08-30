import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './Forgetpassword.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Handle reset password request
    const handleResetPassword = async () => {
        try {
            // Make API call to request password reset
            const response = await axios.post('http://localhost:5000/forgot-password', { email });

            // Log the full response for debugging
            console.log('Response:', response);

            // Handle response
            if (response.status >= 200 && response.status < 300) {
                // If the request was successful, redirect to the reset password page
                setMessage(`Password reset instructions have been sent to ${email}`);
                // Optionally, you could navigate to a new page here or show a different UI
                navigate('/resetpassword');
            } else {
                setMessage('Failed to send password reset instructions. Please try again.');
            }
        } catch (error) {
            console.error('Error requesting password reset:', error);
            // Check if the error response contains any specific message
            if (error.response) {
                setMessage(error.response.data.message || 'An error occurred while sending password reset instructions. Please try again.');
            } else {
                setMessage('An error occurred. Please check your connection and try again.');
            }
        }
    };

    return (
        <div className='background-image'>
            <div className='card-login' style={{ padding: 0, fontSize: '16px', marginRight: '40%' }}>
                <div className="card-header-login">
                    Forget Password
                </div>
                <div className="card-body-login">
                    <div className="inputs">
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
                            />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className="submit" onClick={handleResetPassword}>Reset Password</button>
                    </div>
                    {message && <div className="message">{message}</div>}
                    <div className="back-to-login">
                        <Link to="/login">Back to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
