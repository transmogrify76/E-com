import React, { useEffect , useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// Import Components
import ENavbar from './Components/User/Navbar/Navbar';
import Sidenav from './Components/User/Sidenav/Sidenav';
import Dashboard from './Components/Universal/Dashboard/Dashboard';
import Login from './Components/Authentication/Login/Login';
import Signup from './Components/Authentication/Signup/Signup';
import Cart from './Components/User/Cart/Cart';
import Wishlist from './Components/User/Wishlist/Wishlist';
import Orders from './Components/User/Orders/Orders';
import Account from './Components/Authentication/Account/Accounts';
import ForgetPassword from './Components/Authentication/Forgetpassword/Forgetpassword';
import ShopCat from './Components/User/ShopCat/ShopCat';
import men_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_mens.png';
import women_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_women.png';
import kid_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_kids.png';
import Footer from './Components/Universal/Footer/Footer';
import Popular from './Components/User/Popular/Popular';
import Shop from './Components/User/Shop/Shop';
import NewCollections from './Components/User/NewCollections/NewCollections';
import ProductDisplay from './Components/User/ProductDisplay/ProductDisplay';
import Product from './Components/User/Product/Product';
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';        
import Checkout from './Components/User/Checkout/Checkout';
import Payment from './Components/User/Payment/Payment';
import SellerDashboard from './Components/Seller/SellerDashboard/SellerDashboard';
import ProductUpload from './Components/Seller/ProductUpload/ProductUpload';
import ExistingProduct from './Components/Seller/ExistingProduct/ExcistingProduct';
import Dispatch from './Components/Seller/Dispatch/Dispatch';
import RevenueGenerate from './Components/Seller/RevenueGenerate/RevenueGenerate';
import Orderr from './Components/Seller/Orderr/Orderr';
import OrderIndividual from './Components/Seller/Order-individual/OrderIndividual';
import Settings from './Components/Seller/Settings/Settings';
import Users from './Components/Admin/Users/Users';
import Products from './Components/Admin/Products/Products';
import Order from './Components/Admin/Order/Order';
import Reports from './Components/Admin/Reports/Reports';
import SideNavbar from './Components/Seller/SideNavbar/SideNavbar';
import SellerNavbar from './Components/Seller/SellerNavbar/SellerNavbar';
import Logout from './Components/Authentication/Logout/Logout';
import Wallet from './Components/Seller/Wallet/Wallet';
import SellerAccount from './Components/Seller/Account/Account';
import NewSeller from './Components/Seller/NewSeller/NewSeller';
import NewBank from './Components/Seller/NewBank/NewBank';
import Navbar from './Components/Admin/Navbar/Navbar';
import Sidebar from './Components/Admin/Sidebar/Sidebar';
import AddProduct from './Components/Admin/AddProduct/AddProduct';
import ListProduct from './Components/Admin/ListProduct/ListProduct';
import AdSettings from './Components/Admin/Settings/Settings';
import AdAccount from './Components/Admin/Adaccount/Adaccount';
import Delivery from './Components/Admin/Delivery/Delivery';
import Inventory from './Components/Admin/Inventory/Inventory';
import CategoryManagement from './Components/Admin/Cattegories/Cattegories';
import Shipments from './Components/Admin/Shipments/Shipments';
import TransactionList from './Components/Admin/Transactions/Transactions';
import AdminInvoice from './Components/Admin/Invoices/Invoices';
import AdminInvoicePage from './Components/Admin/AdminInvoice/AdminInvoice';
import RefundsPage from './Components/Admin/Refunds/Refunds';
import ProcessRefundPage from './Components/Admin/ProcessRefund/ProcessRefund';
import ResetPassword from './Components/Authentication/ResetPassword/ResetPassword';
import ShippingDetails from './Components/Seller/ShippingDetails/ShippingDetails';
import './App.css';

// ScrollHandler Component
const ScrollHandler = () => {
  const location = useLocation();
  const noScrollRoutes = useMemo(() => ['/login', '/signup', '/forgetpassword', '/resetpassword'], []);

  useEffect(() => {
    if (noScrollRoutes.includes(location.pathname)) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [location, noScrollRoutes]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollHandler />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const shouldShowSidebar = () => {
    const pathsWithoutSidebar = [
      '/login', '/signup', '/forgetpassword', '/seller-dashboard',
      '/ProductUpload', '/ExistingProduct', '/Dispatch', '/RevenueGenerate',
      '/Orderr', '/Settings', '/admin-dashboard', '/Users', '/Products',
      '/Order', '/Reports', '/Setting', '/Logout', '/resetpassword'
    ];
    return !pathsWithoutSidebar.includes(location.pathname);
  };

  const shouldShowSideNavbar = () => {
    const pathsWithoutSideNavbar = [
      '/', '/login', '/signup', '/forgetpassword', '/dashboard', '/cart', '/wishlist',
      '/mens', '/women', '/orders', '/account', '/kids', '/popular', '/shop',
      '/newcollections', '/checkout', '/payment', '/NewSeller', '/admin-dashboard',
      '/list-product', '/add-product', '/categories', '/order', '/users', '/sellers',
      '/transactions', '/delivery', '/adaccount', '/adsettings', '/inventory', 
      '/shipments', '/invoice', '/refunds', '/resetpassword'
    ];
    return !pathsWithoutSideNavbar.includes(location.pathname) && !location.pathname.startsWith('/product/') && !location.pathname.startsWith('/invoice/') && !location.pathname.startsWith('/refunds/');
  };

  const shouldShowSellerNavbar = () => {
    const pathsWithoutSellerNavbar = [
      '/', '/login', '/signup', '/forgetpassword', '/dashboard', '/cart', '/wishlist',
      '/mens', '/women', '/orders', '/account', '/kids', '/popular', '/shop',
      '/newcollections', '/checkout', '/payment', '/NewSeller', '/admin-dashboard',
      '/list-product', '/add-product', '/categories', '/order', '/users', '/sellers',
      '/transactions', '/delivery', '/adaccount', '/adsettings', '/inventory',
      '/shipments', '/resetpassword'
    ];
    return !pathsWithoutSellerNavbar.includes(location.pathname) && !location.pathname.startsWith('/product/');
  };

  const shouldShowAdminNavbar = () => {
    const pathsWithoutAdminNavbar = [
      '/', '/login', '/signup', '/forgetpassword', '/dashboard', '/cart', '/wishlist',
      '/mens', '/women', '/orders', '/account', '/kids', '/popular', '/shop',
      '/newcollections', '/checkout', '/payment', '/NewSeller', '/seller-dashboard',
      '/ProductUpload', '/ExistingProduct', '/Dispatch', '/RevenueGenerate',
      '/Orderr', '/Settings',  '/NewBank', '/resetpassword'
    ];
    return !pathsWithoutAdminNavbar.includes(location.pathname) && !location.pathname.startsWith('/product/');
  };

  const shouldShowAdminSidebar = () => {
    const pathsWithoutAdminSidebar = [
      '/', '/login', '/signup', '/forgetpassword', '/dashboard', '/cart', '/wishlist',
      '/mens', '/women', '/orders', '/account', '/kids', '/popular', '/shop',
      '/newcollections', '/checkout', '/payment', '/NewSeller', '/seller-dashboard',
      '/ProductUpload', '/ExistingProduct', '/Dispatch', '/RevenueGenerate',
      '/Orderr', '/Settings', '/Wallet', '/SellerAccount', 
      '/NewBank', '/resetpassword'
    ];
    return !pathsWithoutAdminSidebar.includes(location.pathname) && !location.pathname.startsWith('/product/') && !location.pathname.startsWith('/OrderIndividual/')  && !location.pathname.startsWith('/ShippingDetails/') && !location.pathname.startsWith('/Dispatch/') ;
  };

  const shouldShowNavbar = () => {
    const pathsWithNavbar = [
      '/', '/dashboard', '/cart', '/wishlist', '/mens', '/women', '/orders',
      '/account', '/kids', '/popular', '/shop', '/newcollections', '/productdisplay',
      '/product/:productId', '/checkout', '/payment', '/NewSeller'
    ];
    
    return pathsWithNavbar.includes(location.pathname) || location.pathname.startsWith('/product/') ;
  };
  

  const shouldShowFooter = () => {
    const pathsWithoutFooter = [
      '/login', '/signup', '/forgetpassword', '/seller-dashboard',
      '/ProductUpload', '/ExistingProduct', '/Dispatch', '/RevenueGenerate',
      '/Orderr', '/Settings', '/admin-dashboard', '/Users', '/Products',
      '/Order', '/Reports', '/Setting', '/Logout', '/OrderIndividual/:orderId', '/resetpassword'
    ];
    return !pathsWithoutFooter.includes(location.pathname);
  };

  return (
    <div className="App">
      {shouldShowNavbar() && !shouldShowSellerNavbar() && <ENavbar />}
      {shouldShowSidebar() && <Sidenav />}
      {shouldShowSideNavbar() && <SideNavbar />}
      {shouldShowSellerNavbar() && <SellerNavbar />}
      {shouldShowAdminNavbar() && <Navbar />}
      {shouldShowAdminSidebar() && <Sidebar />}
      <Routes>
        {/* Define Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/mens" element={<ShopCat banner={men_banner} category="men" />} />
        <Route path="/women" element={<ShopCat banner={women_banner} category="women" />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/kids" element={<ShopCat banner={kid_banner} category="kid" />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/newcollections" element={<NewCollections />} />
        <Route path="/productdisplay" element={<ProductDisplay />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/ProductUpload" element={<ProductUpload />} />
        <Route path="/ExistingProduct" element={<ExistingProduct />} />
        <Route path="/Orderr" element={<Orderr />} />
        <Route path="/Dispatch/:orderId" element={<Dispatch />} />
        <Route path="/Dispatch" element={<Dispatch />} />
        <Route path="/RevenueGenerate" element={<RevenueGenerate />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/SellerNavbar" element={<SellerNavbar />} />
        <Route path="/NewSeller" element={<NewSeller />} />
        <Route path="/NewBank" element={<NewBank />} />
        <Route path="/SellerAccount" element={<SellerAccount />} />
        <Route path="/OrderIndividual/:orderId" element={<OrderIndividual />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/list-product" element={<ListProduct />} />
        <Route path="/adaccount" element={<AdAccount />} />
        <Route path='/Delivery' element={<Delivery />} />
        <Route path='/adsettings' element={<AdSettings />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/categories' element={<CategoryManagement />} />
        <Route path='/shipments' element={<Shipments />} />
        <Route path='/transactions' element={<TransactionList />} />
        <Route path='/invoice' element={<AdminInvoice />} />
        <Route path="/invoice/:invoiceNumber" element={<AdminInvoicePage />} />
        <Route path="/refunds" element={<RefundsPage />} />
        <Route path="/refunds/:refundId" element={<ProcessRefundPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/ShippingDetails/:orderId" element={<ShippingDetails />} />
      </Routes>
      {shouldShowFooter() && <Footer />}
    </div>
  );
}

export default App;


