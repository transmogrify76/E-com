import React, { useState, useEffect, useContext } from 'react'; 
import './Navbar.css';
import logo from '../../Assests/Ecommerce_Frontend_Assets/Assets/logo.png';
import cart_icon from '../../Assests/shopping-cart.png';
import user from '../../Assests/user.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { IoSearch } from "react-icons/io5";

function ENavbar() {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext); // Use getTotalCartItems instead of getTotalCartAmounts
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [searchTerm, setSearchTerm] = useState(''); // To handle search input
  const [searchResults, setSearchResults] = useState([]); // To store search results
  const [loading, setLoading] = useState(false); // To handle loading state
  const [errorMessage, setErrorMessage] = useState(''); // To handle errors 
  const [showResults, setShowResults] = useState(false); // To control the visibility of the search results pop-up

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Effect to trigger API call whenever the search term changes
  useEffect(() => {
    if (searchTerm.length > 2) {
      setShowResults(true); // Show the search results pop-up when there are search results
      const fetchSearchResults = async () => {
        setLoading(true);
        setErrorMessage(''); // Reset error message
        
        try {
          // Use the correct API endpoint (ensure the URL is correct in .env or hardcoded)
          const response = await fetch(`http://localhost:5000/products/search/name?term=${searchTerm}&pagination=1`);

          if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Error fetching search results');
            setSearchResults([]);
          } else {
            const data = await response.json();
            setSearchResults(data); // Assuming the response is an array of products
          }
        } catch (err) {
          console.error("Error fetching data:", err); // Log detailed error for debugging
          setErrorMessage('Error fetching search results');
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear search results if search term is too short
      setShowResults(false); // Hide the results pop-up
    }
  }, [searchTerm]); // Effect runs when searchTerm changes

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term as the user types
  };

  const handleProductClick = () => {
    setShowResults(false); // Hide the results pop-up when a product is clicked
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p style={{ color: 'white' }}>E-Com</p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => { setMenu("shop") }}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to='/dashboard'>
            Shop {menu === "shop" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => { setMenu("mens") }}>
          <Link to='/category/men' style={{ textDecoration: 'none', color: 'white' }}>
            Men {menu === "mens" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => { setMenu("women") }}>
          <Link to='/category/women' style={{ textDecoration: 'none', color: 'white' }}>
            Women {menu === "women" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => { setMenu("kids") }}>
          <Link to='/category/kid' style={{ textDecoration: 'none', color: 'white' }}>
            Kid {menu === "/category/kid" ? <hr /> : <></>}
          </Link>
        </li>
      </ul>

      <div className="headerSearch">
 
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          
        />
        {/* <button className="btn-search" ><IoSearch /></button> */}
     
       


        {/* Show loading indicator while fetching */}
        {loading && <p>Loading...</p>}

        {/* Show error message if there's an error */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {/* Display search results below */}
        {showResults && searchResults.length > 0 && (
          <ul className={`search-results ${showResults ? 'show' : ''}`}>
            {searchResults.map((product) => (
              <li key={product.id} onClick={handleProductClick}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="nav-login-cart">
        <button onClick={() => { setMenu("shop") }}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to='/login'>Login</Link>
        </button>

        <Link to="/cart">
          <img src={cart_icon} alt="Cart Icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>

        {/* Dropdown container */}
        <div className="dropdown-container" onClick={toggleDropdown}>
          <div className="user-icon">
            <img src={user} alt="user" />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <a href="/account">My Profile</a>
              <a href="/wholesaleuser-signup">Whole Sale</a>
              <a href="/NewSeller">Become Seller</a>
              <a href="/login">Log out</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ENavbar;
