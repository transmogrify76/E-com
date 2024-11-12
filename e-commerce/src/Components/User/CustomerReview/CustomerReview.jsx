import React, { useState, useEffect } from 'react';
import './CustomerReview.css'; // Ensure to create this CSS file to style your component

// StarRating Component for handling the star ratings
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

const CustomerReview = ({ productId, userId }) => {
    const [reviews, setReviews] = useState([]);  // To store existing reviews
    const [rating, setRating] = useState(1);
    const [qualityRating, setQualityRating] = useState(1);
    const [deliveryRating, setDeliveryRating] = useState(1);
    const [dispatchRating, setDispatchRating] = useState(1);
    const [comment, setComment] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [orderReceived, setOrderReceived] = useState(false);  // Track if the order is received
    const [loading, setLoading] = useState(true);

    // Fetch reviews for the product
    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:5000/reviews/product/${productId}`);
            const data = await response.json();
            setReviews(data);  // Set reviews data
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    // Check if the order has been received
    const checkOrderReceived = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/orders/${userId}/${productId}`);
            const data = await response.json();
            setOrderReceived(data.status === 'received'); // Check if order is received
        } catch (error) {
            console.error('Error checking order status:', error);
        } finally {
            setLoading(false);
        }
    };

    // Use effect to call the necessary functions when the component mounts
    useEffect(() => {
        fetchReviews();  // Fetch reviews on component mount
        checkOrderReceived();  // Check if order is received on component mount
    }, [productId, userId]);

    // Handle submitting a review
    const handleSubmit = async (event) => {
        event.preventDefault();

        const review = {
            productId,
            userId,
            overallRating: rating,
            qualityRating,
            deliveryRating,
            dispatchRating,
            comment,
        };

        try {
            const response = await fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review),
            });
            if (response.ok) {
                setFormSubmitted(true);
                setComment('');  // Clear the comment field
                fetchReviews();  // Reload the reviews after submission
            } else {
                alert('Failed to submit the review. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="customer-review">
            <h2>Leave a Review</h2>

            {/* Display Success Message after Submission */}
            {formSubmitted && <p className="success-message">Thank you for your review!</p>}

            {/* Display the reviews section */}
            <h3>Product Reviews</h3>
            {reviews.length > 0 ? (
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <div className="rating">
                                <StarRating rating={review.overallRating} onRatingChange={() => {}} />
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews yet for this product.</p>
            )}

            {/* Check if Order is Received and Display Review Form */}
            {loading && <p>Loading order status...</p>}
            {!orderReceived && !loading && (
                <p>You cannot leave a review until you have received your order.</p>
            )}

            {orderReceived && !formSubmitted && (
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
            )}
        </div>
    );
};


export default CustomerReview;








//ok so, when im upload a review from backend through a specific product id it should be reflect below the matching product id Product, but i can not see anything


// i want to create a customer review section when a customer receive the order then only he or she can give the ratings and the Add review option only visible when a product delivery done but they can see the older review, below is the api specification and the frontend code plase make the code correct
// api:

// a) Get Reviews for a Product
// This endpoint retrieves all reviews for a specific product.

// Endpoint: GET:http://localhost:5000/reviews/product/prod-123
// Response: Returns a list of reviews associated with the product.

// b) Submit a Review
// This endpoint allows users to submit a new review for a product.

// Endpoint: POST: http://localhost:5000/reviews
// Request Body: The customer submits their rating and review text.

// Response: Confirmation that the review has been submitted successfully.

// c) Delete a Review (Optional)
// If a customer wants to delete their review, you would need an endpoint to handle that.

// Endpoint: DELETE: http://localhost:5000/reviews/user/1/product/prod-123
// Response: Confirmation that the review was deleted.


// d) Get Average Rating for a Product
// To display the average rating of a product based on the reviews, you would have an endpoint to fetch the average rating.

// Endpoint: GET: http://localhost:5000/reviews/products-above-rating?ratingThreshold=4&rangeStart=1&rangeEnd=10

// Response: Average rating calculated from all reviews.

// code:

// import React, { useState } from 'react';
// import './CustomerReview.css'; // Ensure to create this CSS file to style your component

// const StarRating = ({ rating, onRatingChange }) => {
//     const handleStarClick = (value) => {
//         onRatingChange(value);
//     };

//     return (
//         <div className="star-rating">
//             {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                     key={star}
//                     className={`star ${rating >= star ? 'filled' : 'empty'}`}
//                     onClick={() => handleStarClick(star)}
//                 >
//                     ★
//                 </span>
//             ))}
//         </div>
//     );
// };

// const CustomerReview = ({ productId, onSubmit }) => {
//     const [rating, setRating] = useState(1);
//     const [qualityRating, setQualityRating] = useState(1);
//     const [deliveryRating, setDeliveryRating] = useState(1);
//     const [dispatchRating, setDispatchRating] = useState(1);
//     const [comment, setComment] = useState('');
//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const review = {
//             productId,
//             overallRating: rating,
//             qualityRating,
//             deliveryRating,
//             dispatchRating,
//             comment,
//         };

//         // Replace with your API call
//         await fetch('/api/reviews', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(review),
//         });

//         setFormSubmitted(true);
//         onSubmit(review);
//     };
// //ok, so i want to know how a customer review section work for a ecomerace website with api
//     return (
//         <div className="customer-review">
//             <h2>Leave a Review</h2>
//             {formSubmitted && <p className="success-message">Thank you for your review!</p>}
//             <form onSubmit={handleSubmit}>
//                 <div className="rating-section">
//                     <label>Overall Rating:</label>
//                     <StarRating rating={rating} onRatingChange={setRating} />
//                 </div>

//                 <div className="rating-section">
//                     <label>Product Quality:</label>
//                     <StarRating rating={qualityRating} onRatingChange={setQualityRating} />
//                 </div>

//                 <div className="rating-section">
//                     <label>Delivery:</label>
//                     <StarRating rating={deliveryRating} onRatingChange={setDeliveryRating} />
//                 </div>

//                 <div className="rating-section">
//                     <label>Dispatch:</label>
//                     <StarRating rating={dispatchRating} onRatingChange={setDispatchRating} />
//                 </div>

//                 <div className="comment-section">
//                     <label>Comment:</label>
//                     <textarea
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         placeholder="Write your comment here..."
//                     />
//                 </div>

//                 <button type="submit">Submit Review</button>
//             </form>
//         </div>
//     );
// };

// export default CustomerReview;

