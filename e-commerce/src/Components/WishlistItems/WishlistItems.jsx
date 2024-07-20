
 import React, { useContext, useState } from 'react';
import './WislistItems.css';
import { ShopContext } from '../Context/ShopContext';

const WishlistItems = () => {
    const { all_product, wishlistItems, addToCart, removeFromWishlist } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState({}); // Manage selected sizes

    const handleSizeChange = (itemId, size) => {
        setSelectedSize(prev => ({ ...prev, [itemId]: size }));
    };

    const handleAddToCart = (itemId) => {
        const size = selectedSize[itemId];
        if (!size) {
            alert('Please select a size before adding to cart.');
            return;
        }
        addToCart(itemId, 1, size); // Add item to cart with selected size
        alert('Item added to cart successfully!');
    };

    return (
        <div className='wishlist-items'>
            <h2>Wishlist</h2>
            <hr />
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                wishlistItems.map(id => {
                    const product = all_product.find(item => item.id === id);

                    // Ensure product is found
                    if (!product) {
                        console.error(`Product with id ${id} is not found.`);
                        return <p key={id}>Product not found</p>;
                    }

                    return (
                        <div key={id} className="wishlist-item">
                            <div className="wishlist-item-info">
                                <img src={product.image} alt={product.name} className="wishlist-item-image" />
                                <div className="wishlist-item-details">
                                    <p className="wishlist-item-name">{product.name}</p>
                                    <p className="wishlist-item-price">₹{product.new_price}</p>
                                    <div className="wishlist-item-size">
                                        <label htmlFor={`size-select-${id}`}>Size:</label>
                                        <select
                                            id={`size-select-${id}`}
                                            value={selectedSize[id] || ''}
                                            onChange={(e) => handleSizeChange(id, e.target.value)}
                                        >
                                            <option value="" disabled>Select Size</option>
                                            {["Small", "Medium", "Large", "XL"].map(size => (
                                                <option key={size} value={size}>{size}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        className="wishlist-item-add-to-cart"
                                        onClick={() => handleAddToCart(id)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="wishlist-item-remove"
                                        onClick={() => removeFromWishlist(id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default WishlistItems;
