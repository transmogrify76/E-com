


import React, { useContext } from 'react';
import './Checkout.css'; // Import your checkout page styles
import { ShopContext } from '../Context/ShopContext';
import removeIcon from '../Assests/Ecommerce_Frontend_Assets/Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { all_product, cartItems, wishlistItems, removeFromCart } = useContext(ShopContext);

    const handleRemoveFromCart = (itemId, size) => {
        removeFromCart(itemId, size);
    };

    // Calculate total amount in cart and wishlist
    const calculateTotal = () => {
        let total = 0;

        // Calculate total amount for cart items
        Object.keys(cartItems).forEach((itemId) => {
            const { quantity } = cartItems[itemId];
            if (quantity > 0) {
                const product = all_product.find((item) => item.id === parseInt(itemId.split('-')[0]));
                if (product) {
                    total += product.new_price * quantity;
                }
            }
        });

        // Calculate total amount for wishlist items
        wishlistItems.forEach((itemId) => {
            const product = all_product.find((item) => item.id === itemId);
            if (product) {
                total += product.new_price; // Assuming wishlist items are added with quantity 1
            }
        });

        return total;
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
                            {/* {wishlistItems.map((itemId) => {
                                const product = all_product.find((item) => item.id === itemId);
                                if (product) {
                                    return (
                                        <tr key={itemId}>
                                            <td>
                                                <img src={product.image} alt={product.name} className="checkout-product-icon" />
                                                {product.name}
                                                <span className="wishlist-tag">Wishlist</span>
                                            </td>
                                            <td>N/A</td>
                                            <td>₹{product.new_price}</td>
                                            <td>1</td> 
                                            <td>₹{product.new_price}</td>
                                            <td>
                                                <img
                                                    className="checkout-remove-icon"
                                                    src={removeIcon}
                                                    alt="Remove"
                                                    onClick={() => handleRemoveFromCart(itemId, '')} // Wishlist items don’t have a size
                                                />
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;
                            })} */}
                        </tbody>
                    </table>
                </section>
                <div className="promo-code">
                    <input type="text" placeholder="Enter promo code" />
                    <button>Apply</button>
                </div>
                <div className="checkout-grandtotal">
                    <h3>Total</h3>
                    <h3>₹{calculateTotal()}</h3>
                </div>
                <Link to="/payment">
                    <button className="proceed-to-payment-button">Proceed to Payment</button>
                </Link>
            </div>
            <div className="shipping-info">
                <h2>Shipping Information</h2>
                <form>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter your name" />
                    <label>Address:</label>
                    <textarea placeholder="Enter your address" />
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" />
                    <label>Phone:</label>
                    <input type="tel" placeholder="Enter your phone number" />
                    <label>Delivery Instructions:</label>
                    <textarea placeholder="Enter any special delivery instructions" />
                </form>
                <div className="shipping-options">
                    <label>
                        <input type="radio" name="shipping" value="standard" checked />
                        Standard Shipping (+₹50.00)
                    </label>
                    <label>
                        <input type="radio" name="shipping" value="express" />
                        Express Shipping (+₹100.00)
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
