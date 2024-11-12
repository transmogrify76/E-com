import React, { useState, useEffect, useCallback } from 'react';
import './ListProduct.css';
import { FaEdit, FaTrash, FaYoutube, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ListProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
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
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/sellers/${storedSellerId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setSellerId(response.data.id);
        } catch (err) {
            console.error('Error fetching seller data:', err);
            setError(err.response?.data?.message || 'Error fetching seller data');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories');
        }
    };

    const fetchProductsBySeller = useCallback(async () => {
        if (!sellerId) return;
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/seller/${sellerId}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();

            const productsWithImages = await Promise.all(data.map(async product => {
                const imagesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/images/product/${product.id}`);
                const imagesData = await imagesResponse.json();

                // Use the base64 string directly as the image source
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
            setError(`Failed to fetch products: ${error.message}`);
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

    const handleSearch = async (event) => {
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
                setError('Invalid JSON format');
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const calculateTotalQuantity = (quantityString) => {
        const parts = quantityString.split(/[\+\-]/);
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
            description:formData.description,
            productDetails: formData.productDetails,
            price: parseFloat(formData.price),
            quantity: totalQuantity.toString(),
            categories: formData.categories,
            images: formData.images
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
                images: updatedProduct.images ? updatedProduct.images.map(img => img.base64) : []
            };

            setProducts(products.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
            setFilteredProducts(filteredProducts.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
            setEditingProduct(null);
            resetFormData();
        } catch (error) {
            console.error("Error updating product:", error);
            setError(`Failed to update product: ${error.message}`);
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
            description:product.description,
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
        navigate('/bulk-upload');
    };

    const handleSingleUpload = () => {
        navigate('/productmanagement');
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
                    <p>Add/edit the catalogs and improve the quality. Plus, prevent catalogs from deactivations/low visibility. *T&C </p>
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
                    <button className="bulk-upload" onClick={handleBulkUpload}>Bulk Upload</button>
                    <button className="single-upload" onClick={handleSingleUpload}>Single Upload</button>
                </div>

                <div className="search">
                    <input
                        type="text"
                        placeholder="Search by ID"
                        value={searchId}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {error && <div className="error">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Categories</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>
                                    {product.images.length > 0 ? (
                                        product.images.map((img, index) => (
                                            <img key={index} src={img} alt={`${product.name} image ${index + 1}`} className="product-image" style={{ width: '50px', height: '50px', margin: '0 5px' }} />
                                        ))
                                    ) : (
                                        <p>No Image Available</p>
                                    )}
                                </td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.categories.join(', ')}</td>
                                <td>
                                    <button onClick={() => handleEditClick(product)}><FaEdit /></button>
                                    <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingProduct && (
                <form onSubmit={handleSubmit} className="edit-form">
                    <h3>Edit Product</h3>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                    />
                    <textarea
                        name="productDetails"
                        value={JSON.stringify(formData.productDetails, null, 2)}
                        onChange={handleInputChange}
                        placeholder="Product Details (JSON format)"
                        rows={10}
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                    />
                    <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="Quantity (+/-)"
                    />
                    <select
                        name="categories"
                        value={formData.categories}
                        onChange={handleInputChange}
                        multiple
                    >
                        <option value="">Select Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name} selected={formData.categories.includes(category.name)}>
                                {category.name}
                            </option>
                        ))}
                    </select>
<<<<<<< HEAD
                    <button type="submit">Update Product</button>
                    <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
                </form>
            )}
=======
                </div>

                {error && <div className="error">{error}</div>}

                <div className="product-list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table>
                            <thead >
                                <tr >
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>ID</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Name</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Description</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Price</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Quantity</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Categories</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}>Images</th>
                                    <th style={{ backgroundColor: 'maroon', color: 'white' }}> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.categories.join(', ')}</td>
                                        <td>
                                            {product.images.length > 0 ? (
                                                <img src={product.images[0]} alt={product.name} style={{ width: '50px' }} />
                                            ) : (
                                                <p>No Image</p>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={() => handleEditClick(product)}><FaEdit /></button>
                                            <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {editingProduct && (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <h3>Edit Product</h3>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                        />
                         <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                        />
                        <textarea
                            name="productDetails"
                            value={JSON.stringify(formData.productDetails, null, 2)}
                            onChange={handleInputChange}
                            placeholder="Product Details (JSON format)"
                            rows={10}
                        />
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                        />
                        <input
                            type="text"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            placeholder="Quantity (+/-)"
                        />
                        <select
                            name="categories"
                            value={formData.categories}
                            onChange={handleInputChange}
                            multiple
                        >
                            <option value="">Select Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name} selected={formData.categories.includes(category.name)}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Update Product</button>
                        <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
                    </form>
                )}
            </div>
>>>>>>> 61da9cc81f2f148a3854d5ff909f41593123840f
        </div>
    );
};

export default ListProduct;



//sir ask me to send an email for a project there employee need help so, list down the needs and send the email so give me an email
// In an eCommerce platform, Admin-side Product Management typically involves two main functionalities:
// Upload Product: Admins can add new products to the platform.
// List Products: Admins can view, manage, or update a list of all products in the system.
// Since you've already implemented the seller-side product management (where the sellerId is correctly stored), implementing the admin-side features like UploadProduct and ListProduct follows a similar pattern, but there are a few differences, especially in terms of authorization and how the data is fetched or managed.

// Let's go through the functionality of both the Admin's UploadProduct and Admin's ListProduct.

// 1. Admin Upload Product (UploadProduct)
// On the Admin side, when an admin uploads a product, it might involve adding a new product to the system without necessarily associating it with a seller (or associating it with a specific seller, depending on your business logic).

// In this case:

// Admins can create products without needing a sellerId (or they can assign a seller if your business model requires it).
// Admins usually have higher privileges, such as adding products directly to the catalog.
// Key Considerations for Admin Upload Product:
// Product Information: Admins will need to input data like product name, description, price, and potentially the sellerId (if you're associating the product with a seller).
// Authorization: Admins should be authenticated and authorized to upload products.
// Validation: Admin-side logic might involve more stringent validation of data (such as checking for duplicate products, missing data, etc.).
// Example of Admin Upload Product (Backend Code):
// Assuming the Admin can upload products:

// Example Request for Admin Product Upload (Frontend):
// In the admin panel (React or similar frontend), you'd typically have an UploadProduct component that sends a POST request to the backend. Here's an example using axios:

// In this case, the data (productData) would contain the product name, price, description, sellerId (optional or null for admin-managed products), and other necessary fields.

// 2. Admin List Products (ListProduct)
// The Admin's ListProduct functionality typically involves fetching a list of all products in the system, regardless of the seller. The admin will usually have the ability to view the entire catalog of products, and possibly perform actions like updating or deleting products.

// Key Considerations for Admin List Product:
// Fetching All Products: Admin can see all products, even if they are associated with specific sellers.
// Filtering / Pagination: You may want to support filters for products (e.g., by category, price range, seller) or paginate large lists of products.
// Product Actions: Admins can usually perform actions like editing, deleting, or disabling products from this list.
// Example of Admin List Product (Backend Code):
// You could have a route that fetches all products for the admin, possibly with pagination and filtering capabilities.


// This would return all products in the database. Optionally, you can include seller information with the include field to return product-seller associations.

// Example Request for Admin Product Listing (Frontend):
// In the admin panel (React or similar frontend), you would have a component that sends a GET request to fetch the products.


// Once the products are fetched, you would render them in the UI in a table, grid, or list format.

// Admin Product Actions
// In the admin view of the products, you may also want to provide actions to edit or delete a product:

// Edit Product: Admins should be able to edit the details of a product, such as updating the name, price, description, etc. This would involve sending a PUT request to the backend.

// Delete Product: Admins should be able to delete a product if needed. This would involve sending a DELETE request to the backend.


// Admin Upload Product: Admins can upload products, and the backend should handle this request by either associating the product with a seller or managing it as an independent product. You should authenticate and authorize the admin for this action.
// Admin List Product: Admins can view all products in the system, possibly with filtering and pagination. The backend should provide a GET endpoint that returns all products.
// Admin Product Actions: Admins can update or delete products using the relevant backend endpoints (PUT for update, DELETE for delete).
// Authorization: Ensure admin actions are protected by authentication to prevent unauthorized access.
// By implementing these endpoints and frontend components, you'll have the full admin product management flow in place. Let me know if you need further clarification or code examples!

// here is the api for the above works
// product:GEThttp://localhost:5000/products/ab5d286d-663d-4b6e-9d9a-cbe2fddf349f
// POST:http://localhost:5000/products/upload
// DELETE:http://localhost:5000/products