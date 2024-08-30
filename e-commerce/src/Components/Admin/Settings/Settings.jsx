import React, { useState } from 'react';
import './Settings.css'; // Import CSS for styling

const Settings = () => {
  // State for storing settings data
  const [storeSettings, setStoreSettings] = useState({
    siteName: 'Example Site',
    siteLogo: null,
    siteAddress: '',
    siteEmail: '',
    storePhone: '',
    timeZone: 'UTC+0',
    currency: 'USD',
    taxRate: 10,
    freeShippingThreshold: 50,
    maxItemsPerPage: 10,
    paymentGateway: 'paypal',
    bankAccount: '',
    emailNotifications: true,
    smsNotifications: false,
    enable2FA: false,
  });

  // Function to handle saving settings
  const handleSaveSettings = () => {
    console.log('Saving settings:', storeSettings);
    alert('Settings saved successfully!');
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setStoreSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  return (
    <div className="settings-container">
     <h2 style={{ marginLeft: '380px' }}>Settings</h2>


      <div className="settings-flex-container">
        {/* Site Information Card */}
        <div className="settings-card">
          <h3>Site Information</h3>
          <div className="form-group">
            <label>Site Name:</label>
            <input
              type="text"
              name="siteName"
              value={storeSettings.siteName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Site Logo:</label>
            <input
              type="file"
              name="siteLogo"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Site Address:</label>
            <textarea
              name="siteAddress"
              value={storeSettings.siteAddress}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Site Email:</label>
            <input
              type="email"
              name="siteEmail"
              value={storeSettings.siteEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Store Phone:</label>
            <input
              type="tel"
              name="storePhone"
              value={storeSettings.storePhone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Operational Settings Card */}
        <div className="settings-card">
          <h3>Operational Settings</h3>
          <div className="form-group">
            <label>Time Zone:</label>
            <input
              type="text"
              name="timeZone"
              value={storeSettings.timeZone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Currency:</label>
            <select
              name="currency"
              value={storeSettings.currency}
              onChange={handleInputChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tax Rate:</label>
            <input
              type="number"
              name="taxRate"
              value={storeSettings.taxRate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Free Shipping Threshold:</label>
            <input
              type="number"
              name="freeShippingThreshold"
              value={storeSettings.freeShippingThreshold}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Max Items Per Page:</label>
            <input
              type="number"
              name="maxItemsPerPage"
              value={storeSettings.maxItemsPerPage}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="settings-flex-container">
        {/* Payment Settings Card */}
        <div className="settings-card">
          <h3>Payment Settings</h3>
          <div className="form-group">
            <label>Payment Gateway:</label>
            <select
              name="paymentGateway"
              value={storeSettings.paymentGateway}
              onChange={handleInputChange}
            >
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
              <option value="square">Square</option>
            </select>
          </div>
          <div className="form-group">
            <label>Bank Account:</label>
            <input
              type="text"
              name="bankAccount"
              value={storeSettings.bankAccount}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Notification and Security Settings Card */}
        <div className="settings-card">
          <h3>Notification & Security Settings</h3>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={storeSettings.emailNotifications}
                onChange={handleInputChange}
              />{' '}
              Email Notifications
            </label>
         
            <label>
              <input
                type="checkbox"
                name="smsNotifications"
                checked={storeSettings.smsNotifications}
                onChange={handleInputChange}
              />{' '}
              SMS Notifications
            </label>
         
            <label>
              <input
                type="checkbox"
                name="enable2FA"
                checked={storeSettings.enable2FA}
                onChange={handleInputChange}
              />{' '}
              Enable Two-Factor Authentication
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="btn-save" onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
