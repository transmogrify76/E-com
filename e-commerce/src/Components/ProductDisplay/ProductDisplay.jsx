import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../../Components/Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../../Components/Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = ({ product, selectedSize, onSizeSelect }) => {
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useContext(ShopContext);
    const [localSelectedSize, setLocalSelectedSize] = useState('');

    const isInWishlist = wishlistItems.includes(product.id);

    const handleAddToCart = () => {
        if (!localSelectedSize) {
            alert('Please select a size before adding to cart.');
            return;
        }
        addToCart(product.id, localSelectedSize);
    };
    

    const handleSizeSelect = (size) => {
        setLocalSelectedSize(size);  // Update local state
        if (typeof onSizeSelect === 'function') {
            onSizeSelect(size);  // Call the prop function if it's defined
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
