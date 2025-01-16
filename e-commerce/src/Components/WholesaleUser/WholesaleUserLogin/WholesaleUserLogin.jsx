// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [otpData, setOtpData] = useState({
//     otp: '',
//   });

//   const [error, setError] = useState(null);
//   const [showOtpForm, setShowOtpForm] = useState(false); // Toggle OTP form visibility
//   const [userEmail, setUserEmail] = useState(''); // Store user email temporarily
//   const [authToken, setAuthToken] = useState(''); // Store auth token
//   const [isLoading, setIsLoading] = useState(false); // Track login process
//   const navigate = useNavigate(); // To navigate to different routes after login

//   // Handle input changes for both login and OTP form
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'otp') {
//       setOtpData({ ...otpData, otp: value });
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   // Handle form submission for login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null); // Reset error on each attempt

//     try {
//       // Send login request to the backend API
//       const response = await fetch('http://localhost:3696/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData), // Send email and password
//       });

//       if (response.ok) {
//         const token = response.headers.get('Authorization');
//         const userType = response.headers.get('User_Type');
//         const twoFaEnabled = response.headers.get('Two_Factor_Enabled'); // Get 2FA status

//         // If token or userType is missing, display an error message
//         if (!token || !userType) {
//           setError('Token or User Type missing. Please try again.');
//           return;
//         }

//         // Store the JWT token in localStorage for future use
//         localStorage.setItem('token', token); // Store token in localStorage
//         setAuthToken(token); // Store token in state

//         // Handle user type and redirect accordingly if 2FA is not enabled
//         if (twoFaEnabled === 'true') {
//           // If 2FA is enabled, show OTP form
//           setUserEmail(formData.email); // Store the email for OTP verification
//           setShowOtpForm(true); // Show OTP input form
//         } else {
//           // If 2FA is not enabled, navigate directly based on userType
//           if (userType === 'Buyer') {
//             navigate('/wholesale-dashboard'); // Redirect to the buyer dashboard
//           } else if (userType === 'Seller') {
//             navigate('/seller-dashboard'); // Redirect to the seller dashboard
//           } else {
//             setError('Invalid user type');
//           }
//         }
//       } else if (response.status === 307) {
//         // If status code is 307, show OTP form for verification
//         setUserEmail(formData.email); // Store the email for OTP verification
//         setShowOtpForm(true); // Show OTP input form
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setError(error.message || 'Login failed. Please try again.');
//     } finally {
//       setIsLoading(false); // Set loading to false when the request is complete
//     }
//   };

//   // Handle OTP submission and verification
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null); // Reset error message

//     try {
//       const token = localStorage.getItem('token'); // Get token from localStorage if present

//       const response = await fetch('http://localhost:3696/auth/verify-2fa-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token, // Send token in header for 2FA verification
//         },
//         body: JSON.stringify({
//           otp: otpData.otp,
//           email: userEmail, // Pass the email from login form
//         }),
//       });

//       if (response.ok) {
//         // OTP verification successful
//         const data = await response.json();
//         alert(data.message || 'OTP verified successfully');

//         const newToken = response.headers.get('Authorization'); // Get new token after OTP verification
//         if (newToken) {
//           // Store the new token in localStorage
//           localStorage.setItem('token', newToken);
//           setAuthToken(newToken); // Update token state
//         }

//         // Get userType from the response headers and redirect accordingly
//         const userType = response.headers.get('User_Type');
//         if (userType === 'Buyer') {
//           navigate('/buyer-dashboard'); // Redirect to the buyer dashboard
//         } else if (userType === 'Seller') {
//           navigate('/seller-dashboard'); // Redirect to the seller dashboard
//         }
//       } else {
//         const data = await response.json();
//         setError(data.message || 'OTP verification failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during OTP verification:', error);
//       setError(error.message || 'An error occurred while verifying OTP');
//     } finally {
//       setIsLoading(false); // Set loading to false when the request is complete
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//         <div className="bg-teal-600 text-white py-4 mb-6 rounded-t-lg">
//           <h2 className="text-3xl font-bold text-center">Login</h2>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full p-3 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full p-3 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           {error && <div className="text-red-500 mb-4">{error}</div>}
//           <button
//             type="submit"
//             className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700"
//             style={{ width: '100px', marginLeft: '160px' }}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//           <p className="text-gray-500 text-sm mt-4 text-center">
//             Don't have an account? <a href="/signup" className="text-teal-600">Sign Up</a>
//           </p>
//           <p className="text-gray-500 text-sm mt-4 text-center">
//             <Link to="/forgot-password" className="text-teal-600">Forgot Password?</Link>
//           </p>
//         </form>

