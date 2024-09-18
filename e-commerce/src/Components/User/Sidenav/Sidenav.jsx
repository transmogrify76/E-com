import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHeart, FaShoppingCart, FaBox, FaUser, FaAngleDoubleLeft,FaWallet, FaAngleDoubleRight,FaHeadset,FaThList} from 'react-icons/fa';
import './Sidenav.css'; // Import your CSS file for styling
import { ShopContext } from '../Context/ShopContext';

const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation(); // Get current location from react-router-dom
  const { wishlistCount } = useContext(ShopContext); // Get wishlistCount from context

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleMenuItemClick = (menuItem) => {
    console.log(`Clicked on ${menuItem}`);
    // You can add more logic here based on the menu item clicked
  };
  

  return (
    <div className={`container ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className={`side-navbar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button className="toggle-btn" onClick={toggleExpand}>
          {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <FaHome className="nav-icon" />
              {isExpanded && <span>Home</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/category" className={`nav-link ${location.pathname === '/category' ? 'active' : ''}`}>
              <FaThList className="nav-icon" />
              {isExpanded && <span>Category</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className={`nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`}>
              <FaHeart className="nav-icon" />
              {isExpanded && <span>Wishlist ({wishlistCount})</span>}
              {!isExpanded && wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}>
              <FaShoppingCart className="nav-icon" />
              {isExpanded && <span>Cart</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className={`nav-link ${location.pathname === '/orders' ? 'active' : ''}`}>
              <FaBox className="nav-icon" />
              {isExpanded && <span>Orders</span>}
            </Link>
          </li>
          <li className="nav-item">
                    <Link to="/Wallet" className={`nav-link ${location.pathname === '/Wallet' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Wallet')}>
                        <FaWallet className="nav-icon" />
                        {isExpanded && <span>Wallet</span>}
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link to="/customerservice" className={`nav-link ${location.pathname === '/customerservice' ? 'active' : ''}`} onClick={() => handleMenuItemClick('CustomerService')}>
                        <FaHeadset className="nav-icon" />
                        {isExpanded && <span>Customer Service </span>}
                    </Link>
                </li>
          <li className="nav-item">
            <Link to="/account" className={`nav-link ${location.pathname === '/account' ? 'active' : ''}`}>
              <FaUser className="nav-icon" />
              {isExpanded && <span>My Account</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
