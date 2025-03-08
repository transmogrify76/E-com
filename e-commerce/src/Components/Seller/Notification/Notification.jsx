import React, { useState, useEffect } from 'react';

const SellerNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            const sellerId = localStorage.getItem('sellerId'); // Assuming seller ID is stored in local storage
            if (!sellerId) {
                setError('No seller ID provided. Please log in.');
                return;
            }
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/notifications/seller/${sellerId}`);
                if (!response.ok) throw new Error('Failed to fetch notifications');
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div>
            <h2>My Notifications</h2>
            {error && <p>{error}</p>}
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id}>
                            <p>{notification.message}</p>
                            <small>{new Date(notification.createdAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SellerNotifications;
