

// import React, { useState, useEffect } from 'react';
// import './Accounts.css';
// import Logout from '../Logout/Logout';

// const MyAccountPage = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Simulated useEffect to fetch user data (mocking API call)
//   useEffect(() => {
//     // Simulating fetching user data
//     const fetchUserData = () => {
//       // Simulated delay to mimic API call
//       setTimeout(() => {
//         const userData = {
//           name: 'John Doe',
//           email: 'john.doe@example.com',
//           address: '123 Main St, City, Country',
//           phoneNumber: '123-456-7890',
//           orders: [
//             { id: 1, date: '2024-06-01', total: 50.0 },
//             { id: 2, date: '2024-06-05', total: 80.0 },
//           ],
//         };
//         setUserData(userData);
//         setLoading(false);
//       }, 1000); // Simulated 1 second delay
//     };

//     fetchUserData();
//   }, []); // Empty dependency array to run effect only once on mount

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   const handleLogout = () => {
//     // Perform logout actions here if needed
//     // Example: Clear local storage, reset user state, etc.
//     localStorage.removeItem('authToken'); // Clearing authentication token

//     // Redirect to login page or perform any other action after logout
//     // For simplicity, let's just reload the page
//     window.location.reload();
//   };

//   return (
//     <div className="my-account-container">
//       <h4 className="my-account-title">My Account</h4>
//       <div className="user-info-section">
//         <h3>User Information</h3>
//         <p><strong>Name:</strong> {userData.name}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Address:</strong> {userData.address}</p>
//         <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
//       </div>

//       {/* Logout button */}
//       <button onClick={handleLogout}>Logout</button>

//       {/* Optionally, you can also render the Logout component */}
//       {/* <Logout /> */}

//       {/* Or if you prefer to have a link to the Logout page */}
//       {/* <Link to="/logout">Logout</Link> */}
//     </div>
//   );
// };

// export default MyAccountPage;

import React, { useState, useEffect } from 'react';
import './Accounts.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const MyAccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Simulated useEffect to fetch user data (mocking API call)
  useEffect(() => {
    // Simulating fetching user data
    const fetchUserData = () => {
      // Simulated delay to mimic API call
      setTimeout(() => {
        const userData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          address: '123 Main St, City, Country',
          phoneNumber: '123-456-7890',
        };
        setUserData(userData);
        setLoading(false);
      }, 1000); // Simulated 1 second delay
    };

    fetchUserData();
  }, []); // Empty dependency array to run effect only once on mount

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    // Perform logout actions here if needed
    localStorage.removeItem('authToken'); // Clearing authentication token

    // Redirect to login page or perform any other action after logout
    // For simplicity, let's just reload the page
    window.location.reload();
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-account-container">
      <h4 className="my-account-title">My Account</h4>
      <div className="user-info-section">
      
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Address:</strong> {userData.address}</p>
        <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
      </div>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

export default MyAccountPage;
