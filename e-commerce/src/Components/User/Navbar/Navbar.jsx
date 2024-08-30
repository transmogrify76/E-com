import React, { useState, useContext } from 'react';
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt='logo' />
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

      <div className='headerSearch'>
        <input type='text' />
        <button className='btn-search'><IoSearch /></button>
      </div>

      <div className="nav-login-cart">
        <button onClick={() => { setMenu("shop") }}>
          <Link style={{ textDecoration: 'none',color:'white' }} to='/login'>Login</Link>
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


