// import React, { useState, useEffect, useCallback } from 'react';
// import './Inventory.css'; // Ensure this path is correct
// import { FaEdit, FaTrash, FaYoutube, FaHeadset, FaPlus, FaFilePdf } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const InventoryPage = () => {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchId, setSearchId] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         productDetails: {},
//         price: '',
//         quantity: '',
//         discountPrice: '',
//         categories: [],
//         images: []
//     });
//     const adminId = localStorage.getItem('userId');
//     const accessToken = localStorage.getItem('accessToken');
//     const [bulkUploads, setBulkUploads] = useState(0);
//     const [singleUploads, setSingleUploads] = useState(0);

//     useEffect(() => {
//         fetchCategories();
//         fetchProductsByAdmin();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
//             setCategories(response.data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//             setError('Failed to fetch categories');
//         }
//     };

//     const fetchProductsByAdmin = useCallback(async () => {
//         if (!adminId) return;
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/seller/${adminId}`);
//             const productsWithImages = await Promise.all(response.data.map(async product => {
//                 const imagesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/images/product/${product.id}`);
//                 const imagesData = await imagesResponse.json();
//                 const imageURLs = imagesData.map(img => img.base64);

//                 return {
//                     ...product,
//                     images: imageURLs,
//                     categories: product.categories?.map(cat => cat.name) || []
//                 };
//             }));

//             setProducts(productsWithImages);
//             setFilteredProducts(productsWithImages);
//             setBulkUploads(productsWithImages.filter(product => product.uploadMethod === 'bulk').length);
//             setSingleUploads(productsWithImages.filter(product => product.uploadMethod === 'single').length);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError(`Failed to fetch products: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     }, [adminId]);

//     const handleSearch = (event) => {
//         const value = event.target.value;
//         setSearchId(value);

//         const filtered = products.filter(product => {
//             const matchesId = value ? product.id.toString().includes(value) : true;
//             const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
//             return matchesId && matchesCategory;
//         });

//         setFilteredProducts(filtered);
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//         handleSearch({ target: { value: searchId } });
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;

//         if (name === 'categories') {
//             const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
//             setFormData(prevState => ({
//                 ...prevState,
//                 categories: selectedOptions,
//             }));
//         } else if (name === 'productDetails') {
//             try {
//                 setFormData(prevState => ({
//                     ...prevState,
//                     productDetails: value ? JSON.parse(value) : {},
//                 }));
//             } catch (e) {
//                 console.error('Invalid JSON format', e);
//                 setError('Invalid JSON format');
//             }
//         } else {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [name]: value,
//             }));
//         }
//     };

//     const calculateTotalQuantity = (quantityString) => {
//         const parts = quantityString.split(/[\+\-]/);
//         const operator = quantityString.includes('+') ? '+' : quantityString.includes('-') ? '-' : null;

//         if (parts.length === 2 && operator) {
//             const baseQuantity = parseInt(parts[0], 10);
//             const additionalQuantity = parseInt(parts[1], 10);
//             return operator === '+' ? baseQuantity + additionalQuantity : baseQuantity - additionalQuantity;
//         }
//         return parseInt(quantityString, 10) || 0;
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const totalQuantity = calculateTotalQuantity(formData.quantity);

//         const requestBody = {
//             name: formData.name,
//             productDetails: formData.productDetails,
//             price: parseFloat(formData.price),
//             quantity: totalQuantity.toString(),
//             categories: formData.categories,
//             images: formData.images,
//         };

//         try {
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${editingProduct.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestBody),
//             });

//             if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);

//             const updatedProduct = await response.json();
//             const updatedProductWithImage = {
//                 ...updatedProduct,
//                 images: updatedProduct.images ? updatedProduct.images.map(img => img.base64) : [],
//             };

//             setProducts(products.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
//             setFilteredProducts(filteredProducts.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
//             setEditingProduct(null);
//             resetFormData();
//         } catch (error) {
//             console.error("Error updating product:", error);
//             setError(`Failed to update product: ${error.message}`);
//         }
//     };

//     const resetFormData = () => {
//         setFormData({
//             name: '',
//             productDetails: {},
//             price: '',
//             quantity: '',
//             discountPrice: '',
//             categories: [],
//             images: [],
//         });
//     };

//     const handleEditClick = (product) => {
//         setEditingProduct(product);
//         setFormData({
//             name: product.name,
//             productDetails: product.productDetails || {},
//             price: product.price,
//             quantity: String(product.quantity).replace('+', ''),
//             discountPrice: product.discountPrice,
//             categories: product.categories || [],
//             images: [],
//         });
//     };

//     const removeProduct = async (id) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);

//             setProducts(products.filter(product => product.id !== id));
//             setFilteredProducts(filteredProducts.filter(product => product.id !== id));
//         } catch (error) {
//             console.error("Error removing product:", error);
//             setError(`Failed to remove product: ${error.message}`);
//         }
//     };

//     const handleAddVariationClick = (product) => {
//       navigate(`/add-product?id=${product.id}&name=${encodeURIComponent(product.name)}`);
//   };
//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(16);
//         doc.text("Product Inventory", 14, 22);

//         const tableColumn = ["Product ID", "Name", "Price", "Quantity", "Categories", "Product Details"];
//         const tableRows = [];

//         filteredProducts.forEach(product => {
//             const productData = [
//                 product.id,
//                 product.name,
//                 product.price,
//                 product.quantity,
//                 product.categories.join(', '),
//                 JSON.stringify(product.productDetails)
//             ];
//             tableRows.push(productData);
//         });

//         doc.autoTable(tableColumn, tableRows, { startY: 30 });
//         doc.save("inventory.pdf");
//     };

//     return (
//         <div className='inventory-page'>
//             <div className="header">
//                 <h1>Inventory Management</h1>
//                 <div className="help-icons">
//                     <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
//                         <FaYoutube /> YouTube
//                     </a>
//                     <FaHeadset />
//                     <FaFilePdf onClick={handleExportPDF} style={{ cursor: 'pointer' }} />
//                 </div>
//             </div>

