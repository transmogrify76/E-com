import React, { useState } from 'react';
import './Inventory.css'; // Corrected CSS import
import { FaFilePdf } from 'react-icons/fa'; // Importing the PDF icon from React Icons

const Inventory = () => {
    const exportToPDF = () => {
        // Logic for exporting products to PDF
        alert('Exporting products to PDF...');
    };

    // Mock data for existing products (replace with actual data handling)
    const [products] = useState([
        { id: 1, name: 'Product A', mrp: 100, sellingPrice: 800, discount: 100 },
        { id: 2, name: 'Product B', mrp: 100, sellingPrice: 800, discount: 100 },
        { id: 3, name: 'Product C', mrp: 100, sellingPrice: 800, discount: 100 },
        { id: 4, name: 'Product D', mrp: 100, sellingPrice: 800, discount: 100 }
    ]);

    return (
        <div className="app-container">
            {/* Main Content */}
            <div className="existing-product-container">
                <div className="header-container">
                    <h2>Existing Products</h2>
                    <div className="export-section">
                        <button onClick={exportToPDF}>
                            <FaFilePdf /> Export to PDF
                        </button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>MRP</th>
                            <th>Selling Price</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>₹{product.mrp}</td>
                                <td>₹{product.sellingPrice}</td>
                                <td>₹{product.discount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
