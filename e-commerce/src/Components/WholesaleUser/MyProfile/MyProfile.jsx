
import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { useNavigate } from 'react-router-dom';
import './MyProfile.css';
import WholesaleNavbar from '../wholesalenavbar/navbar';
import WholesaleSidebar from '../WholesaleuserSidebar/sidebar';

const WholesaleUserProfile = () => {
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null); // Store the new uploaded image
  const [isEditing, setIsEditing] = useState(false); // Toggle image editing mode
  const [error, setError] = useState(''); // For displaying errors
  const [successMessage, setSuccessMessage] = useState(''); // For displaying success message
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    isEmailVerified: false,
  }); // For editing user details
  const [isImageEditing, setIsImageEditing] = useState(false); // For controlling image editing modal visibility
  const [showOtpPopup, setShowOtpPopup] = useState(false); // To show the OTP input popup
  const [otp, setOtp] = useState(''); // Store OTP input by user
  const [otpError, setOtpError] = useState(''); // For OTP validation errors
  const navigate = useNavigate();

  const fileInputRef = useRef(null); // Ref for file input

  // Fetch wholesale user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token
      if (!token) {
        navigate('/login'); // Redirect if no token
        return;
      }

      try {
        const response = await fetch('http://localhost:3696/auth/user-details', {
          method: 'GET',
          headers: {
            Authorization: ` ${token}`, // Add token to Authorization header
          },
        });

        const data = await response.json(); // Parse the response

        if (response.ok) {
          setUser(data); // Set user data if successful
          setFormData(data); // Set initial form values
          setSuccessMessage(''); // Reset success message
          setError(''); // Reset error message
        } else {
          setError(data.message || 'Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('An error occurred while fetching user details.');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle image change (user selects a new image)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // Set the selected image as base64
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  // Handle wholesale user details update (submit the form and the profile image together)
  const handleUpdateDetails = async () => {
    const token = localStorage.getItem('token');
    const formDataObj = new FormData();
    formDataObj.append('fullName', formData.fullName);
    formDataObj.append('email', formData.email);
    formDataObj.append('phoneNumber', formData.phoneNumber);

    if (newImage) {
      const imageBlob = dataURItoBlob(newImage); // Convert base64 to Blob
      formDataObj.append('profileImage', imageBlob, 'profileImage.jpg');
    }

    try {
      const response = await fetch('http://localhost:3696/auth/update', {
        method: 'PATCH',
        headers: {
          'Authorization': ` ${token}`, // Include the token for authentication
        },
        body: formDataObj, // Send the form data with the image
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data); // Update user data with new details
        setSuccessMessage('User details updated successfully!');
        setIsEditing(false); // Close the editing mode
      } else {
        setError(data.message || 'Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating details:', error);
      setError('An error occurred while updating details.');
    }
  };

  // Helper function to convert base64 to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([uintArray], { type: 'image/jpeg' });
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Send OTP for email verification
  const handleVerifyEmail = async () => {
    const token = localStorage.getItem('token');
    const requestData = {
      email: formData.email,
      otpType: 'EmailVerification',
    };

    try {
      const response = await fetch('http://localhost:3696/auth/request-otp', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpPopup(true); // Show OTP input modal
        setOtpError('');
      } else {
        setOtpError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpError('An error occurred while sending OTP.');
    }
  };

  // Verify the OTP and confirm email
  const handleVerifyOtp = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3696/auth/verify-email-otp', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: otp, // OTP input by the user
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData((prevData) => ({
          ...prevData,
          isEmailVerified: true,
        }));
        setShowOtpPopup(false);
        setSuccessMessage('Email verified successfully!');
      } else {
        setOtpError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('An error occurred while verifying OTP.');
    }
  };

  // Trigger file input when profile image is clicked
  const handleProfileImageClick = () => {
    fileInputRef.current.click(); // Trigger click on the file input
  };

  return (
    <div className="home-page-container">
      <WholesaleNavbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
        <div className="home-content flex flex-row">
          <WholesaleSidebar />
          <div className="profile-container">
            <div className="profile-header">
              <h2>My Wholesale User Profile</h2>
            </div>

            <div className="profile-card">
              <div className="profile-image-container">
                {/* Display the profile image */}
                <div
                  className="profile-image"
                  style={{
                    backgroundImage: `url(${newImage || user?.profilePicture})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onClick={handleProfileImageClick} // Trigger file input on click
                ></div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }} // Hide the file input
                />
              </div>

              <div className="profile-details">
                {user ? (
                  <>
                    <div className="profile-detail-row">
                      <label>Name:</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={!isEditing} // Disable input when not editing
                      />
                    </div>
                    <div className="profile-detail-row">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing} // Disable input when not editing
                      />
                      {!formData.isEmailVerified ? (
                        <button className="verify-email-button" onClick={handleVerifyEmail}>
                          Verify Email
                        </button>
                      ) : (
                        <span className="verified">Verified</span>
                      )}
                    </div>
                    <div className="profile-detail-row">
                      <label>Phone Number:</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        disabled={!isEditing} // Disable input when not editing
                      />
                    </div>

                    <button
                      className="update-button"
                      onClick={isEditing ? handleUpdateDetails : () => setIsEditing(true)}
                    >
                      {isEditing ? 'Update Details' : 'Edit'}
                    </button>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              {error && <div className="error-message">{error}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
          </div>

          {/* OTP Popup */}
          {showOtpPopup && (
            <div className="otp-popup">
              <div className="otp-popup-content">
                <h3>Enter OTP sent to your email</h3>
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {otpError && <div className="error-message">{otpError}</div>}
                <button onClick={handleVerifyOtp}>Verify OTP</button>
                <button onClick={() => setShowOtpPopup(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WholesaleUserProfile;
