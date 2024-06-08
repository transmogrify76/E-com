import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = () => {
       
        setMessage(`Password reset instructions have been sent to ${email}`);
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Forget Password</div>
                <div className="underline"></div>
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
    );
};

export default ForgetPassword;
