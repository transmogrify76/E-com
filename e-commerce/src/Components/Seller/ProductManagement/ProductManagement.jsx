// import React, { useState, useEffect } from 'react';
// import './ProductManagement.css'; // Ensure your styling matches
// import { FaEdit, FaTrash } from 'react-icons/fa';

// // Convert buffer to base64 image
// const bufferToBase64 = (buffer) => {
//     if (!buffer) return '';
//     const binary = Array.from(new Uint8Array(buffer)).map(byte => String.fromCharCode(byte)).join('');
//     return `data:image/jpeg;base64,${window.btoa(binary)}`;
// };

// const ProductManagement = () => {
//     // State variables
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [formData, setFormData] = useState(null);
//     const [searchId, setSearchId] = useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Fetch all products from the API
//     const fetchProducts = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/products', {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch products: ${response.statusText}`);
//             }

//             const data = await response.json();

//             // Convert nested image buffers to base64 strings
//             const productsWithImages = data.map(product => ({
//                 ...product,
//                 image: product.images && product.images.length > 0 && product.images[0].data && product.images[0].data.data
//                     ? bufferToBase64(product.images[0].data.data)
//                     : ''
//             }));

//             setProducts(productsWithImages);
//             setFilteredProducts(productsWithImages);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError(`Failed to fetch products: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle search by product ID
//     const handleSearch = () => {
//         if (searchId) {
//             const filtered = products.filter(product => product.id === parseInt(searchId, 10));
//             setFilteredProducts(filtered);
//         } else {
//             setFilteredProducts(products);
//         }
//     };

//     // Handle product edit
//     const handleEditProduct = (product) => {
//         setFormData({ ...product });
//     };

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/products/${formData.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to update product: ${response.statusText}`);
//             }

//             const updatedProduct = await response.json();
//             const updatedProductWithImage = {
//                 ...updatedProduct,
//                 image: updatedProduct.images && updatedProduct.images.length > 0 ? bufferToBase64(updatedProduct.images[0].data.data) : ''
//             };

//             setProducts(products.map(product => 
//                 product.id === updatedProduct.id ? updatedProductWithImage : product
//             ));
//             setFilteredProducts(filteredProducts.map(product => 
//                 product.id === updatedProduct.id ? updatedProductWithImage : product
//             ));
//             setFormData(null); // Close the form
//         } catch (error) {
//             console.error('Error updating product:', error);
//             setError(`Failed to update product: ${error.message}`);
//         }
//     };

//     // Handle product deletion
//     const handleDeleteProduct = async (productId) => {
//         if (window.confirm('Are you sure you want to delete this product?')) {
//             try {
//                 const response = await fetch(`http://localhost:5000/products/${productId}`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error(`Failed to delete product: ${response.statusText}`);
//                 }

//                 setProducts(products.filter(product => product.id !== productId));
//                 setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
//             } catch (error) {
//                 console.error('Error deleting product:', error);
//                 setError(`Failed to delete product: ${error.message}`);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     return (
//         <div className="product-management">
//             <h2>Product Management</h2>
//             {error && <p className="error-message">{error}</p>}
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     value={searchId}
//                     onChange={(e) => setSearchId(e.target.value)}
//                     placeholder="Search by Product ID"
//                 />
//                 <button onClick={handleSearch} className="action-button search">Search</button>
//             </div>
//             <div className="product-list">
//                 <h3>Product Listing</h3>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Image</th>
//                                 <th>Name</th>
//                                 <th>Description</th>
//                                 <th>Price</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredProducts.length > 0 ? (
//                                 filteredProducts.map(product => (
//                                     <tr key={product.id}>
//                                         <td>{product.id}</td>
//                                         <td>
//                                             {product.image ? (
//                                                 <img src={product.image} alt={product.name} className="product-image" style={{'max-height': '40px' , width: 'auto'}}/>
//                                             ) : (
//                                                 <p>No Image Available</p>
//                                             )}
//                                         </td>
//                                         <td>{product.name}</td>
//                                         <td>{product.description}</td>
//                                         <td>₹{product.price}</td>
//                                         <td>
//                                             <button onClick={() => handleEditProduct(product)} className="action-button edit">
//                                                 <FaEdit /> Edit
//                                             </button>
//                                             <button onClick={() => handleDeleteProduct(product.id)} className="action-button delete">
//                                                 <FaTrash /> Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" className="no-data">No products found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//             {formData && (
//                 <div className="edit-form">
//                     <h2>Edit Product</h2>
//                     <form onSubmit={handleSubmit}>
//                         <label>
//                             Name:
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name || ''}
//                                 onChange={handleInputChange}
//                             />
//                         </label>
//                         <label>
//                             Description:
//                             <input
//                                 type="text"
//                                 name="description"
//                                 value={formData.description || ''}
//                                 onChange={handleInputChange}
//                             />
//                         </label>
//                         <label>
//                             Price (₹):
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={formData.price || ''}
//                                 onChange={handleInputChange}
//                             />
//                         </label>
//                         <button type="submit" className="action-button save">Save Changes</button>
//                         <button type="button" onClick={() => setFormData(null)} className="action-button cancel">Cancel</button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductManagement;

// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { useNavigate } from 'react-router-dom';
// import './ProductManagement.css';

// const ProductCatalogUploader = () => {
//     const navigate = useNavigate();
//     const [mainCategory, setMainCategory] = useState('');
//     const [subCategory, setSubCategory] = useState('');
//     const [nestedSubCategory, setNestedSubCategory] = useState('');
//     const [uploadedImages, setUploadedImages] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [uploadError, setUploadError] = useState('');
//     const requiredResolution = { width: 800, height: 800 };

//     const categories = {
//         'men-apparel': {
//             subcategories: {
//                 'Shirts': ['Casual', 'Formal'],
//                 'Pants': ['Jeans', 'Trousers'],
//                 'Shoes': ['Sneakers', 'Loafers']
//             },
//             image: 'path_to_men_apparel_image.jpg'
//         },
//         // ... other categories
//     };

//     const handleMainCategoryChange = (e) => {
//         setMainCategory(e.target.value);
//         setSubCategory('');
//         setNestedSubCategory('');
//         setUploadedImages([]);
//         setUploadError('');
//     };

//     const handleSubCategoryChange = (e) => {
//         setSubCategory(e.target.value);
//         setNestedSubCategory('');
//     };

//     const handleNestedSubCategoryChange = (e) => {
//         setNestedSubCategory(e.target.value);
//     };

//     const handleImageUpload = (e) => {
//         const files = Array.from(e.target.files);
//         const validImages = [];
//         const promises = files.map((file) => {
//             return new Promise((resolve) => {
//                 const img = new Image();
//                 img.src = URL.createObjectURL(file);
//                 img.onload = () => {
//                     if (img.width >= requiredResolution.width && img.height >= requiredResolution.height) {
//                         validImages.push(file);
//                         resolve(true);
//                     } else {
//                         alert(`Image ${file.name} does not meet the required resolution of ${requiredResolution.width}x${requiredResolution.height}px.`);
//                         resolve(false);
//                     }
//                 };
//             });
//         });

//         Promise.all(promises).then(() => {
//             if (uploadedImages.length + validImages.length <= 9) {
//                 setUploadedImages([...uploadedImages, ...validImages]);
//             } else {
//                 alert('You can upload a maximum of 9 images.');
//             }
//         });
//     };

//     const openModal = () => {
//         if (uploadedImages.length > 0) {
//             setModalIsOpen(true);
//         } else {
//             alert('Please upload at least one image.');
//         }
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setUploadError('');
//     };

//     const handleContinue = () => {
//         const invalidImages = uploadedImages.filter(image => {
//             const img = new Image();
//             img.src = URL.createObjectURL(image);
//             return img.width < requiredResolution.width || img.height < requiredResolution.height;
//         });

//         if (invalidImages.length > 0) {
//             setUploadError('Some images do not meet the required resolution. Please ensure all images are at least 800x800 pixels.');
//             return;
//         }

//         // Navigate to add product details for the first image, for example
//         navigate('/add-product-details', { state: { uploadedImages } });
//         closeModal();
//     };

//     const handleRemoveImage = (index) => {
//         setUploadedImages(uploadedImages.filter((_, i) => i !== index));
//     };

//     return (
//         <div className="catalog-container">
//             <h2>Add Single Catalog</h2>
//             <div className="info-section">
//                 {/* Main Category Selection */}
//                 <div className="category-section main-category-selection">
//                     <label htmlFor="main-category">1. Choose Main Category:</label>
//                     <select id="main-category" value={mainCategory} onChange={handleMainCategoryChange}>
//                         <option value="">-- Choose Category --</option>
//                         {Object.keys(categories).map(category => (
//                             <option key={category} value={category}>{category.replace('-', ' ')}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Subcategory Selection */}
//                 <div className="category-section sub-category-selection">
//                     {mainCategory && (
//                         <>
//                             <label htmlFor="sub-category">2. Select Subcategory:</label>
//                             <select id="sub-category" value={subCategory} onChange={handleSubCategoryChange}>
//                                 <option value="">-- Choose Subcategory --</option>
//                                 {Object.keys(categories[mainCategory].subcategories).map(sub => (
//                                     <option key={sub} value={sub}>{sub}</option>
//                                 ))}
//                             </select>
//                         </>
//                     )}
//                 </div>

