import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WholesaleUserSettings.css'; // Assuming you will reuse the existing styles
import WholesaleNavbar from '../wholesalenavbar/navbar'; // You might need a different Navbar component for Wholesale
import WholesaleSidebar from '../WholesaleuserSidebar/sidebar'; // You might need a different Sidebar component for Wholesale

const WholesaleSettings = () => {
  const [settings, setSettings] = useState({
    privateProfile: false,
    searchableProfile: true,
    allowMessagesfromStrangers: true,
    twoFaEnabled: false,
    companyPageWriteAccess: false,
    lookingToBuy: true,
    lookingToSell: false,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false); 
  const [passwordForDeletion, setPasswordForDeletion] = useState(''); 
  const navigate = useNavigate();

  // Fetch settings from API on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3696/user-settings', {
          method: 'GET',
          headers: {
            Authorization: ` ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setSettings(data); // Set fetched settings
        } else {
          setError(data.message || 'Failed to fetch settings');
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        setError('An error occurred while fetching settings.');
      }
    };

    fetchSettings();
  }, [navigate]);

  // Handle toggle switch changes
  const handleToggleChange = (event) => {
    const { name, checked } = event.target;

    if (name === 'lookingToBuy' && checked) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        lookingToBuy: true,
        lookingToSell: false, 
      }));
    } else if (name === 'lookingToSell' && checked) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        lookingToSell: true,
        lookingToBuy: false, 
      }));
    } else {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: checked,
      }));
    }
  };

  // Handle form submit (update settings)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please login to update settings.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3696/user-settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Settings updated successfully!');
        setError('');
      } else {
        setError(data.message || 'Failed to update settings');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      setError('An error occurred while updating settings.');
      setSuccessMessage('');
    }
  };

  // Handle password change form submission
  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3696/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Password changed successfully!');
        setError('');
        setShowChangePasswordModal(false);
      } else {
        setError(data.message || 'Failed to change password');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('An error occurred while changing password.');
      setSuccessMessage('');
    }
  };

  // Toggle Two-Factor Authentication (2FA)
  const handleToggle2FA = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to toggle 2FA.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3696/auth/toggle-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSettings((prevSettings) => ({
          ...prevSettings,
          twoFaEnabled: !prevSettings.twoFaEnabled,
        }));
        setSuccessMessage(data.message || '2FA status updated successfully.');
        setError('');
      } else {
        setError(data.message || 'Failed to update 2FA status.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      setError('An error occurred while toggling 2FA.');
      setSuccessMessage('');
    }
  };

  // Delete Account API Call
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to delete your account.');
      return;
    }
  
    // Ensure password for deletion is entered
    if (!passwordForDeletion) {
      setError('Please enter your password to confirm deletion.');
      return;
    }
  
    if (window.confirm('Are you sure you want to delete your account? This action is permanent.')) {
      try {
        const response = await fetch('http://localhost:3696/auth/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`, // Include the Authorization token
          },
          body: JSON.stringify({ password: passwordForDeletion }), // Pass password in the body
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccessMessage('Account deleted successfully.');
          localStorage.removeItem('token'); // Log the user out
          navigate('/wholesaleuser-login'); // Redirect to login page
        } else {
          setError(data.message || 'Failed to delete account');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        setError('An error occurred while deleting your account.');
      }
    }
  };

  return (
    <div className="home-page-container">
      <WholesaleNavbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
        <div className="home-content flex flex-row">
          <WholesaleSidebar />
          <div className="settings-form-container">
            <h2>Wholesale Account Settings</h2>
            <form onSubmit={handleSubmit} className="settings-form">
              <div className="settings-item">
                <label>Two Factor Authentication (2FA)</label>
                <input
                  type="checkbox"
                  name="twoFaEnabled"
                  checked={settings.twoFaEnabled}
                  onChange={handleToggle2FA}
                />
              </div>

             
              <button type="submit" className="submit-button">
                Save Changes
              </button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <button
              className="delete-account-button"
              onClick={() => setShowDeleteAccountModal(true)}
            >
              Delete Account
            </button>

            {showDeleteAccountModal && (
              <div className="delete-account-modal">
                <div className="delete-account-modal-content">
                  <h3>Are you sure you want to delete your account?</h3>
                  <p>This action is permanent and cannot be undone.</p>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={passwordForDeletion}
                      onChange={(e) => setPasswordForDeletion(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowDeleteAccountModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              className="change-password-button"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change Password
            </button>

            {showChangePasswordModal && (
              <div className="change-password-modal">
                <div className="change-password-modal-content">
                  <h3>Change Your Password</h3>
                  <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                      <label>Old Password</label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="change-button">
                        Change Password
                      </button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setShowChangePasswordModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  {error && <div className="error-message">{error}</div>}
                  {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesaleSettings;
