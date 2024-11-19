// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import './Dashboard.css';
// import arrow_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/arrow.png';
// import hero_icon from '../../Assests/hero.jpg.png';
// import Popular from '../../User/Popular/Popular';
// import Offers from '../../User/Offers/Offers';
// import NewCollections from '../../User/NewCollections/NewCollections';

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch new collections when the component mounts
//   useEffect(() => {
//     fetchNewCollections(); // Load new collections on mount
//   }, []);

//   // Function to fetch new collections from the backend (GET /collections/new)
//   const fetchNewCollections = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/collections/new');  // Assuming this API returns all new collections
//       if (!response.ok) {
//         throw new Error('Failed to fetch collections');
//       }
//       const data = await response.json();
//       setProducts(data);  // Set fetched products (collections) to the state
//     } catch (error) {
//       setError(error.message);  // Handle error state
//     } finally {
//       setLoading(false);  // Set loading to false after fetching is done
//     }
//   };

//   // JSX for showing loading or error states
//   const renderLoadingState = () => (
//     <div className="loading-state">
//       <p>Loading new collections...</p>
//     </div>
//   );

//   const renderErrorState = () => (
//     <div className="error-state">
//       <p>Error fetching collections: {error}</p>
//     </div>
//   );

//   return (
//     <div>
//       <div className="hero">
//         <div className="hero-left">
//           <h2>New Arrivals Only</h2>
//           <br />
//           <br />
//           <div className="hand-hand-icon">
//             <p>
//               New <br />
//               Collections <br />
//               for everyone
//             </p>
//           </div>
//           <div className="hero-latest-version">
//             <button className="latestcollection">Latest collection</button>
//             <img src={arrow_icon} alt="" />
//           </div>
//         </div>
//         <div className="hero-right">
//           <img src={hero_icon} alt="" />
//         </div>
//       </div>

//       {/* Display New Collections */}
//       <div className="new-collections">
//         <h2>Fresh Arrivals</h2>
//         <div className="collections-list">
//           {loading && renderLoadingState()}  {/* Show loading state */}
//           {error && renderErrorState()}  {/* Show error state */}
//           {!loading && !error && products.length > 0 ? (
//             products.map((product) => (
//               <div key={product.id} className="collection-item">
//                 {/* Link to product detail page */}
//                 <Link to={`/product/${product.id}`} className="collection-link">
//                   <img
//                     src={product.imageUrl}  // Correct image URL here
//                     alt={product.name}
//                     className="collection-image"
//                   />
//                   <div className="collection-details">
//                     <h3>{product.name}</h3>
//                     <p>{product.description}</p>
//                     <p className="price">${product.price}</p>
//                   </div>
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p>No new collections available.</p>
//           )}
//         </div>
//       </div>

//       {/* Other Sections */}
//       <Popular />
//       <Offers />
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Dashboard.css';
import arrow_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/arrow.png';
import hero_icon from '../../Assests/hero.jpg.png';
import Popular from '../../User/Popular/Popular'; // Assuming this shows popular products
import Offers from '../../User/Offers/Offers';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch new collections when the component mounts
  useEffect(() => {
    fetchNewCollections(); // Load new collections on mount
  }, []); // Only load once on mount

  // Function to fetch new collections from the backend (GET /collections/new)
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
                  {/* Link to product detail page */}
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
              {/* Example of how you could populate these */}
              <div className="product-item">
                <img src="path_to_trending_image.jpg" alt="Trending Product" />
                <div className="product-details">
                  <h3>Trending Product Name</h3>
                  <p className="price">1199.99</p>
                </div>
              </div>
              <div className="product-item">
                <img src="path_to_trending_image.jpg" alt="Trending Product" />
                <div className="product-details">
                  <h3>Trending Product Name</h3>
                  <p className="price">2199.99</p>
                </div>
              </div>
              {/* Add more trending products as needed */}
            </div>
          </div>

          {/* Show Featured Sellers section */}
          <div className="featured-sellers">
            <h1>Featured Sellers</h1>
            <div className="seller-list">
              <div className="seller-item">
                <img src="path_to_seller_image.jpg" alt="Seller" />
                <div className="seller-details">
                  <h3>Seller Name</h3>
                  <p>Popular Products</p>
                </div>
              </div>
              <div className="seller-item">
                <img src="path_to_seller_image.jpg" alt="Seller" />
                <div className="seller-details">
                  <h3>Seller Name</h3>
                  <p>Popular Products</p>
                </div>
              </div>
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






//ok, so ,here in my code here in the Fresh arrived section, when i upload a product from seller its showing like men women kid electrnoics everything showing randomly so, i want in the serachbar if someone selete men the men category product only show, for women kid and all the same functionality like men need so, change the code accordingly and which api you want tell me 