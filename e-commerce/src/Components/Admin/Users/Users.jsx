import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faClipboardList, faChartLine, faCog, faSignOutAlt, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Users.css'; // Ensure to adjust path as per your project structure

const Users = () => {
   

    // State to manage active menu item
    const [activeMenuItem, setActiveMenuItem] = useState('Users');

    // Example: Mock user data
    const [users, setUsers] = useState([
        { id: 1, username: 'john_doe', fullName: 'John Doe', email: 'john@example.com' },
        { id: 2, username: 'jane_smith', fullName: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, username: 'alex_brown', fullName: 'Alex Brown', email: 'alex@example.com' },
    ]);

    // Example: State for editing user
    const [editingUser, setEditingUser] = useState(null);

    // Example: Function to handle edit user
    const handleEditUser = (userId) => {
        const userToEdit = users.find(user => user.id === userId);
        setEditingUser(userToEdit);
    };

    // Example: Function to handle delete user
    const handleDeleteUser = (userId) => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
    };

    // Example: Function to handle cancel edit
    const cancelEdit = () => {
        setEditingUser(null);
    };

    // Example: Function to handle save user changes
    const saveUser = (updatedUser) => {
        const updatedUsers = users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        setEditingUser(null);
    };

    // Function to handle click on menu item
    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    return (
        <div className="user-dashboard">
            {/* Header */}
            

            {/* Sidebar (sidenav) */}
            <div className="user-container">
                
                {/* Main Content */}
                <main className="user-main">
                    <div className="users-main-content">
                        {/* Display users list */}
                        <ul>
                            {users.map(user => (
                                <li key={user.id}>
                                    {editingUser && editingUser.id === user.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editingUser.username}
                                                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                                            />
                                            <input
                                                type="text"
                                                value={editingUser.fullName}
                                                onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                                            />
                                            <input
                                                type="email"
                                                value={editingUser.email}
                                                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                            />
                                            <button onClick={() => saveUser(editingUser)}>Save</button>
                                            <button onClick={cancelEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p><strong>Username:</strong> {user.username}</p>
                                            <p><strong>Full Name:</strong> {user.fullName}</p>
                                            <p><strong>Email:</strong> {user.email}</p>
                                            <button onClick={() => handleEditUser(user.id)}>Edit</button> <br/>
                                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Users;
