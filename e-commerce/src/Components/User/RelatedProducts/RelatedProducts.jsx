import React from 'react';
import './RelatedProducts.css';

const RelatedProducts = ({ products = [], title, onClick }) => {
  // If there are no products, render a message
  if (products.length === 0) {
    return <div>No related products available.</div>;
  }

  return (
    <div className="related-products">
      {/* Conditionally render the title based on its value */}
      {title !== 'New Collection' && <h2>{title}</h2>} {/* Don't render h2 if the title is "New Collection" */}

      <div className="related-products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => onClick(product)}>
            {/* Render Product Image */}
            {product.imageUrl ? (
              <img
                src={product.imageUrl} // Use the imageUrl from API response
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  // Fallback to a default image if the image fails to load
                  e.target.src = "/assets/images/e-com.png"; // Path to your local fallback image
                  e.target.alt = "Fallback Image"; // Set alt text for fallback image
                }}
              />
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}

            {/* Render Product Details */}
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>

            {/* Render Product Details List */}
            {Array.isArray(product.productDetails) && product.productDetails.length > 0 ? (
              <ul>
                {product.productDetails.map((detail, index) => (
                  <li key={index}>
                    {detail.key}: {detail.value}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No additional details available.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
