// import React, { useState, useContext } from 'react';
// import './ProductDisplay.css';
// import { ShopContext } from '../Context/ShopContext';
// import star_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
// import star_dull_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
// import CustomerReview from '../CustomerReview/CustomerReview';
//  // Import the CustomerReview component

// const ProductDisplay = ({ product }) => {
//     const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useContext(ShopContext);
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState('');
//     const [selectedColor, setSelectedColor] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [estimatedDelivery, setEstimatedDelivery] = useState('');
//     const [reviewSubmitted, setReviewSubmitted] = useState(false);

//     const handleAddToCart = () => {
//         if (!selectedSize || !selectedColor) {
//             alert('Please select both a size and a color before adding to cart.');
//             return;
//         }
//         addToCart(product.id, quantity, selectedSize, selectedColor);
//     };

//     const handleSizeSelect = (size) => {
//         setSelectedSize(size);
//     };

//     const handleColorSelect = (color) => {
//         setSelectedColor(color);
//     };

//     const handleQuantityChange = (event) => {
//         const value = parseInt(event.target.value, 10);
//         if (!isNaN(value) && value >= 1) {
//             setQuantity(value);
//         }
//     };

//     const handlePincodeChange = (event) => {
//         setPincode(event.target.value);
//     };

//     const validatePincode = () => {
//         const dummyPincodeData = {
//             '123456': 'Estimated Delivery: 2-3 days',
//             '654321': 'Estimated Delivery: 4-5 days',
//             '111111': 'Estimated Delivery: 1-2 days',
//             // Add more dummy data as needed
//         };

//         if (dummyPincodeData[pincode]) {
//             setEstimatedDelivery(dummyPincodeData[pincode]);
//         } else {
//             setEstimatedDelivery('Invalid pincode');
//         }
//     };

//     const handleReviewSubmit = (review) => {
//         setReviewSubmitted(true);
//         // Handle review submission if needed, e.g., update local state or trigger a refresh
//     };

//     return (
//         <div className="productdisplay">
//             <div className="productdisplay-left">
//                 <div className="productdisplay-img">
//                     <img className="productdisplay-main-img" src={product.image} alt={product.name} />
//                 </div>
//             </div>
//             <div className="productdisplay-right">
//                 <h1>{product.name}</h1>
//                 <div className="productdisplay-right-stars">
//                     {[...Array(5)].map((_, i) => (
//                         <img
//                             key={i}
//                             src={i < product.rating ? star_icon : star_dull_icon}
//                             alt="Star Icon"
//                         />
//                     ))}
//                     <p>(122)</p>
//                 </div>
//                 <div className="productdisplay-right-prices">
//                     <div className="productdisplay-right-price-old">₹ {product.old_price}</div>
//                     <div className="productdisplay-right-price-new">₹ {product.new_price}</div>
//                 </div>
//                 <div className="productdisplay-right-description">
//                     {product.description}
//                 </div>
//                 <div className="productdisplay-right-size">
//                     <h1>Select size</h1>
//                     <div className="productdisplay-right-sizes">
//                         {['Small', 'Medium', 'Large', 'XL', 'XXL'].map((size) => (
//                             <div
//                                 key={size}
//                                 className={`size-option ${selectedSize === size ? 'selected' : ''}`}
//                                 onClick={() => handleSizeSelect(size)}
//                             >
//                                 {size}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Add Select Color section */}
//                 <div className="productdisplay-right-color">
//                     <h1>Select color</h1>
//                     <div className="productdisplay-right-colors">
//                         {['Red', 'Blue', 'Green', 'Black', 'White'].map((color) => (
//                             <div
//                                 key={color}
//                                 className={`color-option ${selectedColor === color ? 'selected' : ''}`}
//                                 onClick={() => handleColorSelect(color)}
//                                 style={{ backgroundColor: color.toLowerCase() }}
//                             >
//                                 {color}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="productdisplay-quantity">
//                     <h1>Quantity:</h1>
//                     <div className="quantity-control">
//                         <input type="number" className="quantity-dropdown" value={quantity} onChange={handleQuantityChange} min="1" />
//                     </div>
//                 </div>
//                 <div className="pincode-validation">
//                     <h1>Enter Pincode:</h1>
//                     <input type="text" value={pincode} onChange={handlePincodeChange} />
//                     <button onClick={validatePincode}>Check Delivery Date</button>
//                     {estimatedDelivery && <p>{estimatedDelivery}</p>}
//                 </div>
//                 <button className="addToCartButton" onClick={handleAddToCart}>
//                     ADD TO CART
//                 </button>
//                 <button
//                     className={wishlistItems.includes(product.id) ? "removeFromWishlistButton" : "addToWishlistButton"}
//                     onClick={() => {
//                         if (wishlistItems.includes(product.id)) {
//                             removeFromWishlist(product.id);
//                         } else {
//                             addToWishlist(product.id);
//                         }
//                     }}
//                 >
//                     {wishlistItems.includes(product.id) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
//                 </button>
//                 <p className="productdisplay-right-category">
//                     <span>Category:</span> {Array.isArray(product.category) ? product.category.join(', ') : product.category}
//                 </p>
//                 <p className="productdisplay-right-tags">
//                     <span>Tags: </span> {Array.isArray(product.tags) ? product.tags.join(', ') : product.tags}
//                 </p>