//             <div className="search-filter">
//                 <input
//                     type="text"
//                     value={searchId}
//                     onChange={handleSearch}
//                     placeholder="Search by Product ID"
//                 />
//                 <select value={selectedCategory} onChange={handleCategoryChange}>
//                     <option value="">All Categories</option>
//                     {categories.map(category => (
//                         <option key={category.id} value={category.name}>{category.name}</option>
//                     ))}
//                 </select>
//             </div>

//             {error && <div className="error">{error}</div>}
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <table className="product-table">
//                     <thead>
//                         <tr>
//                             <th>Product ID</th>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>Stock</th>
//                             <th>Categories</th>
//                             <th>Product Details</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredProducts.map(product => (
//                             <tr key={product.id}>
//                                 <td>{product.id}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.price}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>{product.categories.join(', ')}</td>
//                                 <td>{JSON.stringify(product.productDetails)}</td>
//                                 <td>
//                                     <button onClick={() => handleEditClick(product)}><FaEdit /></button>
//                                     <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
//                                     <button onClick={() => handleAddVariationClick(product)}><FaPlus /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {editingProduct && (
//                 <form onSubmit={handleSubmit} className="edit-form">
//                     <h3>Edit Product</h3>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Product Name"
//                     />
//                     {Object.keys(formData.productDetails).map(key => (
//                         <div key={key}>
//                             <label>{key}</label>
//                             <input
//                                 type="text"
//                                 name={key}
//                                 value={formData.productDetails[key] || ''}
//                                 onChange={handleInputChange}
//                                 placeholder={`Enter ${key}`}
//                             />
//                         </div>
//                     ))}
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         placeholder="Price"
//                     />
//                     <input
//                         type="text"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleInputChange}
//                         placeholder="Quantity"
//                     />
//                     <select
//                         name="categories"
//                         value={formData.categories}
//                         onChange={handleInputChange}
//                         multiple
//                     >
//                         <option value="">Select Categories</option>
//                         {categories.map(category => (
//                             <option key={category.id} value={category.name} selected={formData.categories.includes(category.name)}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                     <button type="submit">Update Product</button>
//                     <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default InventoryPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import './Inventory.css'; // Ensure this path is correct
// import { FaEdit, FaTrash, FaYoutube, FaHeadset, FaPlus, FaFilePdf } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const InventoryPage = () => {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchId, setSearchId] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [stockFilter, setStockFilter] = useState('all');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         productDetails: {},
//         price: '',
//         quantity: '',
//         discountPrice: '',
//         categories: [],
//         images: []
//     });
//     const adminId = localStorage.getItem('userId');
//     const accessToken = localStorage.getItem('accessToken');

//     useEffect(() => {
//         fetchCategories();
//         fetchProductsByAdmin();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
//             setCategories(response.data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//             setError('Failed to fetch categories');
//         }
//     };

//     const fetchProductsByAdmin = useCallback(async () => {
//         if (!adminId) return;
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/seller/${adminId}`);
//             setProducts(response.data);
//             setFilteredProducts(response.data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError(`Failed to fetch products: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     }, [adminId]);

//     const handleSearch = (event) => {
//         const value = event.target.value;
//         setSearchId(value);
//         filterProducts(value, selectedCategory, stockFilter);
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//         filterProducts(searchId, event.target.value, stockFilter);
//     };

//     const handleStockFilterChange = (filter) => {
//         setStockFilter(filter);
//         filterProducts(searchId, selectedCategory, filter);
//     };

//     const filterProducts = (searchId, selectedCategory, stockFilter) => {
//         let filtered = products.filter(product => {
//             const matchesId = searchId ? product.id.toString().includes(searchId) : true;
//             const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
//             const isInStock = product.quantity > 0;
//             const isLowStock = product.quantity > 0 && product.quantity < 10;

//             const matchesStockFilter = stockFilter === 'all' ||
//                 (stockFilter === 'low' && isLowStock) ||
//                 (stockFilter === 'out' && !isInStock);

//             return matchesId && matchesCategory && matchesStockFilter;
//         });

//         setFilteredProducts(filtered);
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(16);
//         doc.text("Product Inventory", 14, 22);

//         const tableColumn = ["Product ID", "Name", "Price", "Quantity", "Categories", "Product Details"];
//         const tableRows = [];

//         filteredProducts.forEach(product => {
//             const productData = [
//                 product.id,
//                 product.name,
//                 product.price,
//                 product.quantity,
//                 product.categories.join(', '),
//                 JSON.stringify(product.productDetails)
//             ];
//             tableRows.push(productData);
//         });

//         doc.autoTable(tableColumn, tableRows, { startY: 30 });
//         doc.save("inventory.pdf");
//     };

    
//     const handleAddVariationClick = (product) => {
//               navigate(`/add-product?id=${product.id}&name=${encodeURIComponent(product.name)}`);
//           };

//     const handleEditClick = (product) => {
//         setEditingProduct(product);
//         setFormData({
//             name: product.name,
//             productDetails: product.productDetails,
//             price: product.price,
//             quantity: product.quantity,
//             discountPrice: product.discountPrice,
//             categories: product.categories,
//             images: product.images
//         });
//     };

