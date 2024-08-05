import React, { useState } from 'react';
import './NewSeller.css';

const NewSeller = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription:'',
    password:'',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Add logic to send form data to server or handle submission
    // You can implement Axios or fetch here to send data to the backend
  };

  return (
    <div className="new-seller-form-container">
      <h2>New Seller Sign Up</h2>
      <form className="new-seller-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Description</label>
          <input
            type="text"
            className="form-control"
            id="companyDescription"
            placeholder="Enter your company description"
            value={formData.companyDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Password</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person</label>
          <input
            type="text"
            className="form-control"
            id="contactPerson"
            placeholder="Enter contact person's name"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            className="form-control"
            id="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default NewSeller;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // Use named import instead of default
// import './NewSeller.css'; // Ensure this file exists for styling

// const NewSeller = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch and decode the access token when the component mounts
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token); // Decode the token
//         console.log('Decoded Token:', decoded);
//         setUser({
//           id: decoded.id,
//           username: decoded.username,
//           roleId: decoded.roleId,
//         });
//       } catch (error) {
//         console.error('Failed to decode token:', error);
//       }
//     } else {
//       console.error('No access token found in localStorage');
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure the user object is available
//     if (!user) {
//       console.error('User not found');
//       return;
//     }

//     const payload = {
//       id: user.id,
//       username: user.username,
//       roleId: user.roleId,
//       role: "seller", // Set the role to "seller"
//     };

//     console.log('Payload to send:', payload);
//     setLoading(true); // Set loading state

//     try {
//       const response = await fetch('http://localhost:5000/user/update', {
//         method: 'PATCH', // Using PATCH method
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Network response was not ok: ${errorData.message}`);
//       }

//       const data = await response.json();
//       console.log('Success:', data);
      
//       // Redirect to the seller dashboard on successful response
//       navigate('/seller-dashboard'); 
//     } catch (error) {
//       console.error('Error during API call:', error);
//       setError(error.message); // Handle error messages
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="new-seller-form-container">
//       <h2>Become a Seller</h2>
//       {error && <p className="error-message">{error}</p>} {/* Show error message */}
//       <form className="new-seller-form" onSubmit={handleSubmit}>
//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? 'Submitting...' : 'Confirm as Seller'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NewSeller;