//                 {/* Add the CustomerReview component */}
//                 <CustomerReview
//                     productId={product.id}
//                     onSubmit={handleReviewSubmit}
//                 />
//                 {reviewSubmitted && <p className="review-submitted-message">Thank you for your review!</p>}
//             </div>
//         </div>
//     );
// };

// export default ProductDisplay;

// import React, { useState, useContext } from 'react';
// import './ProductDisplay.css';
// import { ShopContext } from '../Context/ShopContext';
// import star_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
// import star_dull_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
// import CustomerReview from '../CustomerReview/CustomerReview';

// const ProductDisplay = ({ product }) => {
//     const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useContext(ShopContext);
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState('');
//     const [selectedColor, setSelectedColor] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [estimatedDelivery, setEstimatedDelivery] = useState('');
//     const [reviewSubmitted, setReviewSubmitted] = useState(false);
//     const [canReview, setCanReview] = useState(false); // Track if user can review

//     // Example check for review availability
//     // In practice, this might come from props or API
//     // setCanReview(product.purchaseStatus === 'delivered');

//     const handleAddToCart = () => {
//         if (!selectedSize || !selectedColor) {
//             alert('Please select both a size and a color before adding to cart.');
//             return;
//         }
//         addToCart(product.id, quantity, selectedSize, selectedColor);
//     };

//     const handleSizeSelect = (size) => {
//         setSelectedSize(size);
//     };

//     const handleColorSelect = (color) => {
//         setSelectedColor(color);
//     };

//     const handleQuantityChange = (event) => {
//         const value = parseInt(event.target.value, 10);
//         if (!isNaN(value) && value >= 1) {
//             setQuantity(value);
//         }
//     };

//     const handlePincodeChange = (event) => {
//         setPincode(event.target.value);
//     };

//     const validatePincode = () => {
//         const dummyPincodeData = {
//             '123456': 'Estimated Delivery: 2-3 days',
//             '654321': 'Estimated Delivery: 4-5 days',
//             '111111': 'Estimated Delivery: 1-2 days',
//         };

//         if (dummyPincodeData[pincode]) {
//             setEstimatedDelivery(dummyPincodeData[pincode]);
//         } else {
//             setEstimatedDelivery('Invalid pincode');
//         }
//     };

//     const handleReviewSubmit = (review) => {
//         setReviewSubmitted(true);
//         // Handle review submission if needed, e.g., update local state or trigger a refresh
//     };

