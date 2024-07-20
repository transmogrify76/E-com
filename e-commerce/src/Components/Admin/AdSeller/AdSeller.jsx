import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons';
import './AdSeller.css';

const AdminPanelSeller = () => {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Simulating fetching sellers data
    const fetchSellers = async () => {
      try {
        // Simulated data for demonstration
        const simulatedSellers = [
          { id: 1, companyName: 'ABC Corporation', description: 'Lorem ipsum...', contactPerson: 'John Doe', email: 'abc@example.com', phone: '123-456-7890', address: '123 Street, City' },
          { id: 2, companyName: 'XYZ Enterprises', description: 'Lorem ipsum...', contactPerson: 'Jane Smith', email: 'xyz@example.com', phone: '987-654-3210', address: '456 Road, Town' },
        ];

        setSellers(simulatedSellers);
      } catch (error) {
        console.error('Error fetching sellers:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchSellers();
  }, []);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // View seller details dialog handlers
  const handleViewSellerDetails = (seller) => {
    setSelectedSeller(seller);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };

  // Edit seller handlers
  const handleEditSeller = (seller) => {
    setSelectedSeller(seller);
    setOpenEditDialog(true);
    setEditMode(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditMode(false); // Optionally reset edit mode state
  };

  const handleSaveSeller = () => {
    // Implement logic to save edited seller details
    // For demonstration, let's log the changes
    console.log('Saved changes for seller:', selectedSeller);
    setOpenEditDialog(false);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    // Reset selectedSeller to original values or handle cancel logic
    setOpenEditDialog(false);
    setEditMode(false);
  };

  // Delete seller handler
  const handleDeleteSeller = (sellerId) => {
    // Implement logic to delete the seller with sellerId
    console.log(`Deleted seller with ID: ${sellerId}`);
    // Update UI after deletion (remove seller from list)
    const updatedSellers = sellers.filter((seller) => seller.id !== sellerId);
    setSellers(updatedSellers);
    setOpenDetailsDialog(false); // Close details dialog if open for the deleted seller
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedSeller({ ...selectedSeller, [name]: value });
  };

  return (
    <div className="admin-panel-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Sellers List</Typography>
              <div className="search-filter-container">
                <TextField
                  label="Search by Company Name"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Contact Person</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sellers.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell>
                        {editMode && selectedSeller.id === seller.id ? (
                          <TextField
                            name="companyName"
                            value={selectedSeller.companyName}
                            onChange={handleInputChange}
                            fullWidth
                          />
                        ) : (
                          seller.companyName
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && selectedSeller.id === seller.id ? (
                          <TextField
                            name="description"
                            value={selectedSeller.description}
                            onChange={handleInputChange}
                            fullWidth
                          />
                        ) : (
                          seller.description
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && selectedSeller.id === seller.id ? (
                          <TextField
                            name="contactPerson"
                            value={selectedSeller.contactPerson}
                            onChange={handleInputChange}
                            fullWidth
                          />
                        ) : (
                          seller.contactPerson
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && selectedSeller.id === seller.id ? (
                          <TextField
                            name="email"
                            value={selectedSeller.email}
                            onChange={handleInputChange}
                            fullWidth
                          />
                        ) : (
                          seller.email
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && selectedSeller.id === seller.id ? (
                          <TextField
                            name="phone"
                            value={selectedSeller.phone}
                            onChange={handleInputChange}
                            fullWidth
                          />
                        ) : (
                          seller.phone
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && selectedSeller.id === seller.id ? (
                          <TextField
                            name="address"
                            value={selectedSeller.address}
                            onChange={handleInputChange}
                            fullWidth
                          />
                        ) : (
                          seller.address
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && selectedSeller.id === seller.id ? (
                          <>
                            <IconButton color="primary" onClick={handleSaveSeller}>
                              <SaveIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={handleCancelEdit}>
                              <CancelIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton color="primary" onClick={() => handleViewSellerDetails(seller)}>
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={() => handleEditSeller(seller)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => handleDeleteSeller(seller.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Seller Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} fullWidth maxWidth="sm">
        <DialogTitle>Seller Details</DialogTitle>
        <DialogContent>
          {selectedSeller && (
            <div>
              <Typography variant="subtitle1">Company Name: {selectedSeller.companyName}</Typography>
              <Typography variant="subtitle1">Description: {selectedSeller.description}</Typography>
              <Typography variant="subtitle1">Contact Person: {selectedSeller.contactPerson}</Typography>
              <Typography variant="subtitle1">Email: {selectedSeller.email}</Typography>
              <Typography variant="subtitle1">Phone Number: {selectedSeller.phone}</Typography>
              <Typography variant="subtitle1">Address: {selectedSeller.address}</Typography>
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

      {/* Edit Seller Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit Seller</DialogTitle>
        <DialogContent>
          {selectedSeller && (
            <form>
              <TextField
                label="Company Name"
                variant="outlined"
                fullWidth
                name="companyName"
                value={selectedSeller.companyName}
                onChange={handleInputChange}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                value={selectedSeller.description}
                onChange={handleInputChange}
              />
              <TextField
                label="Contact Person"
                variant="outlined"
                fullWidth
                name="contactPerson"
                value={selectedSeller.contactPerson}
                onChange={handleInputChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={selectedSeller.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="phone"
                value={selectedSeller.phone}
                onChange={handleInputChange}
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="address"
                value={selectedSeller.address}
                onChange={handleInputChange}
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveSeller} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPanelSeller;
