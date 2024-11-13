import React, { useState, useContext, useEffect } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import star_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
import CustomerReview from '../CustomerReview/CustomerReview';
import { useNavigate } from 'react-router-dom';
import body_measure_image from '../../Assests/Ecommerce_Frontend_Assets/Assets/body_measure_image.png';



const ProductDisplay = ({ product, image }) => {
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [pincode, setPincode] = useState('');
    const [estimatedDelivery, setEstimatedDelivery] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [canReview, setCanReview] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cartError, setCartError] = useState('');
    const [cartSuccessMessage, setCartSuccessMessage] = useState('');
    const [stockMessage, setStockMessage] = useState('');
    const [description, setDescription] = useState(''); // State for product description

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    if (!userId) {
        navigate('/login');
    }

    useEffect(() => {
        const fetchReviewEligibility = async () => {
            const userPurchaseStatus = await checkUserPurchaseStatus(product.id);
            setCanReview(userPurchaseStatus === 'delivered');
        };

        fetchReviewEligibility();
    }, [product.id]);

    const checkUserPurchaseStatus = async (productId) => {
        // Mock API request, replace with actual API call
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/purchase-status/${productId}`);
        const data = await response.json();
        return data.status;
    };

    const handleAddToCart = async () => {
        setCartError('');
        setCartSuccessMessage('');
        setStockMessage('');

        if (!selectedSize || !selectedColor) {
            alert('Please select both a size and a color before adding to cart.');
            return;
        }

        setLoading(true);

        const payload = {
            userId,
            productId: product.id,
            quantity: quantity.toString(),
            size: selectedSize,
            color: selectedColor,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/add/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add to cart');
            }

            if (data.success) {
                addToCart(product.id, quantity, selectedSize, selectedColor);
                setCartSuccessMessage('Product added to cart successfully!');
                setStockMessage(data.stockMessage || '');
                navigate('/cart');
            } else {
                throw new Error(data.message || 'Failed to add to cart');
            }
        } catch (error) {
            setCartError(error.message || 'There was an error adding the product to your cart.');
        } finally {
            setLoading(false);
        }
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

    const validatePincode = async () => {
        // Mock API for pincode validation
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/pincode/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pincode }),
        });

        const data = await response.json();
        if (data.success) {
            setEstimatedDelivery(data.estimatedDelivery);
        } else {
            setEstimatedDelivery('Invalid pincode');
        }
    };

    const handleReviewSubmit = () => {
        setReviewSubmitted(true);
    };

    const toggleSizeChart = () => {
        setShowSizeChart(!showSizeChart);
    };

    const handlePlaceOrder = () => {
        navigate('/checkout');
    };

    // Ensure safe access to sizes and colors
    const colors = Array.isArray(product.productDetails)
        ? product.productDetails.filter(detail => detail.key === 'color').map(detail => detail.value)
        : [];
    const sizes = Array.isArray(product.productDetails)
        ? product.productDetails.filter(detail => detail.key === 'size').map(detail => detail.value)
        : [];

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={image || product.images[0]?.url} alt={product.name} />
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
                    {/* <div className="productdisplay-right-price-old">₹ {product.price}</div> */}
                    <div className="productdisplay-right-price-new">₹ {product.price}</div>
                </div>
                
                <div className="productdisplay-right-size">
                    <h1>Select size</h1>
                    <div className="productdisplay-right-sizes">
                        {sizes.length > 0 ? (
                            sizes.map((size) => (
                                <div
                                    key={size}
                                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => handleSizeSelect(size)}
                                >
                                    {size}
                                </div>
                            ))
                        ) : (
                            <p className="error-message">No sizes available for this product.</p>
                        )}
                    </div>
                </div>

                <div className="productdisplay-right-color">
                    <h1>Select color</h1>
                    <div className="productdisplay-right-colors">
                        {colors.length > 0 ? (
                            colors.map((color) => (
                                <div
                                    key={color}
                                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                    onClick={() => handleColorSelect(color)}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                >
                                    {color}
                                </div>
                            ))
                        ) : (
                            <p className="error-message">No colors available for this product.</p>
                        )}
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
                    <button onClick={validatePincode}>Check Delivery</button>
                    {estimatedDelivery && <p>{estimatedDelivery}</p>}
                </div>

                <div className="productdisplay-right-buttons">
                    <button onClick={handleAddToCart} disabled={loading} className="btn btn-primary">
                        {loading ? 'Adding to Cart...' : 'Add to Cart'}
                    </button>
                    {cartSuccessMessage && <p className="success-message">{cartSuccessMessage}</p>}
                    {cartError && <p className="error-message">{cartError}</p>}
                    {stockMessage && <p className="stock-message">{stockMessage}</p>}

                    <button className="btn btn-secondary" onClick={handlePlaceOrder}>Place Order</button>
                </div>

                <button className="addToWishlistButton" onClick={() => {
                    if (wishlistItems.includes(product.id)) {
                        removeFromWishlist(product.id);
                    } else {
                        addToWishlist(product.id);
                    }
                }}>
                    {wishlistItems.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>

                {canReview && (
                    <CustomerReview
                        productId={product.id}
                        onSubmit={handleReviewSubmit}
                    />
                )}

                {reviewSubmitted && <p className="review-submitted-message">Thank you for your review!</p>}
                
                {/* Size chart modal */}
                <div className="size-chart">
                    <button onClick={toggleSizeChart}>View Size Chart</button>
                    {showSizeChart && (
                        <div className="size-chart-modal">
                            <div className="size-chart-content">
                                <h2>Size Chart</h2>
                                {/* Table for Size Chart */} 
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

                                <div className="how-to-measure">
                                    <h2>How to Measure</h2>
                                    <p><strong>Follow these instructions to measure your size accurately:</strong></p>
                                    <ul>
                                        <li>1. Chest: around the widest part.</li>
                                        <li>2. Waist: around the narrowest part.</li>
                                        <li>3. Hip: around the widest part, keeping the feet close together.</li>
                                        <li>4. Inseam: from the crotch to the floor.</li>
                                        <li>5. Height: from the top of the head to the floor, keeping a straight posture.</li>
                                    </ul>
                                    <img src={body_measure_image} alt="Body Measurement Instructions" />
                                </div>

                                <button className="close-size-chart" onClick={toggleSizeChart}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;


