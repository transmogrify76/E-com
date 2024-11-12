import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');  // New state for description
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
    const [hoveredCategory, setHoveredCategory] = useState(null); // Track the hovered category

    const accessToken = localStorage.getItem('accessToken');
    const adminId = localStorage.getItem('userId');

    useEffect(() => {
        fetchTopLevelCategories();
    }, []);

    const fetchTopLevelCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/top-level`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
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
                ? prev.filter((name) => name !== categoryName) // Unselect category
                : [...prev, categoryName] // Select category
        );
    };

    const handleToggleCategory = async (categoryName) => {
        // Fetch and expand child categories only if they haven't been fetched before
        if (!expandedCategories[categoryName]) {
            const childCategories = await fetchChildCategoriesByName(categoryName);
            setExpandedCategories((prev) => ({
                ...prev,
                [categoryName]: childCategories, // Store child categories by parent name
            }));
        } else {
            // Toggle expansion without fetching if already expanded
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

        if (!adminId) {
            setError('No admin ID found. Please log in as an admin.');
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);  // Append the description
        formData.append('price', price);
        formData.append('sellerId', adminId);
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
        setDescription('');  // Reset description
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
                    onMouseEnter={() => setHoveredCategory(categoryName)} // Show subcategories on hover
                    onMouseLeave={() => setHoveredCategory(null)} // Hide subcategories when mouse leaves
                    onClick={() => handleToggleCategory(categoryName)} // Toggle subcategories on click
                >
                    {categoryName}
                </label>
                {expandedCategories[categoryName] && (
                    <div
                        className="subcategory-container"
                        style={{
                            display: expandedCategories[categoryName] ? 'block' : 'none', // Show only if expanded
                        }}
                    >
                        {renderCategories(expandedCategories[categoryName])}
                    </div>
                )}
                {/* Show subcategories if hovered or clicked */}
                {(hoveredCategory === categoryName || expandedCategories[categoryName]) && (
                    <div className="subcategory-container">
                        {expandedCategories[categoryName] && renderCategories(expandedCategories[categoryName])}
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
                onChange={(e) => setDescription(e.target.value)}  // Update description
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
                onClick={() => setShowCategories((prev) => !prev)}
            >
                {showCategories ? 'Hide Categories' : 'Show Categories'}
            </button>
            {showCategories && (
                <div className="categories-container">
                    <h3>Categories</h3>
                    <button type="button" onClick={handleClearCategorySelection} className="clear-selection-button">
                        Clear All Selections
                    </button>
                    {renderCategories(categories)}
                </div>
            )}

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

            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Product'}
            </button>
        </form>
    );
};

export default AddProduct;
