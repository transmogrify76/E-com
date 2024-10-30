// import React, { useState, useEffect } from 'react';
// import './ListProduct.css';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const ListProduct = () => {
//     const [products, setProducts] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchId, setSearchId] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         price: '',
//         sellingPrice: '',
//         discountPrice: '',
//         category: '',
//         subCategory: ''
//     });

//     // Convert buffer to base64
//     const bufferToBase64 = (buffer) => {
//         if (!buffer) return '';
//         const binary = Array.from(new Uint8Array(buffer)).map(byte => String.fromCharCode(byte)).join('');
//         return `data:image/jpeg;base64,${window.btoa(binary)}`;
//     };

//     // Fetch all products from the API
//     const fetchAllProducts = async () => {
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
//                     : '', // Default to empty string if no image data is available
//                 category: product.category ? product.category.name : 'N/A',
//                 subCategory: product.subCategory ? product.subCategory.name : 'N/A'
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
//     const handleSearch = (event) => {
//         setSearchId(event.target.value);
//         if (event.target.value) {
//             setFilteredProducts(products.filter(product => product.id === parseInt(event.target.value, 10)));
//         } else {
//             setFilteredProducts(products);
//         }
//     };

//     // Handle form input change
//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Log formData to ensure it is correct
//         console.log('Submitting formData:', formData);

//         // Prepare request body
//         const requestBody = {
//             name: formData.name,
//             description: formData.description,
//             price: formData.price,
//             sellingPrice: formData.sellingPrice,
//             discountPrice: formData.discountPrice,
//             category: formData.category,
//             subCategory: formData.subCategory
//         };

//         try {
//             const response = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestBody)
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Failed to update product: ${response.statusText} - ${errorText}`);
//             }

//             const updatedProduct = await response.json();
//             // No need to update image here as it remains unchanged
//             const updatedProductWithImage = {
//                 ...updatedProduct,
//                 image: editingProduct.image // Retain the old image URL
//             };

//             // Update the product list with the updated product
//             setProducts(products.map(product => 
//                 product.id === editingProduct.id ? updatedProductWithImage : product
//             ));
//             setFilteredProducts(filteredProducts.map(product => 
//                 product.id === editingProduct.id ? updatedProductWithImage : product
//             ));
//             setEditingProduct(null); // Close the form
//             setFormData({
//                 name: '',
//                 description: '',
//                 price: '',
//                 sellingPrice: '',
//                 discountPrice: '',
//                 category: '',
//                 subCategory: ''
//             });
//         } catch (error) {
//             console.error("Error updating product:", error);
//             setError(`Failed to update product: ${error.message}`);
//         }
//     };

//     // Open edit form
//     const handleEditClick = (product) => {
//         setEditingProduct(product);
//         setFormData({
//             name: product.name,
//             description: product.description,
//             price: product.price,
//             sellingPrice: product.sellingPrice,
//             discountPrice: product.discountPrice,
//             category: product.category,
//             subCategory: product.subCategory
//         });
//     };

//     // Remove product from the list
//     const removeProduct = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/products/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to delete product: ${response.statusText}`);
//             }

//             // Update the product list by filtering out the removed product
//             setProducts(products.filter(product => product.id !== id));
//             setFilteredProducts(filteredProducts.filter(product => product.id !== id));
//         } catch (error) {
//             console.error("Error removing product:", error);
//             setError(`Failed to remove product: ${error.message}`);
//         }
//     };

//     useEffect(() => {
//         fetchAllProducts();
//     }, []); // Empty dependency array ensures this runs once on mount

//     return (
//         <div className='list-product'>
//             <div className="header">
//                 <h1>Admin Panel - Product List</h1>
//                 <input 
//                     type="text" 
//                     placeholder="Search by Product ID" 
//                     value={searchId} 
//                     onChange={handleSearch} 
//                     className="search-input"
//                 />
//             </div>