//     const removeProduct = async (productId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_BASE_URL}/products/${productId}`, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             fetchProductsByAdmin();
//         } catch (error) {
//             console.error("Error removing product:", error);
//             setError('Failed to remove product');
//         }
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.put(`${process.env.REACT_APP_BASE_URL}/products/${editingProduct.id}`, formData, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             fetchProductsByAdmin();
//             setEditingProduct(null);
//             setFormData({
//                 name: '',
//                 productDetails: {},
//                 price: '',
//                 quantity: '',
//                 discountPrice: '',
//                 categories: [],
//                 images: []
//             });
//         } catch (error) {
//             console.error("Error updating product:", error);
//             setError('Failed to update product');
//         }
//     };

//     return (
//         <div className='inventory-page'>
//             <div className="header">
//                 <h1>Inventory Management</h1>
//                 <div className="help-icons">
//                     <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
//                         <FaYoutube /> YouTube
//                     </a>
//                     <FaHeadset />
//                     <FaFilePdf onClick={handleExportPDF} style={{ cursor: 'pointer' }} />
//                 </div>
//             </div>

//             <div className="search-filter">
//                 <input
//                     type="text"
//                     value={searchId}
//                     onChange={handleSearch}
//                     placeholder="Search by Product ID"
//                 />
//                 <select value={selectedCategory} onChange={handleCategoryChange}>
//                     <option value="">All Categories</option>
//                     {categories.map(category => (
//                         <option key={category.id} value={category.name}>{category.name}</option>
//                     ))}
//                 </select>
//                 <select value={stockFilter} onChange={(e) => handleStockFilterChange(e.target.value)}>
//                     <option value="all">All Stock</option>
//                     <option value="low">Low Stock</option>
//                     <option value="out">Out of Stock</option>
//                 </select>
//             </div>

//             {error && <div className="error">{error}</div>}
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <table className="product-table">
//                     <thead>
//                         <tr>
//                             <th>Product ID</th>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>Stock</th>
//                             <th>Categories</th>
//                             <th>Product Details</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredProducts.map(product => (
//                             <tr key={product.id}>
//                                 <td>{product.id}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.price}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>{product.categories.join(', ')}</td>
//                                 <td>{JSON.stringify(product.productDetails)}</td>
//                                 <td>
//                                     <button onClick={() => handleEditClick(product)}><FaEdit /></button>
//                                     <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
//                                     <button onClick={() => handleAddVariationClick(product)}><FaPlus /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {editingProduct && (
//                 <form onSubmit={handleSubmit} className="edit-form">
//                     <h3>Edit Product</h3>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Product Name"
//                     />
//                     {Object.keys(formData.productDetails).map(key => (
//                         <div key={key}>
//                             <label>{key}</label>
//                             <input
//                                 type="text"
//                                 name={key}
//                                 value={formData.productDetails[key] || ''}
//                                 onChange={handleInputChange}
//                                 placeholder={`Enter ${key}`}
//                             />
//                         </div>
//                     ))}
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         placeholder="Price"
//                     />
//                     <input
//                         type="text"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleInputChange}
//                         placeholder="Quantity"
//                     />
//                     <select
//                         name="categories"
//                         value={formData.categories}
//                         onChange={handleInputChange}
//                         multiple
//                     >
//                         <option value="">Select Categories</option>
//                         {categories.map(category => (
//                             <option key={category.id} value={category.name} selected={formData.categories.includes(category.name)}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                     <button type="submit">Update Product</button>
//                     <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default InventoryPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import './Inventory.css'; // Ensure this path is correct
// import { FaEdit, FaTrash, FaYoutube, FaHeadset, FaPlus, FaFilePdf } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const InventoryPage = () => {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchId, setSearchId] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         productDetails: {},
//         price: '',
//         quantity: '',
//         discountPrice: '',
//         categories: [],
//         images: []
//     });
//     const adminId = localStorage.getItem('userId');
//     const accessToken = localStorage.getItem('accessToken');

//     useEffect(() => {
//         fetchCategories();
//         fetchProductsByAdmin();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
//             setCategories(response.data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//             setError('Failed to fetch categories');
//         }
//     };

//     const fetchProductsByAdmin = useCallback(async () => {
//         if (!adminId) return;
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/seller/${adminId}`);
//             setProducts(response.data);
//             setFilteredProducts(response.data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError(`Failed to fetch products: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     }, [adminId]);

//     const handleSearch = (event) => {
//         const value = event.target.value;
//         setSearchId(value);
//         filterProducts(value, selectedCategory);
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//         filterProducts(searchId, event.target.value);
//     };

//     const filterProducts = (searchId, selectedCategory) => {
//         let filtered = products.filter(product => {
//             const matchesId = searchId ? product.id.toString().includes(searchId) : true;
//             const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
//             return matchesId && matchesCategory;
//         });

//         setFilteredProducts(filtered);
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(16);
//         doc.text("Product Inventory", 14, 22);

//         const tableColumn = ["Product ID", "Name", "Price", "Quantity", "Categories", "Product Details"];
//         const tableRows = [];

//         filteredProducts.forEach(product => {
//             const productData = [
//                 product.id,
//                 product.name,
//                 product.price,
//                 product.quantity,
//                 product.categories.join(', '),
//                 JSON.stringify(product.productDetails)
//             ];
//             tableRows.push(productData);
//         });

//         doc.autoTable(tableColumn, tableRows, { startY: 30 });
//         doc.save("inventory.pdf");
//     };

//     const handleFilterAll = () => {
//         setFilteredProducts(products);
//     };

//     const handleFilterLowStock = () => {
//         const lowStockProducts = products.filter(product => product.quantity > 0 && product.quantity < 10);
//         setFilteredProducts(lowStockProducts);
//     };

//     const handleFilterOutOfStock = () => {
//         const outOfStockProducts = products.filter(product => product.quantity <= 0);
//         setFilteredProducts(outOfStockProducts);
//     };

//     const handleAddVariationClick = (product) => {
//         navigate(`/add-product?id=${product.id}&name=${encodeURIComponent(product.name)}`);
//     };

//     const handleEditClick = (product) => {
//         setEditingProduct(product);
//         setFormData({
//             name: product.name,
//             productDetails: product.productDetails,
//             price: product.price,
//             quantity: product.quantity,
//             discountPrice: product.discountPrice,
//             categories: product.categories,
//             images: product.images
//         });
//     };

