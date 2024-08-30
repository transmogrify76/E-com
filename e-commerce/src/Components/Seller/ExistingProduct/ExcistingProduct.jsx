import React, { useState } from 'react';
import './ExcistingProduct.css'; // Corrected CSS import
import { FaFilePdf } from 'react-icons/fa'; // Importing the PDF icon

const ExistingProduct = () => {
    // Mock data for existing products (replace with actual data handling)
    const [products] = useState([
        { id: 1, name: 'Product A', mrp: 100, sellingPrice: 800, discount: 100, stock: 10 },
        { id: 2, name: 'Product B', mrp: 100, sellingPrice: 800, discount: 100, stock: 7 },
        { id: 3, name: 'Product C', mrp: 100, sellingPrice: 800, discount: 100, stock: 50 },
        { id: 4, name: 'Product D', mrp: 100, sellingPrice: 800, discount: 100, stock: 0 }
    ]);

    // Function to export products to PDF
    const exportToPDF = () => {
        const pdfTable = document.getElementById('products-table').outerHTML;
        const blob = new Blob([pdfTable], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'products.pdf';
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
    };

    return (
        <div className="app-container">
            {/* Main Content */}
            <div className="existing-product-container">
                <div className="header-container">
                    <h2>Existing Products</h2>
                    <button onClick={exportToPDF} className="export-pdf-button">
                        <FaFilePdf style={{ marginRight: '5px' }} /> Export as PDF
                    </button>
                </div>
                <table id="products-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>MRP</th>
                            <th>Selling Price</th>
                            <th>Discount</th>
                            <th>Stock</th>
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
