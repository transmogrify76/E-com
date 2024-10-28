import React, { useState, useEffect } from 'react';
import './Adaccount.css'; // Import CSS for styling
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const AdminAccount = () => {
    const [adminData, setAdminData] = useState(null);
    const [siteSettings, setSiteSettings] = useState(null);
    const [operationalSettings, setOperationalSettings] = useState(null);
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
                // Fetch Admin Data
                const adminResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/${adminId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!adminResponse.ok) {
                    throw new Error('Failed to fetch admin data');
                }

                const adminData = await adminResponse.json();
                setAdminData(adminData);

                // Fetch Site Settings
                const siteResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/settings/${adminId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!siteResponse.ok) {
                    throw new Error('Failed to fetch site settings');
                }

                const siteData = await siteResponse.json();
                setSiteSettings(siteData);

                // Fetch Operational Settings
                const operationalResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/operational-settings/${adminId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!operationalResponse.ok) {
                    throw new Error('Failed to fetch operational settings');
                }

                const operationalData = await operationalResponse.json();
                setOperationalSettings(operationalData);

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
        localStorage.clear(); // Clear localStorage
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
                            <p><strong>Role:</strong> {adminData.role?.name}</p>
                        </div>
                    </section>

                    {/* Site Settings Section */}
                   {/* Site Settings Section */}
{siteSettings && (
    <section className="settings-section">
        <h3>Site Settings</h3>
        <div className="user-info-section">
            {Object.entries(siteSettings).map(([key, value]) => {
                // Exclude specific keys
                if (key === 'id' || key === 'adminId') return null; // Add any other keys you want to exclude here
                return (
                    <p key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                    </p>
                );
            })}
        </div>
    </section>
)}

{/* Operational Settings Section */}
{operationalSettings && (
    <section className="operational-section">
        <h3>Operational Settings</h3>
        <div className="user-info-section">
            {Object.entries(operationalSettings).map(([key, value]) => {
                // Exclude specific keys
                if (key === 'id' || key === 'adminId') return null; // Add any other keys you want to exclude here
                return (
                    <p key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                    </p>
                );
            })}
        </div>
    </section>
)}

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
