
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import './ProductUpload.css'; // Import CSS for styling

// const ProductUpload = () => {
//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState('');
//     const [productDescription, setProductDescription] = useState('');
//     const [productImages, setProductImages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate(); // Initialize useNavigate

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

//             const data = await response.json();
//             console.log('Product upload successful:', data);

//             // Redirect to the product list page or update the list
//             navigate('/product-list');
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

// export default ProductUpload;

import React, { useState, useEffect, useCallback } from 'react';
import './ProductUpload.css';
import { FaEdit, FaTrash, FaYoutube, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductUpload = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        sellingPrice: '',
        discountPrice: '',
        category: '',
        subCategory: ''
    });
    const [bulkUploads, setBulkUploads] = useState(0);
    const [singleUploads, setSingleUploads] = useState(0);
    const [statuses, setStatuses] = useState({
        all: 0,
        actionRequired: 0,
        qcInProgress: 0,
        qcError: 0,
        qcPass: 0,
        draft: 0
    });

    const bufferToBase64 = (buffer) => {
        if (!buffer) return '';
        const binary = Array.from(new Uint8Array(buffer)).map(byte => String.fromCharCode(byte)).join('');
        return `data:image/jpeg;base64,${window.btoa(binary)}`;
    };

    const fetchAllProducts = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            const productsWithImages = data.map(product => ({
                ...product,
                image: bufferToBase64(product.images?.[0]?.data?.data),
                category: product.category?.name || 'N/A',
                subCategory: product.subCategory?.name || 'N/A'
            }));
            setProducts(productsWithImages);
            setFilteredProducts(productsWithImages);

            setBulkUploads(productsWithImages.filter(product => product.uploadMethod === 'bulk').length);
            setSingleUploads(productsWithImages.filter(product => product.uploadMethod === 'single').length);
            setStatuses({
                all: productsWithImages.length,
                actionRequired: productsWithImages.filter(product => product.status === 'actionRequired').length,
                qcInProgress: productsWithImages.filter(product => product.status === 'qcInProgress').length,
                qcError: productsWithImages.filter(product => product.status === 'qcError').length,
                qcPass: productsWithImages.filter(product => product.status === 'qcPass').length,
                draft: productsWithImages.filter(product => product.status === 'draft').length
            });
        } catch (error) {
            console.error(error);
            setError(`Failed to fetch products: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    const handleSearch = (event) => {
        setSearchId(event.target.value);
        if (event.target.value) {
            setFilteredProducts(products.filter(product => product.id === parseInt(event.target.value, 10)));
        } else {
            setFilteredProducts(products);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestBody = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            sellingPrice: formData.sellingPrice,
            discountPrice: formData.discountPrice,
            category: formData.category,
            subCategory: formData.subCategory
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
                image: editingProduct.image
            };
            setProducts(products.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
            setFilteredProducts(filteredProducts.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                sellingPrice: '',
                discountPrice: '',
                category: '',
                subCategory: ''
            });
        } catch (error) {
            console.error("Error updating product:", error);
            setError(`Failed to update product: ${error.message}`);
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            sellingPrice: product.sellingPrice,
            discountPrice: product.discountPrice,
            category: product.category,
            subCategory: product.subCategory
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
            setError(`Failed to remove product: ${error.message}`);
        }
    };

    const handleBulkUpload = () => {
        navigate('/bulk-upload'); // Adjust the path accordingly
    };

    const handleSingleUpload = () => {
        navigate('/productmanagement'); // Adjust the path accordingly
    };

    return (
        <div className='list-product'>
            <div className="upload-section">
                <div className="header">
                    <h1>Upload Catalog</h1>
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
                    <div className="overview-box">
                        <p>Total Uploads Done: {products.length}</p>
                        <p>Using Bulk Uploads: {bulkUploads}</p>
                        <p>Using Single Uploads: {singleUploads}</p>
                    </div>
                </div>

                <div className="upload-buttons">
                    <button className="bulk-upload-button" onClick={handleBulkUpload}>Add Catalog in Bulk</button>
                    <button className="single-upload-button" onClick={handleSingleUpload}>Add Catalog in Single</button>
                </div>

                <div className="statuses">
                    <h3>Product Statuses</h3>
                    <div className="status-buttons">
                        <button>{`All: ${statuses.all}`}</button>
                        <button>{`Action Required: ${statuses.actionRequired}`}</button>
                        <button>{`QC in Progress: ${statuses.qcInProgress}`}</button>
                        <button>{`QC Error: ${statuses.qcError}`}</button>
                        <button>{`QC Pass: ${statuses.qcPass}`}</button>
                        <button>{`Draft: ${statuses.draft}`}</button>
                    </div>
                </div>
            </div>

            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search by Product ID" 
                    value={searchId} 
                    onChange={handleSearch} 
                    className="search-input"
                />
            </div>
            
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {editingProduct && (
                        <div className="edit-form">
                            <h2>Edit Product</h2>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Name:
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </label>
                                <label>
                                    Description:
                                    <input 
                                        type="text" 
                                        name="description" 
                                        value={formData.description} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </label>
                                <label>
                                    Price:
                                    <input 
                                        type="number" 
                                        name="price" 
                                        value={formData.price} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </label>
                                <label>
                                    Selling Price:
                                    <input 
                                        type="number" 
                                        name="sellingPrice" 
                                        value={formData.sellingPrice} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </label>
                                <label>
                                    Discount Price:
                                    <input 
                                        type="number" 
                                        name="discountPrice" 
                                        value={formData.discountPrice} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </label>
                                <label>
                                    Category:
                                    <input 
                                        type="text" 
                                        name="category" 
                                        value={formData.category} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </label>
                                <label>
                                    Sub-Category:
                                    <input 
                                        type="text" 
                                        name="subCategory" 
                                        value={formData.subCategory} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </label>
                                <button type="submit">Update Product</button>
                            </form>
                        </div>
                    )}

<table className="product-table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Selling Price</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.sellingPrice}</td>
                    <td>{product.status}</td>
                    <td>
                        <button onClick={() => handleEditClick(product)}>
                            <FaEdit /> Edit
                        </button>
                        <button onClick={() => removeProduct(product.id)}>
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="7">No products available.</td>
            </tr>
        )}
    </tbody>
</table>

                </>
            )}
        </div>
    );
};

export default ProductUpload;
