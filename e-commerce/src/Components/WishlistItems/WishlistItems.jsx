import React, { useContext } from 'react';
import './WislistItems.css';
import { ShopContext } from '../Context/ShopContext';

const WishlistItems = () => {
    const { all_product, wishlistItems, addToCart, removeFromWishlist } = useContext(ShopContext);

    return (
        <div className='wishlist-items'>
            <h2>Wishlist</h2>
            <hr />
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                wishlistItems.map(itemId => {
                    const product = all_product.find(item => item.id === itemId);
                    return (
                        <div key={itemId} className="wishlist-item">
                            <div className="wishlist-item-info">
                                <img src={product.image} alt={product.name} className="wishlist-item-image" />
                                <div className="wishlist-item-details">
                                    <p className="wishlist-item-name">{product.name}</p>
                                    <p className="wishlist-item-price">₹{product.new_price}</p>
                                    <button className="wishlist-item-add-to-cart" onClick={() => addToCart(itemId)}>Add to Cart</button>
                                    <button className="wishlist-item-remove" onClick={() => removeFromWishlist(itemId)}>Remove</button>
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
