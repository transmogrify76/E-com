import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
// } from '@material-ui/core';
// import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@material-ui/icons';
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
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', registrationDate: '2023-07-01' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', registrationDate: '2023-07-05' },
          { id: 3, name: 'Michael Johnson', email: 'michael@example.com', role: 'User', registrationDate: '2023-07-10' },
          { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'User', registrationDate: '2023-07-15' },
          { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Admin', registrationDate: '2023-07-20' },
          { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', registrationDate: '2023-07-25' },
          { id: 7, name: 'Ryan Garcia', email: 'ryan@example.com', role: 'User', registrationDate: '2023-07-30' },
        ];

        setUsers(simulatedUsers);
        setSortedUsers(simulatedUsers); // Initialize sortedUsers with the fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error (e.g., show error message)
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
    // Implement save functionality (e.g., API call to update user)
    console.log('Edited user:', editUser);
    // Update the UI or perform actions based on the edited user data
    // For demonstration, you can update the state directly or call an API to persist the changes
    const updatedUsers = users.map((user) => (user.id === editUser.id ? editUser : user));
    setUsers(updatedUsers);
    setSortedUsers(updatedUsers);
    setOpenEditDialog(false);
    setEditUser(null); // Clear editUser state after saving
  };

  // Delete user handler
  const handleDeleteUser = (userId) => {
    // Implement delete functionality here (e.g., API call)
    console.log(`Delete user with ID: ${userId}`);
    // Update UI after deletion (remove user from list)
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setSortedUsers(updatedUsers);
  };

  return (
    <div className="admin-panel-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Users List</Typography>
              <div className="search-filter-container">
                <TextField
                  label="Search by Name"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <TextField
                  select
                  label="Filter by Role"
                  variant="outlined"
                  value={roleFilter}
                  onChange={handleRoleFilterChange}
                  className="filter-select"
                >
                  <MenuItem key="All" value="All">
                    All Roles
                  </MenuItem>
                  <MenuItem key="User" value="User">
                    User
                  </MenuItem>
                  {/* <MenuItem key="Admin" value="Admin">
                    Admin
                  </MenuItem> */}
                </TextField>
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Button onClick={() => handleSortChange('name')}>
                        Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleSortChange('email')}>
                        Email {sortBy === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                      </Button>
                    </TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Registration Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.registrationDate}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleViewUserDetails(user)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEditUser(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteUser(user.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} fullWidth maxWidth="sm">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <Typography variant="subtitle1">Name: {selectedUser.name} </Typography>
              <Typography variant="subtitle1">Email: {selectedUser.email}</Typography>
              <Typography variant="subtitle1">Role: {selectedUser.role}</Typography>
              <Typography variant="subtitle1">Registration Date: {selectedUser.registrationDate}</Typography>
              {/* Add more details as needed */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {/* Form for editing user details */}
          {editUser && (
            <form>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              {/* Add more fields as needed */}
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEditUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPanelUser;
