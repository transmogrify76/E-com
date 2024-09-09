// Users.js
import React, { useState, useEffect } from 'react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/users');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
        setError('Failed to load users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.id.toString().includes(value)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setEditUser({ ...user });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditUser(null);
  };

  const handleSaveEditUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/${editUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUsers = users.map((user) => (user.id === editUser.id ? editUser : user));
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setOpenEditDialog(false);
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user:', error.message);
      setError('Failed to update user. Please try again later.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } catch (error) {
        console.error('Error deleting user:', error.message);
        setError('Failed to delete user. Please try again later.');
      }
    }
  };

  return (
    <div className="admin-panel">
      <h2>Users List</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: '10px',
            width: '200px',  // Set the width to be smaller
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
          }}
          className="search-input"
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td className="actions" style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleViewUserDetails(user)} className="action-button view">View</button>
                  {/* <button onClick={() => handleEditUser(user)} className="action-button edit">Edit</button> */}
                  <button onClick={() => handleDeleteUser(user.id)} className="action-button delete">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* User Details Dialog */}
      {selectedUser && (
        <div className={`dialog ${openDetailsDialog ? 'open' : 'closed'}`}>
          <div className="dialog-content">
            <h3>User Details</h3>
            <p>ID: {selectedUser.id}</p>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Phone Number: {selectedUser.phoneNumber}</p>
            <button onClick={handleCloseDetailsDialog}>Close</button>
          </div>
        </div>
      )}

      {/* User Edit Dialog */}
      {editUser && (
        <div className={`dialog ${openEditDialog ? 'open' : 'closed'}`}>
          <div className="dialog-content">
            <h3>Edit User</h3>
            <label>
              Name:
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                style={{
                  display: 'block',
                  width: 'calc(100% - 20px)', // Adjust width according to the container
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginTop: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box' // Ensures padding and border are included in the width
                }}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                style={{
                  display: 'block',
                  width: 'calc(100% - 20px)', // Adjust width according to the container
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginTop: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box' // Ensures padding and border are included in the width
                }}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                value={editUser.phoneNumber}
                onChange={(e) => setEditUser({ ...editUser, phoneNumber: e.target.value })}
                style={{
                  display: 'block',
                  width: 'calc(100% - 20px)', // Adjust width according to the container
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginTop: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box' // Ensures padding and border are included in the width
                }}
              />
            </label>
            <button onClick={handleSaveEditUser} style={{ marginRight: '10px' }}>Save Changes</button>
            <button onClick={handleCloseEditDialog}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;


