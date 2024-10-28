import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './WislistItems.css';
import { ShopContext } from '../Context/ShopContext';

const WishlistItems = () => {
    const { all_product, addToCart, removeFromWishlist } = useContext(ShopContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            const userId = 1;
            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wishlist`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    params: { userId } // Assuming your API can take userId as a query parameter
                });
                setWishlistItems(response.data); // Assuming the response returns an array of product IDs
            } catch (err) {
                console.error('Error fetching wishlist items:', err);
                setError(err.response?.data?.message || 'Error fetching wishlist items');
            }
        };

        fetchWishlistItems();
    }, []);

    const handleSizeChange = (itemId, size) => {
        setSelectedSize(prev => ({ ...prev, [itemId]: size }));
    };

    const handleAddToCart = (itemId) => {
        const size = selectedSize[itemId];
        if (!size) {
            alert('Please select a size before adding to cart.');
            return;
        }
        addToCart(itemId, 1, size);
        alert('Item added to cart successfully!');
    };

    const handleRemoveFromWishlist = async (itemId) => {
        const userId = 1; // Same as above, replace with the actual user ID
        const accessToken = localStorage.getItem('accessToken');

        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/wishlist`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                data: { userId, productId: itemId }
            });
            setWishlistItems(prev => prev.filter(id => id !== itemId)); // Update local state
            alert('Item removed from wishlist successfully!');
        } catch (err) {
            console.error('Error removing item from wishlist:', err);
            alert(err.response?.data?.message || 'Error removing item from wishlist');
        }
    };

    return (
        <div className='wishlist-items'>
            <h2>Wishlist</h2>
            {error && <p className="error">{error}</p>}
            <hr />
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                wishlistItems.map(id => {
                    const product = all_product.find(item => item.id === id);

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
                                        onClick={() => handleRemoveFromWishlist(id)}
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