//     const removeProduct = async (productId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_BASE_URL}/products/${productId}`, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             fetchProductsByAdmin();
//         } catch (error) {
//             console.error("Error removing product:", error);
//             setError('Failed to remove product');
//         }
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.put(`${process.env.REACT_APP_BASE_URL}/products/${editingProduct.id}`, formData, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             fetchProductsByAdmin();
//             setEditingProduct(null);
//             setFormData({
//                 name: '',
//                 productDetails: {},
//                 price: '',
//                 quantity: '',
//                 discountPrice: '',
//                 categories: [],
//                 images: []
//             });
//         } catch (error) {
//             console.error("Error updating product:", error);
//             setError('Failed to update product');
//         }
//     };

//     return (
//         <div className='inventory-page'>
//             <div className="header">
//                 <h1>Inventory Management</h1>
//                 <div className="help-icons">
//                     <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
//                         <FaYoutube /> YouTube
//                     </a>
//                     <FaHeadset />
//                     <FaFilePdf onClick={handleExportPDF} style={{ cursor: 'pointer' }} />
//                 </div>
//             </div>

//             <div className="search-filter">
//                 <input
//                     type="text"
//                     value={searchId}
//                     onChange={handleSearch}
//                     placeholder="Search by Product ID"
//                 />
//                 <select value={selectedCategory} onChange={handleCategoryChange}>
//                     <option value="">All Categories</option>
//                     {categories.map(category => (
//                         <option key={category.id} value={category.name}>{category.name}</option>
//                     ))}
//                 </select>
//                 <div className="stock-filter-buttons">
//                     <button onClick={handleFilterAll}>All Stock</button>
//                     <button onClick={handleFilterLowStock}>Low Stock</button>
//                     <button onClick={handleFilterOutOfStock}>Out of Stock</button>
//                 </div>
//             </div>

//             {error && <div className="error">{error}</div>}
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <table className="product-table">
//                     <thead>
//                         <tr>
//                             <th>Product ID</th>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>Stock</th>
//                             <th>Categories</th>
//                             <th>Product Details</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredProducts.map(product => (
//                             <tr key={product.id}>
//                                 <td>{product.id}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.price}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>{product.categories.join(', ')}</td>
//                                 <td>{JSON.stringify(product.productDetails)}</td>
//                                 <td>
//                                     <button onClick={() => handleEditClick(product)}><FaEdit /></button>
//                                     <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
//                                     <button onClick={() => handleAddVariationClick(product)}><FaPlus /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {editingProduct && (
//                 <form onSubmit={handleSubmit} className="edit-form">
//                     <h3>Edit Product</h3>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Product Name"
//                     />
//                     {Object.keys(formData.productDetails).map(key => (
//                         <div key={key}>
//                             <label>{key}</label>
//                             <input
//                                 type="text"
//                                 name={key}
//                                 value={formData.productDetails[key] || ''}
//                                 onChange={handleInputChange}
//                                 placeholder={`Enter ${key}`}
//                             />
//                         </div>
//                     ))}
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         placeholder="Price"
//                     />
//                     <input
//                         type="text"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleInputChange}
//                         placeholder="Quantity"
//                     />
//                     <select
//                         name="categories"
//                         value={formData.categories}
//                         onChange={handleInputChange}
//                         multiple
//                     >
//                         <option value="">Select Categories</option>
//                         {categories.map(category => (
//                             <option key={category.id} value={category.name} selected={formData.categories.includes(category.name)}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                     <button type="submit">Update Product</button>
//                     <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default InventoryPage;


// import React, { useState, useEffect, useCallback } from 'react';
// import './Inventory.css'; // Ensure this path is correct
// import { FaEdit, FaTrash, FaYoutube, FaHeadset, FaPlus, FaFilePdf } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const InventoryPage = () => {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchId, setSearchId] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [stockFilter, setStockFilter] = useState('all');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         productDetails: {},
//         price: '',
//         quantity: '',
//         discountPrice: '',
//         categories: [],
//         images: []
//     });
//     const adminId = localStorage.getItem('userId');
//     const accessToken = localStorage.getItem('accessToken');

//     useEffect(() => {
//         fetchCategories();
//         fetchProductsByAdmin();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
//             setCategories(response.data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//             setError('Failed to fetch categories');
//         }
//     };

//     const fetchProductsByAdmin = useCallback(async () => {
//         if (!adminId) return;
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/seller/${adminId}`);
//             setProducts(response.data);
//             setFilteredProducts(response.data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError(`Failed to fetch products: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     }, [adminId]);

//     const handleSearch = (event) => {
//         const value = event.target.value;
//         setSearchId(value);
//         filterProducts(value, selectedCategory, stockFilter);
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//         filterProducts(searchId, event.target.value, stockFilter);
//     };

//     const handleStockFilterChange = (filter) => {
//         setStockFilter(filter);
//         filterProducts(searchId, selectedCategory, filter);
//     };

//     const filterProducts = (searchId, selectedCategory, stockFilter) => {
//         let filtered = products.filter(product => {
//             const matchesId = searchId ? product.id.toString().includes(searchId) : true;
//             const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
//             const isInStock = product.quantity > 0;
//             const isLowStock = product.quantity > 0 && product.quantity < 10;

//             const matchesStockFilter = stockFilter === 'all' ||
//                 (stockFilter === 'low' && isLowStock) ||
//                 (stockFilter === 'out' && !isInStock);

//             return matchesId && matchesCategory && matchesStockFilter;
//         });

//         setFilteredProducts(filtered);
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(16);
//         doc.text("Product Inventory", 14, 22);

//         const tableColumn = ["Product ID", "Name", "Price", "Quantity", "Categories", "Product Details"];
//         const tableRows = [];

//         filteredProducts.forEach(product => {
//             const productData = [
//                 product.id,
//                 product.name,
//                 product.price,
//                 product.quantity,
//                 product.categories.join(', '),
//                 JSON.stringify(product.productDetails)
//             ];
//             tableRows.push(productData);
//         });

//         doc.autoTable(tableColumn, tableRows, { startY: 30 });
//         doc.save("inventory.pdf");
//     };

//     const handleAddVariationClick = (product) => {
//         navigate(`/add-product?id=${product.id}&name=${encodeURIComponent(product.name)}`);
//     };

//     const handleEditClick = (product) => {
//         setEditingProduct(product);
//         setFormData({
//             name: product.name,
//             productDetails: product.productDetails,
//             price: product.price,
//             quantity: product.quantity,
//             discountPrice: product.discountPrice,
//             categories: product.categories,
//             images: product.images
//         });
//     };

