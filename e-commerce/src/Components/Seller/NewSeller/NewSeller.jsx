// import React, { useState } from 'react';
// import './NewSeller.css';

// const NewSeller = () => {
//   const [formData, setFormData] = useState({
//     companyName: '',
//     companyDescription:'',
//     password:'',
//     contactPerson: '',
//     email: '',
//     phoneNumber: '',
//     address: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted with data:', formData);
//     // Add logic to send form data to server or handle submission
//     // You can implement Axios or fetch here to send data to the backend
//   };

//   return (
//     <div className="new-seller-form-container">
//       <h2>New Seller Sign Up</h2>
//       <form className="new-seller-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="companyName">Company Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="companyName"
//             placeholder="Enter your company name"
//             value={formData.companyName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="companyName">Company Description</label>
//           <input
//             type="text"
//             className="form-control"
//             id="companyDescription"
//             placeholder="Enter your company description"
//             value={formData.companyDescription}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="companyName">Password</label>
//           <input
//             type="text"
//             className="form-control"
//             id="companyName"
//             placeholder="Enter your Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="contactPerson">Contact Person</label>
//           <input
//             type="text"
//             className="form-control"
//             id="contactPerson"
//             placeholder="Enter contact person's name"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phoneNumber">Phone Number</label>
//           <input
//             type="tel"
//             className="form-control"
//             id="phoneNumber"
//             placeholder="Enter your phone number"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address">Address</label>
//           <textarea
//             className="form-control"
//             id="address"
//             placeholder="Enter your address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NewSeller;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './NewSeller.css';

const NewSeller = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    password: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/sellers/registerSeller', {
        email: formData.email,
        password: formData.password,
        companyname: formData.companyName,
        contactperson: formData.contactPerson,
        phoneno: formData.phoneNumber,
        companyaddress: formData.address,
        companydescription: formData.companyDescription,
        role: formData.role
      });

      if (response.status === 200) {
        navigate('/login');
      } else {
        setError('Failed to register. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(`Server error: ${error.response.data.message || 'Unknown server error'}`);
      } else if (error.request) {
        // Request was made but no response received
        setError('No response from server. Please check your network.');
      } else {
        // Something else happened
        setError(`Error: ${error.message}`);
      }
      console.error('Error registering seller:', error); // Log full error details for debugging
    }
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
          <label htmlFor="companyDescription">Company Description</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
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
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            placeholder="Enter your role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default NewSeller;