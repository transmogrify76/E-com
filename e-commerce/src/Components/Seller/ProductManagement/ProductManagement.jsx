
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css';

const ProductManagement = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [productImages, setProductImages] = useState([]);
    const [additionalImageInputs, setAdditionalImageInputs] = useState([]); // State for additional image inputs
    const [categories, setCategories] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [expandedCategoryIds, setExpandedCategoryIds] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [productDetails, setProductDetails] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sellerId, setSellerId] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [generalInstructions] = useState('Please ensure that the product images are clear and of high quality. Specify any relevant details such as color, size, or other specifications.');
    const [showCategories, setShowCategories] = useState(false);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchCategories();
        fetchSellerData();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
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
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/sellers/${storedSellerId}`, {
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

    const handleImageChange = (e, index) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // Max 10 MB
        setProductImages(prev => {
            const newImages = [...prev];
            newImages[index] = validFiles; // Set images for that specific index
            return newImages;
        });
    };

    const handleAddImageInput = () => {
        setAdditionalImageInputs(prev => [...prev, {}]); // Add an empty object to represent a new image input
        setProductImages(prev => [...prev, []]); // Also add an empty array for the new image
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

    const handleClearCategorySelection = () => {
        setSelectedCategoryIds([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!productName || price <= 0 || selectedCategoryIds.length === 0 || productImages.flat().length === 0 || quantity <= 0) {
            setError('All fields are required. Please select at least one category.');
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

        // Append all images from productImages array
        productImages.flat().forEach(image => {
            formData.append('images', image);
        });

        const categoryNames = selectedCategoryIds.map(id => 
            categories.find(cat => cat.id === id)?.name
        ).filter(Boolean);
        
        formData.append('categories', JSON.stringify(categoryNames));
        formData.append('productDetails', JSON.stringify(productDetails));

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/products/upload`, formData, {
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
        setSearchTerm('');
        setExpandedCategoryIds(new Set());
        setShowCategories(false);
        setAdditionalImageInputs([]); // Reset additional image inputs
    };

    const filteredCategories = searchTerm
        ? categories.filter(category =>
            category.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
            (category.children && category.children.some(sub => sub.name.toLowerCase().startsWith(searchTerm.toLowerCase())))
        )
        : categories;

    const renderCategories = (categoryList) => {
        return categoryList.map(category => (
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
            
            {/* Initial Image Upload */}
            <input 
                className="input-field"
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageChange(e, 0)} 
                multiple 
                required 
            />

            {/* Additional Image Inputs */}
            {additionalImageInputs.map((_, index) => (
                <div key={index} className="additional-image-input">
                    <input 
                        className="input-field"
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageChange(e, index + 1)} 
                        multiple 
                    />
                </div>
            ))}

            <button 
                type="button" 
                className="add-image-button" 
                onClick={handleAddImageInput}
            >
                + Add More Images
            </button>

            <h3>Search Categories</h3>
            <input 
                type="text" 
                placeholder="Search categories..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />

            <button 
                type="button" 
                className="toggle-button" 
                onClick={() => setShowCategories(prev => !prev)}
            >
                {showCategories ? 'Hide Categories' : 'Show Categories'}
            </button>
            {showCategories && (
                <div className="categories-container">
                    <h3>Categories</h3>
                    <button type="button" onClick={handleClearCategorySelection}>Clear All Selections</button>
                    {renderCategories(filteredCategories)}
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
            </p>

            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Product'}
            </button>
        </form>
    );
};

export default ProductManagement;
