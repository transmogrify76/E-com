import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons
import './Users.css';

const AdminPanelUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editUser, setEditUser] = useState(null); // Track the user being edited

  useEffect(() => {
    // Simulating fetching users data
    const fetchUsers = async () => {
      try {
        // Simulated data for demonstration
        const simulatedUsers = [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', registrationDate: '2023-07-01', phone: '123-456-7890' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', registrationDate: '2023-07-05', phone: '234-567-8901' },
          { id: 3, name: 'Michael Johnson', email: 'michael@example.com', role: 'User', registrationDate: '2023-07-10', phone: '345-678-9012' },
          { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'User', registrationDate: '2023-07-15', phone: '456-789-0123' },
          { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Admin', registrationDate: '2023-07-20', phone: '567-890-1234' },
          { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', registrationDate: '2023-07-25', phone: '678-901-2345' },
          { id: 7, name: 'Ryan Garcia', email: 'ryan@example.com', role: 'User', registrationDate: '2023-07-30', phone: '789-012-3456' },
        ];

        setUsers(simulatedUsers);
        setSortedUsers(simulatedUsers); // Initialize sortedUsers with the fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle role filter change
  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  // Filter users based on search term and role filter
  useEffect(() => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (roleFilter === 'All' || user.role === roleFilter)
    );
    setSortedUsers(filteredUsers);
  }, [users, searchTerm, roleFilter]);

  // Sort users based on sortBy and sortOrder
  useEffect(() => {
    const sortedUsersCopy = [...sortedUsers];
    sortedUsersCopy.sort((a, b) => {
      const aValue = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
      const bValue = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedUsers(sortedUsersCopy);
  }, [sortedUsers, sortBy, sortOrder]);

  // Handle sorting change
  const handleSortChange = (property) => {
    if (sortBy === property) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(property);
      setSortOrder('asc');
    }
  };

  // View user details dialog handlers
  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };

  // Edit user dialog handlers
  const handleEditUser = (user) => {
    setEditUser({ ...user }); // Set the user being edited
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditUser(null); // Clear the editUser state after closing the dialog
  };

  // Handle editing user details
  const handleSaveEditUser = () => {
    const updatedUsers = users.map((user) => (user.id === editUser.id ? editUser : user));
    setUsers(updatedUsers);
    setSortedUsers(updatedUsers);
    setOpenEditDialog(false);
    setEditUser(null); // Clear editUser state after saving
  };

  // Delete user handler
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setSortedUsers(updatedUsers);
  };

  return (
    <div className="admin-panel-container">
      <h2>Users List</h2>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={roleFilter} onChange={handleRoleFilterChange} className="filter-select">
          <option value="All">All Roles</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option> {/* Added Admin role filter */}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortChange('name')}>
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSortChange('email')}>
              Email {sortBy === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSortChange('phone')}>
              Phone {sortBy === 'phone' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th>Role</th>
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{user.registrationDate}</td>
              <td>
                <div className="action-buttons">
                  <button className="button button-view" onClick={() => handleViewUserDetails(user)}>
                    <FaEye /> View
                  </button>
                  <button className="button button-edit" onClick={() => handleEditUser(user)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="button button-delete" onClick={() => handleDeleteUser(user.id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Details Dialog */}
      {openDetailsDialog && (
        <div className="dialog">
          <h3>User Details</h3>
          {selectedUser && (
            <div>
              <p>Name: {selectedUser.name}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Role: {selectedUser.role}</p>
              <p>Registration Date: {selectedUser.registrationDate}</p>
            </div>
          )}
          <button className="button button-close" onClick={handleCloseDetailsDialog}>Close</button>
        </div>
      )}

      {/* Edit User Dialog */}
      {openEditDialog && (
        <div className="dialog">
          <h3>Edit User</h3>
          {editUser && (
            <form>
              <input
                type="text"
                placeholder="Name"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                value={editUser.phone}
                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
              />
            </form>
          )}
          <div className="dialog-buttons"> {/* Added wrapper for buttons */}
            <button className="button button-cancel" onClick={handleCloseEditDialog}>Cancel</button>
            <button className="button button-save" onClick={handleSaveEditUser}>Save</button>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default AdminPanelUser;
