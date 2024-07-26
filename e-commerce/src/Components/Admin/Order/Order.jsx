import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Grid, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Menu, MenuItem,
} from '@material-ui/core';
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon, ShoppingCart as OrderIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './Order.css';

const AdminOrder = () => {
  const initialOrders = [
    { id: 1, customer: 'John Doe', phone: '123-456-7890', datetime: '2024-07-11 10:30 AM', products: 3, amount: 150.00, status: 'Paid' },
    { id: 2, customer: 'Jane Smith', phone: '234-567-8901', datetime: '2024-07-10 12:00 PM', products: 2, amount: 100.50, status: 'Pending' },
    { id: 3, customer: 'Michael Johnson', phone: '345-678-9012', datetime: '2024-07-09 03:45 PM', products: 4, amount: 220.25, status: 'Processing' },
    { id: 4, customer: 'Emily Davis', phone: '456-789-0123', datetime: '2024-07-08 11:15 AM', products: 1, amount: 75.00, status: 'Cancelled' },
    { id: 5, customer: 'Sarah Adams', phone: '567-890-1234', datetime: '2024-07-07 09:00 AM', products: 5, amount: 300.75, status: 'Paid' },
    { id: 6, customer: 'David Wilson', phone: '678-901-2345', datetime: '2024-07-06 02:30 PM', products: 2, amount: 100.50, status: 'Cancelled' },
    { id: 7, customer: 'Sophia Brown', phone: '789-012-3456', datetime: '2024-07-05 04:30 PM', products: 3, amount: 180.00, status: 'Processing' },
    { id: 8, customer: 'Liam Miller', phone: '890-123-4567', datetime: '2024-07-04 08:45 AM', products: 2, amount: 95.50, status: 'Pending' },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all'); // Track the selected filter

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    const filteredOrders = initialOrders.filter(order =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setOrders(filteredOrders);
  };

  const handleClearFilters = () => {
    setFilters([]);
    setOrders(initialOrders);
    setSearchTerm('');
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
  };

  const handleEditOrder = (orderId) => {
    console.log(`Edit order with ID: ${orderId}`);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenu(menuItem);
    console.log(`Selected menu item: ${menuItem}`);
    setAnchorEl(null); // Close the menu after selection
  };

  const handleFilterByStatus = (status) => {
    const filteredOrders = initialOrders.filter(order =>
      status === '' || order.status === status
    );
    setOrders(filteredOrders);
  };

  // Calculate percentages for completed and canceled orders
  const completedOrders = initialOrders.filter(order => order.status === 'Paid');
  const canceledOrders = initialOrders.filter(order => order.status === 'Cancelled');
  const activeOrders = initialOrders.filter(order => order.status !== 'Paid' && order.status !== 'Cancelled');
  const totalOrders = initialOrders.length;
  const completedPercentage = (completedOrders.length / totalOrders) * 100;
  const canceledPercentage = (canceledOrders.length / totalOrders) * 100;
  const activePercentage = (activeOrders.length / totalOrders) * 100;
  const totalOrdersPercentage = 80;

  const getFilteredOrders = () => {
    switch (selectedFilter) {
      case 'completed':
        return completedOrders;
      case 'cancelled':
        return canceledOrders;
      case 'active':
        return activeOrders;
      default:
        return initialOrders;
    }
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="main-container">
      <Grid container spacing={3}>
        {/* Total Orders Card */}
        <Grid item xs={3}>
          <Card className="card" onClick={() => setSelectedFilter('all')}>
            <CardContent>
              <div className="card-content">
                <Typography variant="h6" className="card-title">Total Orders</Typography>
                <div className="progress-circle">
                  <Typography className="progress-circle-text">{totalOrdersPercentage}%</Typography>
                </div>
              </div>
              <div className="card-content">
                <Typography variant="subtitle1">{totalOrders} orders</Typography>
                <OrderIcon style={{ fontSize: 40, color: '#3f51b5' }} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Orders Card */}
        <Grid item xs={3}>
          <Card className="card" onClick={() => setSelectedFilter('active')}>
            <CardContent>
              <div className="card-content">
                <Typography variant="h6" className="card-title">Active Orders</Typography>
                <div className="progress-circle">
                  <Typography className="progress-circle-text">{activePercentage.toFixed(0)}%</Typography>
                </div>
              </div>
              <div className="card-content">
                <Typography variant="subtitle1">
                  {activeOrders.length} active
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Completed Orders Card */}
        <Grid item xs={3}>
          <Card className="card" onClick={() => setSelectedFilter('completed')}>
            <CardContent>
              <div className="card-content">
                <Typography variant="h6" className="card-title">Completed Orders</Typography>
                <div className="progress-circle">
                  <Typography className="progress-circle-text">{completedPercentage.toFixed(0)}%</Typography>
                </div>
              </div>
              <div className="card-content">
                <Typography variant="subtitle1">
                  {completedOrders.length} completed
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Canceled Orders Card */}
        <Grid item xs={3}>
          <Card className="card" onClick={() => setSelectedFilter('cancelled')}>
            <CardContent>
              <div className="card-content">
                <Typography variant="h6" className="card-title">Cancelled Orders</Typography>
                <div className="progress-circle">
                  <Typography className="progress-circle-text">{canceledPercentage.toFixed(0)}%</Typography>
                </div>
              </div>
              <div className="card-content">
                <Typography variant="subtitle1">
                  {canceledOrders.length} cancelled
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Search and Filters Section */}
        <Grid item xs={12}>
          <Card className="search-filters-section">
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                {/* Search Orders */}
                <Grid item xs={6}>
                  <Typography variant="h6">Search Orders</Typography>
                  <TextField
                    label="Search by customer"
                    variant="outlined"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="search-button"
                    onClick={handleSearchSubmit}
                  >
                    <SearchIcon />
                  </Button>
                </Grid>

                {/* Filters */}
                <Grid item xs={6} container justify="flex-end" spacing={1}>
                  <Typography variant="h6">Filters:</Typography>
                  {filters.length > 0 && (
                    <Button
                      variant="outlined"
                      className="filter-button"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  )}
                  {/* Dropdown for managing orders */}
                  <Button
                    variant="outlined"
                    className="filter-button"
                    aria-controls="manage-orders-menu"
                    aria-haspopup="true"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    Manage Orders
                  </Button>
                  <Menu
                    id="manage-orders-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem component={Link} to="/shipments" onClick={() => handleMenuItemClick('Shipments')}>
                      Shipments
                    </MenuItem>
                    <MenuItem component={Link} to="/invoice" onClick={() => handleMenuItemClick('Invoice')}>
                      Invoice
                    </MenuItem>
                    <MenuItem component={Link} to="/refunds" onClick={() => handleMenuItemClick('Refunds')}>
                      Refunds
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Order List */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order List</Typography>
              <Table className="table">
                <TableHead>
                  <TableRow>
                    <TableCell className="table-cell">Bill No.</TableCell>
                    <TableCell className="table-cell">Customer Name</TableCell>
                    <TableCell className="table-cell">Phone No.</TableCell>
                    <TableCell className="table-cell">Date Time</TableCell>
                    <TableCell className="table-cell">Total Products</TableCell>
                    <TableCell className="table-cell">Total Amount Paid</TableCell>
                    <TableCell className="table-cell">Paid Status</TableCell>
                    <TableCell className="table-cell">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="table-cell">{order.id}</TableCell>
                      <TableCell className="table-cell">{order.customer}</TableCell>
                      <TableCell className="table-cell">{order.phone}</TableCell>
                      <TableCell className="table-cell">{order.datetime}</TableCell>
                      <TableCell className="table-cell">{order.products}</TableCell>
                      <TableCell className="table-cell">₹{order.amount.toFixed(2)}</TableCell>
                      <TableCell className="table-cell">{order.status}</TableCell>
                      <TableCell className="table-cell">
                        <IconButton color="primary" size="small" onClick={() => handleEditOrder(order.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" size="small" onClick={() => handleDeleteOrder(order.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="table-cell">
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminOrder;
