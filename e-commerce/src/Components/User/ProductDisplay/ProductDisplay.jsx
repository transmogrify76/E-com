import React, { useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
import { useNavigate } from 'react-router-dom';
import body_measure_image from '../../Assests/Ecommerce_Frontend_Assets/Assets/body_measure_image.png';
import { FaCartPlus, FaHeart,  FaChartLine,FaHeartBroken } from 'react-icons/fa';
import CustomerReview from '../CustomerReview/CustomerReview';  // Import the CustomerReview component


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
    const [showReviewForm, setShowReviewForm] = useState(false); 

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, [userId, navigate]);

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

    const handleSizeSelect = (size) => setSelectedSize(size);
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
        if (!selectedSize || !selectedColor) {
            alert('Please select both size and color before adding to cart.');
            return;
        }
        setCartSuccessMessage('');
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
            productId: selectedVariant.id,
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
                setCartSuccessMessage(`"${product.name}" added to cart successfully!`);
                setTimeout(() => setCartSuccessMessage(''), 3000);
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

// Toggle the review form visibility
    const toggleReviewForm = () => {
        setShowReviewForm(!showReviewForm);
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
                alert('An error occurred while adding to wishlist');
            }
        }
    };

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsInWishlist(wishlist.some(item => item.id === product.id));
    }, [product.id]);

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
                        />
                    ))}
                    <span>({product.reviewsCount} reviews)</span>
                </div>
                <p className="productdisplay-price">₹{product.price}</p>

                <div className="productdisplay-variations">
                    <div className="productdisplay-colors">
                        <h3>Select Color:</h3>
                        {productVariants
                            .flatMap((variant) => variant.colors)
                            .filter((value, index, self) => self.indexOf(value) === index)
                            .map((color) => (
                                <button
                                    key={color}
                                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                    onClick={() => handleColorSelect(color)}
                                >
                                    {color}
                                </button>
                            ))}
                    </div>

                    {selectedColor && (
                        <div className="productdisplay-sizes">
                            <h3>Select Size:</h3>
                            {availableSizesForColor.length > 0 ? (
                                availableSizesForColor.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => handleSizeSelect(size)}
                                    >
                                        {size}
                                    </button>
                                ))
                            ) : (
                                <p>No sizes available for this color.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="productdisplay-quantity">
                    <h3>Quantity:</h3>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                    />
                </div>

                <button className="productdisplay-addtocart" onClick={handleAddToCart}>
                <FaCartPlus />  Add to Cart
                </button>

                {cartError && <div className="cart-error">{cartError}</div>}
                {cartSuccessMessage && <div className="cart-success">{cartSuccessMessage}</div>}
                
                {/* <button onClick={handleBuyNow} className="buy-now-button">
                    Buy Now
                </button> */}
<div className="productdisplay-wishlist">
    <button onClick={handleWishlistToggle}>
        {isInWishlist ? (
            <>
                <FaHeartBroken /> Remove from Wishlist
            </>
        ) : (
            <>
                <FaHeart /> Add to Wishlist
            </>
        )}
    </button>
</div>
                <div className="productdisplay-pincode">
                    <input
                        type="text"
                        placeholder="Enter Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                    <button onClick={validatePincode}>Check Delivery</button>
                    {estimatedDelivery && <p>{estimatedDelivery}</p>}
                </div>

                {/* <div className="productdisplay-wishlist">
                    <button onClick={handleWishlistToggle}>
                    <FaChartLine />  {isInWishlist  ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                </div> */}
                

                <button onClick={toggleSizeChart} className="size-chart-toggle">
                <FaChartLine />{showSizeChart ? 'Hide Size Chart' : 'View Size Chart'}
                </button>
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
            
                 <button onClick={toggleReviewForm}>
                     Leave a Review
                </button>
            
                {showReviewForm && (
                    <CustomerReview
                        productId={product.id}
                        userId={userId}
                        onClose={toggleReviewForm}
                     />
                )}
            </div>
            </div>
   
    );
};

export default ProductDisplay;

