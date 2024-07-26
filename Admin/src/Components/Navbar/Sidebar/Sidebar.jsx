

import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../../assets/Assets/Admin_Assets/Product_Cart.svg';
import list_product_icon from '../../../assets/Assets/Admin_Assets/Product_list_icon.svg';
import inventory_product_icon from '../../../assets/Assets/Admin_Assets/logistic_inventory.png'; 
import order_icon from '../../../assets/Assets/Admin_Assets/order.png'; 
import user_icon from '../../../assets/Assets/Admin_Assets/aduser.png'; 
import seller_icon from '../../../assets/Assets/Admin_Assets/seller.png'; 
import delivery_icon from '../../../assets/Assets/Admin_Assets/Delivery.png'; 
import payment_icon from '../../../assets/Assets/Admin_Assets/payment.png'; 
import account_icon from '../../../assets/Assets/Admin_Assets/adaccount.png';
import settings_icon from '../../../assets/Assets/Admin_Assets/settings.png';

const Sidebar = () => {
  return (
    <div className='sidebar'>
     
      <div className="sidebar-item dropdown">
        <img src={list_product_icon} alt=""/>
        <p>Products</p>
        <div className="dropdown-content">
          <Link to={'/addproduct'} style={{textDecoration:"none"}}>
          <div className="sidebar-item">
          <img src={add_product_icon} alt=""/>
            <p>Add Product</p>
            </div>
          </Link>
          
          <Link to={'/listproduct'} style={{textDecoration:"none"}}>
          <div className="sidebar-item">
          <img src={list_product_icon} alt=""/>
            <p>Product List</p>
            </div>
          </Link>
        </div>
      </div>
      
      <Link to={'/inventory'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={inventory_product_icon} alt=""/>
          <p>Inventory Overview</p>
        </div>
      </Link>
      <Link to={'/adorder'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={order_icon} alt=""/>
          <p>Manage Orders</p>
        </div>
      </Link>
      <Link to={'/user'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={user_icon} alt=""/>
          <p>Manage Users</p>
        </div>
      </Link>
      <Link to={'/seller'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={seller_icon} alt=""/>
          <p>Manage Sellers</p>
        </div>
      </Link>
      <Link to={'/delivery'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={delivery_icon} alt=""/>
          <p>Delivery</p>
        </div>
      </Link>
      <Link to={'/payment'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={payment_icon} alt=""/>
          <p>Payment</p>
        </div>
      </Link>
      <Link to={'/adaccount'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={account_icon} alt=""/>
          <p>My Account</p>
        </div>
      </Link>
      <Link to={'/settings'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={settings_icon} alt=""/>
          <p>Settings</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
