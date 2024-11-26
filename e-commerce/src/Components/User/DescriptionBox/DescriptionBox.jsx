import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = ({ description }) => {
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
                    <p>{description}</p> {/* Dynamically display the description here */}
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