//                 {/* Nested Subcategory Selection */}
//                 <div className="category-section nested-sub-category-selection">
//                     {subCategory && (
//                         <>
//                             <label htmlFor="nested-sub-category">3. Select Nested Subcategory:</label>
//                             <select id="nested-sub-category" value={nestedSubCategory} onChange={handleNestedSubCategoryChange}>
//                                 <option value="">-- Choose Nested Subcategory --</option>
//                                 {categories[mainCategory].subcategories[subCategory].map(nested => (
//                                     <option key={nested} value={nested}>{nested}</option>
//                                 ))}
//                             </select>
//                         </>
//                     )}
//                 </div>

//                 {/* Category Image Display */}
//                 {mainCategory && (
//                     <div className="category-image">
//                         <img src={categories[mainCategory].image} alt={`${mainCategory} category`} />
//                     </div>
//                 )}

//                 {/* Image Upload Section */}
//                 <div className="image-upload">
//                     <label htmlFor="image-upload">4. Upload Product Images (Max 9):</label>
//                     <input type="file" id="image-upload" multiple accept="image/*" onChange={handleImageUpload} />
//                     <p>{uploadedImages.length} image(s) uploaded.</p>
//                     <ul>
//                         {uploadedImages.map((image, index) => (
//                             <li key={index}>
//                                 {image.name} 
//                                 <button onClick={() => handleRemoveImage(index)}>Remove</button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Continue Button */}
//                 <button className="upload-button" onClick={openModal}>
//                     Continue
//                 </button>

//                 {/* Confirmation Modal */}
//                 <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
//                     <h2>Confirm Product Upload</h2>
//                     <p>Are you ready to upload {uploadedImages.length} product image(s)?</p>
//                     {uploadError && <p className="error-message">{uploadError}</p>}
//                     <button className="modal-button" onClick={handleContinue}>Yes, Proceed</button>
//                     <button className="modal-button" onClick={() => setModalIsOpen(false)}>Add More Images</button>
//                     <button className="modal-button" onClick={closeModal}>Cancel</button>
//                 </Modal>

//                 {/* Upload Guidelines */}
//                 <div className="upload-guidelines">
//                     <h5>General Guidelines:</h5>
//                     <ul>
//                         <li>Upload between 1 and 9 products for your catalog.</li>
//                         <li>Ensure all products are from the selected category.</li>
//                     </ul>
//                     <h5>Image Guidelines:</h5>
//                     <ul>
//                         <li>No text or watermarks in primary images.</li>
//                         <li>Product images must not contain any text.</li>
//                         <li>Images should feature only the product, without props.</li>
//                         <li>Minimum resolution: {requiredResolution.width}x{requiredResolution.height}px</li>
//                     </ul>
//                 </div>

//                 {/* Dedicated Add Product Details Button */}
//                 <div className="add-product-details">
//                     <button className="add-product-details-button" onClick={() => navigate('/add-product-details')}>
//                         Add Product Details
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCatalogUploader;
// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import { useNavigate } from 'react-router-dom';
// import './ProductManagement.css';

// const ProductCatalogUploader = () => {
//     const navigate = useNavigate();
//     const [mainCategory, setMainCategory] = useState('');
//     const [subCategory, setSubCategory] = useState('');
//     const [nestedSubCategory, setNestedSubCategory] = useState('');
//     const [uploadedImages, setUploadedImages] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [uploadError, setUploadError] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setSubcategories] = useState([]);
//     const [nestedSubcategories, setNestedSubcategories] = useState([]);
//     const requiredResolution = { width: 800, height: 800 };

//     useEffect(() => {
//         // Fetch categories on component mount
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/categories');
//                 const data = await response.json();
//                 setCategories(data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//     }, []);

