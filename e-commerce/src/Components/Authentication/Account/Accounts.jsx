import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Accounts.css'; // Add CSS for styling

const UserAccountPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addresses, setAddresses] = useState([]); // Store multiple addresses
  const [newAddress, setNewAddress] = useState({ identifier: '', address: '' }); // Address form state
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission progress
  const [addressError, setAddressError] = useState(null); // Track form validation error

  // Fetch user data and addresses on page load
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');

      if (!userId || !accessToken) {
        navigate('/login');
        return;
      }

      try {
        // Fetch user data
        const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!userResponse.ok) {
          throw new Error('Error fetching user data');
        }

        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch user's addresses
        const addressResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}/address`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!addressResponse.ok) {
          throw new Error('Error fetching addresses');
        }

        const addressData = await addressResponse.json();
        setAddresses(addressData); // Set fetched addresses to state
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle address form submission (for adding or editing)
  const handleAddressSubmit = async () => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!newAddress.identifier || !newAddress.address) {
      setAddressError('Please fill in both address identifier and address.');
      return;
    }

    try {
      setIsSubmitting(true); // Set submission in progress

      const method = newAddress.id ? 'PATCH' : 'POST'; // Use PATCH if editing, POST if adding
      const endpoint = newAddress.id
        ? `${process.env.REACT_APP_BASE_URL}/user/${userId}/address/${newAddress.identifier}`
        : `${process.env.REACT_APP_BASE_URL}/user/${userId}/address`;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });

      if (!response.ok) {
        throw new Error('Error submitting address');
      }

      // After success, refresh addresses list
      const updatedAddressesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}/address`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (updatedAddressesResponse.ok) {
        const updatedAddresses = await updatedAddressesResponse.json();
        setAddresses(updatedAddresses); // Update state with new address list
      }

      setNewAddress({ identifier: '', address: '' }); // Clear the form
      setIsSubmitting(false); // Set submission complete
    } catch (error) {
      setAddressError(error.message);
      setIsSubmitting(false); // Stop submitting on error
    }
  };

  // Handle edit address
  const handleEditAddress = (address) => {
    setNewAddress({ id: address.id, identifier: address.identifier, address: address.address });
  };

  // Handle delete address
  const handleDeleteAddress = async (addressId, identifier) => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}/address/${identifier}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error('Error deleting address');
      }

      // After deletion, update the state by removing the address from the list
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  // Handle set default address
  const handleSetDefaultAddress = async (identifier) => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}/address/${identifier}/set-default`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ defaultAddress: true }), // Set the address as default
      });

      if (!response.ok) {
        throw new Error('Error setting default address');
      }

      // After setting the default address, update the state
      const updatedAddressesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}/address`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (updatedAddressesResponse.ok) {
        const updatedAddresses = await updatedAddressesResponse.json();
        setAddresses(updatedAddresses); // Update state with new address list
      }
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-account-page">
    <h2 className="my-account-heading">My Account</h2>

      <section className="profile-section">
        <div className="user-info">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
        </div>
      </section>

      <section className="address-section">
        <h5>Addresses</h5>
        <div className="address-list">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address.id} className="address-item">
                <p><strong>{address.identifier}</strong>: {address.address}</p>
                <button onClick={() => handleEditAddress(address)}>Edit</button>
                <button onClick={() => handleDeleteAddress(address.id, address.identifier)}>Delete</button>
                <button onClick={() => handleSetDefaultAddress(address.identifier)}>
                  Set Default
                </button>
                {address.defaultAddress && <p>This is your default address.</p>}
              </div>
            ))
          ) : (
            <p>No addresses found</p>
          )}
        </div>

        <h6>{newAddress.id ? 'Edit Address' : 'Add New Address'}</h6>
        <div>
          <label>Address Type:</label>
          <select
            value={newAddress.identifier}
            onChange={(e) => setNewAddress({ ...newAddress, identifier: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
          />
        </div>

        {addressError && <p className="error">{addressError}</p>}
        <button onClick={handleAddressSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : newAddress.id ? 'Update Address' : 'Add Address'}
        </button>
      </section>
    </div>
  );
};

export default UserAccountPage;