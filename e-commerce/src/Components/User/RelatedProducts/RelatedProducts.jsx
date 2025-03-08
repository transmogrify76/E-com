
import React from 'react';

const RelatedProducts = ({ products }) => {
  return (
    <div>
      <h3>Related Products</h3>
      <div className="related-products">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="related-product">
              {/* Assuming the product has an image field or base64-encoded image */}
              <div className="product-card">
                {product.image ? (
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    className="related-product-image"
                  />
                ) : (
                  <img
                    src={product.imageUrl} // Use the URL if it's not base64
                    alt={product.name}
                    className="related-product-image"
                  />
                )}
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No related products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;


