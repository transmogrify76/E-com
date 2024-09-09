import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
    const [showReviews, setShowReviews] = useState(false);

    const handleTabClick = (tab) => {
        setShowReviews(tab === 'reviews');
    };

    const dummyReviews = [
        { name: 'Diksha Das', review: 'Great product! Highly recommend it.', rating: 5 },
        { name: 'Aniket Bagania', review: 'Good quality but a bit expensive.', rating: 4 },
        { name: 'Neha Hossain', review: 'Not satisfied with the product.', rating: 2 },
        // Add more dummy reviews as needed
    ];

    return (
        <div className='descriptionbox'>
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
                    Reviews (3)
                </div>
            </div>
            {!showReviews ? (
                <div className="descriptionbox-description">
                    <p>An e-commerce website is an online platform that facilitates buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenient accessibility, and the global reach they offer.</p>
                    <p>E-commerce websites typically display products or services with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </div>
            ) : (
                <div className="descriptionbox-reviews">
                    {dummyReviews.map((review, index) => (
                        <div key={index} className="review">
                            <h3>{review.name}</h3>
                            <p>{review.review}</p>
                            <div className="review-stars">
                                {[...Array(review.rating)].map((_, i) => (
                                    <span key={i} className="star">&#9733;</span>
                                ))}
                                {[...Array(5 - review.rating)].map((_, i) => (
                                    <span key={i} className="star-dull">&#9734;</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DescriptionBox;


