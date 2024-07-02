import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faEdit, faTrash, faPlus, faBell, faSearch, faUsers, faClipboardList, faChartLine, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Products.css'; // Adjust path as per your project structure

const Products = () => {
    const user = {
        username: 'Admin', // Replace with actual admin username
        avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
    };

    const [activeMenuItem, setActiveMenuItem] = useState('Products');

    const [products, setProducts] = useState([
        { id: 1, name: 'Product A', description: 'Description of Product A', price: 49.99 },
        { id: 2, name: 'Product B', description: 'Description of Product B', price: 29.99 },
        { id: 3, name: 'Product C', description: 'Description of Product C', price: 19.99 },
    ]);

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        const id = products.length + 1;
        const newProductWithId = { ...newProduct, id };
        setProducts([...products, newProductWithId]);
        setNewProduct({ name: '', description: '', price: 0 });
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
    };

    const [editingProduct, setEditingProduct] = useState(null);

    const handleEditProduct = (productId) => {
        const productToEdit = products.find(product => product.id === productId);
        setEditingProduct(productToEdit);
    };

    const cancelEdit = () => {
        setEditingProduct(null);
    };

    const saveProduct = (updatedProduct) => {
        const updatedProducts = products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
    };

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <h2>Products Management</h2>
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="badge">5</span>
                        
                    </div>
                </div>
            </header>

            {/* Sidebar (sidenav) */}
            <div className="admin-container">
                <nav className="sidenav">
                    <ul>
                        <li className={activeMenuItem === 'Users' ? 'active' : ''}>
                            <Link to="/Users" onClick={() => handleMenuItemClick('Users')}>
                                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
                                Users Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Products' ? 'active' : ''}>
                            <Link to="/Products" onClick={() => handleMenuItemClick('Products')}>
                                <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '8px' }} />
                                Products Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Orders' ? 'active' : ''}>
                            <Link to="/Order" onClick={() => handleMenuItemClick('Order')}>
                                <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                                Orders Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Reports' ? 'active' : ''}>
                            <Link to="/Reports" onClick={() => handleMenuItemClick('Reports')}>
                                <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
                                Reports & Analytics
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Settings' ? 'active' : ''}>
                            <Link to="/Settings" onClick={() => handleMenuItemClick('Settings')}>
                                <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                                Settings
                            </Link>
                        </li>
                        <li>
                            <a href="/Logout">
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="admin-main-content">
                        {/* Products Management */}
                        <div className="products-management">
                            <h2>Products Management</h2>
                            <div className="products-list">
                                {products.map(product => (
                                    <div className="product-item" key={product.id}>
                                        {editingProduct && editingProduct.id === product.id ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={editingProduct.name}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                />
                                                <input
                                                    type="text"
                                                    value={editingProduct.description}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                />
                                                <input
                                                    type="number"
                                                    value={editingProduct.price}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                                />
                                                <button onClick={() => saveProduct(editingProduct)}>Save</button>
                                                <button onClick={cancelEdit}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div>
                                                <p><strong>Name:</strong> {product.name}</p>
                                                <p><strong>Description:</strong> {product.description}</p>
                                                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                                                <div className="product-actions">
                                                    <button onClick={() => handleEditProduct(product.id)}>
                                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteProduct(product.id)}>
                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Add New Product Form */}
                    <div className="add-product">
                        <h3>Add New Product</h3>
                        <form onSubmit={e => { e.preventDefault(); handleAddProduct(); }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Product Description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Product Price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit"><FontAwesomeIcon icon={faPlus} /> Add Product</button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Products;

