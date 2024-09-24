import React, { useState, useEffect } from 'react';
import './Notification.css'; // Ensure you have the correct CSS file

const SellerNotifications = ({ sellerId }) => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!sellerId) return; // Don't fetch if there's no seller ID
            try {
                const response = await fetch(`http://localhost:5000/notifications/${sellerId}`);
                if (!response.ok) throw new Error('Failed to fetch notifications');
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError('Failed to load notifications. Please try again later.');
            }
        };

        fetchNotifications();
    }, [sellerId]); // Fetch notifications whenever sellerId changes

    return (
        <div className="seller-notifications">
            <h2>Notifications for Seller ID: {sellerId}</h2>
            {error && <p className="error-message">{error}</p>}
            {notifications.length === 0 ? (
                <p>No notifications available for this seller.</p>
            ) : (
                <ul className="notification-list">
                    {notifications.map(notification => (
                        <li key={notification.id}>
                            <p>{notification.message}</p>
                            <small>{new Date(notification.createdAt).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SellerNotifications;