//     useEffect(() => {
//         // Fetch subcategories when main category changes
//         const fetchSubcategories = async () => {
//             if (mainCategory) {
//                 try {
//                     const response = await fetch(`http://localhost:5000/categories/${mainCategory}/subcategories`);
//                     const data = await response.json();
//                     setSubcategories(data);
//                     setSubCategory(''); // Reset subcategory
//                     setNestedSubCategory(''); // Reset nested subcategory
//                 } catch (error) {
//                     console.error('Error fetching subcategories:', error);
//                 }
//             }
//         };
//         fetchSubcategories();
//     }, [mainCategory]);

//     useEffect(() => {
//         // Fetch nested subcategories when subcategory changes
//         const fetchNestedSubcategories = async () => {
//             if (subCategory) {
//                 try {
//                     const response = await fetch(`http://localhost:5000/categories/subcategory/${subCategory}/nested`);
//                     const data = await response.json();
//                     setNestedSubcategories(data);
//                     setNestedSubCategory(''); // Reset nested subcategory
//                 } catch (error) {
//                     console.error('Error fetching nested subcategories:', error);
//                 }
//             }
//         };
//         fetchNestedSubcategories();
//     }, [subCategory]);

//     const handleMainCategoryChange = (e) => {
//         setMainCategory(e.target.value);
//         setSubCategory('');
//         setNestedSubCategory('');
//         setUploadedImages([]);
//         setUploadError('');
//     };

//     const handleSubCategoryChange = (e) => {
//         setSubCategory(e.target.value);
//         setNestedSubCategory('');
//     };

//     const handleNestedSubCategoryChange = (e) => {
//         setNestedSubCategory(e.target.value);
//     };

//     const handleImageUpload = (e) => {
//         const files = Array.from(e.target.files);
//         const validImages = [];
//         const promises = files.map((file) => {
//             return new Promise((resolve) => {
//                 const img = new Image();
//                 img.src = URL.createObjectURL(file);
//                 img.onload = () => {
//                     if (img.width >= requiredResolution.width && img.height >= requiredResolution.height) {
//                         validImages.push(file);
//                         resolve(true);
//                     } else {
//                         alert(`Image ${file.name} does not meet the required resolution of ${requiredResolution.width}x${requiredResolution.height}px.`);
//                         resolve(false);
//                     }
//                 };
//             });
//         });

//         Promise.all(promises).then(() => {
//             if (uploadedImages.length + validImages.length <= 9) {
//                 setUploadedImages([...uploadedImages, ...validImages]);
//             } else {
//                 alert('You can upload a maximum of 9 images.');
//             }
//         });
//     };

//     const openModal = () => {
//         if (uploadedImages.length > 0) {
//             setModalIsOpen(true);
//         } else {
//             alert('Please upload at least one image.');
//         }
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setUploadError('');
//     };

//     const handleContinue = () => {
//         const invalidImages = uploadedImages.filter(image => {
//             const img = new Image();
//             img.src = URL.createObjectURL(image);
//             return img.width < requiredResolution.width || img.height < requiredResolution.height;
//         });

//         if (invalidImages.length > 0) {
//             setUploadError('Some images do not meet the required resolution. Please ensure all images are at least 800x800 pixels.');
//             return;
//         }

//         // Navigate to add product details for the first image, for example
//         navigate('/add-product-details', { state: { uploadedImages } });
//         closeModal();
//     };

//     const handleRemoveImage = (index) => {
//         setUploadedImages(uploadedImages.filter((_, i) => i !== index));
//     };

//     return (
//         <div className="catalog-container">
//             <h2>Add Single Catalog</h2>
//             <div className="info-section">
//                 {/* Main Category Selection */}
//                 <div className="category-section main-category-selection">
//                     <label htmlFor="main-category">1. Choose Main Category:</label>
//                     <select id="main-category" value={mainCategory} onChange={handleMainCategoryChange}>
//                         <option value="">-- Choose Category --</option>
//                         {categories.map(category => (
//                             <option key={category.id} value={category.id}>{category.name}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Subcategory Selection */}
//                 <div className="category-section sub-category-selection">
//                     {mainCategory && (
//                         <>
//                             <label htmlFor="sub-category">2. Select Subcategory:</label>
//                             <select id="sub-category" value={subCategory} onChange={handleSubCategoryChange}>
//                                 <option value="">-- Choose Subcategory --</option>
//                                 {subcategories.map(sub => (
//                                     <option key={sub.id} value={sub.id}>{sub.name}</option>
//                                 ))}
//                             </select>
//                         </>
//                     )}
//                 </div>

