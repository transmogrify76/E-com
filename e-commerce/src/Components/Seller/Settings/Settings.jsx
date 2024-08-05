
// Settings.jsx
import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  // State for Account Settings
  const [accountSettings, setAccountSettings] = useState({
    username: '',
    password: '',
    enable2FA: false,
    emailNotifications: false,
    smsNotifications: false,
  });

  // State for Store Information
  const [storeInformation, setStoreInformation] = useState({
    storeName: '',
    storeLogo: null,
    storeAddress: '',
    storeEmail: '',
    storePhone: '',
    aboutUs: '',
  });

  // State for Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    paymentGateway: 'paypal',
    bankAccount: '',
    currency: 'usd',
  });

  // Handle form submission for Account Settings
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    console.log('Account Settings submitted');
    console.log('Account Settings:', accountSettings);
    // Add logic to save account settings
  };

  // Handle form submission for Store Information
  const handleStoreSubmit = (e) => {
    e.preventDefault();
    console.log('Store Information submitted');
    console.log('Store Information:', storeInformation);
    // Add logic to save store information
  };

  // Handle form submission for Payment Settings
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Settings submitted');
    console.log('Payment Settings:', paymentSettings);
    // Add logic to save payment settings
  };

  // Handle change for Account Settings
  const handleAccountChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccountSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle change for Store Information
  const handleStoreChange = (e) => {
    const { name, value, files } = e.target;
    setStoreInformation((prevInfo) => ({
      ...prevInfo,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle change for Payment Settings
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  return (
    <div className="app-container-settings">
      {/* Account Settings Card */}
      <div className="settings-card">
        <h2 className="settings-heading">Account Settings</h2>
        <div className="settings-content">
          <form className="settings-form" onSubmit={handleAccountSubmit}>

            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={accountSettings.username}
                onChange={handleAccountChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={accountSettings.password}
                onChange={handleAccountChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="enable2FA"
                  checked={accountSettings.enable2FA}
                  onChange={handleAccountChange}
                />{' '}
                Enable Two-Factor Authentication
              </label>
            </div>

          
              <label>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={accountSettings.emailNotifications}
                  onChange={handleAccountChange}
                />{' '}
                Email Notifications 
              </label>
         

            
              <label>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={accountSettings.smsNotifications}
                  onChange={handleAccountChange}
                />{' '}
                SMS Notifications
              </label>
          

           

          </form>
        </div>
      </div>

      {/* Store Information Card */}
      <div className="settings-card">
        <h2 className="settings-heading">Store Information</h2>
        <div className="settings-content">
          <form className="settings-form" onSubmit={handleStoreSubmit}>

            <div className="form-group">
              <label htmlFor="store-name">Store Name:</label>
              <input
                type="text"
                id="store-name"
                name="storeName"
                value={storeInformation.storeName}
                onChange={handleStoreChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="store-logo">Upload Logo:</label>
              <input
                type="file"
                id="store-logo"
                name="storeLogo"
                onChange={handleStoreChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="store-address">Store Address:</label>
              <textarea
                id="store-address"
                name="storeAddress"
                value={storeInformation.storeAddress}
                onChange={handleStoreChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="store-email">Store Email:</label>
              <input
                type="email"
                id="store-email"
                name="storeEmail"
                value={storeInformation.storeEmail}
                onChange={handleStoreChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="store-phone">Store Phone Number:</label>
              <input
                type="tel"
                id="store-phone"
                name="storePhone"
                value={storeInformation.storePhone}
                onChange={handleStoreChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="about-us">About Us:</label>
              <textarea
                id="about-us"
                name="aboutUs"
                value={storeInformation.aboutUs}
                onChange={handleStoreChange}
                rows="6"
                required
              />
            </div>

           

          </form>
        </div>
      </div>

      {/* Payment Settings Card */}
      <div className="settings-card">
        <h2 className="settings-heading">Payment Settings</h2>
        <div className="settings-content">
          <form className="settings-form" onSubmit={handlePaymentSubmit}>

            <div className="form-group">
              <label htmlFor="payment-gateway">Payment Gateway:</label>
              <select
                id="payment-gateway"
                name="paymentGateway"
                value={paymentSettings.paymentGateway}
                onChange={handlePaymentChange}
                required
              >
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
                <option value="square">Square</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bank-account">Bank Account Details:</label>
              <textarea
                id="bank-account"
                name="bankAccount"
                value={paymentSettings.bankAccount}
                onChange={handlePaymentChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="currency">Currency:</label>
              <select
                id="currency"
                name="currency"
                value={paymentSettings.currency}
                onChange={handlePaymentChange}
                required
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
              </select>
            </div>

            <button type="submit" className="btn-savee">
              Save  Settings
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
