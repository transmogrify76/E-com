// import React, { useState, useEffect } from 'react';
// import './ExcistingProduct.css'; // Ensure this path is correct
// // Edit Product Modal Component
// const EditProductModal = ({ isOpen, onClose, onSave, product }) => {
//   const [formData, setFormData] = useState(product);

//   useEffect(() => {
//     setFormData(product);
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = () => {
//     onSave(formData);
//     onClose();
//   };

//   return (
//     isOpen ? (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <h2>Edit Product</h2>
//           <label>
//             SKU:
//             <input
//               type="text"
//               name="sku"
//               value={formData.sku}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Price:
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//           </label>
//           {/* Add more fields as necessary */}
//           <button onClick={handleSubmit}>Save</button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     ) : null
//   );
// };

// // Add Variant Modal Component
// const AddVariantModal = ({ isOpen, onClose, onAdd, product }) => {
//   const [variant, setVariant] = useState('');

//   const handleChange = (e) => {
//     setVariant(e.target.value);
//   };

//   const handleSubmit = () => {
//     onAdd(variant);
//     onClose();
//   };

//   return (
//     isOpen ? (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <h2>Add Variant to {product.sku}</h2>
//           <label>
//             Variant Name:
//             <input
//               type="text"
//               value={variant}
//               onChange={handleChange}
//             />
//           </label>
//           <button onClick={handleSubmit}>Add Variant</button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     ) : null
//   );
// };

// // Edit Stock Modal Component
// const EditStockModal = ({ isOpen, onClose, onSave, product }) => {
//   const [stock, setStock] = useState(product.stock);

//   const handleChange = (e) => {
//     setStock(e.target.value);
//   };

//   const handleSubmit = () => {
//     onSave(stock);
//     onClose();
//   };

//   return (
//     isOpen ? (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <h2>Edit Stock for {product.name}</h2>
//           <label>
//             Stock Quantity:
//             <input
//               type="number"
//               value={stock}
//               onChange={handleChange}
//             />
//           </label>
//           <button onClick={handleSubmit}>Save</button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     ) : null
//   );
// };

// // Main Inventory Page Component
// const InventoryPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeTab, setActiveTab] = useState('active');
//   const [stockFilter, setStockFilter] = useState('all'); // Filter by stock level
//   const [category, setCategory] = useState('');
//   const [showMoreOptions, setShowMoreOptions] = useState(null); // For showing More options
//   const [selectedProduct, setSelectedProduct] = useState(null); // For Edit modal
//   const [showAddVariantModal, setShowAddVariantModal] = useState(false); // For Add Variant modal
//   const [showEditStockModal, setShowEditStockModal] = useState(false); // For Edit Stock modal
//   const [currentProduct, setCurrentProduct] = useState(null); // For handling Add Variant and Edit Stock

//   const products = [
//     // Example products
//     {
//       catalogId: '111938416',
//       category: 'Earrings & Studs',
//       sku: 'Party Earings',
//       styleId: '2306789',
//       price: 150,
//       variation: 'Free Size',
//       estimatedOrderPerDay: 20,
//       daysToStockout: 10,
//       stock: 5,
//       status: 'active' // Added status for filtering
//     },
//     {
//       catalogId: '111938417',
//       category: 'Earrings & Studs',
//       sku: 'Fancy Earings',
//       styleId: '2306790',
//       price: 200,
//       variation: 'Free Size',
//       estimatedOrderPerDay: 15,
//       daysToStockout: 5,
//       stock: 0,
//       status: 'blocked'
//     },
//     // Add more products as needed
//   ];

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleStockFilterChange = (filter) => {
//     setStockFilter(filter);
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleSaveEdit = (product) => {
//     // Implement save logic here
//     console.log('Saving product:', product);
//   };

//   const handleMoreOptions = (product) => {
//     setCurrentProduct(product);
//     setShowMoreOptions(showMoreOptions === product ? null : product);
//   };

//   const handleAddVariant = () => {
//     setShowAddVariantModal(true);
//   };

//   const handleSaveVariant = (variant) => {
//     // Implement add variant logic here
//     console.log('Adding variant:', variant, 'to product:', currentProduct);
//     setShowAddVariantModal(false);
//   };

//   const handleEditStock = () => {
//     setShowEditStockModal(true);
//   };

//   const handleSaveStock = (stock) => {
//     // Implement edit stock logic here
//     console.log('Updating stock:', stock, 'for product:', currentProduct);
//     setShowEditStockModal(false);
//   };

//   const filteredProducts = products
//     .filter(product => product.status === activeTab) // Filter by status
//     .filter(product => {
//       if (category && product.category !== category) return false;
//       if (stockFilter === 'out-of-stock' && product.stock > 0) return false;
//       if (stockFilter === 'low-stock' && (product.stock === 0 || product.stock > 10)) return false;
//       return true;
//     });

//   return (
//     <div className="page-container">
//       <div className="left-side">
//         <h1>Inventory</h1>
//         <div className="tab-container">
//           <button
//             className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
//             onClick={() => handleTabChange('active')}
//           >
//             Active
//           </button>
//           <button
//             className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
//             onClick={() => handleTabChange('pending')}
//           >
//             Activation Pending
//           </button>
//           <button
//             className={`tab-button ${activeTab === 'blocked' ? 'active' : ''}`}
//             onClick={() => handleTabChange('blocked')}
//           >
//             Blocked
//           </button>
//           <button
//             className={`tab-button ${activeTab === 'paused' ? 'active' : ''}`}
//             onClick={() => handleTabChange('paused')}
//           >
//             Paused
//           </button>
//         </div>
//       </div>
//       <div className="right-side">
//         <div className="header">
//           <div className="header-left">
//             <div className="youtube-logo"></div>
//             <h2 className="how-it-works">How it works?</h2>
//           </div>
//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="Search by Order ID, SKU, or AWB number..."
//               className="search-input"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <button className="catalog-upload-button" onClick={() => window.location.href = '/ProductUpload'}>
//               Catalog Uploads
//             </button>
//           </div>
//           <div className="category-filter">
//             <label htmlFor="category">Filter by category:</label>
//             <select id="category" value={category} onChange={handleCategoryChange}>
//               <option value="">Select Category</option>
//               <option value="Earrings & Studs">Earrings & Studs</option>
//               {/* Add more categories as needed */}
//             </select>
//           </div>
//           {activeTab === 'active' && (
//             <div className="stock-filter">
//               <button
//                 className={`stock-filter-button ${stockFilter === 'all' ? 'active' : ''}`}
//                 onClick={() => handleStockFilterChange('all')}
//               >
//                 All
//               </button>
//               <button
//                 className={`stock-filter-button ${stockFilter === 'out-of-stock' ? 'active' : ''}`}
//                 onClick={() => handleStockFilterChange('out-of-stock')}
//               >
//                 Out of Stock
//               </button>
//               <button
//                 className={`stock-filter-button ${stockFilter === 'low-stock' ? 'active' : ''}`}
//                 onClick={() => handleStockFilterChange('low-stock')}
//               >
//                 Low Stock
//               </button>
//             </div>
//           )}
//         </div>

//         {activeTab && (
//           <div className="product-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Catalog ID</th>
//                   <th>Category</th>
//                   <th>SKU</th>
//                   <th>Variation</th>
//                   <th>Estimated Order Per Day</th>
//                   <th>Days to Stockout</th>
//                   <th>Stock</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((product, index) => (
//                     <tr key={index}>
//                       <td>{product.catalogId}</td>
//                       <td>{product.category}</td>
//                       <td>{product.sku}</td>
//                       <td>{product.variation}</td>
//                       <td>{product.estimatedOrderPerDay}</td>
//                       <td>{product.daysToStockout}</td>
//                       <td>{product.stock}</td>
//                       <td>
//                         <button
//                           className="view-details-button"
//                           onClick={() => handleEdit(product)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="view-details-button"
//                           onClick={() => handleMoreOptions(product)}
//                         >
//                           More
//                         </button>
//                         {showMoreOptions === product && (
//                           <div className="more-options">
//                             <button onClick={handleAddVariant}>
//                               Add Variant
//                             </button>
//                             <button onClick={handleEditStock}>
//                               Edit Stock
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8">No products available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Render Edit Product Modal */}
//       {selectedProduct && (
//         <EditProductModal
//           isOpen={!!selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//           onSave={handleSaveEdit}
//           product={selectedProduct}
//         />
//       )}

//       {/* Render Add Variant Modal */}
//       {showAddVariantModal && currentProduct && (
//         <AddVariantModal
//           isOpen={showAddVariantModal}
//           onClose={() => setShowAddVariantModal(false)}
//           onAdd={handleSaveVariant}
//           product={currentProduct}
//         />
//       )}

//       {/* Render Edit Stock Modal */}
//       {showEditStockModal && currentProduct && (
//         <EditStockModal
//           isOpen={showEditStockModal}
//           onClose={() => setShowEditStockModal(false)}
//           onSave={handleSaveStock}
//           product={currentProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default InventoryPage;


import React, { useState, useEffect, useCallback } from 'react';
import './ExcistingProduct.css'; // Ensure this path is correct
import { FaEdit, FaTrash, FaYoutube, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InventoryPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [stockFilter, setStockFilter] = useState('all');
    const [orders, setOrders] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        productDetails: {},
        price: '',
        quantity: '',
        categories: [],
        images: []
    });
    const [sellerId, setSellerId] = useState(null);

    const fetchSellerData = async () => {
        const storedSellerId = localStorage.getItem('sellerId');
        if (!storedSellerId) {
            window.location.href = '/login';
            return;
        }
        setSellerId(storedSellerId);
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories');
        }
    };

    const fetchProductsBySeller = useCallback(async () => {
        if (!sellerId) return;
        try {
            const response = await axios.get(`http://localhost:5000/products/seller/${sellerId}`);
            const productsWithImages = response.data.map(product => ({
                ...product,
                image: product.imageName ? `http://localhost:5000/products/images/${product.imageName}` : '',
            }));
            setProducts(productsWithImages);
            setFilteredProducts(productsWithImages);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(`Failed to fetch products: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [sellerId]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError(`Failed to fetch orders: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchSellerData();
        fetchCategories();
        fetchOrders();
    }, []);

    useEffect(() => {
        fetchProductsBySeller();
    }, [sellerId, fetchProductsBySeller]);

    useEffect(() => {
        filterProductsByStock();
    }, [products, stockFilter, orders]);

    const filterProductsByStock = () => {
        let filtered = products;

        if (stockFilter === 'out-of-stock') {
            filtered = products.filter(product => product.quantity === 0);
        } else if (stockFilter === 'low-stock') {
            filtered = products.filter(product => product.quantity > 0 && product.quantity < 5);
        }

        setFilteredProducts(filtered);
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchId(value);

        const filtered = filteredProducts.filter(product => {
            const matchesId = value ? product.id.toString().includes(value) : true;
            const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
            return matchesId && matchesCategory;
        });

        setFilteredProducts(filtered);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        handleSearch({ target: { value: searchId } }); // Re-filter using current search ID
    };

    const handleStockFilterChange = (filter) => {
        setStockFilter(filter);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'categories') {
            const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
            setFormData(prevState => ({
                ...prevState,
                categories: selectedOptions
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestBody = {
            name: formData.name,
            productDetails: formData.productDetails,
            price: parseFloat(formData.price),
            quantity: formData.quantity,
            categories: formData.categories,
            images: formData.images
        };

        try {
            const response = await axios.patch(`http://localhost:5000/products/${editingProduct.id}`, requestBody);
            const updatedProduct = {
                ...response.data,
                image: response.data.imageName ? `http://localhost:5000/products/images/${response.data.imageName}` : ''
            };

            setProducts(products.map(product => product.id === editingProduct.id ? updatedProduct : product));
            setFilteredProducts(filteredProducts.map(product => product.id === editingProduct.id ? updatedProduct : product));
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
            quantity: product.quantity,
            categories: product.categories || [],
            images: []
        });
    };

    const removeProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
            setFilteredProducts(filteredProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error removing product:", error);
            setError(`Failed to remove product: ${error.message}`);
        }
    };

    return (
        <div className='inventory-page'>
            <div className="header">
                <h1>Inventory Management</h1>
                <div className="help-icons">
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube /> YouTube
                    </a>
                    <a href="https://www.customerservice.com" target="_blank" rel="noopener noreferrer">
                        <FaHeadset /> Customer Service
                    </a>
                </div>
            </div>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search by Product ID"
                    value={searchId}
                    onChange={handleSearch}
                />
                <select onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <div className="stock-filter">
                    <button onClick={() => handleStockFilterChange('all')}>All</button>
                    <button onClick={() => handleStockFilterChange('out-of-stock')}>Out of Stock</button>
                    <button onClick={() => handleStockFilterChange('low-stock')}>Low Stock</button>
                </div>
            </div>

            {error && <div className="error">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th> Product ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Categories</th>
                            <th>Varieties</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.categories.join(', ')}</td>
                                <td>{product.productDetails?.varities?.join(', ') || 'N/A'}</td>
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
                        placeholder="Quantity"
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
    );
};

export default InventoryPage;


