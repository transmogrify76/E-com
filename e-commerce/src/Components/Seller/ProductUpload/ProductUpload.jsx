// ProductUpload.jsx
// ProductUpload.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductUpload.css'; // Import CSS module for styling
import { Link } from 'react-router-dom';

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
        <div className={styles.productUploadContainer}>
            <h2>Product Upload</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className={styles.formGroup}>
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
                <br></br>
                <div className={styles.formGroup}>
                    <label htmlFor="productDescription">Product Description:</label>
                    <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        rows="4"
                        required
                    ></textarea>
                </div>
                <br></br>
                <div className={styles.formGroup}>
                    <label htmlFor="productImage">Product Image:</label>
                    <input
                        type="file"
                        id="productImage"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                        required
                    />
                </div>
                <br></br>
                <button type="submit">Upload Product</button>
            </form>
        </div>
    );
};

export default ProductUpload;
