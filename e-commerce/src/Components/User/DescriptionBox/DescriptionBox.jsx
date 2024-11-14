import React, { useState, useEffect } from 'react';
import './DescriptionBox.css';

const DescriptionBox = ({ productId }) => {
    const [showReviews, setShowReviews] = useState(false); // Toggle between description and reviews
    const [loading, setLoading] = useState(false); // Track loading state
    const [productDescription, setProductDescription] = useState(''); // Store product description
    const [reviews, setReviews] = useState([]); // Store reviews
    const [error, setError] = useState(null); // Store error messages

    // Fetch product description
    const fetchProductDescription = async () => {
        setLoading(true);
        setError(null);
        try {
            const descriptionResponse = await fetch(`http://localhost:5000/products/${productId}`);
            if (!descriptionResponse.ok) {
                throw new Error('Failed to fetch product description');
            }
            const descriptionData = await descriptionResponse.json();
            setProductDescription(descriptionData.description || 'No description available');
        } catch (error) {
            console.error('Error fetching description:', error);
            setError('Failed to load product description. Please try again later.');
        }
    };

    // Fetch product reviews
    const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        try {
            const reviewsResponse = await fetch(`http://localhost:5000/reviews/product/${productId}`);
            if (!reviewsResponse.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const reviewsData = await reviewsResponse.json();
            setReviews(reviewsData || []); // Set reviews data if available
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Failed to load reviews. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Effect hook to fetch both description and reviews when the productId changes
    useEffect(() => {
        if (productId) {
            fetchProductDescription(); // Fetch description when component loads
            fetchReviews(); // Fetch reviews for this product
        }
    }, [productId]);

    // Tab click handler to toggle between description and reviews
    const handleTabClick = (tab) => {
        setShowReviews(tab === 'reviews');
    };

    return (
        <div className="descriptionbox">
            {/* Tab navigation */}
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

            {/* Content (Description or Reviews) */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {error && <div className="error-message">{error}</div>}

                    {/* Show description if 'showReviews' is false */}
                    {!showReviews ? (
                        <div className="descriptionbox-description">
                            <p>{productDescription}</p>
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
    );
};

export default DescriptionBox;
