
import React, { useState } from 'react';
import './ExcistingProduct.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const ExcistingProduct = () => {
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
            <header>
                <h1>My Store</h1>
                {/* Add any additional header content here */}
            </header>

            {/* Side Navigation (sidenav) */}
            <nav className="sidenav">
                <ul>
                <li><Link to="/seller-dashboard">Dashboard</Link></li>
                <li><Link to="/ProductUpload">Product Upload</Link></li>
                <li><Link to="/ExistingProduct">Excisting Products</Link></li>
                <li><Link to="/Orderr">Orders</Link></li>
                <li><Link to="/Dispatch">Dispatch</Link></li>
                <li><Link to="/RevenueGenerate">Revenue Generate</Link></li>
                <li><Link to="/Settings">Settings</Link></li>
                    {/* Add more navigation items as needed */}
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

export default ExcistingProduct;
