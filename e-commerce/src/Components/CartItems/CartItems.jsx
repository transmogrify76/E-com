import React from 'react';
import './CartItems.css';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import remove_Icon from '../Assests/Ecommerce_Frontend_Assets/Assets/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalCartAmount,all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const handleOnClick = ()=> {
        window.location.href ='./checkout'
    }
    return (
        <><div className="cartitems-format-main">
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
                    {all_product.map((e) => {
                        if (cartItems[e.id] > 0) {
                            return (
                                <tr key={e.id}>
                                    <td>
                                        <img src={e.image} alt="" className='carticon-product-icon' />
                                    </td>
                                    <td>{e.name}</td>
                                    <td>₹{e.new_price}</td>
                                    <td>
                                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                    </td>
                                    <td>₹{e.new_price * cartItems[e.id]}</td>
                                    <td>
                                        <img
                                            className='cartitems-remove-icon'
                                            src={remove_Icon}
                                            onClick={() => removeFromCart(e.id)}
                                            alt="" />
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
            <br></br>
            <br></br>
            <br></br>
        </div><div className="cartitems-down">
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
                    <button  onClick={handleOnClick}>
                   PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promocode, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div></>
    );
};

export default CartItems;
