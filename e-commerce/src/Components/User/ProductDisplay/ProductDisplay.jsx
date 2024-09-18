import React, { useState, useContext, useEffect } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import star_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
import CustomerReview from '../CustomerReview/CustomerReview';
import body_measure_image from '../../Assests/Ecommerce_Frontend_Assets/Assets/body_measure_image.png'; // Add your body measurement image here
<<<<<<< HEAD

=======
>>>>>>> 5a8d4c786c254c9c73dcf6ffd3b29c2692d0f1ae

const ProductDisplay = ({ product }) => {
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [pincode, setPincode] = useState('');
    const [estimatedDelivery, setEstimatedDelivery] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [canReview, setCanReview] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);

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
<<<<<<< HEAD
=======

>>>>>>> 5a8d4c786c254c9c73dcf6ffd3b29c2692d0f1ae
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

                {/* new promo code goes here */}
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

                {canReview && (
                    <CustomerReview
                        productId={product.id}
                        onSubmit={handleReviewSubmit}
                    />
                )}
                {reviewSubmitted && <p className="review-submitted-message">Thank you for your review!</p>}
            </div>

<<<<<<< HEAD
            {/* Size Chart Modal*/}
=======
            {/* Size Chart Modal */}
>>>>>>> 5a8d4c786c254c9c73dcf6ffd3b29c2692d0f1ae
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
                                    <th>EU</th>
                                    <th>US</th>
                                    <th>UK</th>
                                    <th>FR</th>
                                    <th>IT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>XS</td><td>XS</td><td>XS</td><td>XS</td><td>XS</td></tr>
                                <tr><td>S</td><td>S</td><td>S</td><td>S</td><td>S</td></tr>
                                <tr><td>M</td><td>M</td><td>M</td><td>M</td><td>M</td></tr>
                                <tr><td>L</td><td>L</td><td>L</td><td>L</td><td>L</td></tr>
                                <tr><td>XL</td><td>XL</td><td>XL</td><td>XL</td><td>XL</td></tr>
                            </tbody>
                        </table>

<<<<<<< HEAD
                        {/* How to Measure  */}
=======
                        {/* How to Measure */}
>>>>>>> 5a8d4c786c254c9c73dcf6ffd3b29c2692d0f1ae
                        <div className="how-to-measure">
                            <h2>How to Measure</h2>
                            <p><strong>Follow these instructions to measure your size accurately:</strong></p>
                            <ul>
                                <li>1. Chest: around the widest part.</li>
                                <li>2. Waist: around the narrowest part.</li>
                                <li>3. Hip: around the widest part, keeping the feet close together Hold the tape vertically to measure.</li>
                                <li>4. Inseam: from the crotch to the floor.</li>
                                <li>5. Height: from the top of the head to the floor, keeping a straight posture.</li>

                            </ul>
                            <img src={body_measure_image} alt="Body Measurement Instructions" />
                        </div>

<<<<<<< HEAD
                        <div className="how-to-measure">
                            <p style={{ color: 'red' }}><strong>NOT THE RIGHT SIZE OR COLOR?</strong></p>
                            <p><strong>No problem, we offer free size exchanges and we have a free return service.</strong></p>
                        </div>
=======
>>>>>>> 5a8d4c786c254c9c73dcf6ffd3b29c2692d0f1ae
                        <button className="close-size-chart" onClick={toggleSizeChart}>
                            Close
                        </button>
                    </div>
                </div>
<<<<<<< HEAD
            )}
=======
                )}
>>>>>>> 5a8d4c786c254c9c73dcf6ffd3b29c2692d0f1ae
        </div>
    );
};
export default ProductDisplay;

