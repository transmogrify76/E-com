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
