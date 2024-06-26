import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Importing CSS for styling

const Sidebar = () => {
  return (
    <nav className="col-md-2 d-none d-md-block sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/" activeClassName="active">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products" activeClassName="active">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add-product" activeClassName="active">
              Add Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories" activeClassName="active">
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orders" activeClassName="active">
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users" activeClassName="active">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sellers" activeClassName="active">
              Sellers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/transactions" activeClassName="active">
              Transactions
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
