import React, { useState, useEffect, useCallback } from 'react';
import './ListProduct.css';
import { FaEdit, FaTrash, FaYoutube, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        productDetails: {},
        price: '',
        quantity: '',
        discountPrice: '',
        categories: [],
        images: [],
    });
    const [bulkUploads, setBulkUploads] = useState(0);
    const [singleUploads, setSingleUploads] = useState(0);

    const accessToken = localStorage.getItem('accessToken');
    const adminId = localStorage.getItem('userId');

    useEffect(() => {
        fetchCategories();
        fetchProductsByAdmin();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories');
        }
    };

    const fetchProductsByAdmin = useCallback(async () => {
        if (!adminId) return;
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/seller/${adminId}`);
            const productsWithImages = await Promise.all(response.data.map(async product => {
                const imagesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/images/product/${product.id}`);
                const imagesData = await imagesResponse.json();
                const imageURLs = imagesData.map(img => img.base64);

                return {
                    ...product,
                    images: imageURLs,
                    categories: product.categories?.map(cat => cat.name) || []
                };
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
    }, [adminId]);

    const handleSearch = (event) => {
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
        handleSearch({ target: { value: searchId } });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'categories') {
            const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
            setFormData(prevState => ({
                ...prevState,
                categories: selectedOptions,
            }));
        } else if (name === 'productDetails') {
            try {
                setFormData(prevState => ({
                    ...prevState,
                    productDetails: value ? JSON.parse(value) : {},
                }));
            } catch (e) {
                console.error('Invalid JSON format', e);
                setError('Invalid JSON format');
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
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
            images: formData.images,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${editingProduct.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);

            const updatedProduct = await response.json();
            const updatedProductWithImage = {
                ...updatedProduct,
                images: updatedProduct.images ? updatedProduct.images.map(img => img.base64) : [],
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
            images: [],
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
            images: [],
        });
    };

    const removeProduct = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
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
        navigate('/add-product');
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
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {error && <div className="error">{error}</div>}

                <div className="product-list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table>
                            <thead >
                                <tr >
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>ID</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Name</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Price</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Quantity</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Categories</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Images</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.categories.join(', ')}</td>
                                        <td>
                                            {product.images.length > 0 ? (
                                                <img src={product.images[0]} alt={product.name} style={{ width: '50px' }} />
                                            ) : (
                                                <p>No Image</p>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={() => handleEditClick(product)}><FaEdit /></button>
                                            <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

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
        </div>
    );
};

export default ListProduct;
