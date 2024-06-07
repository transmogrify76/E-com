import React ,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css'; // Import your CSS file for styling

const SideNav = () => {
        const [isExpanded, setIsExpanded] = useState(false);
      
        const toggleExpand = () => {
          setIsExpanded(!isExpanded);
        };
        return (
            <div className={`side-navbar ${isExpanded ? 'expanded' : 'collapsed'}`}>
              <button className="toggle-btn" onClick={toggleExpand}>
                {isExpanded ? '<<<<<<<<<' : '>>>>>>>>'}
              </button>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/wishlist" className="nav-link">
                    Wishlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/categories" className="nav-link">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/account" className="nav-link">
                    My Account
                  </Link>
                </li>
              </ul>
            </div>
          );
};

export default SideNav;
