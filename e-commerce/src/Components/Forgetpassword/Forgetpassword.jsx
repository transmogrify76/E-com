import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Forgetpassword.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpMessage, setOtpMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = () => {
        // Display the OTP pop-up
        setShowOtpPopup(true);
        setMessage(`Password reset instructions have been sent to ${email}`);
    };

    const handleOtpSubmit = () => {
        // For simplicity, consider any OTP as valid
        // Replace this logic with actual OTP validation
        if (otp) {
            setOtpMessage('OTP verified successfully.');
            // Redirect to reset password page
            navigate('/resetpassword');
        } else {
            setOtpMessage('Please enter a valid OTP.');
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

            {/* OTP Popup */}
            {showOtpPopup && (
                <div className="otp-popup">
                    <div className="otp-popup-content">
                        <h3> Please Enter OTP</h3>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={handleOtpSubmit}>Submit</button>
                        {otpMessage && <div className="otp-message">{otpMessage}</div>}
                        <button className="close-popup" onClick={() => setShowOtpPopup(false)}></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgetPassword;
