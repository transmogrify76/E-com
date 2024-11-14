import React, { useState } from 'react';
import './Checkout.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { state } = useLocation();  // Get the state passed from the previous page
  const { cartItems, productDetails } = state || {};  // Destructure cartItems and productDetails
  const [updatedCartItems, setUpdatedCartItems] = useState(cartItems || []);  // State for updated cart items
  const [shippingOption, setShippingOption] = useState('none');  // Default shipping option to 'none'
  const [localShippingCost, setLocalShippingCost] = useState(0);  // Local shipping cost state
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigate = useNavigate();  // For navigation

  const userId = localStorage.getItem('userId');

  // Recalculate the total cart amount
  const getTotalCartAmount = () => {
    let total = 0;
    updatedCartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  const subtotal = getTotalCartAmount();  // Get subtotal
  const totalWithShipping = subtotal + localShippingCost;  // Calculate total with shipping

  // Handle shipping option change
  const handleShippingChange = (e) => {
    const selectedOption = e.target.value;
    setShippingOption(selectedOption);

    // Update shipping cost based on selection
    const newShippingCost = selectedOption === 'express' ? 100 : selectedOption === 'standard' ? 50 : 0;
    setLocalShippingCost(newShippingCost);
  };

  // Proceed to payment page
  const handleProceedToPayment = () => {
    navigate('/payment', {
      state: {
        subtotal,
        localShippingCost,
        totalWithShipping,
        cartItems: updatedCartItems,  // Pass cartItems for reference on the payment page
      }
    });  // Navigate to payment page with state
  };

  return (
    <div className="checkout-container">
      <div className="order-summary">
        <header>
          <h1>Proceed to Checkout</h1>
        </header>
        <section className="order-summary-table">
          <h2>Order Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Color</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Show product details passed from "Buy Now" button */}
              {productDetails ? (
                <tr key={productDetails.product.id}>
                  <td>
                    <img src={productDetails.image} alt={productDetails.product.name} className="checkout-product-icon" />
                    {productDetails.product.name}
                  </td>
                  <td>{productDetails.product.selectedSize}</td>
                  <td>{productDetails.product.selectedColor}</td>
                  <td>₹{productDetails.product.price}</td>
                  <td>{productDetails.product.quantity}</td>
                  <td>₹{productDetails.product.price * productDetails.product.quantity}</td>
                </tr>
              ) : updatedCartItems.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>Your cart is empty.</td>
                </tr>
              ) : (
                updatedCartItems.map((item) => {
                  const { quantity, size, color } = item;
                  const product = item.product;
                  if (product && quantity > 0) {
                    return (
                      <tr key={product.id}>
                        <td>
                          <img src={product.image} alt={product.name} className="checkout-product-icon" />
                          {product.name}
                        </td>
                        <td>{product.productDetails.find(detail => detail.key === 'size')?.value}</td>
                        <td>{product.productDetails.find(detail => detail.key === 'color')?.value}</td>
                        <td>₹{product.price}</td>
                        <td>{quantity}</td>
                        <td>₹{product.price * quantity}</td>
                      </tr>
                    );
                  }
                  return null;
                })
              )}
            </tbody>
          </table>
        </section>

        <div className="checkout-grandtotal">
          <h3>Subtotal: ₹{subtotal}</h3>
          <h3>Shipping: ₹{localShippingCost}</h3>
          <h3>Total: ₹{totalWithShipping}</h3>
        </div>

        <button className="proceed-to-payment-button" onClick={handleProceedToPayment}>
          Proceed to Payment
        </button>
      </div>

      <div className="shipping-info">
        <h2>Shipping Information</h2>
        <form>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" required />
          <label>Address:</label>
          <textarea placeholder="Enter your address" required />
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />
          <label>Phone:</label>
          <input type="tel" placeholder="Enter your phone number" required />
          <label>Delivery Instructions:</label>
          <textarea placeholder="Enter any special delivery instructions" />
        </form>

        <div className="shipping-options">
          <label>
            <input
              type="radio"
              name="shipping"
              value="standard"
              checked={shippingOption === 'standard'}
              onChange={handleShippingChange}
            />
            Standard Shipping (+₹50.00)
          </label>
          <label>
            <input
              type="radio"
              name="shipping"
              value="express"
              checked={shippingOption === 'express'}
              onChange={handleShippingChange}
            />
            Express Shipping (+₹100.00)
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
