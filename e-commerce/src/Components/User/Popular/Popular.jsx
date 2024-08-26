import React from 'react';
import './Popular.css';
import data_product from '../../Assests/Ecommerce_Frontend_Assets/Assets/data';
import Item from '../../User/Item/Item';

const Popular = () => {
  // Filter data_product to only include women's products
  const womenProducts = data_product.filter(item => item.category === 'women');

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-item">
        {womenProducts.map((item, i) => (
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

export default Popular;
