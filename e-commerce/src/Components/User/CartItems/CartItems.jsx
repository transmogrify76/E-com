import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../User/Context/ShopContext';
import removeIcon from '../../Assests/Ecommerce_Frontend_Assets/Assets/cart_cross_icon.png'
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

// import React, { useState, useEffect, useContext } from 'react';
// import './CartItems.css';
// import { ShopContext } from '../../User/Context/ShopContext';
// import removeIcon from '../../Assests/Ecommerce_Frontend_Assets/Assets/cart_cross_icon.png';
// import { Link } from 'react-router-dom';

// const CartItems = () => {
//     const { all_product } = useContext(ShopContext);  // Removed removeFromCart
//     const [cartItems, setCartItems] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const userId = 1; // Replace with actual userId from authentication/context

//     useEffect(() => {
//         const fetchCartData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(`http://localhost:5000/cart/${userId}`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 const formattedCartItems = data.reduce((acc, item) => {
//                     acc[`${item.productId}-${item.size}`] = item;
//                     return acc;
//                 }, {});
//                 setCartItems(formattedCartItems);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCartData();
//     }, [userId]);

//     const handleRemoveFromCart = async (productId, size) => {
//         try {
//             const response = await fetch(`http://localhost:5000/cart/${userId}/${productId}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             // Update cart items after successful removal
//             setCartItems(prevCartItems => {
//                 const newCartItems = { ...prevCartItems };
//                 delete newCartItems[`${productId}-${size}`];
//                 return newCartItems;
//             });
//         } catch (error) {
//             console.error('Error removing item from cart:', error);
//         }
//     };

//     const calculateTotal = () => {
//         return Object.keys(cartItems).reduce((total, itemKey) => {
//             const { quantity, productId } = cartItems[itemKey];
//             const product = all_product.find(p => p.id === productId);
//             if (product) {
//                 total += product.new_price * quantity;
//             }
//             return total;
//         }, 0);
//     };

//     if (loading) return <p>Loading cart data...</p>;
//     if (error) return <p>Error fetching cart data: {error}</p>;

//     const cartKeys = Object.keys(cartItems);

//     return (
//         <div className="cartitems-format-main">
//             {cartKeys.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Products</th>
//                                 <th>Title</th>
//                                 <th>Size</th>
//                                 <th>Price</th>
//                                 <th>Quantity</th>
//                                 <th>Total</th>
//                                 <th>Remove</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cartKeys.map((itemKey) => {
//                                 const { quantity, productId, size } = cartItems[itemKey];
//                                 if (quantity > 0) {
//                                     const product = all_product.find(p => p.id === productId);
//                                     return (
//                                         <tr key={itemKey}>
//                                             <td>
//                                                 <img src={product.image} alt={product.name} className='carticon-product-icon' />
//                                             </td>
//                                             <td>{product.name}</td>
//                                             <td>{size}</td>
//                                             <td>₹{product.new_price}</td>
//                                             <td>{quantity}</td>
//                                             <td>₹{product.new_price * quantity}</td>
//                                             <td>
//                                                 <img
//                                                     className='cartitems-remove-icon'
//                                                     src={removeIcon}
//                                                     alt="Remove"
//                                                     onClick={() => handleRemoveFromCart(productId, size)}
//                                                 />
//                                             </td>
//                                         </tr>
//                                     );
//                                 }
//                                 return null;
//                             })}
//                         </tbody>
//                     </table>
//                     <div className="cartitems-total-container">
//                         <div className="cartitems-total">
//                             <h3><strong>CART TOTALS</strong></h3>
//                             <div>
//                                 <div className="cartitems-total-item">
//                                     <p>SubTotal</p>
//                                     <p>₹{calculateTotal()}</p>
//                                 </div>
//                                 <hr />
//                                 <div className="cartitems-total-item">
//                                     <p>Shipping Fee</p>
//                                     <p>Free</p>
//                                 </div>
//                                 <hr />
//                                 <div className="cartitems-total-item">
//                                     <h3>Total</h3>
//                                     <h3>₹{calculateTotal()}</h3>
//                                 </div>
//                                 <div className="cartitems-total-item">
//                                     <p>Total Items</p>
//                                     <p>{cartKeys.length}</p>
//                                 </div>
//                             </div>
//                             <Link to="/checkout">
//                                 <button className="proceed-to-checkout-button">
//                                     PROCEED TO CHECKOUT
//                                 </button>
//                             </Link>
//                         </div>
//                         <div className="cartitems-promocode">
//                             <p>If you have a promo code, enter it here:</p>
//                             <div className="cartitems-promobox">
//                                 <input type="text" placeholder='promo code' />
//                                 <button className="submit-promocode-button">Submit</button>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default CartItems;