//     return (
//         <div className="productdisplay">
//             <div className="productdisplay-left">
//                 <div className="productdisplay-img">
//                     <img className="productdisplay-main-img" src={product.image} alt={product.name} />
//                 </div>
//             </div>
//             <div className="productdisplay-right">
//                 <h1>{product.name}</h1>
//                 <div className="productdisplay-right-stars">
//                     {[...Array(5)].map((_, i) => (
//                         <img
//                             key={i}
//                             src={i < product.rating ? star_icon : star_dull_icon}
//                             alt="Star Icon"
//                         />
//                     ))}
//                     <p>(122)</p>
//                 </div>
//                 <div className="productdisplay-right-prices">
//                     <div className="productdisplay-right-price-old">₹ {product.old_price}</div>
//                     <div className="productdisplay-right-price-new">₹ {product.new_price}</div>
//                 </div>
//                 <div className="productdisplay-right-description">
//                     {product.description}
//                 </div>
//                 <div className="productdisplay-right-size">
//                     <h1>Select size</h1>
//                     <div className="productdisplay-right-sizes">
//                         {['Small', 'Medium', 'Large', 'XL', 'XXL'].map((size) => (
//                             <div
//                                 key={size}
//                                 className={`size-option ${selectedSize === size ? 'selected' : ''}`}
//                                 onClick={() => handleSizeSelect(size)}
//                             >
//                                 {size}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="productdisplay-right-color">
//                     <h1>Select color</h1>
//                     <div className="productdisplay-right-colors">
//                         {['Red', 'Blue', 'Green', 'Black', 'White'].map((color) => (
//                             <div
//                                 key={color}
//                                 className={`color-option ${selectedColor === color ? 'selected' : ''}`}
//                                 onClick={() => handleColorSelect(color)}
//                                 style={{ backgroundColor: color.toLowerCase() }}
//                             >
//                                 {color}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="productdisplay-quantity">
//                     <h1>Quantity:</h1>
//                     <div className="quantity-control">
//                         <input type="number" className="quantity-dropdown" value={quantity} onChange={handleQuantityChange} min="1" />
//                     </div>
//                 </div>
//                 <div className="pincode-validation">
//                     <h1>Enter Pincode:</h1>
//                     <input type="text" value={pincode} onChange={handlePincodeChange} />
//                     <button onClick={validatePincode}>Check Delivery Date</button>
//                     {estimatedDelivery && <p>{estimatedDelivery}</p>}
//                 </div>
//                 <button className="addToCartButton" onClick={handleAddToCart}>
//                     ADD TO CART
//                 </button>
//                 <button
//                     className={wishlistItems.includes(product.id) ? "removeFromWishlistButton" : "addToWishlistButton"}
//                     onClick={() => {
//                         if (wishlistItems.includes(product.id)) {
//                             removeFromWishlist(product.id);
//                         } else {
//                             addToWishlist(product.id);
//                         }
//                     }}
//                 >
//                     {wishlistItems.includes(product.id) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
//                 </button>
//                 <p className="productdisplay-right-category">
//                     <span>Category:</span> {Array.isArray(product.category) ? product.category.join(', ') : product.category}
//                 </p>
//                 <p className="productdisplay-right-tags">
//                     <span>Tags: </span> {Array.isArray(product.tags) ? product.tags.join(', ') : product.tags}
//                 </p>

//                 {/* Conditionally render the CustomerReview component */}
//                 {canReview && (
//                     <CustomerReview
//                         productId={product.id}
//                         onSubmit={handleReviewSubmit}
//                     />
//                 )}
//                 {reviewSubmitted && <p className="review-submitted-message">Thank you for your review!</p>}
//             </div>
//         </div>
//     );
// };

// export default ProductDisplay;
import React, { useState, useContext, useEffect } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import star_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
import CustomerReview from '../CustomerReview/CustomerReview';

