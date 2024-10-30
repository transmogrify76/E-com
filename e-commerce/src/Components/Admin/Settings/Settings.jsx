import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Settings.css';

const Settings = () => {
    const [siteSettings, setSiteSettings] = useState({
        siteName: '',
        siteLogo: '',
        siteAddress: '',
        siteEmail: '',
        storePhone: '',
    });

    const [storeSettings, setStoreSettings] = useState({
        timeZone: '',
        currency: 'USD',
        taxRate: '',
        freeShippingThreshold: '',
        orderProcessingTime: '',
        facebook: '',
        instagram: '',
        twitter: '',
        minimumOrderAmount: '',
        backupFrequency: 'Weekly',
    });

    const [error, setError] = useState(null);
    const [adminId, setAdminId] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const id = decodedToken.sub;
                setAdminId(id);
                
                if (isInitialLoad) {
                    fetchSettings(id);
                    fetchOperationalSettings(id);
                    setIsInitialLoad(false);
                }
            } catch (error) {
                setError('Failed to decode token. Please log in again.');
            }
        } else {
            setError('No access token found. Please log in again.');
        }
    }, [isInitialLoad]);

    const fetchSettings = async (adminId) => {
        if (!adminId) {
            setError('Admin ID is not available. Please log in again.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/settings/${adminId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch settings');
            }

            const settings = await response.json();
            setSiteSettings(settings);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setError('Error fetching settings. Please try again.');
        }
    };

    const fetchOperationalSettings = async (adminId) => {
        if (!adminId) {
            setError('Admin ID is not available. Please log in again.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/operational-settings/${adminId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch operational settings');
            }

            const settings = await response.json();
            setStoreSettings(settings);
        } catch (error) {
            console.error('Error fetching operational settings:', error);
            setError('Error fetching operational settings. Please try again.');
        }
    };

    const handleSaveSettings = async () => {
        if (!adminId) {
            setError('Admin ID is not available. Please log in again.');
            return;
        }

        const settingsToSave = {
            adminId,
            ...siteSettings,
        };

        try {
            const postResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settingsToSave),
            });

            if (!postResponse.ok) {
                throw new Error('Failed to save settings');
            }

            const postResult = await postResponse.json();
            console.log('Settings created successfully:', postResult);
            fetchSettings(adminId); // Fetch settings after creation
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            setError('Error saving settings. Please try again.');
        }
    };

    const handleUpdateSettings = async () => {
        if (!adminId) {
            setError('Admin ID is not available. Please log in again.');
            return;
        }

        const settingsToUpdate = {
            adminId,
            ...siteSettings,
        };

        try {
            const patchResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/settings/${adminId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settingsToUpdate),
            });

            if (!patchResponse.ok) {
                throw new Error('Failed to update settings');
            }

            const patchResult = await patchResponse.json();
            console.log('Settings updated successfully:', patchResult);
            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating settings:', error);
            setError('Error updating settings. Please try again.');
        }
    };

    const handleSaveOperationalSettings = async () => {
        if (!adminId) {
            setError('Admin ID is not available. Please log in again.');
            return;
        }

        const settingsToSave = {
            adminId,
            ...storeSettings,
            taxRate: parseFloat(storeSettings.taxRate) || 0,
            freeShippingThreshold: parseFloat(storeSettings.freeShippingThreshold) || 0,
            orderProcessingTime: parseFloat(storeSettings.orderProcessingTime) || 0,
            minimumOrderAmount: parseFloat(storeSettings.minimumOrderAmount) || 0,
        };

        try {
            const postResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/operational-settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settingsToSave),
            });

            if (!postResponse.ok) {
                throw new Error('Failed to save operational settings');
            }

            const postResult = await postResponse.json();
            console.log('Operational settings created successfully:', postResult);
            alert('Operational settings saved successfully!');
            fetchOperationalSettings(adminId);
        } catch (error) {
            console.error('Error saving operational settings:', error);
            setError('Error saving operational settings. Please try again.');
        }
    };

    const handleUpdateOperationalSettings = async () => {
        if (!adminId) {
            setError('Admin ID is not available. Please log in again.');
            return;
        }

        const settingsToUpdate = {
            adminId,
            ...storeSettings,
            taxRate: parseFloat(storeSettings.taxRate) || 0,
            freeShippingThreshold: parseFloat(storeSettings.freeShippingThreshold) || 0,
            orderProcessingTime: parseFloat(storeSettings.orderProcessingTime) || 0,
            minimumOrderAmount: parseFloat(storeSettings.minimumOrderAmount) || 0,
        };

        try {
            const patchResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/operational-settings/${adminId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settingsToUpdate),
            });

            if (!patchResponse.ok) {
                throw new Error('Failed to update operational settings');
            }

            const patchResult = await patchResponse.json();
            console.log('Operational settings updated successfully:', patchResult);
            alert('Operational settings updated successfully!');
        } catch (error) {
            console.error('Error updating operational settings:', error);
            setError('Error updating operational settings. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSiteSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleOperationalInputChange = (e) => {
        const { name, value } = e.target;
        setStoreSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    return (
        <div className="settings-container">
            <h2 style={{ marginLeft: '380px' }}> Settings</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="settings-flex-container">
                <div className="settings-card">
                    <h3>Site Settings</h3>
                    <div className="form-group">
                        <label>Admin ID:</label>
                        <input type="text" value={adminId || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Site Name:</label>
                        <input
                            type="text"
                            name="siteName"
                            value={siteSettings.siteName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Site Logo URL:</label>
                        <input
                            type="url"
                            name="siteLogo"
                            value={siteSettings.siteLogo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Site Address:</label>
                        <input
                            type="text"
                            name="siteAddress"
                            value={siteSettings.siteAddress}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Site Email:</label>
                        <input
                            type="email"
                            name="siteEmail"
                            value={siteSettings.siteEmail}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Store Phone:</label>
                        <input
                            type="tel"
                            name="storePhone"
                            value={siteSettings.storePhone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn-save" onClick={handleSaveSettings}>
                Save Site Settings
            </button>
            <button className="btn-update" onClick={handleUpdateSettings}>
                Update Site Settings
            </button>
                </div>
                
                <div className="settings-card">
                    <h3>Operational Settings</h3>
                    <div className="form-group">
                        <label>Time Zone:</label>
                        <input
                            type="text"
                            name="timeZone"
                            value={storeSettings.timeZone}
                            onChange={handleOperationalInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Currency:</label>
                        <select
                            name="currency"
                            value={storeSettings.currency}
                            onChange={handleOperationalInputChange}
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
                            onChange={handleOperationalInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Free Shipping Threshold:</label>
                        <input
                            type="number"
                            name="freeShippingThreshold"
                            value={storeSettings.freeShippingThreshold}
                            onChange={handleOperationalInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Order Processing Time (days):</label>
                        <input
                            type="number"
                            name="orderProcessingTime"
                            value={storeSettings.orderProcessingTime}
                            onChange={handleOperationalInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Facebook URL:</label>
                        <input
                            type="url"
                            name="facebook"
                            value={storeSettings.facebook}
                            onChange={handleOperationalInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Instagram URL:</label>
                        <input
                            type="url"
                            name="instagram"
                            value={storeSettings.instagram}
                            onChange={handleOperationalInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Twitter URL:</label>
                        <input
                            type="url"
                            name="twitter"
                            value={storeSettings.twitter}
                            onChange={handleOperationalInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Minimum Order Amount:</label>
                        <input
                            type="number"
                            name="minimumOrderAmount"
                            value={storeSettings.minimumOrderAmount}
                            onChange={handleOperationalInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Backup Frequency:</label>
                        <select
                            name="backupFrequency"
                            value={storeSettings.backupFrequency}
                            onChange={handleOperationalInputChange}
                        >
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                </div>
            </div>

            
            <button className="btn-save" onClick={handleSaveOperationalSettings}>
                Save Operational Settings
            </button>
            <button className="btn-update" onClick={handleUpdateOperationalSettings}>
                Update Operational Settings
            </button>
        </div>
    );
};

export default Settings;
