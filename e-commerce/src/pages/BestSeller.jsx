// src/pages/BestSeller.jsx
import React from 'react';
import './BestSeller.css';  // Optional: Create a CSS file for styling the Best Sellers page.

function BestSeller() {
  // You can later replace this with dynamic data
  const bestSellers = [
    { id: 1, name: "Product A", price: "$100", image: "/path/to/productA.jpg" },
    { id: 2, name: "Product B", price: "$150", image: "/path/to/productB.jpg" },
    { id: 3, name: "Product C", price: "$200", image: "/path/to/productC.jpg" },
  ];

  return (
    <div className="best-seller-page" style={{ padding: '20px' }}>
      <h1>Best Sellers</h1>
      <div className="best-seller-grid">
        {bestSellers.map((product) => (
          <div key={product.id} className="best-seller-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
