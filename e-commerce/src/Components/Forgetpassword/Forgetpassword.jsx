import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forgetpassword.css';
import emailIcon from '../Assests/email.png';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = () => {
        setMessage(`Password reset instructions have been sent to ${email}`);
    };

    return (
        <div className='background-image'>
          <div className='card' style={{ padding: 0, fontSize: '16px' }}>
 


                <div className="card-header">
                    Forget Password
                    </div>
                    <div className="card-body">
                    <div className="inputs">
                        <div className="input">
                      
          <img src={emailIcon} alt="Email Icon" />
 

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
            </div>
        
    );
};

export default ForgetPassword;
