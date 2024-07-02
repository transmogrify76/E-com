
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
