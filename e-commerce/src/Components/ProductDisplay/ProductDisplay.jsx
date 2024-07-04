
import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import star_icon from '../../Components/Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../../Components/Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';

const ProductDisplay = ({ product }) => {
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist, getTotalCartAmount } = useContext(ShopContext);
    const [localSelectedSize, setLocalSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const isInWishlist = wishlistItems.includes(product.id);

    const handleSizeSelect = (size) => {
        setLocalSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (!localSelectedSize) {
            alert('Please select a size before adding to cart.');
            return;
        }
        addToCart(product.id, quantity); // Pass quantity to addToCart
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
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
                                className={`size-option ${localSelectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                {localSelectedSize && (
                    <div className="productdisplay-right-cart">
                        <p>Selected Size: {localSelectedSize}</p>
                    </div>
                )}
                <br />
                <div className="productdisplay-quantity">
                    <h1>Quantity:</h1>
                    <div className="quantity-control">
                        <input type="number" className="quantity-dropdown" value={quantity} onChange={handleQuantityChange} min="1" />
                    </div>
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
                    <br />
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


