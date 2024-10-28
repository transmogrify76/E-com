import React, { useState, useEffect } from 'react';
import './NotiAd.css'; // Ensure this CSS file exists or adjust the path

const NotificationAdmin = () => {
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [sellers, setSellers] = useState([]);

    // Fetch sellers
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/sellers`);
                if (!response.ok) throw new Error('Failed to fetch sellers');
                const data = await response.json();
                setSellers(data);
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };

        fetchSellers();
    }, []);

    // Fetch notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/notifications`);
                if (!response.ok) throw new Error('Failed to fetch notifications');
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    // Create notification
    const createNotification = async () => {
        if (!message || !selectedUserId) {
            console.error('Both message and user ID are required');
            return;
        }

        try {
            const userId = parseInt(selectedUserId, 10);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/notifications/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId, message }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Failed to create notification');
            }

            const newNotification = await response.json();
            setNotifications((prev) => [...prev, newNotification]);
            setMessage('');
            setSelectedUserId('');
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };

    // Delete notification
    const deleteNotification = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/notifications/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete notification');

            setNotifications((prev) => prev.filter(notification => notification.id !== id));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <div className="notifications-page">
            <h1>Admin Notifications</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message"
            />
            <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                <option value="">Select Seller</option>
                {sellers.map(seller => (
                    <option key={seller.id} value={seller.id}>{seller.contactPerson}</option>
                ))}
            </select>
            <button onClick={createNotification}>Create Notification</button>
            {notifications.length === 0 ? (
                <p>No notifications available</p>
            ) : (
                <ul className="notification-list">
                    {notifications.map((notification) => (
                        <li key={notification.id}>
                            <p>{notification.message}</p>
                            <small>{new Date(notification.createdAt).toLocaleDateString()}</small>
                            <button onClick={() => deleteNotification(notification.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationAdmin;

