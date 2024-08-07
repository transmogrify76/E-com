
import React,{useState} from 'react';
import './SellerNavbar.css';
import { IoSearch } from "react-icons/io5";
import user from '../../Assests/user.png';
import logo from '../../Assests/Ecommerce_Frontend_Assets/Assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SellerNavbar() {
   const [ setMenu] = useState("shop");
    // Placeholder values or components
    const notificationCount = 5; // Example notification count
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

            <div className='headerSearch'>
                <input type='text' placeholder="Search..." />
                <button className='btn-search'><IoSearch /></button>
            </div>

            <div className="notifications">
                <FontAwesomeIcon icon={faBell} className="notification-icon" />
                <span className="badge">{notificationCount}</span>
            </div>
            <div className="nav-login-cart">
        <button onClick={() => { setMenu("shop") }}>
          <Link style={{ textDecoration: 'none' }} to='/login'>Login</Link>
        </button>
        </div>

            <div className="dropdown-container" onClick={toggleDropdown}>
          <div className="user-icon">
            <img src={user} alt="user" />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <a href="/SellerAccount">My Profile</a>
              <a href="/login">Log out</a>
              
            </div>
          )}
        </div>
        </div>
    );
}

export default SellerNavbar;