//             {error && <p className="error-message">{error}</p>}
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     {editingProduct && (
//                         <div className="edit-form">
//                             <h2>Edit Product</h2>
//                             <form onSubmit={handleSubmit}>
//                                 <label>
//                                     Name:
//                                     <input 
//                                         type="text" 
//                                         name="name" 
//                                         value={formData.name} 
//                                         onChange={handleInputChange} 
//                                     />
//                                 </label>
//                                 <label>
//                                     Description:
//                                     <input 
//                                         type="text" 
//                                         name="description" 
//                                         value={formData.description} 
//                                         onChange={handleInputChange} 
//                                     />
//                                 </label>
//                                 <label>
//                                     Price (₹):
//                                     <input 
//                                         type="number" 
//                                         name="price" 
//                                         value={formData.price} 
//                                         onChange={handleInputChange} 
//                                     />
//                                 </label>
//                                 <label>
//                                     Selling Price (₹):
//                                     <input 
//                                         type="number" 
//                                         name="sellingPrice" 
//                                         value={formData.sellingPrice} 
//                                         onChange={handleInputChange} 
//                                     />
//                                 </label>
//                                 <label>
//                                     Discount Price (₹):
//                                     <input 
//                                         type="number" 
//                                         name="discountPrice" 
//                                         value={formData.discountPrice} 
//                                         onChange={handleInputChange} 
//                                     />
//                                 </label>
//                                 <label>
//                                     Category:
//                                     <input 
//                                         type="text" 
//                                         name="category" 
//                                         value={formData.category} 
//                                         onChange={handleInputChange} 
//                                     />
//                                 </label>
//                                 <label>
//                                     SubCategory:
//                                     <input 
//                                         type="text" 
//                                         name="subCategory" 
//                                         value={formData.subCategory} 
//                                         onChange={handleInputChange} 
//                                     />
//                                 </label>
//                                 <button type="submit">Update</button>
//                                 <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                             </form>
//                         </div>
//                     )}

//                     <table className="product-table">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Image</th>
//                                 <th>Product Name</th>
//                                 <th>Description</th>
//                                 <th>Price</th>
//                                 <th>Selling Price</th>
//                                 <th>Discount Price</th>
//                                 <th>Category</th>
//                                 <th>SubCategory</th>
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
//                                                 <img src={product.image} alt={product.name} className="product-image" />
//                                             ) : (
//                                                 <p>No Image Available</p>
//                                             )}
//                                         </td>
//                                         <td>{product.name}</td>
//                                         <td>{product.description}</td>
//                                         <td>₹{product.price}</td>
//                                         <td>₹{product.sellingPrice}</td>
//                                         <td>₹{product.discountPrice}</td>
//                                         <td>{product.category}</td>
//                                         <td>{product.subCategory}</td>
//                                         <td>
//                                             <button 
//                                                 className="edit-button"
//                                                 onClick={() => handleEditClick(product)}
//                                             >
//                                                 <FaEdit /> Edit
//                                             </button>
//                                             <button 
//                                                 className="delete-button"
//                                                 onClick={() => removeProduct(product.id)}
//                                             >
//                                                 <FaTrash /> Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="10">No products available.</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ListProduct;
import React, { useState, useEffect, useCallback } from 'react';
import './ListProduct.css';
import { FaEdit, FaTrash, FaYoutube, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
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
    const [bulkUploads, setBulkUploads] = useState(0);
    const [singleUploads, setSingleUploads] = useState(0);
    const [sellerId, setSellerId] = useState(null);

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
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProductsBySeller = useCallback(async () => {
        if (!sellerId) return;
        try {
            const response = await fetch(`http://localhost:5000/products/seller/${sellerId}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();

            const productsWithImages = await Promise.all(data.map(async product => {
                const imagesResponse = await fetch(`http://localhost:5000/products/images/product/${product.id}`);
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
        } finally {
            setLoading(false);
        }
    }, [sellerId]);

    useEffect(() => {
        fetchSellerData();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (sellerId) {
            fetchProductsBySeller();
        }
    }, [sellerId, fetchProductsBySeller]);

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
                categories: selectedOptions
            }));
        } else if (name === 'productDetails') {
            try {
                setFormData(prevState => ({
                    ...prevState,
                    productDetails: value ? JSON.parse(value) : {}
                }));
            } catch (e) {
                console.error('Invalid JSON format', e);
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const calculateTotalQuantity = (quantityString) => {
        const parts = quantityString.split(/[+]/); // Removed unnecessary escape characters
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
            images: formData.images
        };

        try {
            const response = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);

            const updatedProduct = await response.json();
            const updatedProductWithImage = {
                ...updatedProduct,
                images: updatedProduct.images ? updatedProduct.images.map(img => img.base64) : []
            };

            setProducts(products.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
            setFilteredProducts(filteredProducts.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
            setEditingProduct(null);
            resetFormData();
        } catch (error) {
            console.error("Error updating product:", error);
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
            quantity: String(product.quantity).replace('+', ''),
            discountPrice: product.discountPrice,
            categories: product.categories || [],
            images: []
        });
    };

    const removeProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);

            setProducts(products.filter(product => product.id !== id));
            setFilteredProducts(filteredProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    const handleBulkUpload = () => {
        navigate('/bulk-upload');
    };

    const handleSingleUpload = () => {
        navigate('/productmanagement');
    };

    return (
        <div className='list-product'>
            <div className="upload-section">
                <div className="header">
                    <h1>List Product</h1>
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
                    <p>Total Bulk Uploads: {bulkUploads}</p>
                    <p>Total Single Uploads: {singleUploads}</p>
                </div>

                <button onClick={handleBulkUpload}>Bulk Upload</button>
                <button onClick={handleSingleUpload}>Single Upload</button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="product-list">
                    <h2>Product List</h2>
                    <input
                        type="text"
                        value={searchId}
                        onChange={handleSearch}
                        placeholder="Search by ID"
                    />
                    <select onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                                <th>Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(product)}>
                                            <FaEdit /> Edit
                                        </button>
                                        <button onClick={() => removeProduct(product.id)}>
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                    <td>
                                        {product.images.length > 0 ? (
                                            product.images.map((img, index) => (
                                                <img key={index} src={img} alt={product.name} className="product-image" style={{ width: '50px', height: '50px', margin: '0 5px' }} />
                                            ))
                                        ) : (
                                            <p>No Image Available</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editingProduct && (
                <div className="edit-product">
                    <h2>Edit Product</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" required />
                        <textarea name="productDetails" value={JSON.stringify(formData.productDetails)} onChange={handleInputChange} placeholder="Product Details (JSON)" />
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" required />
                        <input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Quantity" required />
                        <select name="categories" multiple onChange={handleInputChange} value={formData.categories}>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ListProduct;



