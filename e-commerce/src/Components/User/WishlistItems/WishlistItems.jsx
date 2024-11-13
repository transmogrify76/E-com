import React, { useState, useEffect } from 'react';
import './WislistItems.css'; // Your CSS file for styling
import { Link } from 'react-router-dom'; // Using Link component for navigation

const WishlistItems = () => {
  const [wishlistItems, setWishlistItems] = useState([]); // Wishlist items state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [userId, setUserId] = useState(null); // User ID state
  const [productImages, setProductImages] = useState({}); // Images of products in the wishlist

  // Fetch user id and wishlist items when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchWishlistItems(storedUserId);
    } else {
      setError('User is not logged in.');
      setLoading(false);
    }
  }, []);

  // Fetch wishlist items from the backend
  const fetchWishlistItems = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlist/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch wishlist items: ${response.statusText}`);
      }

      const data = await response.json();
      setWishlistItems(data); // Set the fetched wishlist items

      // Optionally, fetch product images if necessary
      data.forEach(item => fetchProductImage(item.product.id));

    } catch (error) {
      setError('Failed to fetch wishlist items. Please try again later.');
      console.error('Error fetching wishlist items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch product image by product ID
  const fetchProductImage = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${productId}/image`);
      if (response.ok) {
        const imageData = await response.json();
        setProductImages(prevState => ({
          ...prevState,
          [productId]: imageData.imageBase64, // Assuming imageBase64 is returned by the API
        }));
      }
    } catch (error) {
      console.error('Error fetching product image:', error);
    }
  };

  // Handle removing item from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    const userId = localStorage.getItem('userId'); // Get the logged-in userId from localStorage

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlist/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Item removed from wishlist!');
        fetchWishlistItems(userId); // Refetch wishlist after removal
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      alert('Failed to remove item from wishlist.');
    }
  };

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="wishlist-items">
      <h2>Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items-grid">
          {wishlistItems.map((item) => (
            <div key={item.product.id} className="wishlist-item-card">
              <Link to={`/product/${item.product.id}`}>
                <img
                  src={productImages[item.product.id] ? `data:image/jpeg;base64,${productImages[item.product.id]}` : '/fallback-image.jpg'}
                  alt={item.product.name}
                  className="wishlist-product-image"
                />
              </Link>
              <div className="wishlist-item-details">
                <h3>{item.product.name}</h3>
              
                <button
                  className="remove-from-wishlist-btn"
                  onClick={() => handleRemoveFromWishlist(item.product.id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistItems;
