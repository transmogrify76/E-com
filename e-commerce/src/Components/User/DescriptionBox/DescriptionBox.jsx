import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = ({ description, reviews, activeSection, onSectionChange }) => {

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? 'star' : 'star-dull'}>
        &#9733;
      </span>
    ));
  };

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        {/* Description Tab */}
        <div 
          className={`descriptionbox-nav-box ${activeSection === 'description' ? 'active' : ''}`}
          onClick={() => onSectionChange('description')} // Toggle to Description
        >
          Description
        </div>

        {/* Reviews Tab */}
        <div 
          className={`descriptionbox-nav-box ${activeSection === 'reviews' ? 'active' : ''}`}
          onClick={() => onSectionChange('reviews')} // Toggle to Reviews
        >
          Reviews ({reviews?.length || 0}) {/* Fallback to 0 if reviews is undefined */}
        </div>
      </div>

      {/* Conditionally Render Description Section */}
      {activeSection === 'description' && (
        <div className="descriptionbox-description">
          <p>{description}</p>
        </div>
      )}

      {/* Conditionally Render Reviews Section */}
      {activeSection === 'reviews' && (
        <div className="descriptionbox-reviews">
          {reviews.length === 0 ? (
            <p>No reviews yet for this product.</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <h3>User ID: {review.userId}</h3>
                <p>{review.review}</p>
                <div className="review-stars">
                  {renderStars(review.ratings)} {/* Display rating stars */}
                </div>
                <div>
                  <strong>Delivery Rating:</strong> {review.deliveryRatings} stars
                </div>
                <div>
                  <strong>Dispatch Rating:</strong> {review.dispatchRatings} stars
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
