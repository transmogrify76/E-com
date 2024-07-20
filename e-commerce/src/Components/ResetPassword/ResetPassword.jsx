import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (newPassword === confirmPassword) {
            // Ideally, send newPassword to the server for update
            setMessage('Password reset successfully.');
            // Redirect to login page or another page
            navigate('/login');
        } else {
            setMessage('Passwords do not match.');
        }
    };

    return (
        <div className='background-image'>
            <div className='reset-password-container'>
                <div className='reset-password-card'>
                    <div className='card-header-reset'>
                        Reset Your Password
                    </div>
                    <div className="card-body-reset">
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
                        <div className='input-group-reset'>
                            <label htmlFor='confirm-password'>Confirm Password:</label>
                            <input
                                type='password'
                                id='confirm-password'
                                placeholder='Confirm new password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSubmit}>Submit</button>
                        {message && <div className='message'>{message}</div>}
                    </div>
                </div>
            </div>
            </div>
       
    );
};

export default ResetPassword;
