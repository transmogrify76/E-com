//  import React from 'react';
//  import './ProductDisplay.css';
//  import star_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
//  import star_dull_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
//  import { ShopContext } from '../Context/ShopContext';
//  import { useContext } from 'react';

//  const ProductDisplay = (props) => {
//      const {product}=props;
     
// const { addToCart, addToWishlist, wishlistItems,removeFromWishlist } = useContext(ShopContext);
// const isInWishlist = wishlistItems.includes(product.id);
    
//      return (
//          <div className="productdisplay">
//              <div className="productdisplay-left">

//                  <div className="productdisplay-img">
//                      <img className="productdisplay-main-img" src={product.image} alt={product.name} />
//                  </div>
//              </div>
//              <div className="products">
//              <div className="productdisplay-right">
//                  <h1>{product.name}</h1>
//                  <div className="productdisplay-right-stars">
//                      <img src={star_icon} alt="Star Icon" />
//                     <img src={star_icon} alt="Star Icon" />
//                      <img src={star_icon} alt="Star Icon" />
//                      <img src={star_icon} alt="Star Icon" />
//                      <img src={star_dull_icon} alt="Star Dull Icon" />
//                      <p>(122)</p>
//                  </div>
//                 <div className="productdisplay-right-prices">
//                      <div className="productdisplay-right-price-old">₹ {product.old_price}</div>
//                      <div className="productdisplay-right-price-new">₹ {product.new_price}</div>
//                  </div>
//                  <div className="productdisplay-right-description" >
//                      Indulge in effortless elegance with our Floral Print Maxi Dress. Crafted from lightweight and breathable fabric, this dress is perfect for both casual outings and special occasions. The stunning floral print adds a touch of romance, while the flowing silhouette ensures comfort and style all day long.
//                  </div>
//                  <div className="productdisplay-right-size">
//                      <h1>Select sizes</h1>
//                      <div className="productdisplay-right-sizes">
//                          <div>Small</div>
//                         <div>Medium</div>
//                          <div>Large</div>
//                          <div>XL</div>
//                          <div>XXL</div>
//                      </div>
//                  </div>
                
//                  <br></br>
//                  <button className="addToCartButton" onClick={() => addToCart(product.id)}>ADD TO CART</button>
//                 <button className={isInWishlist ? "removeFromWishlistButton" : "addToWishlistButton"} onClick={() => {
//                       if (isInWishlist) {
//                                  removeFromWishlist(product.id);
//                             } else {
//                          addToWishlist(product.id);
//                          }
//                         }}>
//                 {isInWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
//                 </button>
//                 </div>
         
//                   <p className="productdisplay-right-category">
//                 <br />
//                 <span>Category:</span> {Array.isArray(product.category) ? product.category.join(', ') : product.category}
//                 </p>
// <p className="productdisplay-right-category">
// <span>Tags: </span> {Array.isArray(product.tags) ? product.tags.join(', ') : product.tags}
// </p>
// </div>
// </div>
// );
//  };

// export default ProductDisplay;

import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/star_icon.png';
import star_dull_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/star_dull_icon.png';
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = ({ product }) => {
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useContext(ShopContext);
    const isInWishlist = wishlistItems.includes(product.id);

    // State for quantity
    const [quantity, setQuantity] = useState(1);

    // Function to handle increment of quantity
    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Function to handle decrement of quantity
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    // Function to handle change in dropdown quantity
    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="products">
                <div className="productdisplay-right">
                    <h1>{product.name}</h1>
                    <div className="productdisplay-right-stars">
                        <img src={star_icon} alt="Star Icon" />
                        <img src={star_icon} alt="Star Icon" />
                        <img src={star_icon} alt="Star Icon" />
                        <img src={star_icon} alt="Star Icon" />
                        <img src={star_dull_icon} alt="Star Dull Icon" />
                        <p>(122)</p>
                    </div>
                    <div className="productdisplay-right-prices">
                        <div className="productdisplay-right-price-old">₹ {product.old_price}</div>
                        <div className="productdisplay-right-price-new">₹ {product.new_price}</div>
                    </div>
                    <div className="productdisplay-right-description">
                        Indulge in effortless elegance with our Floral Print Maxi Dress. Crafted from lightweight and breathable fabric, this dress is perfect for both casual outings and special occasions. The stunning floral print adds a touch of romance, while the flowing silhouette ensures comfort and style all day long.
                    </div>
                    <div className="productdisplay-right-size">
                        <h1>Select sizes</h1>
                        <div className="productdisplay-right-sizes">
                            <div>Small</div>
                            <div>Medium</div>
                            <div>Large</div>
                            <div>XL</div>
                            <div>XXL</div>
                        </div>
                    </div>
                    <div className="productdisplay-quantity">
                        <h1>Quantity:</h1>
                        <div className="quantity-control" >
                            {/* <button className="quantity-button small" onClick={decrementQuantity}>-</button> */}
                            <input type="number" className="quantity-dropdown" value={quantity} onChange={handleQuantityChange} min="1" />
                            {/* <button className="quantity-button small" onClick={incrementQuantity}>+</button> */}
                        </div>
                    </div>
                    <button className="addToCartButton" onClick={() => addToCart(product.id, quantity)}>ADD TO CART</button>
                    <button className={isInWishlist ? "removeFromWishlistButton" : "addToWishlistButton"} onClick={() => {
                        if (isInWishlist) {
                            removeFromWishlist(product.id);
                        } else {
                            addToWishlist(product.id);
                        }
                    }}>
                        {isInWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                    </button>
                </div>

                <p className="productdisplay-right-category">
                    <br />
                    <span>Category:</span> {Array.isArray(product.category) ? product.category.join(', ') : product.category}
                </p>
                <p className="productdisplay-right-category">
                    <span>Tags: </span> {Array.isArray(product.tags) ? product.tags.join(', ') : product.tags}
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;

