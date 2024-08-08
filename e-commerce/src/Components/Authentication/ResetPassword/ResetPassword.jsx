import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // Basic validation
        if (!otp || !newPassword) {
            setMessage('Please enter both OTP and new password.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                otp,
                newPassword,
            };

            console.log('Sending request to server with payload:', payload); // Log request payload

            const response = await axios.post('http://localhost:5000/reset-password', payload, {
                headers: {
                    'Content-Type': 'application/json' // Ensure content type is set
                }
            });

            console.log('Response from server:', response); // Log response

            if (response.status === 200) {
                setMessage('Password reset successfully. Redirecting to login...');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after 2 seconds
                }, 2000);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            if (error.response) {
                // Server responded with a status other than 200
                setMessage(error.response.data.message || 'Failed to reset password. Please try again.');
            } else if (error.request) {
                // No response was received from the server
                console.error('No response from server:', error.request);
                setMessage('No response from server. Please check your connection or if the server is running.');
            } else {
                // Something happened in setting up the request
                setMessage('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='background-image'>
            <div className='reset-password-container'>
                <div className='reset-password-card' style={{ padding: 0, marginRight: '40%' }}>
                    <div className='card-header-reset'>
                        Reset Your Password
                    </div>
                    <div className="card-body-reset">
                        <div className='input-group-reset'>
                            <label htmlFor='otp'>OTP:</label>
                            <input
                                type='text'
                                id='otp'
                                placeholder='Enter OTP'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className='input-group-reset'>
                            <label htmlFor='new-password'>New Password:</label>
                            <input
                                type='password'
                                id='new-password'
                                placeholder='Enter new password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                        {message && <div className='message'>{message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
