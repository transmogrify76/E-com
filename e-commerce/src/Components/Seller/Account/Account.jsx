import React, { useState } from 'react';
import './Account.css'; // Import CSS for styling
 import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';// Assuming ConfirmationModal component is implemented separately

const SellerAccount = () => {
    // Mock data for demonstration
    const userData = {
        name: 'Puja Das',
        email: 'puja.das@gmail.com',
        address: 'Mani Casadona',
        phoneNumber: '1234512345'
    };

    const brandInfo = {
        brandName: 'Example Brand',
        brandLogo: '/path/to/logo.png',
        establishedYear: '2020',
        brandAbout: 'This is a brief description of the brand.'
    };

    const otherInfo = {
        address: '456 Park Ave, Townsville',
        bankAccount: ' 123456789',
        taxID: 'TAX12345',
        gstNo: '000000000'

    };

    // State for handling modal display
    const [showModal, setShowModal] = useState(false);

    // Function to toggle modal visibility
    // const toggleModal = () => {
    //     setShowModal(!showModal);
    // };

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
        <div className="seller-account">
            <h2>My Account</h2>

            {/* Personal Information Section */}
            <section className="account-section">
                <h5>Personal Information</h5>
                <div className="user-info-section">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Address:</strong> {userData.address}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                </div>
            </section>

            {/* Brand Information Section */}
            <section className="account-section">
                <h5>Brand Information</h5>
                <div className="user-info-section">
                    <p><strong>Brand Name:</strong> {brandInfo.brandName}</p>
                    <p><strong>Brand Logo:</strong> <img src={brandInfo.brandLogo} alt="Brand Logo" /></p>
                    <p><strong>Brand About:</strong> {brandInfo.brandAbout}</p>
                    <p><strong>Established Year:</strong> {brandInfo.establishedYear}</p>
                </div>
            </section>

            {/* Other Information Section */}
            <section className="account-section">
                <h5>Other Information</h5>
                <div className="user-info-section">
                    <p><strong>Bank Account:</strong> {otherInfo.bankAccount}</p>
                    <p><strong>Tax ID:</strong> {otherInfo.taxID}</p>
                    <p><strong>GST No:</strong> {otherInfo.gstNo}</p>
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

export default SellerAccount;
