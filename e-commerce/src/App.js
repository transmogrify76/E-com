
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ENavbar from './Components/Navbar/Navbar';
import Sidenav from './Components/Sidenav/Sidenav';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';

import Orders from './Components/Orders/Orders';
import Account from './Components/Account/Accounts';

import ForgetPassword from './Components/Forgetpassword/Forgetpassword';
import Item from './Components/Item/Item';
import { ShopCat } from './Components/ShopCat/ShopCat';
import men_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_mens.png';
import women_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_women.png';
import kid_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_kids.png';
import Footer from './Components/Footer/Footer';
import Popular from './Components/Popular/Popular';
import Shop from './Components/Shop/Shop';
import NewCollections from './Components/NewCollections/NewCollections';



function App() {
  return (
    <Router>
    <div className="App">
        <ENavbar />
        <Sidenav />
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/mens" element={<ShopCat banner={men_banner}  category="men" />} />
          <Route path="/women" element={< ShopCat banner={women_banner}  category ="Women" />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />
          <Route path="/kids" element={< ShopCat banner={kid_banner} category  ="Kids" />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/ShopCat" element={< ShopCat  />} />
          <Route path="/item" element={<Item />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/newcollections" element={<NewCollections />} />
        </Routes>
       <Footer/>
    </div>
    </Router>
  );
}

export default App;
