import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });

    // Convert buffer to base64
    const bufferToBase64 = (buffer) => {
        const binary = String.fromCharCode(...new Uint8Array(buffer));
        return `data:image/jpeg;base64,${window.btoa(binary)}`;
    };

    // Fetch all products from the API
    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();

            // Convert nested image buffers to base64 strings
            const productsWithImages = data.map(product => ({
                ...product,
                image: product.images && product.images.length > 0 && product.images[0].data && product.images[0].data.data
                    ? bufferToBase64(product.images[0].data.data)
                    : '' // Default to empty string if no image data is available
            }));

            setProducts(productsWithImages);
            setFilteredProducts(productsWithImages);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    // Remove a product by ID
    const removeProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove product');
            }

            setProducts(products.filter(product => product.id !== id));
            setFilteredProducts(filteredProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error removing product:", error);
            setError("Failed to remove product");
        }
    };

    // Handle search by product ID
    const handleSearch = (event) => {
        setSearchId(event.target.value);
        if (event.target.value) {
            setFilteredProducts(products.filter(product => product.id === parseInt(event.target.value, 10)));
        } else {
            setFilteredProducts(products);
        }
    };

    // Handle form input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProduct = await response.json();
            const updatedProductWithImage = {
                ...updatedProduct,
                image: updatedProduct.image ? bufferToBase64(updatedProduct.image.data) : ''
            };

            setProducts(products.map(product =>
                product.id === editingProduct.id ? updatedProductWithImage : product
            ));
            setFilteredProducts(filteredProducts.map(product =>
                product.id === editingProduct.id ? updatedProductWithImage : product
            ));
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                image: ''
            });
        } catch (error) {
            console.error("Error updating product:", error);
            setError("Failed to update product");
        }
    };

    // Open edit form
    const handleEditClick = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image
        });
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <div className='list-product'>
            <div className="header">
                <h1>Admin Panel - Product List</h1>
                <input
                    type="text"
                    placeholder="Search by Product ID"
                    value={searchId}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {editingProduct && (
                        <div className="edit-form">
                            <h2>Edit Product</h2>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Description:
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Price (₹):
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
                            </form>
                        </div>
                    )}

                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price (₹)</th>
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
                                                <img src={product.image} alt={product.name} className="product-image" />
                                            ) : (
                                                <p>No Image Available</p>
                                            )}
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>₹{product.price}</td>
                                        <td>
                                            <button
                                                className="edit-button"
                                                onClick={() => handleEditClick(product)}
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => removeProduct(product.id)}
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No products available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ListProduct;
