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
    const [showSizeChart, setShowSizeChart] = useState(false); // Modal visibility state

    useEffect(() => {
        const fetchReviewEligibility = async () => {
            const userPurchaseStatus = await checkUserPurchaseStatus(product.id);
            setCanReview(userPurchaseStatus === 'delivered');
        };

        fetchReviewEligibility();
    }, [product.id]);

    const checkUserPurchaseStatus = async (productId) => {
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
    };

    const toggleSizeChart = () => {
        setShowSizeChart(!showSizeChart);
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

                {/* Size Chart Option */}
                <div className="size-chart-option">
                    <button className="size-chart-button" onClick={toggleSizeChart}>
                        Size Chart
                    </button>
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

            {/* Size Chart Modal */}
            {/* Size Chart and Size Converter Modal */}
            {showSizeChart && (
                <div className="size-chart-modal">
                    <div className="size-chart-content">
                        <h2>Size Chart</h2>
                        <table className="size-chart-table">
                            <thead>
                                <tr>
                                    <th>Product Label</th>
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                    <th>XL</th>
                                    <th>XXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Chest</td>
                                    <td>87 - 92 cm</td>
                                    <td>93 - 100 cm</td>
                                    <td>101 - 108 cm</td>
                                    <td>109 - 118 cm</td>
                                    <td>119 - 130 cm</td>
                                </tr>
                                <tr>
                                    <td>Waist</td>
                                    <td>75 - 80 cm</td>
                                    <td>81 - 88 cm</td>
                                    <td>89 - 96 cm</td>
                                    <td>97 - 106 cm</td>
                                    <td>107 - 119 cm</td>
                                </tr>
                                <tr>
                                    <td>Hip</td>
                                    <td>86 - 91 cm</td>
                                    <td>92 - 99 cm</td>
                                    <td>100 - 107 cm</td>
                                    <td>108 - 116 cm</td>
                                    <td>117 - 125 cm</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Size Converter */}
                        <h2>Size Converter</h2>
                        <table className="size-converter-table">
                            <thead>
                                <tr>
                                    <th>Region</th>
                                    <th>Small</th>
                                    <th>Medium</th>
                                    <th>Large</th>
                                    <th>XL</th>
                                    <th>XXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>US</td>
                                    <td>4</td>
                                    <td>6</td>
                                    <td>8</td>
                                    <td>10</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>UK</td>
                                    <td>8</td>
                                    <td>10</td>
                                    <td>12</td>
                                    <td>14</td>
                                    <td>16</td>
                                </tr>
                                <tr>
                                    <td>India</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="close-modal-button" onClick={toggleSizeChart}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ProductDisplay;

