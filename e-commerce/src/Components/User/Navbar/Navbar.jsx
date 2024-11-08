import React, { useState, useEffect, useContext } from 'react'; // Add useContext here
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      const fetchSearchResults = async () => {
        setLoading(true);
        setErrorMessage(''); // Reset error message
        
        try {
          // Use process.env.REACT_APP_API_URL to get the base API URL
          const response = await fetch(`${process.env.REACT_APP_API_URL}/products/search/name?term=${searchTerm}`);

          if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Error fetching search results');
            setSearchResults([]);
          } else {
            const data = await response.json();
            setSearchResults(data);
          }
        } catch (err) {
          setErrorMessage('Error fetching search results');
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
            Shop{menu === "shop" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => { setMenu("mens") }}>
          <Link to='/mens' style={{ textDecoration: 'none', color: 'white' }}>
            Men {menu === "mens" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => { setMenu("women") }}>
          <Link to='/women' style={{ textDecoration: 'none', color: 'white' }}>
            Women {menu === "women" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => { setMenu("kids") }}>
          <Link to='/kids' style={{ textDecoration: 'none', color: 'white' }}>
            Kid {menu === "kids" ? <hr /> : <></>}
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
        <button className="btn-search"><IoSearch /></button>
        
        {/* Show loading indicator while fetching */}
        {loading && <p>Loading...</p>}

        {/* Show error message if there's an error */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {/* Display search results below */}
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((product) => (
              <li key={product.id}>
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
        <div className="nav-cart-count">{getTotalCartItems()}</div> {/* Display total cart items count */}

        {/* Dropdown container */}
        <div className="dropdown-container" onClick={toggleDropdown}>
          <div className="user-icon">
            <img src={user} alt="user" />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <a href="/account">My Profile</a>
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











//  //ok so, below is my navbar code, there is option search bar, so, i want when someone want to search any product they type and the product name should appear below is the api 
//  http://localhost:5000/products/search/name?term=aa
// and the code is:
// import React, { useState, useContext } from 'react';
// import './Navbar.css';
// import logo from '../../Assests/Ecommerce_Frontend_Assets/Assets/logo.png';
// import cart_icon from '../../Assests/shopping-cart.png';
// import user from '../../Assests/user.png';
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';
// import { IoSearch } from "react-icons/io5";

// function ENavbar() {
//   const [menu, setMenu] = useState("shop");
//   const { getTotalCartItems } = useContext(ShopContext); // Use getTotalCartItems instead of getTotalCartAmounts
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="navbar">
//       <div className="nav-logo">
//         <img src={logo} alt='logo' />
//         <p style={{ color: 'white' }}>E-Com</p>
//       </div>

//       <ul className="nav-menu">
//         <li onClick={() => { setMenu("shop") }}>
//           <Link style={{ textDecoration: 'none', color: 'white' }} to='/dashboard'>
//             Shop{menu === "shop" ? <hr /> : <></>}
//           </Link>
//         </li>
//         <li onClick={() => { setMenu("mens") }}>
//           <Link to='/mens' style={{ textDecoration: 'none', color: 'white' }}>
//             Men {menu === "mens" ? <hr /> : <></>}
//           </Link>
//         </li>
//         <li onClick={() => { setMenu("women") }}>
//           <Link to='/women' style={{ textDecoration: 'none', color: 'white' }}>
//             Women {menu === "women" ? <hr /> : <></>}
//           </Link>
//         </li>
//         <li onClick={() => { setMenu("kids") }}>
//           <Link to='/kids' style={{ textDecoration: 'none', color: 'white' }}>
//             Kid {menu === "kids" ? <hr /> : <></>}
//           </Link>
//         </li>
//       </ul>

//       <div className='headerSearch'>
//         <input type='text' />
//         <button className='btn-search'><IoSearch /></button>
//       </div>

//       <div className="nav-login-cart">
//         <button onClick={() => { setMenu("shop") }}>
//           <Link style={{ textDecoration: 'none',color:'white' }} to='/login'>Login</Link>
//         </button>

//         <Link to="/cart">
//           <img src={cart_icon} alt="Cart Icon" />
//         </Link>
//         <div className="nav-cart-count">{getTotalCartItems()}</div> {/* Display total cart items count */}

//         {/* Dropdown container */}
//         <div className="dropdown-container" onClick={toggleDropdown}>
//           <div className="user-icon">
//             <img src={user} alt="user" />
//           </div>
//           {isDropdownOpen && (
//             <div className="dropdown-content">
//               <a href="/account">My Profile</a>
//               <a href="/NewSeller">Become Seller</a>
//               <a href="/login">Log out</a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//  export default ENavbar;

//  just modify for search bar and give me the code
