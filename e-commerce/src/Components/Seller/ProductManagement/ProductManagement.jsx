import React, { useState, useEffect } from 'react';
import './ProductManagement.css'; // Ensure your styling matches
import { FaEdit, FaTrash } from 'react-icons/fa';

// Convert buffer to base64 image
const bufferToBase64 = (buffer) => {
    if (!buffer) return '';
    const binary = Array.from(new Uint8Array(buffer)).map(byte => String.fromCharCode(byte)).join('');
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
};

const ProductManagement = () => {
    // State variables
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch all products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }

            const data = await response.json();

            // Convert nested image buffers to base64 strings
            const productsWithImages = data.map(product => ({
                ...product,
                image: product.images && product.images.length > 0 && product.images[0].data && product.images[0].data.data
                    ? bufferToBase64(product.images[0].data.data)
                    : ''
            }));

            setProducts(productsWithImages);
            setFilteredProducts(productsWithImages);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(`Failed to fetch products: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle search by product ID
    const handleSearch = () => {
        if (searchId) {
            const filtered = products.filter(product => product.id === parseInt(searchId, 10));
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    // Handle product edit
    const handleEditProduct = (product) => {
        setFormData({ ...product });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/products/${formData.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update product: ${response.statusText}`);
            }

            const updatedProduct = await response.json();
            const updatedProductWithImage = {
                ...updatedProduct,
                image: updatedProduct.images && updatedProduct.images.length > 0 ? bufferToBase64(updatedProduct.images[0].data.data) : ''
            };

            setProducts(products.map(product => 
                product.id === updatedProduct.id ? updatedProductWithImage : product
            ));
            setFilteredProducts(filteredProducts.map(product => 
                product.id === updatedProduct.id ? updatedProductWithImage : product
            ));
            setFormData(null); // Close the form
        } catch (error) {
            console.error('Error updating product:', error);
            setError(`Failed to update product: ${error.message}`);
        }
    };

    // Handle product deletion
    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:5000/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete product: ${response.statusText}`);
                }

                setProducts(products.filter(product => product.id !== productId));
                setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
            } catch (error) {
                console.error('Error deleting product:', error);
                setError(`Failed to delete product: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="product-management">
            <h2>Product Management</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="search-bar">
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Search by Product ID"
                />
                <button onClick={handleSearch} className="action-button search">Search</button>
            </div>
            <div className="product-list">
                <h3>Product Listing</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="product-image" style={{'max-height': '40px' , width: 'auto'}}/>
                                            ) : (
                                                <p>No Image Available</p>
                                            )}
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>₹{product.price}</td>
                                        <td>
                                            <button onClick={() => handleEditProduct(product)} className="action-button edit">
                                                <FaEdit /> Edit
                                            </button>
                                            <button onClick={() => handleDeleteProduct(product.id)} className="action-button delete">
                                                <FaTrash /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-data">No products found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            {formData && (
                <div className="edit-form">
                    <h2>Edit Product</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={formData.description || ''}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Price (₹):
                            <input
                                type="number"
                                name="price"
                                value={formData.price || ''}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button type="submit" className="action-button save">Save Changes</button>
                        <button type="button" onClick={() => setFormData(null)} className="action-button cancel">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;