//     const removeProduct = async (productId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_BASE_URL}/products/${productId}`, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             fetchProductsByAdmin();
//         } catch (error) {
//             console.error("Error removing product:", error);
//             setError('Failed to remove product');
//         }
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.put(`${process.env.REACT_APP_BASE_URL}/products/${editingProduct.id}`, formData, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             fetchProductsByAdmin();
//             setEditingProduct(null);
//             setFormData({
//                 name: '',
//                 productDetails: {},
//                 price: '',
//                 quantity: '',
//                 discountPrice: '',
//                 categories: [],
//                 images: []
//             });
//         } catch (error) {
//             console.error("Error updating product:", error);
//             setError('Failed to update product');
//         }
//     };

//     return (
//         <div className='inventory-page'>
//             <div className="header">
//                 <h1>Inventory Management</h1>
//                 <div className="help-icons">
//                     <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
//                         <FaYoutube /> YouTube
//                     </a>
//                     <a href="https://www.customerservice.com" target="_blank" rel="noopener noreferrer">
//                         <FaHeadset /> Customer Service
//                     </a>
//                     <button onClick={handleExportPDF} className="export-pdf-btn">
//                         <FaFilePdf /> Export as PDF
//                     </button>
//                 </div>
//             </div>

//             <div className="search-filter">
//                 <input
//                     type="text"
//                     value={searchId}
//                     onChange={handleSearch}
//                     placeholder="Search by Product ID"
//                 />
//                 <select value={selectedCategory} onChange={handleCategoryChange}>
//                     <option value="">All Categories</option>
//                     {categories.map(category => (
//                         <option key={category.id} value={category.name}>{category.name}</option>
//                     ))}
//                 </select>
//                 <div className="stock-filter-buttons">
//                     <button onClick={() => handleStockFilterChange('all')}>All Stock</button>
//                     <button onClick={() => handleStockFilterChange('low')}>Low Stock</button>
//                     <button onClick={() => handleStockFilterChange('out')}>Out of Stock</button>
//                 </div>
//             </div>

//             {error && <div className="error">{error}</div>}
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <table className="product-table">
//                     <thead>
//                         <tr>
//                             <th>Product ID</th>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>Stock</th>
//                             <th>Categories</th>
//                             <th>Product Details</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredProducts.map(product => (
//                             <tr key={product.id}>
//                                 <td>{product.id}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.price}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>{product.categories.join(', ')}</td>
//                                 <td>{JSON.stringify(product.productDetails)}</td>
//                                 <td>
//                                     <button onClick={() => handleEditClick(product)}><FaEdit /></button>
//                                     <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
//                                     <button onClick={() => handleAddVariationClick(product)}><FaPlus /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {editingProduct && (
//                 <form onSubmit={handleSubmit} className="edit-form">
//                     <h3>Edit Product</h3>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Product Name"
//                     />
//                     {Object.keys(formData.productDetails).map(key => (
//                         <div key={key}>
//                             <label>{key}</label>
//                             <input
//                                 type="text"
//                                 name={key}
//                                 value={formData.productDetails[key] || ''}
//                                 onChange={handleInputChange}
//                                 placeholder={`Enter ${key}`}
//                             />
//                         </div>
//                     ))}
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         placeholder="Price"
//                     />
//                     <input
//                         type="text"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleInputChange}
//                         placeholder="Quantity"
//                     />
//                     <select
//                         name="categories"
//                         value={formData.categories}
//                         onChange={handleInputChange}
//                         multiple
//                     >
//                         <option value="">Select Categories</option>
//                         {categories.map(category => (
//                             <option key={category.id} value={category.name} selected={formData.categories.includes(category.name)}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                     <button type="submit">Update Product</button>
//                     <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default InventoryPage;


// import React, { useState, useEffect, useCallback } from 'react';
// import './Inventory.css'; // Ensure this path is correct
// import { FaEdit, FaTrash, FaYoutube, FaHeadset, FaPlus, FaFilePdf } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const InventoryPage = () => {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchId, setSearchId] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         productDetails: {},
//         price: '',
//         quantity: '',
//         discountPrice: '',
//         categories: [],
//         images: []
//     });
//     const [stockFilter, setStockFilter] = useState('all');

//     const adminId = localStorage.getItem('userId');
//     const accessToken = localStorage.getItem('accessToken');

//     useEffect(() => {
//         fetchCategories();
//         fetchProductsByAdmin();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
//             setCategories(response.data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//             setError('Failed to fetch categories');
//         }
//     };

//     const fetchProductsByAdmin = useCallback(async () => {
//         if (!adminId) return;
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/seller/${adminId}`);
//             const productsWithImages = await Promise.all(response.data.map(async product => {
//                 const imagesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/images/product/${product.id}`);
//                 const imagesData = await imagesResponse.json();
//                 const imageURLs = imagesData.map(img => img.base64);

//                 return {
//                     ...product,
//                     images: imageURLs,
//                     categories: product.categories?.map(cat => cat.name) || []
//                 };
//             }));

//             setProducts(productsWithImages);
//             setFilteredProducts(productsWithImages);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError(`Failed to fetch products: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     }, [adminId]);

//     const handleSearch = (event) => {
//         const value = event.target.value;
//         setSearchId(value);
//         filterProducts(value, selectedCategory, stockFilter);
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//         filterProducts(searchId, event.target.value, stockFilter);
//     };

//     const handleStockFilterChange = (filter) => {
//         setStockFilter(filter);
//         filterProducts(searchId, selectedCategory, filter);
//     };

//     const filterProducts = (searchId, selectedCategory, stockFilter) => {
//         let filtered = products.filter(product => {
//             const matchesId = searchId ? product.id.toString().includes(searchId) : true;
//             const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;

//             const isInStock = product.quantity > 0;
//             const isLowStock = product.quantity > 0 && product.quantity < 10;

//             const matchesStockFilter = stockFilter === 'all' ||
//                 (stockFilter === 'low' && isLowStock) ||
//                 (stockFilter === 'out' && !isInStock);

//             return matchesId && matchesCategory && matchesStockFilter;
//         });

//         setFilteredProducts(filtered);
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;

//         if (name === 'categories') {
//             const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
//             setFormData(prevState => ({
//                 ...prevState,
//                 categories: selectedOptions,
//             }));
//         } else if (name === 'productDetails') {
//             try {
//                 setFormData(prevState => ({
//                     ...prevState,
//                     productDetails: value ? JSON.parse(value) : {},
//                 }));
//             } catch (e) {
//                 console.error('Invalid JSON format', e);
//                 setError('Invalid JSON format');
//             }
//         } else {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [name]: value,
//             }));
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const totalQuantity = parseInt(formData.quantity, 10) || 0;

