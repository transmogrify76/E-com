
import React, { useState } from 'react';
import './AddProduct.css'; // Import CSS for styling

const AddProduct = ({ onProductSubmit }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProductImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('description', productDescription);
        formData.append('userId', localStorage.getItem('userId'));

        productImages.forEach((file) => {
            formData.append('images', file);
        });

        try {
            const response = await fetch('http://localhost:5000/products/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to upload product');
            }

            // Clear the form
            setProductName('');
            setProductPrice('');
            setProductDescription('');
            setProductImages([]);

            // Notify parent component to refresh product list
            if (onProductSubmit) onProductSubmit();
        } catch (error) {
            console.error('Error uploading product:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
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
                    <label htmlFor="productImage">Product Images:</label>
                    <input
                        type="file"
                        id="productImage"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                        multiple
                        required
                    />
                </div>
                <button type="submit" className="upload-button" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Product'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AddProduct;
