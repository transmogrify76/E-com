import React, { useState, useEffect } from 'react';
import './CustomerReview.css';

const StarRating = ({ rating, onRatingChange }) => {
    const handleStarClick = (value) => {
        onRatingChange(value);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${rating >= star ? 'filled' : 'empty'}`}
                    onClick={() => handleStarClick(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

const CustomerReview = ({ productId, userId, onReviewSubmit }) => {
    const [rating, setRating] = useState(1); // Overall rating
    const [qualityRating, setQualityRating] = useState(1); // Product quality rating
    const [deliveryRating, setDeliveryRating] = useState(null); // Delivery rating
    const [dispatchRating, setDispatchRating] = useState(null); // Dispatch rating
    const [comment, setComment] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:5000/reviews/product/${productId}`);
                const data = await response.json();
                setReviews(data.reviews || []);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [productId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const review = {
            userId,
            productId,
            review: comment,
            ratings: rating,
            deliveryRatings: deliveryRating,
            dispatchRatings: dispatchRating,
        };

        try {
            const response = await fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review),
            });

            const data = await response.json();

            if (response.status === 201) {
                setFormSubmitted(true);
                setReviews([review, ...reviews]); // Add new review to the list
                onReviewSubmit(review); // Callback to parent
            } else {
                console.error('Error submitting review:', data.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="customer-review">
            <h2>Leave a Review</h2>

            {/* Review Form */}
            {!formSubmitted && (
                <div className="review-popup">
                    <div className="review-form">
                        <h3>Submit your review for Product {productId}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="rating-section">
                                <label>Overall Rating:</label>
                                <StarRating rating={rating} onRatingChange={setRating} />
                            </div>

                            <div className="rating-section">
                                <label>Product Quality Rating:</label>
                                <StarRating rating={qualityRating} onRatingChange={setQualityRating} />
                            </div>

                            <div className="rating-section">
                                <label>Delivery Rating:</label>
                                <StarRating rating={deliveryRating || 0} onRatingChange={setDeliveryRating} />
                            </div>

                            <div className="rating-section">
                                <label>Dispatch Rating:</label>
                                <StarRating rating={dispatchRating || 0} onRatingChange={setDispatchRating} />
                            </div>

                            <div className="comment-section">
                                <label>Comment:</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your comment here..."
                                />
                            </div>

                            <button type="submit">Submit Review</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Display Reviews */}
            <div className="reviews-list">
                <h3>Customer Reviews</h3>
                {reviews.length === 0 ? (
                    <p>No reviews yet for this product.</p>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index} className="review">
                            <div className="review-rating">
                                <StarRating rating={review.ratings} onRatingChange={() => {}} />
                            </div>
                            <p><strong>Comment:</strong> {review.review}</p>
                            <p><strong>Delivery Rating:</strong> {review.deliveryRatings}</p>
                            <p><strong>Dispatch Rating:</strong> {review.dispatchRatings}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomerReview;



