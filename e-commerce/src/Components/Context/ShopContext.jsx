
import React, { createContext, useState } from 'react';
import all_product from '../../Components/Assests/Ecommerce_Frontend_Assets/Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        const product = all_product[index];
        cart[`${product.id}-${product.size}`] = {
            quantity: 0,
            size: product.size || '' // Initialize size as empty string
        };
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToCart = (itemId, quantity, size) => {
        setCartItems((prev) => ({
            ...prev,
            [`${itemId}-${size}`]: {
                quantity: prev[`${itemId}-${size}`] ? prev[`${itemId}-${size}`].quantity + quantity : quantity,
                size: size // Update size for the specific item
            }
        }));
    };

    const removeFromCart = (itemId, size) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[`${itemId}-${size}`]) {
                newCart[`${itemId}-${size}`].quantity -= 1;
                if (newCart[`${itemId}-${size}`].quantity <= 0) {
                    delete newCart[`${itemId}-${size}`];
                }
            }
            return newCart;
        });
    };

    const addToWishlist = (itemId) => {
        setWishlistItems((prev) => [...prev, itemId]);
    };

    const removeFromWishlist = (itemId) => {
        setWishlistItems((prev) => prev.filter((id) => id !== itemId));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item].quantity > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item.split('-')[0]));
                totalAmount += itemInfo.new_price * cartItems[item].quantity;
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item].quantity > 0) {
                totalItems += cartItems[item].quantity;
            }
        }
        return totalItems;
    };

    const contextValue = {
        all_product,
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        getTotalCartAmount,
        getTotalCartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
