import React, { useState } from 'react';
import './NotiAd.css';

const notificationsData = [
    { id: 1, message: 'User John Doe has registered.', createdAt: '2024-08-21T08:00:00Z', read: false },
    { id: 2, message: 'Order #12345 has been placed.', createdAt: '2024-08-22T09:15:00Z', read: true },
    { id: 3, message: 'Product XYZ has low stock.', createdAt: '2024-08-22T10:30:00Z', read: false },
    { id: 4, message: 'New review received for product ABC.', createdAt: '2024-08-22T11:45:00Z', read: true },
    { id: 5, message: 'Monthly report has been generated.', createdAt: '2024-08-22T12:00:00Z', read: false },
];

const AdminNotificationsPage = () => {
    const [notifications, setNotifications] = useState(notificationsData);

    const markAsRead = (id) => {
        setNotifications(notifications.map(notification => 
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    return (
        <div className="admin-notifications">
            <h1>Admin Notifications</h1>
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                <ul className="notification-list">
                    {notifications.map(notification => (
                        <li 
                            key={notification.id}
                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
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

export default AdminNotificationsPage;
