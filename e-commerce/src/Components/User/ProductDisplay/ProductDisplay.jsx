import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import star_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';

const ProductDisplay = ({ product }) => {
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [pincode, setPincode] = useState('');
    const [estimatedDelivery, setEstimatedDelivery] = useState('');

    const isInWishlist = wishlistItems.includes(product.id);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size before adding to cart.');
            return;
        }
        addToCart(product.id, quantity, selectedSize);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const handlePincodeChange = (event) => {
        setPincode(event.target.value);
    };

    const validatePincode = () => {
        const dummyPincodeData = {
            '123456': 'Estimated Delivery: 2-3 days',
            '654321': 'Estimated Delivery: 4-5 days',
            '111111': 'Estimated Delivery: 1-2 days',
            // Add more dummy data as needed
        };

        if (dummyPincodeData[pincode]) {
            setEstimatedDelivery(dummyPincodeData[pincode]);
        } else {
            setEstimatedDelivery('Invalid pincode');
        }
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    {[...Array(4)].map((_, i) => (
                        <img key={i} src={star_icon} alt="Star Icon" />
                    ))}
                    <img src={star_dull_icon} alt="Star Dull Icon" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">₹ {product.old_price}</div>
                    <div className="productdisplay-right-price-new">₹ {product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select size</h1>
                    <div className="productdisplay-right-sizes">
                        {['Small', 'Medium', 'Large', 'XL', 'XXL'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div className="productdisplay-quantity">
                    <h1>Quantity:</h1>
                    <div className="quantity-control">
                        <input type="number" className="quantity-dropdown" value={quantity} onChange={handleQuantityChange} min="1" />
                    </div>
                </div>
                <div className="pincode-validation">
                    <h1>Enter Pincode:</h1>
                    <input type="text" value={pincode} onChange={handlePincodeChange} />
                    <button onClick={validatePincode}>Check Delivery Date</button>
                    {estimatedDelivery && <p>{estimatedDelivery}</p>}
                </div>
                <button className="addToCartButton" onClick={handleAddToCart}>
                    ADD TO CART
                </button>
                <button
                    className={isInWishlist ? "removeFromWishlistButton" : "addToWishlistButton"}
                    onClick={() => {
                        if (isInWishlist) {
                            removeFromWishlist(product.id);
                        } else {
                            addToWishlist(product.id);
                        }
                    }}
                >
                    {isInWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                </button>
                <p className="productdisplay-right-category">
                    <span>Category:</span> {Array.isArray(product.category) ? product.category.join(', ') : product.category}
                </p>
                <p className="productdisplay-right-tags">
                    <span>Tags: </span> {Array.isArray(product.tags) ? product.tags.join(', ') : product.tags}
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;


