// import React from 'react';
// import './RelatedProducts.css';
// import data_product from '../../Assests/Ecommerce_Frontend_Assets/Assets/data';
// import Item from '../Item/Item';

// const RelatedProducts = ({ category }) => {
//   // Filter products based on the selected category
//   const filteredProducts = data_product.filter(product => product.category === category);

//   return (
//     <div className='relatedproducts'>
//       <h1>Related Products</h1>
//       <hr/>
//       <div className="relatedproducts-item">
//         {filteredProducts.map((item, i) => (
//           <Item
//             key={i}
//             id={item.id}
//             name={item.name}
//             image={item.image}
//             new_price={item.new_price}
//             old_price={item.old_price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <div className="related-products-list">
        {products.length > 0 ? (
          products.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="related-product"
              onClick={() => navigate(`/product/${relatedProduct.id}`)}
            >
              <img
                src={relatedProduct.images[0]?.url}
                alt={relatedProduct.name}
                className="related-product-img"
              />
              <div className="related-product-info">
                <h3>{relatedProduct.name}</h3>
                <p>₹ {relatedProduct.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No related products available.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
