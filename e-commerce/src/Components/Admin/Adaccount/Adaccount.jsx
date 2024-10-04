import React, { useState, useEffect } from 'react';
import './Adaccount.css'; // Import CSS for styling
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const AdminAccount = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAdminData = async () => {
            setLoading(true);
            const adminId = localStorage.getItem('userId');
            const accessToken = localStorage.getItem('accessToken');

            if (!adminId || !accessToken) {
                setError('Admin ID or access token not found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/admin/${adminId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch admin data');
                }

                const data = await response.json();
                setAdminData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    const handleLogout = () => {
        setShowModal(true);
    };

    const confirmLogout = () => {
        // Perform logout logic here
        localStorage.clear(); // Example: Clear localStorage
        window.location.href = '/login'; // Redirect to login page
    };

    const cancelLogout = () => {
        setShowModal(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-account">
            <h2 style={{ marginLeft: '360px' }}>Admin Account</h2>

            {adminData ? (
                <>
                    {/* Personal Information Section */}
                    <section className="account-section">
                        <h5>Personal Information</h5>
                        <div className="user-info-section">
                            <p><strong>Name:</strong> {adminData.name}</p>
                            <p><strong>Email:</strong> {adminData.email}</p>
                           <p><strong>Phone Number:</strong> {adminData.phoneNumber}</p>
                            <p><strong>Role:</strong> {adminData.role?.name}</p> {/* Accessing nested role name */}
                            {/* <p><strong>Company Name:</strong> {adminData.companyName}</p>
                            <p><strong>Description:</strong> {adminData.description}</p>
                            <p><strong>Contact Person:</strong> {adminData.contactPerson}</p>
                            <p><strong>Address:</strong> {adminData.address}</p> */}
                        </div>
                    </section>

                    {/* Logout Button */}
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>No admin data available</p>
            )}

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

export default AdminAccount;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Adaccount.css'; // Import your CSS

// const AdminAccountPage = () => {
//   const navigate = useNavigate();
//   const [settingsData, setSettingsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSettingsData = async () => {
//       const adminId = localStorage.getItem('userId'); // Retrieve admin ID from local storage
//       const accessToken = localStorage.getItem('accessToken'); // Retrieve the token

//       if (!adminId || !accessToken) {
//         console.error('Admin ID or access token not found');
//         navigate('/login'); // Redirect to login if no admin ID or token found
//         return;
//       }

//       try {
//         // Fetch the operational settings by admin ID
//         const response = await fetch(`http://localhost:5000/admin/operational-settings/${adminId}`, {
//           headers: {
//             'Authorization': `Bearer ${accessToken}` // Pass token for authorization
//           }
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Error fetching settings data: ${response.status} - ${errorText}`);
//         }

//         const data = await response.json();
//         setSettingsData(data);
//         setLoading(false); // Data has been successfully fetched

//       } catch (error) {
//         setError(error.message);
//         setLoading(false); // Data fetching has finished with an error
//         console.error('Error fetching settings data:', error);
//       }
//     };

//     fetchSettingsData();
//   }, [navigate]);

//   if (loading) return <p>Loading...</p>; // Show loading state while fetching

//   if (error) return <p>Error: {error}</p>; // Show error message if something goes wrong

//   return (
//     <div className="admin-account-page">
//       <h2>Admin Operational Settings</h2>

//       <section className="account-section">
//         <h5>Operational Settings</h5>
//         <div className="settings-info-section">
//           <p><strong>Time Zone:</strong> {settingsData.timeZone || 'N/A'}</p>
//           <p><strong>Currency:</strong> {settingsData.currency || 'N/A'}</p>
//           <p><strong>Tax Rate:</strong> {settingsData.taxRate || 'N/A'}</p>
//           <p><strong>Free Shipping Threshold:</strong> {settingsData.freeShippingThreshold || 'N/A'}</p>
//           <p><strong>Order Processing Time (days):</strong> {settingsData.orderProcessingTime || 'N/A'}</p>
//           <p><strong>Facebook URL:</strong> {settingsData.facebook || 'N/A'}</p>
//           <p><strong>Instagram URL:</strong> {settingsData.instagram || 'N/A'}</p>
//           <p><strong>Twitter URL:</strong> {settingsData.twitter || 'N/A'}</p>
//           <p><strong>Minimum Order Amount:</strong> {settingsData.minimumOrderAmount || 'N/A'}</p>
//           <p><strong>Backup Frequency:</strong> {settingsData.backupFrequency || 'N/A'}</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AdminAccountPage;
