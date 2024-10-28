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
    const [siteSettingsLoaded, setSiteSettingsLoaded] = useState(false); // Track if site settings were loaded
    const [operationalSettingsLoaded, setOperationalSettingsLoaded] = useState(false); // Track if operational settings were loaded

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

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    const fetchSiteSettings = async () => {
        const adminId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('accessToken');

        if (!adminId || !accessToken) return;

        setSiteSettingsLoaded(true); // Set loading state to true

        try {
            const siteResponse = await fetch(`http://localhost:5000/admin/settings/${adminId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!siteResponse.ok) {
                // Instead of throwing an error, we just set the siteSettings to null
                setSiteSettings(null);
                return; // Exit the function without an error
            }

            const siteData = await siteResponse.json();
            if (Object.keys(siteData).length === 0) {
                setSiteSettings(null); // No data available
            } else {
                setSiteSettings(siteData);
            }

        } catch (error) {
            // You can log the error if needed, but no need to show an error message
            console.error("Error fetching site settings:", error);
            setSiteSettings(null); // No data available in case of any error
        }
    };

    const fetchOperationalSettings = async () => {
        const adminId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('accessToken');

        if (!adminId || !accessToken) return;

        setOperationalSettingsLoaded(true); // Set loading state to true

        try {
            const operationalResponse = await fetch(`http://localhost:5000/admin/operational-settings/${adminId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!operationalResponse.ok) {
                // Instead of throwing an error, we just set the operationalSettings to null
                setOperationalSettings(null);
                return; // Exit the function without an error
            }

            const operationalData = await operationalResponse.json();
            if (Object.keys(operationalData).length === 0) {
                setOperationalSettings(null); // No data available
            } else {
                setOperationalSettings(operationalData);
            }

        } catch (error) {
            // You can log the error if needed, but no need to show an error message
            console.error("Error fetching operational settings:", error);
            setOperationalSettings(null); // No data available in case of any error
        }
    };

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

                    {/* Buttons to Fetch Site and Operational Settings */}
                    <button className="button-spacing" onClick={fetchSiteSettings}>
                        Load Site Settings
                    </button>
                    <button onClick={fetchOperationalSettings}>
                        Load Operational Settings
                    </button>

                    {/* Site Settings Section */}
                    {siteSettingsLoaded ? (
                        siteSettings ? (
                            <section className="settings-section">
                                <h3>Site Settings</h3>
                                <div className="user-info-section">
                                    {Object.entries(siteSettings).map(([key, value]) => {
                                        if (key === 'id' || key === 'adminId') return null;
                                        return (
                                            <p key={key}>
                                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                            </p>
                                        );
                                    })}
                                </div>
                            </section>
                        ) : (
                            <p>No site settings available.</p>
                        )
                    ) : null}

                    {/* Operational Settings Section */}
                    {operationalSettingsLoaded ? (
                        operationalSettings ? (
                            <section className="operational-section">
                                <h3>Operational Settings</h3>
                                <div className="user-info-section">
                                    {Object.entries(operationalSettings).map(([key, value]) => {
                                        if (key === 'id' || key === 'adminId') return null;
                                        return (
                                            <p key={key}>
                                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                            </p>
                                        );
                                    })}
                                </div>
                            </section>
                        ) : (
                            <p>No operational settings available.</p>
                        )
                    ) : null}

                    {/* Logout Button */}
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
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
