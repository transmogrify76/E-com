import React, { useState, useEffect, useCallback } from 'react';
import './ProductUpload.css';
import { FaEdit, FaTrash, FaYoutube, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductUpload = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); // New state for selected category
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        productDetails: {},
        price: '',
        quantity: '',
        discountPrice: '',
        categories: [],
        images: []
    });
    const [bulkUploads, setBulkUploads] = useState(0);
    const [singleUploads, setSingleUploads] = useState(0);
    const [sellerId, setSellerId] = useState(null);

    const fetchSellerData = async () => {
        const storedSellerId = localStorage.getItem('sellerId');
        if (!storedSellerId) {
            window.location.href = '/login';
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.get(`http://localhost:5000/user/sellers/${storedSellerId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setSellerId(response.data.id);
        } catch (err) {
            console.error('Error fetching seller data:', err);
            setError(err.response?.data?.message || 'Error fetching seller data');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories');
        }
    };

    const fetchProductsBySeller = useCallback(async () => {
        if (!sellerId) return;
        try {
            const response = await fetch(`http://localhost:5000/products/seller/${sellerId}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();

            const productsWithImages = data.map(product => ({
                ...product,
                image: product.imageName ? `http://localhost:5000/products/images/${product.imageName}` : '',
                categories: product.categories?.map(cat => cat.name) || []
            }));

            setProducts(productsWithImages);
            setFilteredProducts(productsWithImages);
            setBulkUploads(productsWithImages.filter(product => product.uploadMethod === 'bulk').length);
            setSingleUploads(productsWithImages.filter(product => product.uploadMethod === 'single').length);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(`Failed to fetch products: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [sellerId]);

    useEffect(() => {
        fetchSellerData();
        fetchCategories(); 
    }, []);

    useEffect(() => {
        if (sellerId) {
            fetchProductsBySeller();
        }
    }, [sellerId, fetchProductsBySeller]);

    const handleSearch = async (event) => {
        const value = event.target.value;
        setSearchId(value);

        const filtered = products.filter(product => {
            const matchesId = value ? product.id.toString().includes(value) : true;
            const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
            return matchesId && matchesCategory;
        });

        setFilteredProducts(filtered);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        handleSearch({ target: { value: searchId } }); // Re-filter using current search ID
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'categories') {
            const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
            setFormData(prevState => ({
                ...prevState,
                categories: selectedOptions
            }));
        } else if (name === 'productDetails') {
            try {
                setFormData(prevState => ({
                    ...prevState,
                    productDetails: value ? JSON.parse(value) : {}
                }));
            } catch (e) {
                console.error('Invalid JSON format', e);
                setError('Invalid JSON format');
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const calculateTotalQuantity = (quantityString) => {
        const parts = quantityString.split(/[\+\-]/);
        const operator = quantityString.includes('+') ? '+' : quantityString.includes('-') ? '-' : null;

        if (parts.length === 2 && operator) {
            const baseQuantity = parseInt(parts[0], 10);
            const additionalQuantity = parseInt(parts[1], 10);
            return operator === '+' ? baseQuantity + additionalQuantity : baseQuantity - additionalQuantity;
        }
        return parseInt(quantityString, 10) || 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const totalQuantity = calculateTotalQuantity(formData.quantity);

        const requestBody = {
            name: formData.name,
            productDetails: formData.productDetails,
            price: parseFloat(formData.price),
            quantity: totalQuantity.toString(),
            categories: formData.categories,
            images: formData.images
        };

        try {
            const response = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);

            const updatedProduct = await response.json();
            const updatedProductWithImage = {
                ...updatedProduct,
                image: updatedProduct.imageName ? `http://localhost:5000/products/images/${updatedProduct.imageName}` : ''
            };

            setProducts(products.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
            setFilteredProducts(filteredProducts.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
            setEditingProduct(null);
            resetFormData();
        } catch (error) {
            console.error("Error updating product:", error);
            setError(`Failed to update product: ${error.message}`);
        }
    };

    const resetFormData = () => {
        setFormData({
            name: '',
            productDetails: {},
            price: '',
            quantity: '',
            discountPrice: '',
            categories: [],
            images: []
        });
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            productDetails: product.productDetails || {},
            price: product.price,
            quantity: String(product.quantity).replace('+', ''),
            discountPrice: product.discountPrice,
            categories: product.categories || [],
            images: []
        });
    };

    const removeProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);

            setProducts(products.filter(product => product.id !== id));
            setFilteredProducts(filteredProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error removing product:", error);
            setError(`Failed to remove product: ${error.message}`);
        }
    };

    const handleBulkUpload = () => {
        navigate('/bulk-upload');
    };

    const handleSingleUpload = () => {
        navigate('/productmanagement');
    };

    return (
        <div className='list-product'>
            <div className="upload-section">
                <div className="header">
                    <h1>Upload Catalog</h1>
                    <p>Learn how to upload catalogs</p>
                    <p>Need Help?</p>
                    <div className="help-icons">
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube /> YouTube
                        </a>
                        <a href="https://www.customerservice.com" target="_blank" rel="noopener noreferrer">
                            <FaHeadset /> Customer Service
                        </a>
                    </div>
                </div>

                <div className="banner">
                    <h2>Get up to 50% more orders + up to 10% lesser returns</h2>
                    <p>Add/edit the catalogs and improve the quality. Plus, prevent catalogs from deactivations/low visibility. *T&C</p>
                </div>

                <div className="overview">
                    <h2>Overview</h2>
                    <div className="overview-box">
                        <p>Total Uploads Done: {products.length}</p>
                        <p>Using Bulk Uploads: {bulkUploads}</p>
                        <p>Using Single Uploads: {singleUploads}</p>
                    </div>
                </div>

                <div className="upload-buttons">
                    <button className="bulk-upload" onClick={handleBulkUpload}>Bulk Upload</button>
                    <button className="single-upload" onClick={handleSingleUpload}>Single Upload</button>
                </div>

                <div className="search">
                    <input
                        type="text"
                        placeholder="Search by ID"
                        value={searchId}
                        onChange={handleSearch}
                    />
                   
                </div>
            </div>

            {error && <div className="error">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Categories</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="product-image" style={{ width: '50px', height: '50px' }} />
                                    ) : (
                                        <p>No Image Available</p>
                                    )}
                                </td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.categories.join(', ')}</td>
                                <td>
                                    <button onClick={() => handleEditClick(product)}><FaEdit /></button>
                                    <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingProduct && (
                <form onSubmit={handleSubmit} className="edit-form">
                    <h3>Edit Product</h3>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                    />
                    <textarea
                        name="productDetails"
                        value={JSON.stringify(formData.productDetails, null, 2)}
                        onChange={handleInputChange}
                        placeholder="Product Details (JSON format)"
                        rows={10}
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                    />
                    <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="Quantity (+/-)"
                    />
                    <select
                        name="categories"
                        value={formData.categories}
                        onChange={handleInputChange}
                        multiple
                    >
                        <option value="">Select Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name} selected={formData.categories.includes(category.name)}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Update Product</button>
                    <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default ProductUpload;

