
import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import remove_Icon from '../Assests/Ecommerce_Frontend_Assets/Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className="cartitems-format-main">
            <table>
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {all_product.map((product) => {
                        const quantityInCart = cartItems[product.id];
                        if (quantityInCart > 0) {
                            return (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image} alt="" className='carticon-product-icon' />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>₹{product.new_price}</td>
                                    <td>{quantityInCart}</td> {/* Display quantity */}
                                    <td>₹{product.new_price * quantityInCart}</td>
                                    <td>
                                        <img
                                            className='cartitems-remove-icon'
                                            src={remove_Icon}
                                            onClick={() => removeFromCart(product.id)}
                                            alt=""
                                        />
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
            <br />
            <br />
            <br />
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h3><strong>CART TOTALS</strong></h3>
                    <div>
                        <div className="cartitems-total-item">
                            <p>SubTotal</p>
                            <p> ₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3> ₹{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <Link to="/checkout">
                        <button>
                            PROCEED TO CHECKOUT
                        </button>
                    </Link>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promocode, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;

