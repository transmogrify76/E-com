import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons
import './ManageSeller.css'; // Assuming you're using the same CSS for styling

const AdminPanelSeller = () => {
    const [sellers, setSellers] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortedSellers, setSortedSellers] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editSeller, setEditSeller] = useState(null); // Track the seller being edited

    useEffect(() => {
        // Simulating fetching sellers data
        const fetchSellers = async () => {
            try {
                // Simulated data for demonstration
                const simulatedSellers = [
                    { id: 1, name: 'Seller One', email: 'seller1@example.com', phone: '123-456-7890', status: 'Active', registrationDate: '2023-07-01' },
                    { id: 2, name: 'Seller Two', email: 'seller2@example.com', phone: '234-567-8901', status: 'Inactive', registrationDate: '2023-07-05' },
                    { id: 3, name: 'Seller Three', email: 'seller3@example.com', phone: '345-678-9012', status: 'Active', registrationDate: '2023-07-10' },
                    { id: 4, name: 'Seller Four', email: 'seller4@example.com', phone: '456-789-0123', status: 'Active', registrationDate: '2023-07-15' },
                    { id: 5, name: 'Seller Five', email: 'seller5@example.com', phone: '567-890-1234', status: 'Inactive', registrationDate: '2023-07-20' },
                ];

                setSellers(simulatedSellers);
                setSortedSellers(simulatedSellers); // Initialize sortedSellers with the fetched data
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };

        fetchSellers();
    }, []);

    // Handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle status filter change
    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    // Filter sellers based on search term and status filter
    useEffect(() => {
        const filteredSellers = sellers.filter(
            (seller) =>
                seller.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (statusFilter === 'All' || seller.status === statusFilter)
        );
        setSortedSellers(filteredSellers);
    }, [sellers, searchTerm, statusFilter]);

    // Sort sellers based on sortBy and sortOrder
    useEffect(() => {
        const sortedSellersCopy = [...sortedSellers];
        sortedSellersCopy.sort((a, b) => {
            const aValue = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
            const bValue = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedSellers(sortedSellersCopy);
    }, [sortedSellers, sortBy, sortOrder]);

    // Handle sorting change
    const handleSortChange = (property) => {
        if (sortBy === property) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(property);
            setSortOrder('asc');
        }
    };

    // View seller details dialog handlers
    const handleViewSellerDetails = (seller) => {
        setSelectedSeller(seller);
        setOpenDetailsDialog(true);
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
    };

    // Edit seller dialog handlers
    const handleEditSeller = (seller) => {
        setEditSeller({ ...seller }); // Set the seller being edited
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditSeller(null); // Clear the editSeller state after closing the dialog
    };

    // Handle editing seller details
    const handleSaveEditSeller = () => {
        const updatedSellers = sellers.map((seller) => (seller.id === editSeller.id ? editSeller : seller));
        setSellers(updatedSellers);
        setSortedSellers(updatedSellers);
        setOpenEditDialog(false);
        setEditSeller(null); // Clear editSeller state after saving
    };

    // Delete seller handler
    const handleDeleteSeller = (sellerId) => {
        const updatedSellers = sellers.filter((seller) => seller.id !== sellerId);
        setSellers(updatedSellers);
        setSortedSellers(updatedSellers);
    };

    return (
        <div className="admin-panel-container">
            <h2>Sellers List</h2>
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <select value={statusFilter} onChange={handleStatusFilterChange} className="filter-select">
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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
                        <th>Status</th>
                        <th>Registration Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedSellers.map((seller) => (
                        <tr key={seller.id}>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>
                            <td>{seller.phone}</td>
                            <td>{seller.status}</td>
                            <td>{seller.registrationDate}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="button button-view" onClick={() => handleViewSellerDetails(seller)}>
                                        <FaEye /> View
                                    </button>
                                    <button className="button button-edit" onClick={() => handleEditSeller(seller)}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="button button-delete" onClick={() => handleDeleteSeller(seller.id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Seller Details Dialog */}
            {openDetailsDialog && (
                <div className="dialog">
                    <h3>Seller Details</h3>
                    {selectedSeller && (
                        <div>
                            <p>Name: {selectedSeller.name}</p>
                            <p>Email: {selectedSeller.email}</p>
                            <p>Phone: {selectedSeller.phone}</p> {/* Added phone number display */}
                            <p>Status: {selectedSeller.status}</p>
                            <p>Registration Date: {selectedSeller.registrationDate}</p>
                        </div>
                    )}
                    <button className="button button-close" onClick={handleCloseDetailsDialog}>Close</button>
                </div>
            )}

            {/* Edit Seller Dialog */}
            {openEditDialog && (
                <div className="dialog">
                    <h3>Edit Seller</h3>
                    {editSeller && (
                        <form>
                            <input
                                type="text"
                                placeholder="Name"
                                value={editSeller.name}
                                onChange={(e) => setEditSeller({ ...editSeller, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={editSeller.email}
                                onChange={(e) => setEditSeller({ ...editSeller, email: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={editSeller.phone}
                                onChange={(e) => setEditSeller({ ...editSeller, phone: e.target.value })}
                            />
                            <select
                                value={editSeller.status}
                                onChange={(e) => setEditSeller({ ...editSeller, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </form>
                    )}
                    <div className="dialog-buttons">
                        <button className="button button-cancel" onClick={handleCloseEditDialog}>Cancel</button>
                        <button className="button button-save" onClick={handleSaveEditSeller}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanelSeller;
