import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assests/Ecommerce_Frontend_Assets/Assets/logo.png';
import cart_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

function ENavbar() {
  const [menu,setMenu] = useState("shop")
  const {getTotalCartAmounts} = useContext(ShopContext);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt='logo' />
        <p style={{color : 'white'}}>E-Com</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link  style = {{textDecoration : 'none',color : 'white'}} to = '/dashboard'>Shop{menu==="shop"?<hr/>:<></>}</Link></li>
        <li onClick={()=>{setMenu("mens")}}><Link to = '/mens' style = {{textDecoration : 'none',color : 'white'}}>Men {menu==="mens"?<hr/>:<></>}</Link></li>
        <li onClick={()=>{setMenu("women")}}><Link to = '/women' style = {{textDecoration : 'none',color : 'white'}}>Women {menu==="women"?<hr/>:<></>}</Link></li>
        <li onClick={()=>{setMenu("kids")}}><Link to = '/kids' style = {{textDecoration : 'none',color : 'white'}}>Kid {menu==="kids"?<hr/>:<></>}</Link></li>
      </ul>
      <div className="nav-login-cart">
        <button onClick={()=>{setMenu("shop")}}><Link  style = {{textDecoration : 'none'}} to = '/login'>Login</Link></button>
        
          <Link to="/cart">
            <img src={cart_icon} alt="Cart Icon" />
          </Link>
          <div className="nav-cart-count">{getTotalCartAmounts()}</div>
        
      </div>
      
    </div>
    
  );
}

export default ENavbar;
