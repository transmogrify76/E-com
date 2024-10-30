import React from 'react';
import WishlistItems from '../WishlistItems/WishlistItems';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [newProductId, setNewProductId] = useState('');
  const userId = 1; // Replace with dynamic user ID as needed 


  // Function to fetch wishlist items
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:5000/wishlist/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      const data = await response.json();
      setWishlistItems(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error.message);
    }
  };

  // Function to add a product to the wishlist
  const addToWishlist = async () => {
    if (!newProductId) {
      alert('Please enter a valid product ID.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: newProductId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to wishlist');
      }

      await fetchWishlist(); // Refresh wishlist after adding
      setNewProductId(''); // Clear input field
    } catch (error) {
      console.error('Error adding to wishlist:', error.message);
    }
  };

  // Function to remove a product from the wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/wishlist/${userId}/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove from wishlist');
      }

      await fetchWishlist(); // Refresh wishlist after removing
    } catch (error) {
      console.error('Error removing from wishlist:', error.message);
    }
  };

  // Use effect to fetch wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className='wishlist-container'>
      <h2>Your Wishlist</h2>
      <input
        type="text"
        value={newProductId}
        onChange={(e) => setNewProductId(e.target.value)}
        placeholder="Enter Product ID"
      />
      <button onClick={addToWishlist}>Add to Wishlist</button>

      {wishlistItems.length > 0 ? (
        <WishlistItems items={wishlistItems} onRemove={removeFromWishlist} />
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};


export default Wishlist;
