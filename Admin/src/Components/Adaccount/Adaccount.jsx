import React, { useState } from 'react';
import './Adaccount.css'; // Import CSS for styling
// import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal'; // Assuming ConfirmationModal component is implemented separately

const AdminAccount = () => {
    // Mock data for demonstration
    const adminData = {
        name: 'Puja Das',
        email: 'puja.das@example.com',
        role: 'Administrator',
        department: 'Operations'
    };

    const siteInfo = {
        siteName: 'E-Com Admin',
        siteLogo: '/path/to/logo.png',
        foundedYear: '2024',
        siteAbout: 'This is a brief description of the ecommerce admin site.'
    };

    // State for handling modal display
    const [showModal, setShowModal] = useState(false);

    // Function to handle logout
    const handleLogout = () => {
        setShowModal(true); // Show confirmation modal
    };

    // Function to confirm logout
    const confirmLogout = () => {
        // Perform logout logic here
        console.log('Logging out...');
        // Example: Redirect user to logout page or clear session
        // After logout, you can redirect to a different route
    };

    // Function to cancel logout
    const cancelLogout = () => {
        setShowModal(false); // Hide confirmation modal
    };

    return (
        <div className="admin-account">
            <h2>Admin Account</h2>

            {/* Personal Information Section */}
            <section className="account-section">
                <h5>Personal Information</h5>
                <div className="user-info-section">
                    <p><strong>Name:</strong> {adminData.name}</p>
                    <p><strong>Email:</strong> {adminData.email}</p>
                    <p><strong>Role:</strong> {adminData.role}</p>
                    <p><strong>Department:</strong> {adminData.department}</p>
                </div>
            </section>

            {/* Site Information Section */}
            <section className="account-section">
                <h5>Site Information</h5>
                <div className="user-info-section">
                    <p><strong>Site Name:</strong> {siteInfo.siteName}</p>
                    <p><strong>Site Logo:</strong> <img src={siteInfo.siteLogo} alt="Site Logo" /></p>
                    <p><strong>About Site:</strong> {siteInfo.siteAbout}</p>
                    <p><strong>Founded Year:</strong> {siteInfo.foundedYear}</p>
                </div>
            </section>

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
        </div>
    );
};

export default AdminAccount;
