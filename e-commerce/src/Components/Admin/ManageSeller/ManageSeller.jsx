import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './ManageSeller.css'; // Ensure you have the correct path to your CSS

const AdminPanelSeller = () => {
    const [sellers, setSellers] = useState([]);
    const [filteredSellers, setFilteredSellers] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [editSeller, setEditSeller] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/sellers');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setSellers(data);
                setFilteredSellers(data);
            } catch (error) {
                console.error('Error fetching sellers:', error.message);
                setError('Failed to load sellers. Please try again later.');
            }
        };

        fetchSellers();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value === '') {
            setFilteredSellers(sellers);
        } else {
            const filtered = sellers.filter(seller =>
                seller.id.toString().includes(value)
            );
            setFilteredSellers(filtered);
        }
    };

    const handleViewSellerDetails = async (sellerId) => {
        try {
            const response = await fetch(`http://localhost:5000/user/sellers/${sellerId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const seller = await response.json();
            setSelectedSeller(seller);
            setOpenDetailsDialog(true);
        } catch (error) {
            console.error('Error fetching seller details:', error.message);
            setError('Failed to load seller details. Please try again later.');
        }
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
        setSelectedSeller(null);
    };

    const handleEditSeller = (seller) => {
        setEditSeller({ ...seller });
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditSeller(null);
    };

    const handleSaveEditSeller = async () => {
        try {
            const response = await fetch(`http://localhost:5000/user/sellers/${editSeller.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editSeller),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedSeller = await response.json();
            const updatedSellers = sellers.map(seller =>
                seller.id === updatedSeller.id ? updatedSeller : seller
            );
            setSellers(updatedSellers);
            setFilteredSellers(updatedSellers);
            setOpenEditDialog(false);
            setEditSeller(null);
        } catch (error) {
            console.error('Error saving seller:', error.message);
            setError('Failed to update seller. Please try again later.');
        }
    };

    const handleDeleteSeller = async (sellerId) => {
        if (window.confirm('Are you sure you want to delete this seller?')) {
            try {
                const response = await fetch(`http://localhost:5000/user/sellers/${sellerId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const updatedSellers = sellers.filter(seller => seller.id !== sellerId);
                setSellers(updatedSellers);
                setFilteredSellers(updatedSellers);
            } catch (error) {
                console.error('Error deleting seller:', error.message);
                setError('Failed to delete seller. Please try again later.');
            }
        }
    };

    return (
        <div className="admin-panel-container">
            <h2>Sellers List</h2>
            {error && <p className="error-message">{error}</p>}
            
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search by seller ID"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSellers.length > 0 ? (
                        filteredSellers.map((seller) => (
                            <tr key={seller.id}>
                                <td>{seller.id}</td>
                                <td>{seller.contactPerson || 'N/A'}</td>
                                <td>{seller.email || 'N/A'}</td>
                                <td>{seller.phoneNumber || 'N/A'}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="button button-view" onClick={() => handleViewSellerDetails(seller.id)}>
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">No sellers found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Seller Details Dialog */}
            {selectedSeller && openDetailsDialog && (
                <div className="dialog open">
                    <div className="dialog-content">
                        <h3>Seller Details</h3>
                        <p>ID: {selectedSeller.id}</p>
                        <p>Name: {selectedSeller.contactPerson || 'N/A'}</p>
                        <p>Email: {selectedSeller.email || 'N/A'}</p>
                        <p>Phone: {selectedSeller.phoneNumber || 'N/A'}</p>
                        <button onClick={handleCloseDetailsDialog} className="button button-close">Close</button>
                    </div>
                </div>
            )}

            {/* Edit Seller Dialog */}
            {editSeller && openEditDialog && (
                <div className="dialog open">
                    <div className="dialog-content">
                        <h3>Edit Seller</h3>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={editSeller.contactPerson || ''}
                                onChange={(e) => setEditSeller({ ...editSeller, contactPerson: e.target.value })}
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={editSeller.email || ''}
                                onChange={(e) => setEditSeller({ ...editSeller, email: e.target.value })}
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                value={editSeller.phoneNumber || ''}
                                onChange={(e) => setEditSeller({ ...editSeller, phoneNumber: e.target.value })}
                                style={inputStyle}
                            />
                        </label>
                        <div className="dialog-buttons">
                            <button onClick={handleSaveEditSeller} className="button button-save">Save Changes</button>
                            <button onClick={handleCloseEditDialog} className="button button-cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Common styles for input fields
const inputStyle = {
    display: 'block',
    width: 'calc(100% - 20px)', // Adjust width according to the container
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '5px',
    fontSize: '16px',
    boxSizing: 'border-box' // Ensures padding and border are included in the width
};

export default AdminPanelSeller;
