import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import './WholesaleSellerNavbar.css';

const WholesaleNavbar = ({ toggleExpand}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // To redirect user after logout

  // Toggle profile dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle Logout function
  const handleLogout = async () => {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (token) {
      try {
        // Ensure the token does not have the 'Bearer ' prefix (if already present)
        const tokenToSend = token.startsWith('Bearer ') ? token.substring(7) : token;

        // Send a POST request to logout API
        const response = await fetch('http://localhost:3696/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenToSend}`,
          },
        });

        if (response.ok) {
          // If logout is successful, remove the token and navigate to login page
          localStorage.removeItem('token');
          navigate('/wholesaleuser-login');
        } else {
          const error = await response.json();
          alert(error.message || 'Logout failed. Please try again.');
        }
      } catch (error) {
        console.error('Logout error:', error);
        alert('Logout failed. Please try again.');
      }
    } else {
      alert('You are not logged in.');
    }
  };

  return (
    <div className="wholesale-navbar">
      {/* Left Section: Brand and Sidebar Toggle */}
      <div className="wholesale-navbar-left">
       
        <Link to="/wholesale-dashboard" className="wholesale-brand">
          <h2>Wholesale</h2>
        </Link>
      </div>

      {/* Center Section: Search Bar */}
      <div className="wholesale-navbar-center">
        <div className="wholesale-search">
          <input type="text" placeholder="Search products..." />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Right Section: Profile and Login */}
      <div className="wholesale-navbar-right">
        {/* Login Button */}
        <div className="nav-login-cart">
          <button>
            <Link style={{ textDecoration: 'none', color: 'white' }} to='/wholesaleuser-login'>
              Login
            </Link>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="profile-containers">
          <img
            src="https://via.placeholder.com/40" // Replace with actual profile image URL
            alt="Profile"
            className="profile-image"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <ul>
                <li>
                  <Link to="/wholesale-seller-profile" className="dropdown-link">
                    My Profile
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="dropdown-link"
                  style={{ cursor: 'pointer' }}  // Add cursor pointer for interactivity
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Logout
                </li>
               
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WholesaleNavbar;