
// 

import React, { useState } from 'react';
import './ExcistingProduct.css'; // Corrected CSS import
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faCog, faChartLine, faClipboardList, faTruck, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const ExistingProduct = () => {
    const user = {
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
    };

    const notificationsCount = 5;

    // Default active menu item
    const [activeMenuItem, setActiveMenuItem] = useState('ExistingProducts'); 

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    // Mock data for existing products (replace with actual data handling)
    const [products, setProducts] = useState([
        { id: 1, name: 'Product A', price: 50, stock: 10 },
        { id: 2, name: 'Product B', price: 75, stock: 5 },
        { id: 3, name: 'Product C', price: 60, stock: 8 },
        { id: 4, name: 'Product D', price: 90, stock: 3 }
    ]);

    return (
        <div className="app-container">
            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <h1 className="store-heading">My Store</h1>
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        {notificationsCount > 0 && (
                            <span className="badge">{notificationsCount}</span>
                        )}
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." />
                            <button><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Side Navigation (sidenav) */}
            <nav className="sidenav">
                <ul>
                    <li className={activeMenuItem === 'ProductUpload' ? 'active' : ''}>
                        <Link to="/seller-dashboard" onClick={() => handleMenuItemClick('ProductUpload')}>
                            <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '8px' }} />
                            Existing Products
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'Orderr' ? 'active' : ''}>
                        <Link to="/Orderr" onClick={() => handleMenuItemClick('Orderr')}>
                            <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                            Orders
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'Dispatch' ? 'active' : ''}>
                        <Link to="/Dispatch" onClick={() => handleMenuItemClick('Dispatch')}>
                            <FontAwesomeIcon icon={faTruck} style={{ marginRight: '8px' }} />
                            Dispatch
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'RevenueGeneration' ? 'active' : ''}>
                        <Link to="/RevenueGenerate" onClick={() => handleMenuItemClick('RevenueGeneration')}>
                            <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
                            Revenue Generation
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'Settings' ? 'active' : ''}>
                        <Link to="/Settings" onClick={() => handleMenuItemClick('Settings')}>
                            <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="existing-product-container">
                <h2>Existing Products</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>₹{product.price}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExistingProduct;
