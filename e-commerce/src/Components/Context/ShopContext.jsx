

import React, { createContext, useState } from 'react';
import all_product from '../../Components/Assests/Ecommerce_Frontend_Assets/Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[all_product[index].id] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToCart = (itemId, quantity) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + quantity
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));
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
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };
    const getTotalCartAmounts = () => {
                 let totalItem = 0;
                 for (const item in cartItems) {
                     if (cartItems[item] > 0) {
                        totalItem += cartItems[item];
                     }
                 }
                 return totalItem;
             }
    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
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
        getTotalCartAmounts,
        getTotalCartItems
    };
   

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;


