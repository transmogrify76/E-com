
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './ForgetPassword.css';

// const ForgetPassword = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [showOtpPopup, setShowOtpPopup] = useState(false);
//     const [otp, setOtp] = useState('');
//     const [otpMessage, setOtpMessage] = useState('');
//     const navigate = useNavigate();

//     const handleResetPassword = () => {
//         // Show OTP popup and simulate sending OTP
//         setShowOtpPopup(true);
//         setMessage(`An OTP has been sent to ${email}`);
//         // In a real application, you would send an OTP to the user's email here
//     };

//     const handleOtpSubmit = () => {
//         // For simplicity, consider any OTP as valid
//         // Replace this logic with actual OTP validation
//         if (otp) {
//             setOtpMessage('OTP verified successfully.');
//             // Redirect to password reset page
//             navigate('/resetpassword');
//         } else {
//             setOtpMessage('Please enter a valid OTP.');
//         }
//     };

//     return (
//         <div className='background-image'>
//             <div className='card-login' style={{ padding: 0, fontSize: '16px', marginRight: '40%' }}>
//                 <div className="card-header-login">
//                     Forget Password
//                 </div>
//                 <div className="card-body-login">
//                     <div className="inputs">
//                         <div className="input">
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="submit-container">
//                         <button className="submit" onClick={handleResetPassword}>Reset Password</button>
//                     </div>
//                     {message && <div className="message">{message}</div>}
//                     <div className="back-to-login">
//                         <Link to="/login">Back to Login</Link>
//                     </div>
//                 </div>
//             </div>

//             {/* OTP Popup */}
//             {showOtpPopup && (
//                 <div className="otp-popup">
//                     <div className="otp-popup-content">
//                         <h3>Enter OTP</h3>
//                         <p>An OTP has been sent to {email}. Please enter it below:</p>
//                         <input
//                             type="text"
//                             placeholder="Enter OTP"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                         />
//                         <button onClick={handleOtpSubmit}>Submit</button>
//                         {otpMessage && <div className="otp-message">{otpMessage}</div>}
//                         <button className="close-popup" onClick={() => setShowOtpPopup(false)}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ForgetPassword;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgetPassword.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpMessage, setOtpMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (showOtpPopup) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showOtpPopup]);

    const handleResetPassword = () => {
        setShowOtpPopup(true);
        setMessage(`An OTP has been sent to ${email}`);
        // In a real application, you would send an OTP to the user's email here
    };

    const handleOtpSubmit = () => {
        if (otp) {
            setOtpMessage('OTP verified successfully.');
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

            {showOtpPopup && (
                <div className="otp-popup">
                    <div className="otp-popup-content">
                        <h3>Enter OTP</h3>
                        <p>An OTP has been sent to {email}. Please enter it below:</p>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={handleOtpSubmit}>Submit</button>
                        {otpMessage && <div className="otp-message">{otpMessage}</div>}
                        <button className="close-popup" onClick={() => setShowOtpPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgetPassword;
