// import React, { useState } from 'react';
// import './AddProduct.css'; // Import CSS for styling

// const AddProduct = ({ onProductSubmit }) => {
//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState('');
//     const [productDescription, setProductDescription] = useState('');
//     const [productImages, setProductImages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setProductImages(files);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         const formData = new FormData();
//         formData.append('name', productName);
//         formData.append('price', productPrice);
//         formData.append('description', productDescription);
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

//             // Clear the form
//             setProductName('');
//             setProductPrice('');
//             setProductDescription('');
//             setProductImages([]);

//             // Notify parent component to refresh product list
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
import './AddProduct.css'; // Import CSS for styling

const AddProduct = ({ onProductSubmit }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/categories');
                const data = await response.json();
                console.log('Fetched categories:', data);
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    throw new Error('Unexpected response format for categories.');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories.');
            }
        };

        fetchCategories();
    }, []);

    // Fetch subcategories based on selected category
    useEffect(() => {
        const fetchSubcategories = async () => {
            if (!selectedCategory) return;

            try {
                // Find the selected category's ID
                const selectedCategoryObj = categories.find(cat => cat.name === selectedCategory);
                if (!selectedCategoryObj) {
                    throw new Error('Selected category not found');
                }
                const categoryId = selectedCategoryObj.id;

                // Fetch subcategories using the category ID
                const response = await fetch(`http://localhost:5000/categories/${categoryId}/subcategories`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched subcategories:', data);

                if (Array.isArray(data)) {
                    setSubcategories(data);
                } else {
                    throw new Error('Unexpected response format for subcategories.');
                }
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                setError(`Failed to fetch subcategories: ${error.message}`);
            }
        };

        fetchSubcategories();
    }, [selectedCategory, categories]); // Depend on both selectedCategory and categories

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProductImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!selectedCategory || !selectedSubcategory) {
            setError('Please select both category and subcategory.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('sellingPrice', sellingPrice);
        formData.append('discountPrice', discountPrice);
        formData.append('description', productDescription);
        formData.append('category', selectedCategory);
        formData.append('subcategory', selectedSubcategory);
        formData.append('userId', localStorage.getItem('userId'));

        productImages.forEach((file) => {
            formData.append('images', file);
        });

        try {
            const response = await fetch('http://localhost:5000/products/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to upload product');
            }

            setProductName('');
            setProductPrice('');
            setSellingPrice('');
            setDiscountPrice('');
            setProductDescription('');
            setProductImages([]);
            setSelectedCategory('');
            setSelectedSubcategory('');

            if (onProductSubmit) onProductSubmit();
        } catch (error) {
            console.error('Error uploading product:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-upload-container">
            <h2>Upload a New Product</h2>
            <form onSubmit={handleSubmit} className="product-upload-form">
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice">Product Price (₹):</label>
                    <input
                        type="number"
                        id="productPrice"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sellingPrice">Selling Price (₹):</label>
                    <input
                        type="number"
                        id="sellingPrice"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="discountPrice">Discount Price (₹):</label>
                    <input
                        type="number"
                        id="discountPrice"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productDescription">Product Description:</label>
                    <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="subcategory">Subcategory:</label>
                    <select
                        id="subcategory"
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        required
                    >
                        <option value="">Select Subcategory</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.name}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="productImage">Product Images:</label>
                    <input
                        type="file"
                        id="productImage"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                        multiple
                        required
                    />
                </div>
                <button type="submit" className="upload-button" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Product'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AddProduct;
