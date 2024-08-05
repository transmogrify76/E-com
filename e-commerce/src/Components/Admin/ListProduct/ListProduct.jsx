import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../Assests/Admin_Assets/cross_icon.png';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/allproducts');
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        try {
            await fetch('http://localhost:5000/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });
            fetchInfo();
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    return (
        <div className='list-product'>
            <div classname = "h-image">
            <h1 >Admin Panel - All Product List</h1>
            </div>
            
        <div className='background-list'>
            
        </div>
        <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price (₹)</p>
            <p>New Price (₹)</p>
            <p>Size</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
            {allProducts.length > 0 ? (
                allProducts.map((product, index) => (
                    <div key={index} className="listproduct-format">
                        <img src={product.image} alt={product.name} className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>₹{product.old_price}</p>
                        <p>₹{product.new_price}</p>
                        <p>{product.size}</p>
                        <p>{product.category}</p>
                        <img 
                            onClick={() => { removeProduct(product.id); }} 
                            className='listproduct-remove-icon' 
                            src={cross_icon} 
                            alt="Remove" 
                        />
                    </div>
                ))
            ) : (
                <p>No products available.</p> // Message for empty product list
            )}
        </div>
    </div>
);
};

export default ListProduct;