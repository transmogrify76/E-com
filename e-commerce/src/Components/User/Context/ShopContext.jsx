
import React, { createContext, useState, useEffect } from 'react';

// The API URL for fetching products. Adjust as necessary.
const PRODUCTS_API_URL = `${process.env.REACT_APP_BASE_URL}/products`; 

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0); // Add state for wishlist count
    const [shippingCost, setShippingCost] = useState(0); // Default shipping cost
    const [products, setProducts] = useState([]); // Store products fetched from the API

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(PRODUCTS_API_URL);
                const data = await response.json();
                setProducts(data); // Assuming data is an array of product objects
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []); // Only run on component mount

    // Function to get the default cart with initial quantities based on actual products
    const getDefaultCart = () => {
        let cart = {};
        products.forEach(product => {
            product.sizes.forEach(size => { // Assuming each product has an array of sizes
                cart[`${product.id}-${size}`] = {
                    quantity: 0,
                    size: size || '',
                };
            });
        });
        return cart;
    };

    // Set the cart items once products are fetched
    useEffect(() => {
        if (products.length > 0) {
            setCartItems(getDefaultCart()); // Initialize cart items
        }
    }, [products]);

    // Function to add item to the cart
    const addToCart = (itemId, quantity, size) => {
        setCartItems((prev) => ({
            ...prev,
            [`${itemId}-${size}`]: {
                quantity: prev[`${itemId}-${size}`] ? prev[`${itemId}-${size}`].quantity + quantity : quantity,
                size: size, // Update size for the specific item
            }
        }));
    };

    // Function to remove item from the cart
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

    // Function to calculate the total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item].quantity > 0) {
                const [productId, size] = item.split('-');
                const product = products.find((prod) => prod.id === Number(productId));
                if (product) {
                    totalAmount += product.new_price * cartItems[item].quantity;
                }
            }
        }
        return totalAmount;
    };

    // Calculate total items in the cart
    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item].quantity > 0) {
                totalItems += cartItems[item].quantity;
            }
        }
        return totalItems;
    };

    // Function to add product to wishlist
    const addToWishlist = (productId) => {
        setWishlistItems((prev) => [...prev, productId]);
        setWishlistCount((prev) => prev + 1); // Update the wishlist count
    };

    // Function to remove product from wishlist
    const removeFromWishlist = (productId) => {
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
        setWishlistCount((prev) => prev - 1); // Update the wishlist count
    };

    const contextValue = {
        products,
        cartItems,
        wishlistItems,
        wishlistCount,
        shippingCost,
        setShippingCost, // Add setShippingCost to context
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        addToWishlist,
        removeFromWishlist,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;


