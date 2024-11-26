import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link to handle routing
import './Dashboard.css';
import arrow_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/arrow.png';
import hero_icon from '../../Assests/hero.jpg.png';
import Offers from '../../User/Offers/Offers';

const Dashboard = () => {
  const [products, setProducts] = useState([]); // New collections
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchNewCollections();
  }, []);

  // Fetch new collections from the backend
  const fetchNewCollections = async () => {
    try {
      const response = await fetch(`http://localhost:5000/collections/new`);
      if (!response.ok) {
        throw new Error('Failed to fetch collections');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle category filter change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Show only 8 products for Fresh Arrivals on the homepage
  const displayedProducts = products.slice(0, 8);

  const renderLoadingState = () => (
    <div className="loading-state">
      <p>Loading new collections...</p>
    </div>
  );

  const renderErrorState = () => (
    <div className="error-state">
      <p>Error fetching collections: {error}</p>
    </div>
  );

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
            {/* Use Link for navigation */}
            <Link to="/fresh-arrivals" className="latestcollection">
              Latest collection
            </Link>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className="hero-right">
          <img src={hero_icon} alt="" />
        </div>
      </div>

      {/* Category Filter Dropdown */}
      <div className="category-filter">
        <label htmlFor="category-select">Filter by Category: </label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="home-appliances">Home Appliances</option>
          <option value="toys">Toys</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      {/* Display New Collections Only When Not Filtering by Category */}
      {selectedCategory === 'all' && (
        <div className="new-collections">
          <h2>Fresh Arrivals</h2>
          <div className="collections-list">
            {loading && renderLoadingState()}
            {error && renderErrorState()}
            {!loading && !error && displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div key={product.id} className="collection-item">
                  <Link to={`/product/${product.id}`} className="collection-link">
                    <img src={product.imageUrl} alt={product.name} className="collection-image" />
                    <div className="collection-details">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p className="price"> ₹{product.price}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No new collections available.</p>
            )}
          </div>
        </div>
      )}

      {/* Always display Offers section */}
      <Offers />
    </div>
  );
};

export default Dashboard;
