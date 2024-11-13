import React, { useState, useEffect } from 'react';
import './DescriptionBox.css';


const DescriptionBox = ({ productId }) => {
    const [showReviews, setShowReviews] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productDescription, setProductDescription] = useState('');
    const [reviews, setReviews] = useState([]);

    // Fetch product description and reviews from the API
    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch product description
            const descriptionResponse = await fetch(`http://localhost:5000/products/ab8d4df7-2423-49db-9774-d6619abad8a6/description`);
            const descriptionData = await descriptionResponse.json();
            setProductDescription(descriptionData.description);

            // Fetch product reviews
            const reviewsResponse = await fetch(`http://localhost:5000/reviews/product/${productId}`);
            const reviewsData = await reviewsResponse.json();
            setReviews(reviewsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    // Call fetchData when the component is mounted and when productId changes
    useEffect(() => {
        fetchData();
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
