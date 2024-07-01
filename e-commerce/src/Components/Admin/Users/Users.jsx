import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faClipboardList, faChartLine, faCog, faSignOutAlt, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Users.css'; // Ensure to adjust path as per your project structure

const Users = () => {
    const user = {
        username: 'Admin', // Replace with actual admin username
        avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
    };

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
            <header className="header">
                <div className="header-left">
                    <h2>Users Management</h2>
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="badge">5</span>
                        
                    </div>
                </div>
            </header>

            {/* Sidebar (sidenav) */}
            <div className="user-container">
                <nav className="sidenav">
                    <ul>
                        <li className={activeMenuItem === 'Users' ? 'active' : ''}>
                            <Link to="/Users" onClick={() => handleMenuItemClick('Users')}>
                                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
                                Users Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Products' ? 'active' : ''}>
                            <Link to="/Products" onClick={() => handleMenuItemClick('Products')}>
                                <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '8px' }} />
                                Products Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Orders' ? 'active' : ''}>
                            <Link to="/Order" onClick={() => handleMenuItemClick('Order')}>
                                <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                                Orders Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Reports' ? 'active' : ''}>
                            <Link to="/Reports" onClick={() => handleMenuItemClick('Reports')}>
                                <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
                                Reports & Analytics
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Settings' ? 'active' : ''}>
                            <Link to="/Settings" onClick={() => handleMenuItemClick('Settings')}>
                                <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                                Settings
                            </Link>
                        </li>
                        <li>
                            <a href="/Logout">
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>

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
