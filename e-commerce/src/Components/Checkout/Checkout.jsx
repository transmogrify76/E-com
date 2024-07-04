
import React, { useContext } from 'react';
import './Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom'; // Ensure you have React Router installed and set up

const Checkout = () => {
    const { cartItems, all_product, getTotalCartAmount } = useContext(ShopContext);

    const handleClick = () => {
        // Redirect to /payment route or implement your payment logic
        // Example using React Router:
        // history.push('/payment'); // Ensure you have access to history object or use Link component
        window.location.href = '/payment'; // For direct navigation
    };

    return (
        <div className="checkout-container">
            <header>
                <h1>Proceed to Checkout</h1>
            </header>
            <main>
                <section className="order-summary">
                    <h2>Order Summary</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(cartItems).map((itemId) => {
                                const quantityInCart = cartItems[itemId];
                                if (quantityInCart > 0) {
                                    const product = all_product.find((item) => item.id === Number(itemId));
                                    return (
                                        <tr key={itemId}>
                                            <td>
                                                <img src={product.image} alt={product.name} className="product-image" />
                                                {product.name}
                                            </td>
                                            <td>₹{product.new_price}</td>
                                            <td>{quantityInCart}</td>
                                            <td>₹{product.new_price * quantityInCart}</td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                            <tr className="total-row">
                                <td colSpan="3">Total</td>
                                <td>₹{getTotalCartAmount()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="promo-code">
                        <input type="text" placeholder="Enter promo code" />
                        <button>Apply</button>
                    </div>
                </section>
                <section className="shipping-info">
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
                </section>
            </main>
            <Link to="/payment">
                <button className="make-payment-button" onClick={handleClick}>
                    Make Payment
                </button>
            </Link>
        </div>
    );
};

export default Checkout;
