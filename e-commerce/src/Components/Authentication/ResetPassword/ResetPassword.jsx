import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ResetPassword.css';

const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!otp || !newPassword) {
            toast.error('Please enter both OTP and new password.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                otp,
                newPassword,
            };

            const response = await axios.post('http://localhost:5000/reset-password', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Log the response for debugging
            console.log('Response from server:', response);

            // Check if the response indicates success
            if (response.status === 201) {
                toast.success('Password reset successfully!');
                // Redirect to login page after a successful reset
                navigate("/login")
                setTimeout(() => {
                    navigate("/login")
                  
                }, 2000); // Optional delay for user experience
            } else {
                // Handle cases where the server responds but it's not a success
                toast.error(response.data?.message || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
          console.log(error)
            if (error.response) {
                // Check if there's a response from the server
                toast.error(error.response.data?.message || 'Failed to reset password. Please try again.');
            } else {
                // If there's no response from the server
                toast.error('An error occurred. Please try again later.');
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
                    <form onSubmit={handleSubmit} className="card-body-reset">
                        <div className='input-group-reset'>
                            <label htmlFor='otp'>OTP:</label>
                            <input
                                type='text'
                                id='otp'
                                placeholder='Enter OTP'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={{
                                    margin: '10px 0px',
                                    padding: '13px',
                                    width: '70%',
                                }}
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
                                style={{
                                    margin: '10px 0px',
                                    padding: '13px',
                                    width: '70%',
                                }}
                            />
                        </div>
                        <button 
                            type="submit" // Ensure button type is submit
                            disabled={loading} 
                            style={{
                                padding: '10px 20px',
                                backgroundColor: loading ? '#ccc' : '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                marginTop: '10px',
                            }}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                    <ToastContainer 
                        position="top-center" 
                        autoClose={5000} 
                        hideProgressBar={false} 
                        closeOnClick 
                        pauseOnHover 
                        draggable 
                        pauseOnFocusLoss 
                    />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
