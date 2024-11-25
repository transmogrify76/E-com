// import React, { useState, useEffect } from 'react';
// import './ProductDisplay.css';
// import star_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
// import star_dull_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
// import CustomerReview from '../CustomerReview/CustomerReview';
// import { useNavigate } from 'react-router-dom';
// import body_measure_image from '../../Assests/Ecommerce_Frontend_Assets/Assets/body_measure_image.png';
// import DescriptionBox from '../DescriptionBox/DescriptionBox';  // This is where the DescriptionBox is imported


// const ProductDisplay = ({ product, image }) => {
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState('');
//     const [selectedColor, setSelectedColor] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [estimatedDelivery, setEstimatedDelivery] = useState('');
//     const [reviewSubmitted, setReviewSubmitted] = useState(false);
//     const [canReview, setCanReview] = useState(false);
//     const [showSizeChart, setShowSizeChart] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [cartError, setCartError] = useState('');
//     const [cartSuccessMessage, setCartSuccessMessage] = useState('');
//     const [stockMessage, setStockMessage] = useState('');
//     const [description, setDescription] = useState(''); // Product description state
//     const [isInWishlist, setIsInWishlist] = useState(false); // Local wishlist state

//     const navigate = useNavigate();
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//         navigate('/login');
//     }

//     useEffect(() => {
//         const checkIfInWishlist = () => {
//             const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//             const foundInWishlist = wishlist.some(item => item.id === product.id);
//             setIsInWishlist(foundInWishlist);
//         };

//         const setProductDescription = () => {
//             if (product.description) {
//                 setDescription(product.description); // Set description from product
//             }
//         };

//         checkIfInWishlist();
//         setProductDescription(); // Set product description on component mount
//     }, [product.id, product.description]); // Re-run when product id or description changes

//     const handleAddToCart = async () => {
//         setCartError('');
//         setCartSuccessMessage('');
//         setStockMessage('');

//         if (!selectedSize || !selectedColor) {
//             alert('Please select both a size and a color before adding to cart.');
//             return;
//         }

//         setLoading(true);

//         const payload = {
//             userId,
//             productId: product.id,
//             quantity: quantity.toString(),
//             size: selectedSize,
//             color: selectedColor,
//         };

