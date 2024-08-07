import React, { useContext, useState } from 'react';
import './Checkout.css';
import { ShopContext } from '../../User/Context/ShopContext';
import removeIcon from '../../Assests/Ecommerce_Frontend_Assets/Assets/cart_cross_icon.png';
import {  useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount, setShippingCost } = useContext(ShopContext);
    const [shippingOption, setShippingOption] = useState('none'); // Default shipping option to 'none'
    const [localShippingCost, setLocalShippingCost] = useState(0); // Local shipping cost state
    const navigate = useNavigate(); // For navigation

    // Calculate subtotal
    const subtotal = getTotalCartAmount(); // Get subtotal
    const totalWithShipping = subtotal + localShippingCost; // Calculate total with shipping

    const handleRemoveFromCart = (itemId, size) => {
        removeFromCart(itemId, size);
    };

    const handleShippingChange = (e) => {
        const selectedOption = e.target.value;
        setShippingOption(selectedOption);

        // Update shipping cost based on selection
        const newShippingCost = selectedOption === 'express' ? 100 : selectedOption === 'standard' ? 50 : 0;
        setLocalShippingCost(newShippingCost); // Update local shipping cost state
        setShippingCost(newShippingCost); // Update the shipping cost in context
    };

    const handleProceedToPayment = () => {
        // Set shipping cost to context if no option is selected
        setShippingCost(localShippingCost);
        navigate('/payment'); // Navigate to payment page
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
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(cartItems).map((itemId) => {
                                const { quantity, size } = cartItems[itemId];
                                if (quantity > 0) {
                                    const product = all_product.find((p) => p.id === parseInt(itemId.split('-')[0]));
                                    if (product) {
                                        return (
                                            <tr key={itemId}>
                                                <td>
                                                    <img src={product.image} alt={product.name} className="checkout-product-icon" />
                                                    {product.name}
                                                </td>
                                                <td>{size}</td>
                                                <td>₹{product.new_price}</td>
                                                <td>{quantity}</td>
                                                <td>₹{product.new_price * quantity}</td>
                                                <td>
                                                    <img
                                                        className="checkout-remove-icon"
                                                        src={removeIcon}
                                                        alt="Remove"
                                                        onClick={() => handleRemoveFromCart(itemId.split('-')[0], size)}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    }
                                }
                                return null;
                            })}
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
