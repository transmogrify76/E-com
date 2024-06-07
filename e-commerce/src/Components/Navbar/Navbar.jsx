import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assests/Ecommerce_Frontend_Assets/Assets/logo.png';
import cart_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/cart_icon.png';
import { Link } from 'react-router-dom';

function ENavbar() {
  const [menu,setMenu] = useState("shop")
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt='logo' />
        <p>E-Com</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link  style = {{textDecoration : 'none'}} to = '/dashboard'>Shop</Link></li>
        <li onClick={()=>{setMenu("mens")}}><Link to = '/mens' style = {{textDecoration : 'none'}}>Men </Link></li>
        <li onClick={()=>{setMenu("women")}}><Link to = '/women' style = {{textDecoration : 'none'}}>Women</Link></li>
        <li onClick={()=>{setMenu("kids")}}><Link to = '/kids' style = {{textDecoration : 'none'}}>Kid </Link></li>
      </ul>
      <div className="nav-login-cart">
        <button onClick={()=>{setMenu("shop")}}><Link  style = {{textDecoration : 'none'}} to = '/login'>Login</Link></button>
        
          <Link to="/cart">
            <img src={cart_icon} alt="Cart Icon" />
          </Link>
        
      </div>
    </div>
  );
}

export default ENavbar;
