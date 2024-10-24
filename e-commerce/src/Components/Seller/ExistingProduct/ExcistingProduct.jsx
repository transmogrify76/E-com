
import React, { useState, useEffect, useCallback } from 'react';
import './ExcistingProduct.css'; // Ensure this path is correct
import { FaEdit, FaTrash, FaYoutube, FaHeadset, FaPlus, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the auto table plugin

const InventoryPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
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
    const [sellerId, setSellerId] = useState(null);
    const [stockFilter, setStockFilter] = useState('all');

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
            const response = await axios.get(`http://localhost:5000/products/seller/${sellerId}`);
            const productsWithImages = response.data.map(product => ({
                ...product,
                image: product.imageName ? `http://localhost:5000/products/images/${product.imageName}` : '',
                categories: product.categories?.map(cat => cat.name) || []
            }));

            setProducts(productsWithImages);
            setFilteredProducts(productsWithImages);
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
        fetchProductsBySeller();
    }, [sellerId, fetchProductsBySeller]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchId(value);
        filterProducts(value, selectedCategory, stockFilter);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        filterProducts(searchId, event.target.value, stockFilter);
    };

    const handleStockFilterChange = (filter) => {
        setStockFilter(filter);
        filterProducts(searchId, selectedCategory, filter);
    };

    const filterProducts = (searchId, selectedCategory, stockFilter) => {
        let filtered = products.filter(product => {
            const matchesId = searchId ? product.id.toString().includes(searchId) : true;
            const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
            const isInStock = product.quantity > 0;
            const isLowStock = product.quantity > 0 && product.quantity < 10;

            const matchesStockFilter = stockFilter === 'all' ||
                (stockFilter === 'low' && isLowStock) ||
                (stockFilter === 'out' && !isInStock);

            return matchesId && matchesCategory && matchesStockFilter;
        });

        setFilteredProducts(filtered);
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
            const { name: detailName, value: detailValue } = event.target;
            setFormData(prevState => ({
                ...prevState,
                productDetails: {
                    ...prevState.productDetails,
                    [detailName]: detailValue
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            name: formData.name,
            productDetails: formData.productDetails,
            price: parseFloat(formData.price),
            quantity: formData.quantity,
            categories: formData.categories,
            images: formData.images
        };

        try {
            const response = await axios.patch(`http://localhost:5000/products/${editingProduct.id}`, requestBody);
            const updatedProduct = {
                ...response.data,
                image: response.data.imageName ? `http://localhost:5000/products/images/${response.data.imageName}` : ''
            };

            setProducts(products.map(product => product.id === editingProduct.id ? updatedProduct : product));
            setFilteredProducts(filteredProducts.map(product => product.id === editingProduct.id ? updatedProduct : product));
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
            quantity: product.quantity,
            discountPrice: product.discountPrice,
            categories: product.categories || [],
            images: []
        });
    };

    const removeProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
            setFilteredProducts(filteredProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error removing product:", error);
            setError(`Failed to remove product: ${error.message}`);
        }
    };

    const handleAddVariationClick = (product) => {
        navigate(`/productmanagement?id=${product.id}&name=${encodeURIComponent(product.name)}`);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Product Inventory", 14, 22);
        
        const tableColumn = ["Product ID", "Name", "Price", "Quantity", "Categories", "Product Details"];
        const tableRows = [];

        filteredProducts.forEach(product => {
            const productData = [
                product.id,
                product.name,
                product.price,
                product.quantity,
                product.categories.join(', '),
                JSON.stringify(product.productDetails)
            ];
            tableRows.push(productData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save("inventory.pdf");
    };

    return (
        <div className='inventory-page'>
            <div className="header">
                <h1>Inventory Management</h1>
                <div className="help-icons">
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube /> YouTube
                    </a>
                    <a href="https://www.customerservice.com" target="_blank" rel="noopener noreferrer">
                        <FaHeadset /> Customer Service
                    </a>
                    <button onClick={handleExportPDF} className="export-pdf-btn">
                        <FaFilePdf /> Export as PDF
                    </button>
                </div>
            </div>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search by Product ID"
                    value={searchId}
                    onChange={handleSearch}
                />
                <select onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="stock-filters">
                <button onClick={() => handleStockFilterChange('all')}>All Stock</button>
                <button onClick={() => handleStockFilterChange('low')}>Low Stock</button>
                <button onClick={() => handleStockFilterChange('out')}>Out of Stock</button>
            </div>

            {error && <div className="error">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Categories</th>
                            <th>Product Details</th>
                            <th>Actions</th>
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
                                <td>{JSON.stringify(product.productDetails)}</td>
                                <td>
                                    <button onClick={() => handleEditClick(product)}><FaEdit /></button>
                                    <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
                                    <button onClick={() => handleAddVariationClick(product)}><FaPlus /></button>
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
                    {Object.keys(formData.productDetails).map(key => (
                        <div key={key}>
                            <label>{key}</label>
                            <input
                                type="text"
                                name={key}
                                value={formData.productDetails[key] || ''}
                                onChange={handleInputChange}
                                placeholder={`Enter ${key}`}
                            />
                        </div>
                    ))}
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
                        placeholder="Quantity"
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

export default InventoryPage;