//         const requestBody = {
//             name: formData.name,
//             productDetails: formData.productDetails,
//             price: parseFloat(formData.price),
//             quantity: totalQuantity.toString(),
//             categories: formData.categories,
//             images: formData.images,
//         };

//         try {
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${editingProduct.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestBody),
//             });

//             if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);

//             const updatedProduct = await response.json();
//             const updatedProductWithImage = {
//                 ...updatedProduct,
//                 images: updatedProduct.images ? updatedProduct.images.map(img => img.base64) : [],
//             };

//             setProducts(products.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
//             setFilteredProducts(filteredProducts.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
//             setEditingProduct(null);
//             resetFormData();
//         } catch (error) {
//             console.error("Error updating product:", error);
//             setError(`Failed to update product: ${error.message}`);
//         }
//     };

//     const resetFormData = () => {
//         setFormData({
//             name: '',
//             productDetails: {},
//             price: '',
//             quantity: '',
//             discountPrice: '',
//             categories: [],
//             images: [],
//         });
//     };

//     const handleEditClick = (product) => {
//         setEditingProduct(product);
//         setFormData({
//             name: product.name,
//             productDetails: product.productDetails || {},
//             price: product.price,
//             quantity: product.quantity,
//             discountPrice: product.discountPrice,
//             categories: product.categories || [],
//             images: [],
//         });
//     };

//     const removeProduct = async (id) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);

//             setProducts(products.filter(product => product.id !== id));
//             setFilteredProducts(filteredProducts.filter(product => product.id !== id));
//         } catch (error) {
//             console.error("Error removing product:", error);
//             setError(`Failed to remove product: ${error.message}`);
//         }
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(16);
//         doc.text("Product Inventory", 14, 22);

//         const tableColumn = ["Product ID", "Name", "Price", "Quantity", "Categories", "Product Details"];
//         const tableRows = [];

//         filteredProducts.forEach(product => {
//             const productData = [
//                 product.id,
//                 product.name,
//                 product.price,
//                 product.quantity,
//                 product.categories.join(', '),
//                 Object.entries(product.productDetails).map(([key, value]) => `${key}: ${value}`).join(', ')
//             ];
//             tableRows.push(productData);
//         });

//         doc.autoTable(tableColumn, tableRows, { startY: 30 });
//         doc.save("inventory.pdf");
//     };
//     const handleAddVariationClick = (product) => {
//                 navigate(`/add-product?id=${product.id}&name=${encodeURIComponent(product.name)}`);
//             };
//     return (
//         <div className='inventory-page'>
//             <div className="header">
//                 <h1>Inventory Management</h1>
//                 <div className="help-icons">
//                     <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
//                         <FaYoutube /> YouTube
//                     </a>
//                     <a href="https://www.customerservice.com" target="_blank" rel="noopener noreferrer">
//                         <FaHeadset /> Customer Service
//                     </a>
//                     <FaFilePdf onClick={handleExportPDF} style={{ cursor: 'pointer' }} />
//                 </div>
//             </div>

//             <div className="search-filter">
//                 <input
//                     type="text"
//                     value={searchId}
//                     onChange={handleSearch}
//                     placeholder="Search by Product ID"
//                 />
//                 <select value={selectedCategory} onChange={handleCategoryChange}>
//                     <option value="">All Categories</option>
//                     {categories.map(category => (
//                         <option key={category.id} value={category.name}>{category.name}</option>
//                     ))}
//                 </select>
//                 <div className="stock-filter">
//                     <button onClick={() => handleStockFilterChange('all')}>All</button>
//                     <button onClick={() => handleStockFilterChange('low')}>Low Stock</button>
//                     <button onClick={() => handleStockFilterChange('out')}>Out of Stock</button>
//                 </div>
//             </div>

//             {error && <div className="error">{error}</div>}
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <table className="product-table">
//                     <thead>
//                         <tr>
//                             <th>Product ID</th>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>Stock</th>
//                             <th>Categories</th>
//                             <th>Product Details</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredProducts.map(product => (
//                             <tr key={product.id}>
//                                 <td>{product.id}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.price}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>{product.categories.join(', ')}</td>
//                                 <td>{Object.entries(product.productDetails).map(([key, value]) => `${key}: ${value}`).join(', ')}</td>
//                                 <td>
//                                     <button onClick={() => handleEditClick(product)}><FaEdit /></button>
//                                     <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
//                                     <button onClick={() => handleAddVariationClick(product)}><FaPlus /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {editingProduct && (
//                 <form onSubmit={handleSubmit} className="edit-form">
//                     <h3>Edit Product</h3>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Product Name"
//                     />
//                     {Object.keys(formData.productDetails).map(key => (
//                         <div key={key}>
//                             <label>{key}</label>
//                             <input
//                                 type="text"
//                                 name={`productDetails[${key}]`}
//                                 value={formData.productDetails[key] || ''}
//                                 onChange={handleInputChange}
//                                 placeholder={`Enter ${key}`}
//                             />
//                         </div>
//                     ))}
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         placeholder="Price"
//                     />
//                     <input
//                         type="text"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleInputChange}
//                         placeholder="Quantity"
//                     />
//                     <select
//                         name="categories"
//                         value={formData.categories}
//                         onChange={handleInputChange}
//                         multiple
//                     >
//                         <option value="">Select Categories</option>
//                         {categories.map(category => (
//                             <option key={category.id} value={category.name} selected={formData.categories.includes(category.name)}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                     <button type="submit">Update Product</button>
//                     <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default InventoryPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import './Inventory.css'; // Ensure this path is correct
// import { FaEdit, FaTrash, FaYoutube, FaHeadset, FaPlus, FaFilePdf } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const InventoryPage = () => {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchId, setSearchId] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         productDetails: {},
//         price: '',
//         quantity: '',
//         discountPrice: '',
//         categories: [],
//         images: []
//     });
//     const [stockFilter, setStockFilter] = useState('all');

//     const adminId = localStorage.getItem('userId');
    
