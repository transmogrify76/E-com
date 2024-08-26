// src/components/NotificationsPage.js
import React, { useState } from 'react';
import './Notification.css';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Your product listing "Wireless Headphones" has been approved.', createdAt: '2024-08-20', read: false },
        { id: 2, message: 'You have received a new order from customer John Doe.', createdAt: '2024-08-21', read: true },
        { id: 3, message: 'The price of your listed item "Smartwatch" has been updated to ₹299.', createdAt: '2024-08-22', read: false },
        { id: 4, message: 'New review left on your product "4K TV".', createdAt: '2024-08-23', read: false },
        { id: 5, message: 'You have a new message from the support team regarding your account.', createdAt: '2024-08-24', read: true },
    ]);

    const markAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    return (
        <div className="notifications-page">
            <h1>Notifications</h1>
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                <ul className="notification-list">
                    {notifications.map(notification => (
                        <li 
                            key={notification.id}
                            className={notification.read ? 'notification read' : 'notification unread'}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <p>{notification.message}</p>
                            <small>{new Date(notification.createdAt).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationsPage;
