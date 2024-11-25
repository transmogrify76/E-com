import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Dashboard.css';
import arrow_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/arrow.png';
import hero_icon from '../../Assests/hero.jpg.png';
import Popular from '../../User/Popular/Popular'; // Assuming this shows popular products
import Offers from '../../User/Offers/Offers';

const Dashboard = () => {
  const [products, setProducts] = useState([]); // New collections
  const [trendingProducts, setTrendingProducts] = useState([]); // Trending products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch new collections and trending products when the component mounts
  useEffect(() => {
    fetchNewCollections(); // Load new collections on mount
    fetchTrendingProducts(); // Load trending products on mount
  }, []); // Only load once on mount

  // Function to fetch new collections from the backend
  const fetchNewCollections = async () => {
    try {
      const response = await fetch(`http://localhost:5000/collections/new`);
      if (!response.ok) {
        throw new Error('Failed to fetch collections');
      }
      const data = await response.json();
      setProducts(data);  // Set fetched products (collections) to the state
    } catch (error) {
      setError(error.message);  // Handle error state
    } finally {
      setLoading(false);  // Set loading to false after fetching is done
    }
  };

  // Function to fetch trending products from the backend
  const fetchTrendingProducts = async () => {
    try {
      const [mostlySearched, mostlyViewed, topRated] = await Promise.all([
        fetch(`http://localhost:5000/mostlysearch/getallmostlysearchproducts`),
        fetch(`http://localhost:5000/mostly-viewed`),
        fetch(`http://localhost:5000/top-rated`)
      ]);

      if (!mostlySearched.ok || !mostlyViewed.ok || !topRated.ok) {
        throw new Error('Failed to fetch trending products');
      }

      const searchedData = await mostlySearched.json();
      const viewedData = await mostlyViewed.json();
      const ratedData = await topRated.json();

      // Combine all trending products into one array
      const combinedTrendingProducts = [
        ...searchedData,
        ...viewedData,
        ...ratedData,
      ];

      // Remove duplicates based on product ID (if any)
      const uniqueTrendingProducts = [
        ...new Map(combinedTrendingProducts.map(item => [item.id, item])).values()
      ];

      setTrendingProducts(uniqueTrendingProducts); // Set trending products to state
    } catch (error) {
      setError(error.message); // Handle error state
    }
  };

  // JSX for showing loading or error states
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

  // Handle category filter change
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
          {/* Add more categories as needed */}
        </select>
      </div>

      {/* Display New Collections Only When Not Filtering by Category */}
      {selectedCategory === 'all' && (
        <div className="new-collections">
          <h2>Fresh Arrivals</h2>
          <div className="collections-list">
            {loading && renderLoadingState()}  {/* Show loading state */}
            {error && renderErrorState()}  {/* Show error state */}
            {!loading && !error && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="collection-item">
                  <Link to={`/product/${product.id}`} className="collection-link">
                    <img
                      src={product.imageUrl}  // Correct image URL here
                      alt={product.name}
                      className="collection-image"
                    />
                    <div className="collection-details">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p className="price">${product.price}</p>
                      <div className="product-tags">
                        {product.isBestseller && <span className="tag bestseller">Bestseller</span>}
                        {product.isTopRated && <span className="tag top-rated">Top Rated</span>}
                        {product.isStaffPick && <span className="tag staff-pick">Staff Pick</span>}
                      </div>
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

      {/* Show Popular Products Section Only for Women Category */}
      {selectedCategory === 'women' && (
        <div className="popular-products">
          <h1>Popular in Women</h1>
          <div className="collections-list">
            <Popular /> {/* This will show popular products specifically for women */}
          </div>
        </div>
      )}

      {/* Only show Trending Products and Featured Sellers when 'All Categories' is selected */}
      {selectedCategory === 'all' && (
        <>
          {/* Always display Trending Products section */}
          <div className="trending-products">
            <h1>Trending Products</h1>
            <div className="product-list">
              {trendingProducts.length > 0 ? (
                trendingProducts.map((product) => (
                  <div key={product.id} className="product-item">
                    <Link to={`/product/${product.id}`} className="collection-link">
                      <img src={product.imageUrl} alt={product.name} className="product-image" />
                      <div className="product-details">
                        <h3>{product.name}</h3>
                        <p className="price">${product.price}</p>
                        <p>{product.description}</p>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No trending products available.</p>
              )}
            </div>
          </div>

          {/* Show Featured Sellers section */}
          <div className="featured-sellers">
            <h1>Featured Sellers</h1>
            <div className="seller-list">
              {/* Seller items can be dynamically generated as well */}
              <div className="seller-item">
                <img src="path_to_seller_image.jpg" alt="Seller" />
                <div className="seller-details">
                  <h3>Seller Name</h3>
                  <p>Popular Products</p>
                </div>
              </div>
              {/* Add more sellers as needed */}
            </div>
          </div>
        </>
      )}

      {/* Always display Offers section */}
      <Offers />
    </div>
  );
};

export default Dashboard;