//     useEffect(() => {
//         fetchCategories();
//         fetchProductsByAdmin();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
//             setCategories(response.data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//             setError('Failed to fetch categories');
//         }
//     };

//     const fetchProductsByAdmin = useCallback(async () => {
//         if (!adminId) return;
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/seller/${adminId}`);
//             const productsWithImages = await Promise.all(response.data.map(async product => {
//                 const imagesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/images/product/${product.id}`);
//                 const imagesData = await imagesResponse.json();
//                 const imageURLs = imagesData.map(img => img.base64);

//                 return {
//                     ...product,
//                     images: imageURLs,
//                     categories: product.categories?.map(cat => cat.name) || []
//                 };
//             }));

//             setProducts(productsWithImages);
//             setFilteredProducts(productsWithImages);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError(`Failed to fetch products: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     }, [adminId]);

//     const handleSearch = (event) => {
//         const value = event.target.value;
//         setSearchId(value);
//         filterProducts(value, selectedCategory, stockFilter);
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//         filterProducts(searchId, event.target.value, stockFilter);
//     };

//     const handleStockFilterChange = (filter) => {
//         setStockFilter(filter);
//         filterProducts(searchId, selectedCategory, filter);
//     };

//     const filterProducts = (searchId, selectedCategory, stockFilter) => {
//         let filtered = products.filter(product => {
//             const matchesId = searchId ? product.id.toString().includes(searchId) : true;
//             const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;

//             const isInStock = product.quantity > 0;
//             const isLowStock = product.quantity > 0 && product.quantity < 10;

//             const matchesStockFilter = stockFilter === 'all' ||
//                 (stockFilter === 'low' && isLowStock) ||
//                 (stockFilter === 'out' && !isInStock);

//             return matchesId && matchesCategory && matchesStockFilter;
//         });

//         setFilteredProducts(filtered);
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;

//         if (name === 'categories') {
//             const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
//             setFormData(prevState => ({
//                 ...prevState,
//                 categories: selectedOptions,
//             }));
//         } else if (name.startsWith('productDetails')) {
//             const key = name.split('[')[1].split(']')[0]; // Extract key from name
//             setFormData(prevState => ({
//                 ...prevState,
//                 productDetails: {
//                     ...prevState.productDetails,
//                     [key]: value
//                 },
//             }));
//         } else {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [name]: value,
//             }));
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const totalQuantity = parseInt(formData.quantity, 10) || 0;

//         const requestBody = {
//             name: formData.name,
//             productDetails: formData.productDetails,
//             price: parseFloat(formData.price),
//             quantity: totalQuantity.toString(),
//             categories: formData.categories,
//             images: formData.images,
//         };

//         try {
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${editingProduct.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestBody),
//             });

//             if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);

//             const updatedProduct = await response.json();
//             const updatedProductWithImage = {
//                 ...updatedProduct,
//                 images: updatedProduct.images ? updatedProduct.images.map(img => img.base64) : [],
//             };

//             setProducts(products.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
//             setFilteredProducts(filteredProducts.map(product => product.id === editingProduct.id ? updatedProductWithImage : product));
//             setEditingProduct(null);
//             resetFormData();
//         } catch (error) {
//             console.error("Error updating product:", error);
//             setError(`Failed to update product: ${error.message}`);
//         }
//     };

//     const resetFormData = () => {
//         setFormData({
//             name: '',
//             productDetails: {},
//             price: '',
//             quantity: '',
//             discountPrice: '',
//             categories: [],
//             images: [],
//         });
//     };

//     const handleEditClick = (product) => {
//         setEditingProduct(product);
//         setFormData({
//             name: product.name,
//             productDetails: product.productDetails || {},
//             price: product.price,
//             quantity: product.quantity,
//             discountPrice: product.discountPrice,
//             categories: product.categories || [],
//             images: [],
//         });
//     };

//     const removeProduct = async (id) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);

//             setProducts(products.filter(product => product.id !== id));
//             setFilteredProducts(filteredProducts.filter(product => product.id !== id));
//         } catch (error) {
//             console.error("Error removing product:", error);
//             setError(`Failed to remove product: ${error.message}`);
//         }
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(16);
//         doc.text("Product Inventory", 14, 22);

//         const tableColumn = ["Product ID", "Name", "Price", "Quantity", "Categories", "Product Details"];
//         const tableRows = [];

//         filteredProducts.forEach(product => {
//             const productData = [
//                 product.id,
//                 product.name,
//                 product.price,
//                 product.quantity,
//                 product.categories.join(', '),
//                 Object.entries(product.productDetails).map(([key, value]) => `${key}: ${value}`).join(', ')
//             ];
//             tableRows.push(productData);
//         });

//         doc.autoTable(tableColumn, tableRows, { startY: 30 });
//         doc.save("inventory.pdf");
//     };

//     const handleAddVariationClick = (product) => {
//         navigate(`/add-product?id=${product.id}&name=${encodeURIComponent(product.name)}`);
//     };

//     return (
//         <div className='inventory-page'>
//             <div className="header">
//                 <h1>Inventory Management</h1>
//                 <div className="help-icons">
//                     <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
//                         <FaYoutube /> YouTube
//                     </a>
//                     <a href="https://www.customerservice.com" target="_blank" rel="noopener noreferrer">
//                         <FaHeadset /> Customer Service
//                     </a>
//                     <FaFilePdf onClick={handleExportPDF} style={{ cursor: 'pointer' }} />
//                 </div>
//             </div>

//             <div className="search-filter">
//                 <input
//                     type="text"
//                     value={searchId}
//                     onChange={handleSearch}
//                     placeholder="Search by Product ID"
//                 />
//                 <select value={selectedCategory} onChange={handleCategoryChange}>
//                     <option value="">All Categories</option>
//                     {categories.map(category => (
//                         <option key={category.id} value={category.name}>{category.name}</option>
//                     ))}
//                 </select>
//                 <div className="stock-filter">
//                     <button onClick={() => handleStockFilterChange('all')}>All</button>
//                     <button onClick={() => handleStockFilterChange('low')}>Low Stock</button>
//                     <button onClick={() => handleStockFilterChange('out')}>Out of Stock</button>
//                 </div>
//             </div>

