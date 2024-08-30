import React from 'react';
import './RelatedProducts.css';
import data_product from '../../Assests/Ecommerce_Frontend_Assets/Assets/data';
import Item from '../Item/Item';

const RelatedProducts = ({ category }) => {
  // Filter products based on the selected category
  const filteredProducts = data_product.filter(product => product.category === category);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr/>
      <div className="relatedproducts-item">
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