//         try {
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/add/product`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Failed to add to cart');
//             }

//             if (data.success) {
//                 setCartSuccessMessage('Product added to cart successfully!');
//                 setStockMessage(data.stockMessage || '');
//                 navigate('/cart');
//             } else {
//                 throw new Error(data.message || 'Failed to add to cart');
//             }
//         } catch (error) {
//             setCartError(error.message || 'There was an error adding the product to your cart.');
//         } finally {
//             setLoading(false);
//         }
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

//     const validatePincode = async () => {
//         const response = await fetch(`${process.env.REACT_APP_BASE_URL}/pincode/validate`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ pincode }),
//         });

//         const data = await response.json();
//         if (data.success) {
//             setEstimatedDelivery(data.estimatedDelivery);
//         } else {
//             setEstimatedDelivery('Invalid pincode');
//         }
//     };

//     const handleReviewSubmit = () => {
//         setReviewSubmitted(true);
//     };

//     const toggleSizeChart = () => {
//         setShowSizeChart(!showSizeChart);
//     };

//     const handlePlaceOrder = () => {
//         navigate('/checkout');
//     };

//     // Handle Add to Wishlist / Remove from Wishlist
//     const handleWishlistToggle = async () => {
//         if (isInWishlist) {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlist/${userId}/${product.id}`, {
//                     method: 'DELETE',
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//                     wishlist = wishlist.filter(item => item.id !== product.id);
//                     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//                     setIsInWishlist(false); // Update button state to "Add to Wishlist"
//                 } else {
//                     console.error('Failed to remove from wishlist:', data.message);
//                     alert('Failed to remove from wishlist');
//                 }
//             } catch (error) {
//                 console.error('Error with wishlist API:', error);
//                 alert('An error occurred with the wishlist API');
//             }
//         } else {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlist`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         userId,
//                         productId: product.id,
//                     }),
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//                     wishlist.push({ id: product.id });
//                     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//                     setIsInWishlist(true);
//                 } else {
//                     console.error('Failed to add to wishlist:', data.message);
//                     alert('Failed to add to wishlist');
//                 }
//             } catch (error) {
//                 console.error('Error with wishlist API:', error);
//                 alert('An error occurred with the wishlist API');
//             }
//         }
//     };

//     const colors = Array.isArray(product.productDetails)
//         ? product.productDetails.filter(detail => detail.key === 'color').map(detail => detail.value)
//         : [];
//     const sizes = Array.isArray(product.productDetails)
//         ? product.productDetails.filter(detail => detail.key === 'size').map(detail => detail.value)
//         : [];

//     return (
//         <div className="productdisplay">
//             <div className="productdisplay-left">
//                 <div className="productdisplay-img">
//                     <img className="productdisplay-main-img" src={image || product.images[0]?.url} alt={product.name} />
//                 </div>
//             </div>

//             <div className="productdisplay-right">
//                 <h1>{product.name}</h1>
//                 <div className="productdisplay-right-stars">
//                     {[...Array(5)].map((_, i) => (
//                         <img key={i} src={i < product.rating ? star_icon : star_dull_icon} alt="Star Icon" />
//                     ))}
//                     <p>(122)</p>
//                 </div>
//                 <div className="productdisplay-right-prices">
//                     <div className="productdisplay-right-price-new">₹ {product.price}</div>
//                 </div>
//                 <div className="productdisplay-right-size">
//                     <h1>Select size</h1>
//                     <div className="productdisplay-right-sizes">
//                         {sizes.length > 0 ? (
//                             sizes.map((size) => (
//                                 <div
//                                     key={size}
//                                     className={`size-option ${selectedSize === size ? 'selected' : ''}`}
//                                     onClick={() => handleSizeSelect(size)}
//                                 >
//                                     {size}
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="error-message">No sizes available for this product.</p>
//                         )}
//                     </div>
//                 </div>

//                 <div className="productdisplay-right-color">
//                     <h1>Select color</h1>
//                     <div className="productdisplay-right-colors">
//                         {colors.length > 0 ? (
//                             colors.map((color) => (
//                                 <div
//                                     key={color}
//                                     className={`color-option ${selectedColor === color ? 'selected' : ''}`}
//                                     onClick={() => handleColorSelect(color)}
//                                     style={{
//                                         backgroundColor: color.toLowerCase(),
//                                     }}
//                                 />
//                             ))
//                         ) : (
//                             <p className="error-message">No colors available for this product.</p>
//                         )}
//                     </div>
//                 </div>

//                 <div className="productdisplay-right-quantity">
//                     <h1>Quantity</h1>
//                     <input
//                         type="number"
//                         value={quantity}
//                         onChange={handleQuantityChange}
//                         min="1"
//                     />
//                 </div>

//                 {/* Render DescriptionBox with the updated product description */}
//                 {description && <DescriptionBox productId={product.id} productDescription={description} />}

//                 <button className="productdisplay-right-btn" onClick={handleAddToCart} disabled={loading}>
//                     {loading ? 'Adding to Cart...' : 'Add to Cart'}
//                 </button>

//                 {cartError && <div className="error-message">{cartError}</div>}
//                 {cartSuccessMessage && <div className="success-message">{cartSuccessMessage}</div>}

//                 <button className="wishlist-button" onClick={handleWishlistToggle}>
//                     {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
//                 </button>

//                 <div className="productdisplay-pincode">
//                     <h1>Check Delivery Availability</h1>
//                     <input
//                         type="text"
//                         value={pincode}
//                         onChange={handlePincodeChange}
//                         placeholder="Enter Pincode"
//                     />
//                     <button onClick={validatePincode}>Check</button>
//                     {estimatedDelivery && <p>Estimated Delivery: {estimatedDelivery}</p>}
//                 </div>

//                 <div className="size-chart-btn">
//                     <button onClick={toggleSizeChart}>View Size Chart</button>
//                 </div>

//                 {showSizeChart && (
//                     <div className="size-chart-modal">
//                         <div className="size-chart-content">
//                             <h2>Size Chart</h2>
//                             <table className="size-chart-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Product Label</th>
//                                         <th>S</th>
//                                         <th>M</th>
//                                         <th>L</th>
//                                         <th>XL</th>
//                                         <th>XXL</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td>Chest</td>
//                                         <td>87 - 92 cm</td>
//                                         <td>93 - 100 cm</td>
//                                         <td>101 - 108 cm</td>
//                                         <td>109 - 118 cm</td>
//                                         <td>119 - 130 cm</td>
//                                     </tr>
//                                     <tr>
//                                         <td>Waist</td>
//                                         <td>75 - 80 cm</td>
//                                         <td>81 - 88 cm</td>
//                                         <td>89 - 96 cm</td>
//                                         <td>97 - 106 cm</td>
//                                         <td>107 - 119 cm</td>
//                                     </tr>
//                                     <tr>
//                                         <td>Hip</td>
//                                         <td>86 - 91 cm</td>
//                                         <td>92 - 99 cm</td>
//                                         <td>100 - 107 cm</td>
//                                         <td>108 - 116 cm</td>
//                                         <td>117 - 125 cm</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <h2>Size Converter</h2>
//                             <table className="size-converter-table">
//                                 <thead>
//                                     <tr>
//                                         <th>EU</th>
//                                         <th>US</th>
//                                         <th>UK</th>
//                                         <th>FR</th>
//                                         <th>IT</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr><td>XS</td><td>XS</td><td>XS</td><td>XS</td><td>XS</td></tr>
//                                     <tr><td>S</td><td>S</td><td>S</td><td>S</td><td>S</td></tr>
//                                     <tr><td>M</td><td>M</td><td>M</td><td>M</td><td>M</td></tr>
//                                     <tr><td>L</td><td>L</td><td>L</td><td>L</td><td>L</td></tr>
//                                     <tr><td>XL</td><td>XL</td><td>XL</td><td>XL</td><td>XL</td></tr>
//                                 </tbody>
//                             </table>
//                             <div className="how-to-measure">
//                                 <h2>How to Measure</h2>
//                                 <p><strong>Follow these instructions to measure your size accurately:</strong></p>
//                                 <ul>
//                                     <li>1. Chest: around the widest part.</li>
//                                     <li>2. Waist: around the narrowest part.</li>
//                                     <li>3. Hip: around the widest part, keeping the feet close together.</li>
//                                     <li>4. Inseam: from the crotch to the floor.</li>
//                                     <li>5. Height: from the top of the head to the floor, keeping a straight posture.</li>
//                                 </ul>
//                                 <img src={body_measure_image} alt="Body Measurement Instructions" />
//                             </div>

//                             <button className="close-size-chart" onClick={toggleSizeChart}>Close</button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductDisplay;



import React, { useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
import { useNavigate } from 'react-router-dom';
import body_measure_image from '../../Assests/Ecommerce_Frontend_Assets/Assets/body_measure_image.png';
import { FaCartPlus, FaHeart, FaShippingFast, FaChartLine, FaHeartBroken } from 'react-icons/fa';

const ProductDisplay = ({ product, image }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [productVariants, setProductVariants] = useState([]);
    const [cartError, setCartError] = useState('');
    const [cartSuccessMessage, setCartSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [pincode, setPincode] = useState('');
    const [estimatedDelivery, setEstimatedDelivery] = useState('');
    const [availableSizesForColor, setAvailableSizesForColor] = useState([]);
    const [showReviews, setShowReviews] = useState(false); // State for toggling between Description and Reviews
    const [reviews, setReviews] = useState([]);
    const [description, setDescription] = useState(product.description); // Assuming 'product.description' is available
    const [error, setError] = useState(''); // Add error state here for error handling
    const [stockMessage, setStockMessage] = useState('');




    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    if (!userId) {
        navigate('/login');
    }

    useEffect(() => {
        if (product.description) {
            setDescription(product.description);
        }
    }, [product.description]);


    useEffect(() => {
        const fetchProductVariants = async () => {
            try {
                const response = await fetch('http://localhost:5000/products/varieties', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: product.id }),
                });

                const data = await response.json();
                if (data.products) {
                    const variants = data.products.map((prod) => {
                        const colors = prod.productDetails.filter((detail) => detail.key === 'color');
                        const sizes = prod.productDetails.filter((detail) => detail.key === 'size');
                        return {
                            id: prod.id,
                            colors: colors.map((color) => color.value),
                            sizes: sizes.map((size) => size.value),
                        };
                    });

                    setProductVariants(variants);
                }
            } catch (error) {
                console.error('Error fetching product variants:', error);
            }
        };

        fetchProductVariants();
    }, [product.id]);
    // Check if the product is in the wishlist
    useEffect(() => {
        const checkIfInWishlist = () => {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const foundInWishlist = wishlist.some(item => item.id === product.id);
            setIsInWishlist(foundInWishlist);
        };
        checkIfInWishlist();
    }, [product.id]);


    // Fetch product reviews from the backend
    const fetchReviews = async () => {
        setLoading(true);
        setError(null); // Reset error state on each fetch
        try {
            const reviewsResponse = await fetch(`http://localhost:5000/reviews/product/${product.id}`);
            if (!reviewsResponse.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const reviewsData = await reviewsResponse.json();
            setReviews(reviewsData || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Failed to load reviews. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (product.id) {
            fetchReviews();
        }
    }, [product.id]);



    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);

        const sizesForColor = productVariants
            .filter((variant) => variant.colors.includes(color))
            .flatMap((variant) => variant.sizes);

        setAvailableSizesForColor([...new Set(sizesForColor)]);
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1) setQuantity(value);
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

        const selectedVariant = productVariants.find((variant) => {
            return (
                variant.colors.includes(selectedColor) &&
                variant.sizes.includes(selectedSize)
            );
        });

        if (!selectedVariant) {
            alert('Product variant not available.');
            setLoading(false);
            return;
        }

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
            if (!response.ok) throw new Error(data.message || 'Failed to add to cart');

            if (data.success) {
                setCartSuccessMessage(`${product.name} added to cart successfully!`);
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

    const handleBuyNow = () => {
        if (!selectedSize || !selectedColor) {
            alert('Please select both size and color before proceeding.');
            return;
        }

        const selectedVariant = productVariants.find((variant) => {
            return (
                variant.colors.includes(selectedColor) &&
                variant.sizes.includes(selectedSize)
            );
        });

        if (!selectedVariant) {
            alert('Product variant not available.');
            return;
        }

        const selectedProduct = {
            product,
            selectedSize,
            selectedColor,
            quantity,
            total: product.price * quantity,
        };

        navigate('/checkout', {
            state: { cartItems: [selectedProduct] },
        });
    };

    const toggleSizeChart = () => setShowSizeChart(!showSizeChart);

    const validatePincode = async () => {
        const pinCodeRegex = /^[0-9]{6}$/;
        if (!pincode.match(pinCodeRegex)) {
            alert('Please enter a valid 6-digit pincode.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP.BASE_URL}/check-pincode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pincode }),
            });

            const data = await response.json();
            if (response.ok && data.available) {
                setEstimatedDelivery(`Delivery available: ${data.estimatedDeliveryDays} days`);
            } else {
                setEstimatedDelivery('Delivery is not available in this area.');
            }
        } catch (error) {
            console.error('Error checking pincode availability:', error);
            setEstimatedDelivery('Unable to check delivery availability at the moment.');
        }
    };

    const handleWishlistToggle = async () => {
        if (isInWishlist) {
            try {
                const response = await fetch(`http://localhost:5000/wishlist/${userId}/${product.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                    wishlist = wishlist.filter(item => item.id !== product.id);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    setIsInWishlist(false);
                    alert('Removed from wishlist');
                } else {
                    alert('Failed to remove from wishlist');
                }
            } catch (error) {
                console.error('Error with wishlist API:', error);
                alert('An error occurred while removing from wishlist');
            }
        } else {
            try {
                const response = await fetch('http://localhost:5000/wishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                        productId: product.id,
                    }),
                });

                if (response.ok) {
                    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                    wishlist.push({ id: product.id });
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    setIsInWishlist(true);
                    alert('Added to wishlist');
                } else {
                    alert('Failed to add to wishlist');
                }
            } catch (error) {
                console.error('Error with wishlist API:', error);
                alert('An error occurred while adding to wishlist');
            }
        }
    };

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsInWishlist(wishlist.some(item => item.id === product.id));
    }, [product.id]);

    const handleTabClick = (tab) => {
        if (tab === 'description') {
            setShowReviews(false);
        } else if (tab === 'reviews') {
            setShowReviews(true);
        }
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img
                        className="productdisplay-main-img"
                        src={image || product.images[0]?.url}
                        alt={product.name}
                    />
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    {[...Array(5)].map((_, i) => (
                        <img
                            key={i}
                            src={i < product.rating ? star_icon : star_dull_icon}
                            alt="star"
                            className="productdisplay-star-icon"
                        />
                    ))}
                </div>
                <p className="product-price">₹{product.price}</p>

                <div className="product-variants">
                    <div className="size-selector">
                        <label>Size:</label>
                        <select onChange={(e) => handleSizeSelect(e.target.value)} value={selectedSize}>
                            <option value="">Select Size</option>
                            {availableSizesForColor.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div className="color-selector">
                        <label>Color:</label>
                        <select onChange={(e) => handleColorSelect(e.target.value)} value={selectedColor}>
                            <option value="">Select Color</option>
                            {productVariants
                                .flatMap((variant) => variant.colors)
                                .map((color, index) => (
                                    <option key={index} value={color}>{color}</option>
                                ))}
                        </select>
                    </div>

                    <div className="quantity-selector">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                </div>

                <div className="product-actions">
                    <button onClick={handleAddToCart}>
                        <FaCartPlus /> Add to Cart
                    </button>
                    <button onClick={handleBuyNow}>
                        <FaShippingFast /> Buy Now
                    </button>
                    <button onClick={handleWishlistToggle}>
                        {isInWishlist ? <FaHeartBroken /> : <FaHeart />} Wishlist
                    </button>
                </div>

                <div className="product-pincode">
                    <input
                        type="text"
                        placeholder="Enter Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                    <button onClick={validatePincode}>Check Delivery</button>
                    <p>{estimatedDelivery}</p>
                </div>

                {/* for first description box  start*/}


                {/* Description and Reviews Tabs */}
                <div className="descriptionbox-navigator">
                    <div
                        className={`descriptionbox-nav-box ${!showReviews ? 'active' : ''}`}
                        onClick={() => handleTabClick('description')}
                    >
                        Description
                    </div>
                    <div
                        className={`descriptionbox-nav-box ${showReviews ? 'active' : ''}`}
                        onClick={() => handleTabClick('reviews')}
                    >
                        Reviews ({reviews.length})
                    </div>
                </div>

                {/*  Description or Reviews Content */}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {error && <div className="error-message">{error}</div>}

                        {!showReviews ? (
                            <div className="descriptionbox-description">
                                <p>{description || 'No description available.'}</p>
                            </div>
                        ) : (
                            <div className="descriptionbox-reviews">
                                {reviews.length > 0 ? (
                                    reviews.map((review, index) => (
                                        <div key={index} className="review">
                                            <h4>{review.userId ? `User ${review.userId}` : "Anonymous"}</h4>
                                            <p>{review.review}</p>
                                            <div className="review-rating">
                                                <p>Rated {review.ratings} / 5</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet. Be the first to review this product!</p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDisplay;

