
import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../Assests/Admin_Assets/cross_icon.png';

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch all products from the API
    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    // Remove a product by ID
    const removeProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove product');
            }

            // Update the product list by filtering out the removed product
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error removing product:", error);
            setError("Failed to remove product");
        }
    };

    // Fetch all products on component mount
    useEffect(() => {
        fetchAllProducts();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div className='list-product'>
            <div className="header">
                <h1>Admin Panel - Product List</h1>
            </div>
            
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price (₹)</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id}>
                                    <td><img src={product.image} alt={product.name} className="product-image" /></td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>₹{product.price}</td>
                                    <td>
                                        <img 
                                            onClick={() => removeProduct(product.id)} 
                                            className='remove-icon' 
                                            src={cross_icon} 
                                            alt="Remove" 
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No products available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListProduct;
