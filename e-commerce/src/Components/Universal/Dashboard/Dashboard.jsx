import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import arrow_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/arrow.png';
import hero_icon from '../../Assests/hero.jpg.png';
import Popular from '../../User/Popular/Popular';
import Offers from '../../User/Offers/Offers';
import NewCollections from '../../User/NewCollections/NewCollections';


const Dashboard = () => {
  const [products, setProducts] = useState([]);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();  // Load the products initially
  }, []);

  // Function to fetch products from the backend (GET /collections)
  const fetchProducts = () => {
    fetch('http://localhost:5000/collections')  // Assuming this API returns all products
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching collections:', error));
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-left">
          <h2>New Arrivals Only</h2>
          <br />
          <br />
          <div className="hand-hand-icon">
            <p>
              New <br />
              Collections <br />
              for everyone
            </p>
          </div>
          <div className="hero-latest-version">
            <button className="latestcollection">Latest collection</button>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className="hero-right">
          <img src={hero_icon} alt="" />
        </div>
      </div>

      {/* Display New Collections */}
      <div className="new-collections">
        <h2>New Collections</h2>
        <div className="collections-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="collection-item">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="collection-image"
                />
                <div className="collection-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No new collections available.</p>
          )}
        </div>
      </div>

      <Popular />
      <Offers />
      <NewCollections />
    </div>
  );
};

export default Dashboard;

//ok, so i want to create an api for a all new collection, that api works like when seller upload a product through an api the product should appear in dashboard of user through Newcollection api so, what feature that api can contain