// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './WholesaleUserForgetPassword.css'; // Import the corresponding CSS file

// const WholesaleUserForgetPassword = () => {
//     const [usernameOrEmail, setUsernameOrEmail] = useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState(false);
//     const navigate = useNavigate();

//     const handlePasswordReset = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
//         setSuccess(false);

//         try {
//             // API call to send password reset link
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/forgot-password`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ usernameOrEmail }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Something went wrong');
//             }

//             setSuccess(true); // Set success message if the response is successful

//         } catch (error) {
//             console.error('Password reset error:', error);
//             setError(error.message); // Display error message
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="forget-password-container">
//             <div className="forget-password-card">
//                 <div className="forget-password-header">
//                     <h2>Forgot Password</h2>
//                 </div>
//                 <div className="forget-password-body">
//                     {!success ? (
//                         <form onSubmit={handlePasswordReset}>
//                             <div className="forget-password-input">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Username or Email"
//                                     value={usernameOrEmail}
//                                     onChange={(e) => setUsernameOrEmail(e.target.value)}
//                                     required
//                                 />
//                             </div>

//                             <div className="forget-password-submit">
//                                 <button
//                                     type="submit"
//                                     className="forget-password-button"
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Loading...' : 'Reset Password'}
//                                 </button>
//                             </div>

//                             {error && <p className="forget-password-error">{error}</p>}
//                         </form>
//                     ) : (
//                         <p className="forget-password-success">Password reset link sent successfully. Please check your email.</p>
//                     )}

//                     <div className="go-back-link">
//                         <Link to="/wholesaleuser-login">Back to Login</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WholesaleUserForgetPassword;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const WholesaleForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP and New Password input
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // React Router v6, useNavigate instead of useHistory

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     // API request to send OTP for password reset
//     try {
//       const response = await fetch('http://localhost:3696/auth/request-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           otpType: 'PasswordReset', // Type for password reset
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStep(2);  // Move to OTP and New Password input step
//         setMessage('An OTP has been sent to your email.');
//       } else {
//         setError(data.message || 'Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       setError('An error occurred while requesting OTP. Please try again.');
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     // API request to verify OTP and reset password
//     try {
//       const response = await fetch('http://localhost:3696/auth/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           otp: otp,
//           newPassword: newPassword,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Password has been reset successfully.');
//         setTimeout(() => {
//           navigate('/wholesaleuser-login'); // Redirect to login page after successful password reset
//         }, 2000); // Wait for 2 seconds before redirecting
//       } else {
//         setError(data.message || 'Failed to reset password. Please try again.');
//       }
//     } catch (error) {
//       setError('An error occurred while resetting the password. Please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
//       <div style={styles.card}>
//         {/* Forgot Password Heading */}
//         <h2 style={styles.heading}>Forgot Password</h2>

//         {/* Step 1: Enter email */}
//         {step === 1 && (
//           <form onSubmit={handleEmailSubmit}>
//             <div style={styles.inputField}>
//               <label style={styles.label}>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//                 style={styles.input}
//               />
//             </div>
//             <button type="submit" style={styles.button}>Send OTP</button>
//           </form>
//         )}

//         {/* Step 2: Enter OTP and New Password */}
//         {step === 2 && (
//           <form onSubmit={handleOtpSubmit}>
//             <div style={styles.inputField}>
//               <label style={styles.label}>OTP</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter OTP"
//                 required
//                 style={styles.input}
//               />
//             </div>

//             <div style={styles.inputField}>
//               <label style={styles.label}>New Password</label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 placeholder="Enter your new password"
//                 required
//                 style={styles.input}
//               />
//             </div>
//             <button type="submit" style={styles.button}>Reset Password</button>
//           </form>
//         )}

//         {/* Error or success messages */}
//         {error && <p style={styles.errorMessage}>{error}</p>}
//         {message && <p style={styles.successMessage}>{message}</p>}

//         {/* Back to login link */}
//         <p style={styles.backToLogin}>
//           <a href="/wholesaleuser-login" style={styles.backToLoginLink}>Back to Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     backgroundColor: 'white',
//     padding: '2rem',
//     borderRadius: '10px',
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//     maxWidth: '420px',
//     width: '100%',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   },
//   heading: {
//     textAlign: 'center',
//     fontSize: '1.8rem',
//     fontWeight: 'bold',
//     color: 'white',
//     backgroundColor: '#4CAF50',
//     padding: '1rem',
//     margin: '0 0 1rem 0',
//     borderRadius: '10px 10px 0 0',
//   },
//   inputField: {
//     marginBottom: '1.5rem',
//   },
//   label: {
//     display: 'block',
//     fontSize: '1rem',
//     color: '#333',
//     marginBottom: '0.5rem',
//   },
//   input: {
//     width: '100%',
//     padding: '0.9rem',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     fontSize: '1rem',
//     boxSizing: 'border-box',
//     transition: 'border-color 0.3s ease',
//   },
//   button: {
//     width: '100%',
//     padding: '1rem',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '1.1rem',
//     cursor: 'pointer',
//     marginTop: '1rem',
//     transition: 'background-color 0.3s ease',
//   },
//   errorMessage: {
//     color: '#e74c3c',
//     fontSize: '0.9rem',
//     marginTop: '1rem',
//     textAlign: 'center',
//   },
//   successMessage: {
//     color: '#2ecc71',
//     fontSize: '0.9rem',
//     marginTop: '1rem',
//     textAlign: 'center',
//   },
//   backToLogin: {
//     textAlign: 'center',
//     marginTop: '1.5rem',
//   },
//   backToLoginLink: {
//     color: '#4CAF50',
//     textDecoration: 'none',
//     fontSize: '1rem',
//   },
// };

// export default WholesaleForgotPassword;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WholesaleUserForgetPassword.css'; // Import the custom CSS file

const WholesaleUserForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP and New Password input
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3696/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otpType: 'PasswordReset',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
        setMessage('An OTP has been sent to your email.');
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while requesting OTP. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3696/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password has been reset successfully.');
        setTimeout(() => {
          navigate('/wholesaleuser-login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while resetting the password. Please try again.');
    }
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-card">
      <div className='card-login' style={{ padding: 0, fontSize: '16px', marginRight: '40%' }}>
                <div className="card-header-login">
                    Forget Password
                </div>
</div>
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="forget-password-body">
            <div className="forget-password-input">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="forget-password-submit">
              <button type="submit" className="forget-password-button">
                Send OTP
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Enter OTP and New Password */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="forget-password-body">
            <div className="forget-password-input">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>
            <div className="forget-password-input">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="forget-password-submit">
              <button type="submit" className="forget-password-button">
                Reset Password
              </button>
            </div>
          </form>
        )}

        {/* Error and Success Messages */}
        {error && <div className="forget-password-error">{error}</div>}
        {message && <div className="forget-password-success">{message}</div>}

        {/* Go back link */}
        <div className="go-back-link">
          <a href="/wholesaleuser-login">Back to Login</a>
        </div>
      </div>
    </div>
   
  );
};

export default WholesaleUserForgetPassword;
