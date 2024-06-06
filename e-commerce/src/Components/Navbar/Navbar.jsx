import React from 'react';
import './Navbar.css';
import logo from '../Assests/Ecommerce_Frontend_Assets/Assets/logo.png';
import cart_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/cart_icon.png';
import { Link } from 'react-router-dom';

function ENavbar() {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt='logo' />
        <p>E-Com</p>
      </div>
      <ul className="nav-menu">
        <li>Shop</li>
        <li>Men</li>
        <li>Women</li>
        <li>Kid</li>
      </ul>
      <div className="nav-login-cart">
        <button>Login</button>
        <img src={cart_icon} alt='cart icon' />
      </div>
    </div>
  );
}

export default ENavbar;
