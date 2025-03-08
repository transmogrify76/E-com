import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css';

const ProductManagement = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [productImages, setProductImages] = useState([[]]);
    const [additionalImageInputs, setAdditionalImageInputs] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCategories, setShowCategories] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [sellerId, setSellerId] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const sellerIdFromStorage = localStorage.getItem('userId');

    useEffect(() => {
        fetchSellerData();
        fetchTopLevelCategories();
    }, []);

    // Fetch seller data from API
    const fetchSellerData = async () => {
        const storedSellerId = localStorage.getItem('sellerId');
        if (!storedSellerId) {
            window.location.href = '/login';
            return;
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/sellers/${storedSellerId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setSellerId(response.data.id);
        } catch (err) {
            setError('Error fetching seller data.');
        }
    };

    const fetchTopLevelCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/top-level`);
            setCategories(response.data);
        } catch (error) {
            setError('Failed to fetch categories. Please try again later.');
        }
    };

    const fetchChildCategoriesByName = async (categoryName) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/subcategories/name/${categoryName}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching subcategories for category "${categoryName}":`, error);
            return [];
        }
    };

    const handleCategoryChange = (categoryName) => {
        setSelectedCategoryNames((prev) =>
            prev.includes(categoryName)
                ? prev.filter((name) => name !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleToggleCategory = async (categoryName) => {
        if (!expandedCategories[categoryName]) {
            const childCategories = await fetchChildCategoriesByName(categoryName);
            setExpandedCategories((prev) => ({
                ...prev,
                [categoryName]: childCategories,
            }));
        } else {
            setExpandedCategories((prev) => {
                const updated = { ...prev };
                delete updated[categoryName];
                return updated;
            });
        }
    };

    const handleImageChange = (e, index) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024);
        setProductImages((prev) => {
            const newImages = [...prev];
            newImages[index] = validFiles;
            return newImages;
        });
    };

    const handleAddImageInput = () => {
        setAdditionalImageInputs((prev) => [...prev, {}]);
        setProductImages((prev) => [...prev, []]);
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
        setSelectedCategoryNames([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || price <= 0 || selectedCategoryNames.length === 0 || productImages.flat().length === 0 || quantity <= 0 || !description) {
            setError('All fields are required. Please check your inputs.');
            return;
        }

        if (!sellerId) {
            setError('No seller ID found. Please log in as an admin.');
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('sellerId', sellerId);
        formData.append('quantity', quantity);

        productImages.flat().forEach((image) => {
            formData.append('images', image);
        });

        formData.append('categories', JSON.stringify(selectedCategoryNames));
        formData.append('productDetails', JSON.stringify(productDetails));

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/products/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            resetForm();
        } catch (error) {
            setError('Error uploading product. Please check console for more details.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setProductName('');
        setDescription('');
        setPrice(0);
        setProductImages([[]]);
        setSelectedCategoryNames([]);
        setProductDetails([]);
        setQuantity(0);
        setError('');
        setSearchTerm('');
        setExpandedCategories({});
        setShowCategories(false);
        setAdditionalImageInputs([]);
    };

    const renderCategories = (categoryList) => {
        return categoryList.map((categoryName) => (
            <div key={categoryName} className="checkbox-container">
                <input
                    type="checkbox"
                    id={`category-${categoryName}`}
                    checked={selectedCategoryNames.includes(categoryName)}
                    onChange={() => handleCategoryChange(categoryName)}
                />
                <label
                    htmlFor={`category-${categoryName}`}
                    className="checkbox-label"
                    onMouseEnter={() => setHoveredCategory(categoryName)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onClick={() => handleToggleCategory(categoryName)}
                >
                    {categoryName}
                </label>
                {expandedCategories[categoryName] && (
                    <div className="subcategory-container">
                        {renderCategories(expandedCategories[categoryName])}
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
            <textarea
                className="input-field"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setQuantity(e.target.value ? parseInt(e.target.value, 10) : 0)}
                required
            />
            <input
                className="input-field"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 0)}
                multiple
                required
            />
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
            <button type="button" className="add-image-button" onClick={handleAddImageInput}>
                + Add More Images
            </button>
            <h3>Categories</h3>
            <div className="category-selection">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="category-list">
                    {renderCategories(categories.filter((category) => category.toLowerCase().includes(searchTerm.toLowerCase())))}
                </div>
            </div>
            <h3>Product Details</h3>
            <div>
                {productDetails.map((detail, index) => (
                    <div key={index} className="product-detail">
                        <input
                            type="text"
                            placeholder="Detail Key (e.g., color)"
                            value={detail.key}
                            onChange={(e) => handleDetailChange(index, 'key', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Detail Value (e.g., red)"
                            value={detail.value}
                            onChange={(e) => handleDetailChange(index, 'value', e.target.value)}
                        />
                        <button type="button" onClick={() => handleRemoveDetailField(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddDetailField}>Add Product Detail</button>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Product'}
            </button>
        </form>
    );
};

export default ProductManagement;
