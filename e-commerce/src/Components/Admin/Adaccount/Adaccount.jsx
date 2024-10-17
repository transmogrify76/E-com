import React, { useState, useEffect } from 'react';
import './Adaccount.css'; // Import CSS for styling
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const AdminAccount = () => {
    const [adminData, setAdminData] = useState(null);
    const [siteSettings, setSiteSettings] = useState(null); // Start with null
    const [operationalSettings, setOperationalSettings] = useState(null); // Start with null
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
                // Fetch Admin Data (Personal Info)
                const adminResponse = await fetch(`http://localhost:5000/admin/${adminId}`, {
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

                // Fetch Site Settings (if exists)
                const siteResponse = await fetch(`http://localhost:5000/admin/settings/${adminId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (siteResponse.ok) {
                    const siteData = await siteResponse.json();
                    setSiteSettings(siteData);
                }

                // Fetch Operational Settings (if exists)
                const operationalResponse = await fetch(`http://localhost:5000/admin/operational-settings/${adminId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (operationalResponse.ok) {
                    const operationalData = await operationalResponse.json();
                    setOperationalSettings(operationalData);
                }
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

    const handleSaveSiteSettings = async () => {
        const adminId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('accessToken');

        if (!adminId || !accessToken) {
            setError('Admin ID or access token not found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/admin/settings/${adminId}`, {
                method: 'PUT', // Assuming PUT method is used to update settings
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(siteSettings), // Updated settings
            });

            if (!response.ok) {
                throw new Error('Failed to save site settings');
            }

            const updatedData = await response.json();
            setSiteSettings(updatedData); // Update state with the new data
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSaveOperationalSettings = async () => {
        const adminId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('accessToken');

        if (!adminId || !accessToken) {
            setError('Admin ID or access token not found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/admin/operational-settings/${adminId}`, {
                method: 'PUT', // Assuming PUT method is used to update settings
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(operationalSettings), // Updated settings
            });

            if (!response.ok) {
                throw new Error('Failed to save operational settings');
            }

            const updatedData = await response.json();
            setOperationalSettings(updatedData); // Update state with the new data
        } catch (error) {
            setError(error.message);
        }
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
                    {siteSettings && (
                        <section className="settings-section">
                            <h3>Site Settings</h3>
                            <div className="user-info-section">
                                {Object.entries(siteSettings).map(([key, value]) => {
                                    if (key === 'id' || key === 'adminId') return null; // Exclude specific keys
                                    return (
                                        <div key={key}>
                                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => setSiteSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                                            />
                                        </div>
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
                                    if (key === 'id' || key === 'adminId') return null; // Exclude specific keys
                                    return (
                                        <div key={key}>
                                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => setOperationalSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            
                        </section>
                    )}

                    {/* Logout Button */}
                    <button onClick={handleLogout}>Logout</button>

                    {/* Confirmation Modal */}
                    {showModal && (
                        <ConfirmationModal
                            message="Are you sure you want to logout?"
                            onConfirm={confirmLogout}
                            onCancel={cancelLogout}
                        />
                    )}
                </>
            ) : (
                <p>No admin data available</p>
            )}
        </div>
    );
};

export default AdminAccount;
