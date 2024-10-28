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
//             const response = await fetch('${process.env.BASE_URL}/products', {
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
//             const response = await fetch(`${process.env.BASE_URL}/products/${editingProduct.id}`, {
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
//             const response = await fetch(`${process.env.BASE_URL}/products/${id}`, {
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

const ListProduct = () => {
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
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`);
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
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${editingProduct.id}`, {
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
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
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
        navigate('/add-product'); // Adjust the path accordingly
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

export default ListProduct;
