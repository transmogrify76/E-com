import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/Assets/logo.png';
// import users from '../../assets/Assets/Admin_Assets/users.png';

const Navbar = () => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='navbar'>
      <img src={logo} alt="Logo" className="nav-logo" />
      <h1>E-COM</h1>
      <div>Admin Panel</div>
      <div className="dropdown-container" onClick={toggleDropdown}>
        <div className="user-icons">
          {/* <img src={users} alt="User" /> */}
        </div>
        {isDropdownOpen && (
          <div className="dropdown-contentt">
            <a href="/adaccount">My Profile</a>
            <a href="/login">Log out</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