const ProductDisplay = ({ product }) => {
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [pincode, setPincode] = useState('');
    const [estimatedDelivery, setEstimatedDelivery] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [canReview, setCanReview] = useState(false); // Track if user can review

    // Example function to check if the user can review
    // In a real application, this data should be fetched from an API or user context
    useEffect(() => {
        const fetchReviewEligibility = async () => {
            // Replace with your actual API call or logic to determine review eligibility
            const userPurchaseStatus = await checkUserPurchaseStatus(product.id);
            setCanReview(userPurchaseStatus === 'delivered');
        };

        fetchReviewEligibility();
    }, [product.id]);

    const checkUserPurchaseStatus = async (productId) => {
        // Mock API call or logic to get purchase status
        // This should be replaced with your actual API call
        // Example response: { purchaseStatus: 'delivered' }
        return 'delivered'; // This should be based on actual data
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert('Please select both a size and a color before adding to cart.');
            return;
        }
        addToCart(product.id, quantity, selectedSize, selectedColor);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const handlePincodeChange = (event) => {
        setPincode(event.target.value);
    };

    const validatePincode = () => {
        const dummyPincodeData = {
            '123456': 'Estimated Delivery: 2-3 days',
            '654321': 'Estimated Delivery: 4-5 days',
            '111111': 'Estimated Delivery: 1-2 days',
        };

        if (dummyPincodeData[pincode]) {
            setEstimatedDelivery(dummyPincodeData[pincode]);
        } else {
            setEstimatedDelivery('Invalid pincode');
        }
    };

    const handleReviewSubmit = (review) => {
        setReviewSubmitted(true);
        // Handle review submission if needed, e.g., update local state or trigger a refresh
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    {[...Array(5)].map((_, i) => (
                        <img
                            key={i}
                            src={i < product.rating ? star_icon : star_dull_icon}
                            alt="Star Icon"
                        />
                    ))}
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">₹ {product.old_price}</div>
                    <div className="productdisplay-right-price-new">₹ {product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select size</h1>
                    <div className="productdisplay-right-sizes">
                        {['Small', 'Medium', 'Large', 'XL', 'XXL'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="productdisplay-right-color">
                    <h1>Select color</h1>
                    <div className="productdisplay-right-colors">
                        {['Red', 'Blue', 'Green', 'Black', 'White'].map((color) => (
                            <div
                                key={color}
                                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                onClick={() => handleColorSelect(color)}
                                style={{ backgroundColor: color.toLowerCase() }}
                            >
                                {color}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="productdisplay-quantity">
                    <h1>Quantity:</h1>
                    <div className="quantity-control">
                        <input type="number" className="quantity-dropdown" value={quantity} onChange={handleQuantityChange} min="1" />
                    </div>
                </div>
                <div className="pincode-validation">
                    <h1>Enter Pincode:</h1>
                    <input type="text" value={pincode} onChange={handlePincodeChange} />
                    <button onClick={validatePincode}>Check Delivery Date</button>
                    {estimatedDelivery && <p>{estimatedDelivery}</p>}
                </div>
                <button className="addToCartButton" onClick={handleAddToCart}>
                    ADD TO CART
                </button>
                <button
                    className={wishlistItems.includes(product.id) ? "removeFromWishlistButton" : "addToWishlistButton"}
                    onClick={() => {
                        if (wishlistItems.includes(product.id)) {
                            removeFromWishlist(product.id);
                        } else {
                            addToWishlist(product.id);
                        }
                    }}
                >
                    {wishlistItems.includes(product.id) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                </button>
                <p className="productdisplay-right-category">
                    <span>Category:</span> {Array.isArray(product.category) ? product.category.join(', ') : product.category}
                </p>
                <p className="productdisplay-right-tags">
                    <span>Tags: </span> {Array.isArray(product.tags) ? product.tags.join(', ') : product.tags}
                </p>

                {/* Conditionally render the CustomerReview component */}
                {canReview && (
                    <CustomerReview
                        productId={product.id}
                        onSubmit={handleReviewSubmit}
                    />
                )}
                {reviewSubmitted && <p className="review-submitted-message">Thank you for your review!</p>}
            </div>
        </div>
    );
};

export default ProductDisplay;
