
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
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';

const ProductCatalogUploader = () => {
    const navigate = useNavigate();
    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [nestedSubCategory, setNestedSubCategory] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [nestedSubCategories, setNestedSubCategories] = useState([]);
    const requiredResolution = { width: 800, height: 800 };

    // Fetching main categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };
        fetchCategories();
    }, []);

    const handleMainCategoryChange = async (e) => {
        const selectedCategory = e.target.value;
        setMainCategory(selectedCategory);
        setSubCategory('');
        setNestedSubCategory('');
        setUploadedImages([]);
        setUploadError('');

        // Fetch subcategories for the selected main category
        try {
            const response = await axios.get(`http://localhost:5000/categories/subcategories/${selectedCategory}`);
            console.log('Fetched subcategories:', response.data); // Log the fetched data
            setSubCategories(response.data.subcategories || []);
        } catch (error) {
            console.error('Error fetching subcategories', error);
            setUploadError('Failed to load subcategories. Please try again.'); // Set error message
        }
    };

    const handleSubCategoryChange = async (e) => {
        const selectedSubCategory = e.target.value;
        setSubCategory(selectedSubCategory);
        setNestedSubCategory('');

        // Fetch nested subcategories for the selected subcategory
        try {
            const response = await axios.get(`http://localhost:5000/categories/subcategories/${mainCategory}/${selectedSubCategory}`);
            console.log('Fetched nested subcategories:', response.data); // Log the fetched data
            setNestedSubCategories(response.data.nestedSubcategories || []);
        } catch (error) {
            console.error('Error fetching nested subcategories', error);
            setUploadError('Failed to load nested subcategories. Please try again.'); // Set error message
        }
    };

    const handleNestedSubCategoryChange = (e) => {
        setNestedSubCategory(e.target.value);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const validImages = [];
        const promises = files.map((file) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    if (img.width >= requiredResolution.width && img.height >= requiredResolution.height) {
                        validImages.push(file);
                        resolve(true);
                    } else {
                        alert(`Image ${file.name} does not meet the required resolution of ${requiredResolution.width}x${requiredResolution.height}px.`);
                        resolve(false);
                    }
                };
            });
        });

        Promise.all(promises).then(() => {
            if (uploadedImages.length + validImages.length <= 9) {
                setUploadedImages([...uploadedImages, ...validImages]);
            } else {
                alert('You can upload a maximum of 9 images.');
            }
        });
    };

    const openModal = () => {
        if (uploadedImages.length > 0) {
            setModalIsOpen(true);
        } else {
            alert('Please upload at least one image.');
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setUploadError('');
    };

    const handleContinue = () => {
        const invalidImages = uploadedImages.filter(image => {
            const img = new Image();
            img.src = URL.createObjectURL(image);
            return img.width < requiredResolution.width || img.height < requiredResolution.height;
        });

        if (invalidImages.length > 0) {
            setUploadError('Some images do not meet the required resolution. Please ensure all images are at least 800x800 pixels.');
            return;
        }

        navigate('/add-product-details', { state: { uploadedImages } });
        closeModal();
    };

    const handleRemoveImage = (index) => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    };

    return (
        <div className="catalog-container">
            <h2>Add Single Catalog</h2>
            <div className="info-section">
                {/* Main Category Selection */}
                <div className="category-section main-category-selection">
                    <label htmlFor="main-category">1. Choose Main Category:</label>
                    <select id="main-category" value={mainCategory} onChange={handleMainCategoryChange}>
                        <option value="">-- Choose Category --</option>
                        {categories.map(category => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {/* Subcategory Selection */}
                <div className="category-section sub-category-selection">
                    {mainCategory && (
                        <>
                            <label htmlFor="sub-category">2. Select Subcategory:</label>
                            <select id="sub-category" value={subCategory} onChange={handleSubCategoryChange}>
                                <option value="">-- Choose Subcategory --</option>
                                {subCategories.map(sub => (
                                    <option key={sub.name} value={sub.name}>{sub.name}</option>
                                ))}
                            </select>
                        </>
                    )}
                </div>

                {/* Nested Subcategory Selection */}
                <div className="category-section nested-sub-category-selection">
                    {subCategory && (
                        <>
                            <label htmlFor="nested-sub-category">3. Select Nested Subcategory:</label>
                            <select id="nested-sub-category" value={nestedSubCategory} onChange={handleNestedSubCategoryChange}>
                                <option value="">-- Choose Nested Subcategory --</option>
                                {nestedSubCategories.map(nested => (
                                    <option key={nested.name} value={nested.name}>{nested.name}</option>
                                ))}
                            </select>
                        </>
                    )}
                </div>

                {/* Image Upload Section */}
                <div className="image-upload">
                    <label htmlFor="image-upload">4. Upload Product Images (Max 9):</label>
                    <input type="file" id="image-upload" multiple accept="image/*" onChange={handleImageUpload} />
                    <p>{uploadedImages.length} image(s) uploaded.</p>
                    <ul>
                        {uploadedImages.map((image, index) => (
                            <li key={index}>
                                {image.name} 
                                <button onClick={() => handleRemoveImage(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Continue Button */}
                <button className="upload-button" onClick={openModal}>
                    Continue
                </button>

                {/* Confirmation Modal */}
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
                    <h2>Confirm Product Upload</h2>
                    <p>Are you ready to upload {uploadedImages.length} product image(s)?</p>
                    {uploadError && <p className="error-message">{uploadError}</p>}
                    <button className="modal-button" onClick={handleContinue}>Yes, Proceed</button>
                    <button className="modal-button" onClick={() => setModalIsOpen(false)}>Add More Images</button>
                    <button className="modal-button" onClick={closeModal}>Cancel</button>
                </Modal>

                {/* Upload Guidelines */}
                <div className="upload-guidelines">
                    <h5>General Guidelines:</h5>
                    <ul>
                        <li>Upload between 1 and 9 products for your catalog.</li>
                        <li>Ensure all products are from the selected category.</li>
                    </ul>
                    <h5>Image Guidelines:</h5>
                    <ul>
                        <li>No text or watermarks in primary images.</li>
                        <li>Product images must not contain any text.</li>
                        <li>Images should feature only the product, without props.</li>
                        <li>Minimum resolution: {requiredResolution.width}x{requiredResolution.height}px</li>
                    </ul>
                </div>

                {/* Dedicated Add Product Details Button */}
                <div className="add-product-details">
                    <button className="add-product-details-button" onClick={() => navigate('/add-product-details')}>
                        Add Product Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCatalogUploader;
