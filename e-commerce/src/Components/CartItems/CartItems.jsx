import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import removeIcon from '../Assests/Ecommerce_Frontend_Assets/Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const CartItems = () => {
    const { getTotalCartAmount, getTotalCartItems, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    const handleRemoveFromCart = (itemId, size) => {
        removeFromCart(itemId, size);
    };

    // Calculate total amount in cart
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

        return total;
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
                    {Object.keys(cartItems).map((itemId) => {
                        const { quantity, size } = cartItems[itemId];
                        if (quantity > 0) {
                            const product = all_product.find((p) => p.id === parseInt(itemId.split('-')[0]));
                            return (
                                <tr key={itemId}>
                                    <td>
                                        <img src={product.image} alt="" className='carticon-product-icon' />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{size}</td>
                                    <td>₹{product.new_price}</td>
                                    <td>{quantity}</td>
                                    <td>₹{product.new_price * quantity}</td>
                                    <td>
                                        <img
                                            className='cartitems-remove-icon'
                                            src={removeIcon}
                                            alt="Remove"
                                            onClick={() => handleRemoveFromCart(itemId.split('-')[0], size)}
                                        />
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
            <div className="cartitems-total-container">
                <div className="cartitems-total">
                    <h3><strong>CART TOTALS</strong></h3>
                    <div>
                        <div className="cartitems-total-item">
                            <p>SubTotal</p>
                            <p>₹{getTotalCartAmount()}</p>
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
                            <p>{getTotalCartItems()}</p>
                        </div>
                    </div>
                    <Link to="/checkout">
                        <button className="proceed-to-checkout-button">
                            PROCEED TO CHECKOUT
                        </button>
                    </Link>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here:</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button className="submit-promocode-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
