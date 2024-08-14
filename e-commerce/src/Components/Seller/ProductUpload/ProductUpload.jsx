import React, { useState } from 'react';
import './ProductUpload.css'; // Import CSS for styling

const ProductUpload = ({ onProductSubmit }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name: productName,
            price: parseFloat(productPrice),
            description: productDescription,
            image: productImage
        };
        onProductSubmit(newProduct);
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductImage(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
    };

    return (
        <div className="product-upload-container">
            <h2>Upload a New Product</h2>
            <form onSubmit={handleSubmit} className="product-upload-form">
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="productPrice">Product Price (₹):</label>
                    <input
                        type="number"
                        id="productPrice"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="productDescription">Product Description:</label>
                    <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        rows="4"
                        required
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label htmlFor="productImage">Product Image:</label>
                    <input
                        type="file"
                        id="productImage"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                        required
                    />
                </div>
                
                <button type="submit" className="upload-button">Upload Product</button>
            </form>
        </div>
    );
};

export default ProductUpload;

