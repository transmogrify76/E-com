import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WholesaleUserForgetPassword.css'; // Import the corresponding CSS file

const WholesaleUserForgetPassword = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // API call to send password reset link
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setSuccess(true); // Set success message if the response is successful

        } catch (error) {
            console.error('Password reset error:', error);
            setError(error.message); // Display error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forget-password-container">
            <div className="forget-password-card">
                <div className="forget-password-header">
                    <h2>Forgot Password</h2>
                </div>
                <div className="forget-password-body">
                    {!success ? (
                        <form onSubmit={handlePasswordReset}>
                            <div className="forget-password-input">
                                <input
                                    type="text"
                                    placeholder="Enter Username or Email"
                                    value={usernameOrEmail}
                                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="forget-password-submit">
                                <button
                                    type="submit"
                                    className="forget-password-button"
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Reset Password'}
                                </button>
                            </div>

                            {error && <p className="forget-password-error">{error}</p>}
                        </form>
                    ) : (
                        <p className="forget-password-success">Password reset link sent successfully. Please check your email.</p>
                    )}

                    <div className="go-back-link">
                        <Link to="/wholesaleuser-login">Back to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WholesaleUserForgetPassword;
