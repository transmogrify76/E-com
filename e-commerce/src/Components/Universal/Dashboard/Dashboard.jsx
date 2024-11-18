// import React, { useEffect, useState } from 'react';
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
//                 <img
//                   src={product.imageUrl}  // Correct image URL here
//                   alt={product.name}
//                   className="collection-image"
//                 />
//                 <div className="collection-details">
//                   <h3>{product.name}</h3>
//                   <p>{product.description}</p>
//                   <p className="price">${product.price}</p>
//                 </div>
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
import Popular from '../../User/Popular/Popular';
import Offers from '../../User/Offers/Offers';
import NewCollections from '../../User/NewCollections/NewCollections';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch new collections when the component mounts
  useEffect(() => {
    fetchNewCollections(); // Load new collections on mount
  }, []);

  // Function to fetch new collections from the backend (GET /collections/new)
  const fetchNewCollections = async () => {
    try {
      const response = await fetch('http://localhost:5000/collections/new');  // Assuming this API returns all new collections
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
        <h2>Fresh Arrivals</h2>
        <div className="collections-list">
          {loading && renderLoadingState()}  {/* Show loading state */}
          {error && renderErrorState()}  {/* Show error state */}
          {!loading && !error && products.length > 0 ? (
            products.map((product) => (
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
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No new collections available.</p>
          )}
        </div>
      </div>

      {/* Other Sections */}
      <Popular />
      <Offers />
    </div>
  );
};

export default Dashboard;

