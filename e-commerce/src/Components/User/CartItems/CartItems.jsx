import React, { useState, useEffect } from 'react';
import './CartItems.css';
import removeIcon from '../../Assests/Ecommerce_Frontend_Assets/Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // Store discount amount
  const [productImages, setProductImages] = useState({}); // Store images for each product

  const navigate = useNavigate();

  // Fetch user id and cart items when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchCartItems(storedUserId);
    } else {
      setError('User is not logged in.');
      setLoading(false);
    }
  }, []);

  // Fetch cart items from the backend
  const fetchCartItems = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/getcartitems?userId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart items: ${response.statusText}`);
      }

      const data = await response.json();
      setCartItems(data);

      // Fetch images for each product in the cart
      data.forEach(item => fetchProductImage(item.product.id));

    } catch (error) {
      setError('Failed to fetch cart items. Please try again later.');
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the product image for a given productId
  const fetchProductImage = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/products/images/product/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product image');
      }
      const base64Image = await response.text(); // Assuming the API returns a base64-encoded image
      setProductImages(prevState => ({
        ...prevState,
        [productId]: base64Image, // Save the image in the state by productId
      }));
    } catch (error) {
      console.error('Error fetching product image:', error);
    }
  };

  // Handle removing a product from the cart
  const handleRemoveFromCart = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/removefromcart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      fetchCartItems(userId); // Refetch cart items after removal
    } catch (error) {
      setError('Failed to remove item from cart. Please try again later.');
      console.error('Error removing item from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle updating the cart quantity
  const handleUpdateCartQuantity = async (productId, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity to less than 1

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/updatecart`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }

      fetchCartItems(userId); // Refetch cart items after update
    } catch (error) {
      setError('Failed to update item quantity. Please try again later.');
      console.error('Error updating item quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle applying the promo code
  const handleApplyPromoCode = async () => {
    if (!promoCode) {
      setError('Please enter a promo code');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/promo/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCode, userId }),
      });

      if (!response.ok) {
        throw new Error('Invalid promo code');
      }

      const data = await response.json();
      setDiscount(data.discount); // Assuming API returns a discount percentage or amount
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Failed to apply promo code. Please try again.');
      console.error('Error applying promo code:', error);
    }
  };

  // Calculate the total amount for the cart with the promo code applied
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    // Apply discount
    if (discount > 0) {
      total -= total * (discount / 100); // Assuming discount is percentage
    }
    return total;
  };

  // Handle clearing the entire cart
  const handleClearCart = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/clearcart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      setCartItems([]); // Reset cart after clearing
    } catch (error) {
      setError('Failed to clear the cart. Please try again later.');
      console.error('Error clearing the cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Navigate to checkout with all cart items
  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cartItems, discount } });
  };

  // Navigate to checkout with a single product
  const handleProductClick = (productId) => {
    const product = cartItems.find(item => item.product.id === productId);
    navigate('/checkout', { state: { cartItems: [product], discount } });
  };

  return (
    <div className="cartitems-format-main">
      <table>
        <thead>
          <tr>
            <th>Products</th>
            <th>Title</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>Your cart is empty.</td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.product.id} onClick={() => handleProductClick(item.product.id)}>
                <td>
                  <img
                    src={productImages[item.product.id] ? `data:image/jpeg;base64,${productImages[item.product.id]}` : '/fallback-image.jpg'}
                    alt={item.product.name}
                    className="carticon-product-icon"
                  />
                </td>
                <td>{item.product.name}</td>
                <td>{item.product.productDetails.find(detail => detail.key === 'size')?.value}</td>
                <td>₹{item.product.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateCartQuantity(item.product.id, parseInt(e.target.value))}
                    style={{ width: '50px' }}
                  />
                </td>
                <td>₹{item.product.price * item.quantity}</td>
                <td>
                  <img
                    className="cartitems-remove-icon"
                    src={removeIcon}
                    alt="Remove"
                    onClick={(e) => {
                      e.stopPropagation();  // Prevent the row click from triggering while removing
                      handleRemoveFromCart(item.product.id);
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="promo-code-section">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter Promo Code"
        />
        <button onClick={handleApplyPromoCode}>Apply Promo Code</button>
      </div>

      <div className="cartitems-total-container">
        <h3><strong>CART TOTALS</strong></h3>
        <div className="cartitems-total-item">
          <p>SubTotal</p>
          <p>₹{calculateTotal()}</p>
        </div>
        <hr />
        <div className="cartitems-total-item">
          <p>Shipping Fee</p>
          <p>Free</p>
        </div>
        <hr />
        <div className="cartitems-total-item">
          <h3>Total</h3>
          <h3>₹{calculateTotal()}</h3>
        </div>
        <div className="cartitems-total-item">
          <p>Total Items</p>
          <p>{cartItems.length}</p>
        </div>

        <button className="proceed-to-checkout-button" onClick={handleProceedToCheckout}>
          PROCEED TO CHECKOUT
        </button>

        <div className="clear-cart-container">
          <button className="clear-cart-button" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