//             {error && <div className="error">{error}</div>}
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <table className="product-table">
//                     <thead>
//                         <tr>
//                             <th>Product ID</th>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>Stock</th>
//                             <th>Categories</th>
//                             <th>Product Details</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredProducts.map(product => (
//                             <tr key={product.id}>
//                                 <td>{product.id}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.price}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>{product.categories.join(', ')}</td>
//                                 <td>{JSON.stringify(product.productDetails)}</td>
//                                 <td>
//                                     <button onClick={() => handleEditClick(product)}><FaEdit /></button>
//                                     <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
//                                     <button onClick={() => handleAddVariationClick(product)}><FaPlus /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {editingProduct && (
//                 <form onSubmit={handleSubmit} className="edit-form">
//                     <h3>Edit Product</h3>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Product Name"
//                     />
//                    <textarea
//                             name="productDetails"
//                             value={JSON.stringify(formData.productDetails, null, 2)}
//                             onChange={handleInputChange}
//                             placeholder="Product Details (JSON format)"
//                             rows={10}
//                         />
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         placeholder="Price"
//                     />
//                     <input
//                         type="text"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleInputChange}
//                         placeholder="Quantity"
//                     />
//                     <select
//                         name="categories"
//                         value={formData.categories}
//                         onChange={handleInputChange}
//                         multiple
//                     >
//                         <option value="">Select Categories</option>
//                         {categories.map(category => (
//                             <option key={category.id} value={category.name} selected={formData.categories.includes(category.name)}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                     <button type="submit">Update Product</button>
//                     <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default InventoryPage;

import React, { useState, useEffect, useCallback } from 'react';
import './Inventory.css'; // Ensure this path is correct
import { FaEdit, FaTrash, FaYoutube, FaHeadset, FaPlus, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InventoryPage = () => {
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
    const [stockFilter, setStockFilter] = useState('all');

    const adminId = localStorage.getItem('userId');

    useEffect(() => {
        fetchCategories();
        fetchProductsByAdmin();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories');
        }
    };

    const fetchProductsByAdmin = useCallback(async () => {
        if (!adminId) return;
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/seller/${adminId}`);
            const productsWithImages = await Promise.all(response.data.map(async product => {
                const imagesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/images/product/${product.id}`);
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
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(`Failed to fetch products: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [adminId]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchId(value);
        filterProducts(value, selectedCategory, stockFilter);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        filterProducts(searchId, event.target.value, stockFilter);
    };

    const handleStockFilterChange = (filter) => {
        setStockFilter(filter);
        filterProducts(searchId, selectedCategory, filter);
    };

    const filterProducts = (searchId, selectedCategory, stockFilter) => {
        let filtered = products.filter(product => {
            const matchesId = searchId ? product.id.toString().includes(searchId) : true;
            const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;

            const isInStock = product.quantity > 0;
            const isLowStock = product.quantity > 0 && product.quantity < 10;

            const matchesStockFilter = stockFilter === 'all' ||
                (stockFilter === 'low' && isLowStock) ||
                (stockFilter === 'out' && !isInStock);

            return matchesId && matchesCategory && matchesStockFilter;
        });

        setFilteredProducts(filtered);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'categories') {
            const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
            setFormData(prevState => ({
                ...prevState,
                categories: selectedOptions,
            }));
        } else if (name.startsWith('productDetails')) {
            const key = name.split('[')[1].split(']')[0]; // Extract key from name
            setFormData(prevState => ({
                ...prevState,
                productDetails: {
                    ...prevState.productDetails,
                    [key]: value
                },
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const totalQuantity = parseInt(formData.quantity, 10) || 0;

        const requestBody = {
            name: formData.name,
            productDetails: formData.productDetails,
            price: parseFloat(formData.price),
            quantity: totalQuantity.toString(),
            categories: formData.categories,
            images: formData.images,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${editingProduct.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);

            const updatedProduct = await response.json();
            const updatedProductWithImage = {
                ...updatedProduct,
                images: updatedProduct.images ? updatedProduct.images.map(img => img.base64) : [],
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
            images: [],
        });
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            productDetails: product.productDetails || {},
            price: product.price,
            quantity: product.quantity,
            discountPrice: product.discountPrice,
            categories: product.categories || [],
            images: [],
        });
    };

    const removeProduct = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);

            setProducts(products.filter(product => product.id !== id));
            setFilteredProducts(filteredProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error removing product:", error);
            setError(`Failed to remove product: ${error.message}`);
        }
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Product Inventory", 14, 22);

        const tableColumn = ["Product ID", "Name", "Price", "Quantity", "Categories", "Product Details"];
        const tableRows = [];

        filteredProducts.forEach(product => {
            const productData = [
                product.id,
                product.name,
                product.price,
                product.quantity,
                product.categories.join(', '),
                Object.entries(product.productDetails).map(([key, value]) => `${key}: ${value}`).join(', ')
            ];
            tableRows.push(productData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save("inventory.pdf");
    };

    const handleAddVariationClick = (product) => {
        navigate(`/add-product?id=${product.id}&name=${encodeURIComponent(product.name)}`);
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
                    <FaFilePdf onClick={handleExportPDF} style={{ cursor: 'pointer' }} />
                </div>
            </div>

            <div className="search-filter">
                <input
                    type="text"
                    value={searchId}
                    onChange={handleSearch}
                    placeholder="Search by Product ID"
                />
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <div className="stock-filter">
                    <button onClick={() => handleStockFilterChange('all')}>All</button>
                    <button onClick={() => handleStockFilterChange('low')}>Low Stock</button>
                    <button onClick={() => handleStockFilterChange('out')}>Out of Stock</button>
                </div>
            </div>

            {error && <div className="error">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Categories</th>
                            <th>Product Details</th>
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
                                <td>{JSON.stringify(product.productDetails)}</td>
                                <td>
                                    <button onClick={() => handleEditClick(product)}><FaEdit /></button>
                                    <button onClick={() => removeProduct(product.id)}><FaTrash /></button>
                                    <button onClick={() => handleAddVariationClick(product)}><FaPlus /></button>
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
