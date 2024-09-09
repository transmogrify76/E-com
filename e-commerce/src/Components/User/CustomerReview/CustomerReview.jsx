import React, { useState } from 'react';
import './CustomerReview.css'; // Ensure to create this CSS file to style your component

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

const CustomerReview = ({ productId, onSubmit }) => {
    const [rating, setRating] = useState(1);
    const [qualityRating, setQualityRating] = useState(1);
    const [deliveryRating, setDeliveryRating] = useState(1);
    const [dispatchRating, setDispatchRating] = useState(1);
    const [comment, setComment] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const review = {
            productId,
            overallRating: rating,
            qualityRating,
            deliveryRating,
            dispatchRating,
            comment,
        };

        // Replace with your API call
        await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
        });

        setFormSubmitted(true);
        onSubmit(review);
    };

    return (
        <div className="customer-review">
            <h2>Leave a Review</h2>
            {formSubmitted && <p className="success-message">Thank you for your review!</p>}
            <form onSubmit={handleSubmit}>
                <div className="rating-section">
                    <label>Overall Rating:</label>
                    <StarRating rating={rating} onRatingChange={setRating} />
                </div>

                <div className="rating-section">
                    <label>Product Quality:</label>
                    <StarRating rating={qualityRating} onRatingChange={setQualityRating} />
                </div>

                <div className="rating-section">
                    <label>Delivery:</label>
                    <StarRating rating={deliveryRating} onRatingChange={setDeliveryRating} />
                </div>

                <div className="rating-section">
                    <label>Dispatch:</label>
                    <StarRating rating={dispatchRating} onRatingChange={setDispatchRating} />
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
    );
};

export default CustomerReview;
