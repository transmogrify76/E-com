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
            const descriptionResponse = await fetch(`http://localhost:5000/products/${productId}/description`);
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

// i want a review system if a customer wants to click in a dress, the previeslly buyer review should appear in the review and description section, that if i want i can update or post a review from backend through product id, now here is 2 code one for Customer revie and one for Description box, so, when a customer add a review with description it should apper on the correct place through API'S so below is the code for Description box and Customer Review change the code accordingly and place the both codes api in correct place 







// ok so below is the descriptionbox code that contain description and a dummy reviewer name so i want the descriptiona nd reviewer should be fetch throug api and real not dummy cange the code and use the cirrect api that need 
//api:http://localhost:5000/reviews/user/1/product/3af27c12-c132-43f6-b957-a378645e7e5d
//api:http://localhost:5000/reviews
// code:
// import React, { useState } from 'react';
// import './DescriptionBox.css';

// const DescriptionBox = () => {
//     const [showReviews, setShowReviews] = useState(false);

//     const handleTabClick = (tab) => {
//         setShowReviews(tab === 'reviews');
//     };

//     const dummyReviews = [
//         { name: 'Diksha Das', review: 'Great product! Highly recommend it.', rating: 5 },
//         { name: 'Aniket Bagania', review: 'Good quality but a bit expensive.', rating: 4 },
//         { name: 'Neha Hossain', review: 'Not satisfied with the product.', rating: 2 },
//         // Add more dummy reviews as needed
//     ];

//     return (
//         <div className='descriptionbox'>
//             <div className="descriptionbox-navigator">
//                 <div 
//                     className={`descriptionbox-nav-box ${!showReviews ? 'active' : ''}`} 
//                     onClick={() => handleTabClick('description')}
//                 >
//                     Description
//                 </div>
//                 <div 
//                     className={`descriptionbox-nav-box ${showReviews ? 'active' : ''}`} 
//                     onClick={() => handleTabClick('reviews')}
//                 >
//                     Reviews (3)
//                 </div>
//             </div>
//             {!showReviews ? (
//                 <div className="descriptionbox-description">
//                     <p>An e-commerce website is an online platform that facilitates buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenient accessibility, and the global reach they offer.</p>
//                     <p>E-commerce websites typically display products or services with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
//                 </div>
//             ) : (
//                 <div className="descriptionbox-reviews">
//                     {dummyReviews.map((review, index) => (
//                         <div key={index} className="review">
//                             <h3>{review.name}</h3>
//                             <p>{review.review}</p>
//                             <div className="review-stars">
//                                 {[...Array(review.rating)].map((_, i) => (
//                                     <span key={i} className="star">&#9733;</span>
//                                 ))}
//                                 {[...Array(5 - review.rating)].map((_, i) => (
//                                     <span key={i} className="star-dull">&#9734;</span>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DescriptionBox;