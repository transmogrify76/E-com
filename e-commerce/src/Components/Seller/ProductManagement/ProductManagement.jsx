import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css';

const ProductUpload = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [productImages, setProductImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [expandedCategoryIds, setExpandedCategoryIds] = useState(new Set());
    const [showCategories, setShowCategories] = useState(false); // State to control category display
    const [productDetails, setProductDetails] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sellerId, setSellerId] = useState(null);
    const [generalInstructions] = useState('Please ensure that the product images are clear and of high quality. Specify any relevant details such as color, size, or other specifications.');

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchCategories();
        fetchSellerData();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories. Please try again later.');
        }
    };

    const fetchSellerData = async () => {
        const storedSellerId = localStorage.getItem('sellerId');
        if (!storedSellerId) {
            window.location.href = '/login';
            return;
        }

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

    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryIds((prev) => 
            prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
        );
    };

    const handleToggleCategory = (categoryId) => {
        setExpandedCategoryIds((prev) => {
            const newSet = new Set(prev);
            newSet.has(categoryId) ? newSet.delete(categoryId) : newSet.add(categoryId);
            return newSet;
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // Max 10 MB
        setProductImages(validFiles);
    };

    const handleDetailChange = (index, key, value) => {
        setProductDetails((prev) => {
            const newDetails = [...prev];
            newDetails[index] = { ...newDetails[index], [key]: value };
            return newDetails;
        });
    };

    const handleAddDetailField = () => {
        setProductDetails((prev) => [...prev, { key: '', value: '' }]);
    };

    const handleRemoveDetailField = (index) => {
        setProductDetails((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!productName || price <= 0 || selectedCategoryIds.length === 0 || productImages.length === 0 || quantity <= 0) {
            setError('All fields are required.');
            return;
        }

        if (!sellerId) {
            setError('Invalid seller ID. Please log in again.');
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', price);
        formData.append('sellerId', sellerId);
        formData.append('quantity', quantity);

        productImages.forEach(image => {
            formData.append('images', image);
        });

        const categoryNames = selectedCategoryIds.map(id => 
            categories.find(cat => cat.id === id)?.name
        ).filter(Boolean);
        
        formData.append('categories', JSON.stringify(categoryNames));
        formData.append('productDetails', JSON.stringify(productDetails));

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/products/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('Product uploaded successfully:', response.data);
            resetForm();
        } catch (error) {
            console.error('Error uploading product:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'Error uploading product. Check console for more details.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setProductName('');
        setPrice(0);
        setProductImages([]);
        setSelectedCategoryIds([]);
        setProductDetails([]);
        setQuantity(0);
        setError('');
        setShowCategories(false); // Reset the category display state
    };

    const renderCategories = (categories) => {
        return categories.map(category => (
            <div key={category.id} className="checkbox-container">
                <input 
                    type="checkbox" 
                    id={`category-${category.id}`} 
                    checked={selectedCategoryIds.includes(category.id)} 
                    onChange={() => handleCategoryChange(category.id)} 
                />
                <label htmlFor={`category-${category.id}`} className="checkbox-label" onClick={() => handleToggleCategory(category.id)}>
                    {category.name}
                </label>
                {category.children && category.children.length > 0 && expandedCategoryIds.has(category.id) && (
                    <div className="subcategory-container">
                        {renderCategories(category.children)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="product-upload-form">
            <h2>Upload Product</h2>
            {error && <p className="error">{error}</p>}
            <input 
                className="input-field"
                type="text" 
                placeholder="Product Name" 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
                required 
            />
            <input 
                className="input-field"
                type="number" 
                placeholder="Price" 
                value={price > 0 ? price : ''} 
                onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : 0)} 
                required 
            />
            <input 
                className="input-field"
                type="number" 
                placeholder="Quantity" 
                value={quantity > 0 ? quantity : ''} 
                onChange={(e) => setQuantity(e.target.value ? parseInt(e.target.value) : 0)} 
                required 
            />
            <input 
                className="input-field"
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                multiple 
                required 
            />
            <h3>Categories</h3>
            <button 
                type="button" 
                className="toggle-button" 
                onClick={() => setShowCategories(prev => !prev)}
            >
                {showCategories ? 'Hide Categories' : 'Show Categories'}
            </button>
            {showCategories && (
                <div className="categories-container">
                    {renderCategories(categories)}
                </div>
            )}
            <h3>General Instructions</h3>
            <p>{generalInstructions}</p>
            <h3>Product Details</h3>
            <div>
                {productDetails.map((detail, index) => (
                    <div key={index} className="product-detail">
                        <input 
                            type="text" 
                            placeholder="Detail Key" 
                            value={detail.key} 
                            onChange={(e) => handleDetailChange(index, 'key', e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Detail Value" 
                            value={detail.value} 
                            onChange={(e) => handleDetailChange(index, 'value', e.target.value)} 
                        />
                        <button type="button" onClick={() => handleRemoveDetailField(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddDetailField}>Add Product Detail</button>
            </div>

            <h3>Image Guidelines</h3>
            <p>
                View Full Image Guidelines:<br />
                Images with text/Watermark are not acceptable in primary images.<br />
                Product image should not have any text.<br />
                Please add solo product image without any props.
            </p>

            <button 
                type="submit" 
                disabled={loading} 
                className="submit-button"
            >
                {loading ? 'Uploading...' : 'Upload Product'}
            </button>
        </form>
    );
};

export default ProductUpload;