//                 {/* Nested Subcategory Selection */}
//                 <div className="category-section nested-sub-category-selection">
//                     {subCategory && (
//                         <>
//                             <label htmlFor="nested-sub-category">3. Select Nested Subcategory:</label>
//                             <select id="nested-sub-category" value={nestedSubCategory} onChange={handleNestedSubCategoryChange}>
//                                 <option value="">-- Choose Nested Subcategory --</option>
//                                 {nestedSubcategories.map(nested => (
//                                     <option key={nested.id} value={nested.id}>{nested.name}</option>
//                                 ))}
//                             </select>
//                         </>
//                     )}
//                 </div>

//                 {/* Image Upload Section */}
//                 <div className="image-upload">
//                     <label htmlFor="image-upload">4. Upload Product Images (Max 9):</label>
//                     <input type="file" id="image-upload" multiple accept="image/*" onChange={handleImageUpload} />
//                     <p>{uploadedImages.length} image(s) uploaded.</p>
//                     <ul>
//                         {uploadedImages.map((image, index) => (
//                             <li key={index}>
//                                 {image.name} 
//                                 <button onClick={() => handleRemoveImage(index)}>Remove</button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Continue Button */}
//                 <button className="upload-button" onClick={openModal}>
//                     Continue
//                 </button>

//                 {/* Confirmation Modal */}
//                 <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
//                     <h2>Confirm Product Upload</h2>
//                     <p>Are you ready to upload {uploadedImages.length} product image(s)?</p>
//                     {uploadError && <p className="error-message">{uploadError}</p>}
//                     <button className="modal-button" onClick={handleContinue}>Yes, Proceed</button>
//                     <button className="modal-button" onClick={() => setModalIsOpen(false)}>Add More Images</button>
//                     <button className="modal-button" onClick={closeModal}>Cancel</button>
//                 </Modal>

//                 {/* Upload Guidelines */}
//                 <div className="upload-guidelines">
//                     <h5>General Guidelines:</h5>
//                     <ul>
//                         <li>Upload between 1 and 9 products for your catalog.</li>
//                         <li>Ensure all products are from the selected category.</li>
//                     </ul>
//                     <h5>Image Guidelines:</h5>
//                     <ul>
//                         <li>No text or watermarks in primary images.</li>
//                         <li>Product images must not contain any text.</li>
//                         <li>Images should feature only the product, without props.</li>
//                         <li>Minimum resolution: {requiredResolution.width}x{requiredResolution.height}px</li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCatalogUploader;
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './ProductManagement.css';

const ProductCatalogUploader = () => {
    const navigate = useNavigate();
    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [nestedSubCategory, setNestedSubCategory] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [nestedSubcategories, setNestedSubcategories] = useState([]);
    const requiredResolution = { width: 800, height: 800 };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (mainCategory) {
                try {
                    const response = await fetch(`http://localhost:5000/categories/${mainCategory}/subcategories`);
                    const data = await response.json();
                    setSubcategories(data);
                    setSubCategory(''); 
                    setNestedSubCategory(''); 
                    setNestedSubcategories([]); // Reset nested subcategories
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                }
            }
        };
        fetchSubcategories();
    }, [mainCategory]);

    useEffect(() => {
        const fetchNestedSubcategories = async () => {
            if (subCategory) {
                try {
                    console.log(`Fetching nested subcategories for subCategory: ${subCategory}`);
                    const response = await fetch(`http://localhost:5000/categories/subcategory/${subCategory}/nested`);
                    const data = await response.json();
                    console.log('Fetched nested subcategories:', data);
                    if (Array.isArray(data)) {
                        setNestedSubcategories(data);
                    } else {
                        console.error('Expected an array, but got:', data);
                        setNestedSubcategories([]);
                    }
                    setNestedSubCategory('');
                } catch (error) {
                    console.error('Error fetching nested subcategories:', error);
                    setNestedSubcategories([]);
                }
            }
        };
        fetchNestedSubcategories();
    }, [subCategory]);
    
    const handleMainCategoryChange = (e) => {
        setMainCategory(e.target.value);
        setSubCategory('');
        setNestedSubCategory('');
        setUploadedImages([]);
        setUploadError('');
    };

    const handleSubCategoryChange = (e) => {
        setSubCategory(e.target.value);
        setNestedSubCategory('');
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
                            <option key={category.id} value={category.id}>{category.name}</option>
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
                                {subcategories.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
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
                                {nestedSubcategories.map(nested => (
                                    <option key={nested.id} value={nested.id}>{nested.name}</option>
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
            </div>
        </div>
    );
};

export default ProductCatalogUploader;
