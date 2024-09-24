import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Settings.css'; // Your CSS styles

const SettingsPage = () => {
    const navigate = useNavigate();
    const [sellerData, setSellerData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchSellerData = async () => {
            const sellerId = localStorage.getItem('sellerId');
            const accessToken = localStorage.getItem('accessToken');

            if (!sellerId || !accessToken) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/user/sellers/${sellerId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setSellerData(response.data);
                setFormData(response.data); // Set form data to fetched data
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching seller data');
                setLoading(false);
            }
        };

        fetchSellerData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sellerId = localStorage.getItem('sellerId');
        const accessToken = localStorage.getItem('accessToken');

        try {
            await axios.patch(`http://localhost:5000/user/update`, {
                ...formData,
                id: sellerId // Ensure id is included in the payload
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setSellerData(formData); // Update displayed data
            setIsEditing(false); // Exit editing mode
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating seller data');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="settings-page">
            <h2>Settings</h2>

            <form onSubmit={handleSubmit} className="settings-form">
                <section className="settings-section">
                    <h5>Personal Information</h5>
                    <div className="user-info-section">
                        <label>
                            Name:
                            <input 
                                type="text" 
                                name="contactPerson" 
                                value={formData.contactPerson || ''} 
                                onChange={handleChange} 
                                disabled={!isEditing} 
                            />
                        </label>
                        <label>
                            Email:
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email || ''} 
                                onChange={handleChange} 
                                disabled={!isEditing} 
                            />
                        </label>
                        <label>
                            Address:
                            <input 
                                type="text" 
                                name="address" 
                                value={formData.address || ''} 
                                onChange={handleChange} 
                                disabled={!isEditing} 
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input 
                                type="tel" 
                                name="phoneNumber" 
                                value={formData.phoneNumber || ''} 
                                onChange={handleChange} 
                                disabled={!isEditing} 
                            />
                        </label>
                    </div>
                </section>

                <section className="settings-section">
                    <h5>Store Information</h5>
                    <div className="user-info-section">
                        <label>
                            Store Name:
                            <input 
                                type="text" 
                                name="companyName" 
                                value={formData.companyName || ''} 
                                onChange={handleChange} 
                                disabled={!isEditing} 
                            />
                        </label>
                        <label>
                            Store Description:
                            <textarea 
                                name="description" 
                                value={formData.description || ''} 
                                onChange={handleChange} 
                                disabled={!isEditing}
                            ></textarea>
                        </label>
                    </div>
                </section>

                <button type="button" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && <button type="submit">Save Changes</button>}
            </form>
        </div>
    );
};

export default SettingsPage;
