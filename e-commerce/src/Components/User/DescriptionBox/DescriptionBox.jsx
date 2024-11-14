import React, { useState, useEffect } from 'react';
import './DescriptionBox.css';

const DescriptionBox = ({ productId, productDescription }) => {
    const [showReviews, setShowReviews] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

    // Fetch product reviews
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const reviewsResponse = await fetch(`http://localhost:5000/reviews/product/${productId}`);
            const reviewsData = await reviewsResponse.json();
            setReviews(reviewsData || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    // Call fetchReviews when the component is mounted or when productId changes 
    useEffect(() => {
        if (productId) {
            fetchReviews();
        }
    }, [productId]);

    const handleTabClick = (tab) => {
        setShowReviews(tab === 'reviews');
    };

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
                    Reviews ({reviews.length})
                </div>
            </div>

            {/* Display loading message while fetching data */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {/* Conditionally render description or reviews */}
                    {!showReviews ? (
                        <div className="descriptionbox-description">
                        <p>{productDescription || "No description available."}</p>
                    </div>
                    ) : (
                        <div className="descriptionbox-reviews">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} className="review">
                                        <h4>{review.userName}</h4>
                                        <p>{review.comment}</p>
                                        <div className="review-stars">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <span key={i} className="star">&#9733;</span>
                                            ))}
                                            {[...Array(5 - review.rating)].map((_, i) => (
                                                <span key={i} className="star-dull">&#9734;</span>
                                            ))}
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
    );
};

export default DescriptionBox;