//         {showOtpForm && (
//           <div className="otp-form mt-4">
//             <h3 className="text-xl font-semibold">Enter OTP</h3>
//             <form onSubmit={handleOtpSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700">OTP</label>
//                 <input
//                   type="text"
//                   name="otp"
//                   value={otpData.otp}
//                   onChange={handleChange}
//                   placeholder="Enter OTP"
//                   className="w-full p-3 border border-gray-300 rounded"
//                   maxLength={6}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700"
//                 style={{ width: '200px', marginLeft: '300px' }}
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './WholesaleUserLogin.css'; // Import your custom CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [otpData, setOtpData] = useState({
    otp: '',
  });

  const [error, setError] = useState(null);
  const [showOtpForm, setShowOtpForm] = useState(false); // Toggle OTP form visibility
  const [userEmail, setUserEmail] = useState(''); // Store user email temporarily
  const [authToken, setAuthToken] = useState(''); // Store auth token
  const [isLoading, setIsLoading] = useState(false); // Track login process
  const navigate = useNavigate(); // To navigate to different routes after login

  // Handle input changes for both login and OTP form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'otp') {
      setOtpData({ ...otpData, otp: value });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error on each attempt

    try {
      // Send login request to the backend API
      const response = await fetch('http://localhost:3696/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send email and password
      });

      if (response.ok) {
        const token = response.headers.get('Authorization');
        const userType = response.headers.get('User_Type');
        const twoFaEnabled = response.headers.get('Two_Factor_Enabled'); // Get 2FA status

        // If token or userType is missing, display an error message
        if (!token || !userType) {
          setError('Token or User Type missing. Please try again.');
          return;
        }

        // Store the JWT token in localStorage for future use
        localStorage.setItem('token', token); // Store token in localStorage
        setAuthToken(token); // Store token in state

        // Handle user type and redirect accordingly if 2FA is not enabled
        if (twoFaEnabled === 'true') {
          // If 2FA is enabled, show OTP form
          setUserEmail(formData.email); // Store the email for OTP verification
          setShowOtpForm(true); // Show OTP input form
        } else {
          // If 2FA is not enabled, navigate directly based on userType
          if (userType === 'Buyer') {
            navigate('/wholesale-dashboard'); // Redirect to the buyer dashboard
          } else if (userType === 'Seller') {
            navigate('/wholesaleseller-dashboard'); // Redirect to the seller dashboard
          } else {
            setError('Invalid user type');
          }
        }
      } else if (response.status === 307) {
        // If status code is 307, show OTP form for verification
        setUserEmail(formData.email); // Store the email for OTP verification
        setShowOtpForm(true); // Show OTP input form
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false when the request is complete
    }
  };

  // Handle OTP submission and verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error message

    try {
      const token = localStorage.getItem('token'); // Get token from localStorage if present

      const response = await fetch('http://localhost:3696/auth/verify-2fa-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Send token in header for 2FA verification
        },
        body: JSON.stringify({
          otp: otpData.otp,
          email: userEmail, // Pass the email from login form
        }),
      });

      if (response.ok) {
        // OTP verification successful
        const data = await response.json();
        alert(data.message || 'OTP verified successfully');

        const newToken = response.headers.get('Authorization'); // Get new token after OTP verification
        if (newToken) {
          // Store the new token in localStorage
          localStorage.setItem('token', newToken);
          setAuthToken(newToken); // Update token state
        }

        // Get userType from the response headers and redirect accordingly
        const userType = response.headers.get('User_Type');
        if (userType === 'Buyer') {
          navigate('/wholesale-dashboard'); // Redirect to the buyer dashboard
        } else if (userType === 'Seller') {
          navigate('/wholesaleseller-dashboard'); // Redirect to the seller dashboard
        }
      } else {
        const data = await response.json();
        setError(data.message || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setError(error.message || 'An error occurred while verifying OTP');
    } finally {
      setIsLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <div className="background-image">
      <div className="card-login" style={{ padding: 0, marginRight: '40%' }}>
        <div className="header_Signup">
          <h2>Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="wholesale-login-body">
          <div className="wholesale-login-input">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="wholesale-login-input">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          {error && <div className="wholesale-error-message">{error}</div>}

          <div className="wholesale-login-submit">
            <button
              type="submit"
              className="wholesale-login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="wholesale-forgot-password">
            <Link to="/wholesaleuser-forgetpassword">Forgot Password?</Link>
          </div>

          <div className="wholesale-signup-link">
            <span>Don't have an account?</span> <Link to="/wholesaleuser-signup" className="wholesale-signup">Sign Up</Link>
          </div>
        </form>

        {showOtpForm && (
          <div className="wholesale-login-card">
            <h3 className="text-xl font-semibold">Enter OTP</h3>
            <form onSubmit={handleOtpSubmit}>
              <div className="wholesale-login-input">
                <input
                  type="text"
                  name="otp"
                  value={otpData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  maxLength={6}
                  required
                />
              </div>
              <button
                type="submit"
                className="wholesale-login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
