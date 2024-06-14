

import React, { useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
import { ShopContext } from '../Context/ShopContext';
import { useContext } from 'react';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useContext(ShopContext);
    const isInWishlist = wishlistItems.includes(product.id);
    
    // State to track whether a size is selected
    const [selectedSize, setSelectedSize] = useState(null);

    // Function to handle adding the product to cart
    const handleAddToCart = () => {
        if (selectedSize) {
            addToCart(product.id, selectedSize);
        } else {
            alert('Please select a size before adding to cart.');
        }
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_dull_icon} alt="Star Dull Icon" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">₹ {product.old_price}</div>
                    <div className="productdisplay-right-price-new">₹ {product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    Indulge in effortless elegance with our Floral Print Maxi Dress. Crafted from lightweight and breathable fabric, this dress is perfect for both casual outings and special occasions. The stunning floral print adds a touch of romance, while the flowing silhouette ensures comfort and style all day long.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select sizes</h1>
                    <div className="productdisplay-right-sizes">
                        <div onClick={() => setSelectedSize('S')}>Small</div>
                        <div onClick={() => setSelectedSize('M')}>Medium</div>
                        <div onClick={() => setSelectedSize('L')}>Large</div>
                        <div onClick={() => setSelectedSize('XL')}>XL</div>
                        <div onClick={() => setSelectedSize('XXL')}>XXL</div>
                    </div>
                </div>
                <br />
                <button className="addToCartButton" onClick={handleAddToCart}>ADD TO CART</button>
                <button className={isInWishlist ? "removeFromWishlistButton" : "addToWishlistButton"} onClick={() => {
                    if (isInWishlist) {
                        removeFromWishlist(product.id);
                    } else {
                        addToWishlist(product.id);
                    }
                }}>
                    {isInWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                </button>
                <p className="productdisplay-right-category">
                    <br />
                    <span>Category:</span> {Array.isArray(product.category) ? product.category.join(', ') : product.category}
                </p>
                <p className="productdisplay-right-category">
                    <span>Tags: </span> {Array.isArray(product.tags) ? product.tags.join(', ') : product.tags}
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;

