
// import React, { useState, useEffect } from 'react';
// import './AddProduct.css'; // Import CSS for styling

// const AddProduct = ({ onProductSubmit }) => {
//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState('');
//     const [sellingPrice, setSellingPrice] = useState('');
//     const [discountPrice, setDiscountPrice] = useState('');
//     const [productDescription, setProductDescription] = useState('');
//     const [productImages, setProductImages] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setSubcategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [selectedSubcategory, setSelectedSubcategory] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Fetch categories from API
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/categories');
//                 const data = await response.json();
//                 console.log('Fetched categories:', data);
//                 if (Array.isArray(data)) {
//                     setCategories(data);
//                 } else {
//                     throw new Error('Unexpected response format for categories.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setError('Failed to fetch categories.');
//             }
//         };

//         fetchCategories();
//     }, []);

//     // Fetch subcategories based on selected category
//     useEffect(() => {
//         const fetchSubcategories = async () => {
//             if (!selectedCategory) return;

//             try {
//                 // Find the selected category's ID
//                 const selectedCategoryObj = categories.find(cat => cat.name === selectedCategory);
//                 if (!selectedCategoryObj) {
//                     throw new Error('Selected category not found');
//                 }
//                 const categoryId = selectedCategoryObj.id;

//                 // Fetch subcategories using the category ID
//                 const response = await fetch(`http://localhost:5000/categories/${categoryId}/subcategories`);

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 console.log('Fetched subcategories:', data);

//                 if (Array.isArray(data)) {
//                     setSubcategories(data);
//                 } else {
//                     throw new Error('Unexpected response format for subcategories.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching subcategories:', error);
//                 setError(`Failed to fetch subcategories: ${error.message}`);
//             }
//         };

//         fetchSubcategories();
//     }, [selectedCategory, categories]); // Depend on both selectedCategory and categories

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setProductImages(files);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         if (!selectedCategory || !selectedSubcategory) {
//             setError('Please select both category and subcategory.');
//             setLoading(false);
//             return;
//         }

//         const formData = new FormData();
//         formData.append('name', productName);
//         formData.append('price', productPrice);
//         formData.append('sellingPrice', sellingPrice);
//         formData.append('discountPrice', discountPrice);
//         formData.append('description', productDescription);
//         formData.append('category', selectedCategory);
//         formData.append('subcategory', selectedSubcategory);
//         formData.append('userId', localStorage.getItem('userId'));

//         productImages.forEach((file) => {
//             formData.append('images', file);
//         });

//         try {
//             const response = await fetch('http://localhost:5000/products/upload', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//                 },
//                 body: formData,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to upload product');
//             }

//             setProductName('');
//             setProductPrice('');
//             setSellingPrice('');
//             setDiscountPrice('');
//             setProductDescription('');
//             setProductImages([]);
//             setSelectedCategory('');
//             setSelectedSubcategory('');

//             if (onProductSubmit) onProductSubmit();
//         } catch (error) {
//             console.error('Error uploading product:', error);
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="product-upload-container">
//             <h2>Upload a New Product</h2>
//             <form onSubmit={handleSubmit} className="product-upload-form">
//                 <div className="form-group">
//                     <label htmlFor="productName">Product Name:</label>
//                     <input
//                         type="text"
//                         id="productName"
//                         value={productName}
//                         onChange={(e) => setProductName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="productPrice">Product Price (₹):</label>
//                     <input
//                         type="number"
//                         id="productPrice"
//                         value={productPrice}
//                         onChange={(e) => setProductPrice(e.target.value)}
//                         min="0"
//                         step="0.01"
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="sellingPrice">Selling Price (₹):</label>
//                     <input
//                         type="number"
//                         id="sellingPrice"
//                         value={sellingPrice}
//                         onChange={(e) => setSellingPrice(e.target.value)}
//                         min="0"
//                         step="0.01"
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="discountPrice">Discount Price (₹):</label>
//                     <input
//                         type="number"
//                         id="discountPrice"
//                         value={discountPrice}
//                         onChange={(e) => setDiscountPrice(e.target.value)}
//                         min="0"
//                         step="0.01"
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="productDescription">Product Description:</label>
//                     <textarea
//                         id="productDescription"
//                         value={productDescription}
//                         onChange={(e) => setProductDescription(e.target.value)}
//                         rows="4"
//                         required
//                     ></textarea>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="category">Category:</label>
//                     <select
//                         id="category"
//                         value={selectedCategory}
//                         onChange={(e) => setSelectedCategory(e.target.value)}
//                         required
//                     >
//                         <option value="">Select Category</option>
//                         {categories.map((category) => (
//                             <option key={category.id} value={category.name}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="subcategory">Subcategory:</label>
//                     <select
//                         id="subcategory"
//                         value={selectedSubcategory}
//                         onChange={(e) => setSelectedSubcategory(e.target.value)}
//                         required
//                     >
//                         <option value="">Select Subcategory</option>
//                         {subcategories.map((subcategory) => (
//                             <option key={subcategory.id} value={subcategory.name}>
//                                 {subcategory.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="productImage">Product Images:</label>
//                     <input
//                         type="file"
//                         id="productImage"
//                         onChange={handleFileChange}
//                         accept=".jpg,.jpeg,.png"
//                         multiple
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="upload-button" disabled={loading}>
//                     {loading ? 'Uploading...' : 'Upload Product'}
//                 </button>
//                 {error && <p className="error-message">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default AddProduct;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
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
            <h2>Add Product</h2>
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

export default AddProduct;
