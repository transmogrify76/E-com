
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ENavbar from './Components/Navbar/Navbar';
import Sidenav from './Components/Sidenav/Sidenav';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import Mens from './Components/Mens/Mens';
import Women from './Components/Women/Women';
import Orders from './Components/Orders/Orders';
import Account from './Components/Account/Accounts';
import Kids from './Components/Kids/Kids';
import Item from './Components/Item/Item'


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
          <Route path="/mens" element={<Mens />} />
          <Route path="/women" element={<Women />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/item" element={<Item />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
