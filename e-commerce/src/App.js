//
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import ENavbar from './Components/Navbar/Navbar';
// import Sidenav from './Components/Sidenav/Sidenav';
// import Dashboard from './Components/Dashboard/Dashboard';
// import Login from './Components/Login/Login';
// import Signup from './Components/Signup/Signup';
// import Cart from './Components/Cart/Cart';
// import Wishlist from './Components/Wishlist/Wishlist';
// import Orders from './Components/Orders/Orders'; // Correct import
// import Account from './Components/Account/Accounts';
// import ForgetPassword from './Components/Forgetpassword/Forgetpassword';
// import Item from './Components/Item/Item';
// import ShopCat from './Components/ShopCat/ShopCat'; // Correct import
// import men_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_mens.png';
// import women_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_women.png';
// import kid_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_kids.png';
// import Footer from './Components/Footer/Footer';
// import Popular from './Components/Popular/Popular';
// import Shop from './Components/Shop/Shop';
// import NewCollections from './Components/NewCollections/NewCollections';
// import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
// import Product from './Components/Product/Product';
// import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
// import Checkout from './Components/Checkout/Checkout';
// import Payment from './Components/Payment/Payment';
// import SellerDashboard from './Components/Seller/SellerDashboard/SellerDashboard'; // Correct import
// import ProductUpload from './Components/Seller/ProductUpload/ProductUpload'; // Correct import
// import ExistingProduct from './Components/Seller/ExistingProduct/ExcistingProduct'; // Correct import
// import Dispatch from './Components/Seller/Dispatch/Dispatch'; // Correct import
// import RevenueGenerate from './Components/Seller/RevenueGenerate/RevenueGenerate'; // Correct import
// import Orderr from './Components/Seller/Orderr/Orderr'; // Correct import
// import Settings from './Components/Seller/Settings/Settings';
// import Users from './Components/Admin/Users/Users';
// import Products from './Components/Admin/Products/Products';
// import Order from './Components/Admin/Order/Order';
// import Reports from './Components/Admin/Reports/Reports';
// import Setting from './Components/Admin/Setting/Setting';
// import Logout from './Components/Admin/Logout/Logout';
// import OrderIndividual from './Components/Order-individual/OrderIndividual';





// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// function AppContent() {
//   const location = useLocation();

//   // Function to determine if the sidebar should be shown
//   const shouldShowSidebar = () => {
//     // Array of paths where sidebar should not be shown
//     const pathsWithoutSidebar = ['/login', '/signup', '/forgetpassword','/seller-dashboard','/ProductUpload','/ExistingProduct','/Dispatch','/RevenueGenerate','/Orderr','/Settings','/admin-dashboard','/Users','/Products','/Order','/Reports','/Setting','/Logout','/OrderIndividual'];
//     return !pathsWithoutSidebar.includes(location.pathname);
//   };

//   // Function to determine if the navbar should be shown
//   const shouldShowNavbar = () => {
//     // Array of paths where navbar should not be shown
//     const pathsWithoutNavbar = ['/login', '/signup', '/forgetpassword','/seller-dashboard','/ProductUpload','/ExistingProduct','/Dispatch','/RevenueGenerate','/Orderr','/Settings','/admin-dashboard','/Users','/Products','/Order','/Reports','/Setting','/Logout','/OrderIndividual'];
//     return !pathsWithoutNavbar.includes(location.pathname);
//   };

//   // Function to determine if the footer should be shown
//   const shouldShowFooter = () => {
//     // Array of paths where footer should not be shown
//     const pathsWithoutFooter = ['/login', '/signup', '/forgetpassword','/seller-dashboard','/ProductUpload','/ExistingProduct','/Dispatch','/RevenueGenerate','/Orderr','/Settings','/admin-dashboard','/Users','/Products','/Order','/Reports','/Setting','/Logout','/OrderIndividual'];
//     return !pathsWithoutFooter.includes(location.pathname);
//   };

//   return (
//     <div className="App">
//       {shouldShowNavbar() && <ENavbar />}
//       {shouldShowSidebar() && <Sidenav />}
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/mens" element={<ShopCat banner={men_banner} category="men" />} />
//         <Route path="/women" element={<ShopCat banner={women_banner} category="women" />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/account" element={<Account />} />
//         <Route path="/kids" element={<ShopCat banner={kid_banner} category="kid" />} />
//         <Route path="/forgetpassword" element={<ForgetPassword />} />
//         <Route path="/popular" element={<Popular />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/newcollections" element={<NewCollections />} />
//         <Route path="/productdisplay" element={<ProductDisplay />} />
//         <Route path="/product/:productId" element={<Product />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/OrderIndividual" element={<OrderIndividual/>} />
//         <Route path="/seller-dashboard" element={<SellerDashboard />} />
//         <Route path="/ProductUpload" element={<ProductUpload />} />
//         <Route path="/ExistingProduct" element={<ExistingProduct />} />
//         <Route path="/Orderr" element={<Orderr />} />
//         <Route path="/Dispatch" element={<Dispatch />} />
//         <Route path="/RevenueGenerate" element={<RevenueGenerate />} />
//         <Route path="/Settings" element={<Settings />} />
//         <Route path="/Users" element={<Users/>} />
//         <Route path="/Products" element={<Products/>} />
//         <Route path="/Order" element={<Order/>} />
//         <Route path="/Reports" element={<Reports/>} />
//         <Route path="/Setting" element={<Setting/>} />
//         <Route path="/Logout" element={<Logout/>} />
//       </Routes>
//       {shouldShowFooter() && <Footer />}
//     </div>
//   );
// }

// export default App;


import React from 'react';
 import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
 import ENavbar from './Components/Navbar/Navbar';
 import Sidenav from './Components/Sidenav/Sidenav';
 import Dashboard from './Components/Dashboard/Dashboard';
 import Login from './Components/Login/Login';
 import Signup from './Components/Signup/Signup';
 import Cart from './Components/Cart/Cart';
 import Wishlist from './Components/Wishlist/Wishlist';
 import Orders from './Components/Orders/Orders'; // Correct import
 import Account from './Components/Account/Accounts';
 import ForgetPassword from './Components/Forgetpassword/Forgetpassword';
 import Item from './Components/Item/Item';
 import ShopCat from './Components/ShopCat/ShopCat'; // Correct import
 import men_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_mens.png';
 import women_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_women.png';
 import kid_banner from './Components/Assests/Ecommerce_Frontend_Assets/Assets/banner_kids.png';
 import Footer from './Components/Footer/Footer';
 import Popular from './Components/Popular/Popular';
 import Shop from './Components/Shop/Shop';
 import NewCollections from './Components/NewCollections/NewCollections';
 import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
 import Product from './Components/Product/Product';
 import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
 import Checkout from './Components/Checkout/Checkout';
 import Payment from './Components/Payment/Payment';
 import SellerDashboard from './Components/Seller/SellerDashboard/SellerDashboard'; // Correct import
 import ProductUpload from './Components/Seller/ProductUpload/ProductUpload'; // Correct import
 import ExistingProduct from './Components/Seller/ExistingProduct/ExcistingProduct'; // Correct import
import Dispatch from './Components/Seller/Dispatch/Dispatch'; // Correct import
 import RevenueGenerate from './Components/Seller/RevenueGenerate/RevenueGenerate'; // Correct import
 import Orderr from './Components/Seller/Orderr/Orderr'; // Correct import
 import Settings from './Components/Seller/Settings/Settings';
 import Users from './Components/Admin/Users/Users';
 import Products from './Components/Admin/Products/Products';
 import Order from './Components/Admin/Order/Order';
 import Reports from './Components/Admin/Reports/Reports';
 import Setting from './Components/Admin/Setting/Setting';
 import Logout from './Components/Admin/Logout/Logout';
 import OrderIndividual from './Components/Order-individual/OrderIndividual';
 import SideNavbar from './Components/Seller/SideNavbar/SideNavbar';
 import SellerNavbar from './Components/Seller/SellerNavbar/SellerNavbar';





 function App() {
   return (
     <Router>
       <AppContent />
     </Router>
   );
 }

 function AppContent() {
   const location = useLocation();

   // Function to determine if the sidebar should be shown
const shouldShowSidebar = () => {
//     // Array of paths where sidebar should not be shown
    const pathsWithoutSidebar = ['/login', '/signup', '/forgetpassword','/seller-dashboard','/ProductUpload','/ExistingProduct','/dispatch','/RevenueGenerate','/Orderr','/Settings','/admin-dashboard','/Users','/Products','/Order','/Reports','/Setting','/Logout','/OrderIndividual'];
     return !pathsWithoutSidebar.includes(location.pathname);
   };

   // Function to determine if the navbar should be shown
   const shouldShowNavbar = () => {
     // Array of paths where navbar should not be shown
     const pathsWithoutNavbar = ['/login', '/signup', '/forgetpassword','/seller-dashboard','/ProductUpload','/ExistingProduct','/dispatch','/RevenueGenerate','/Orderr','/Settings','/admin-dashboard','/Users','/Products','/Order','/Reports','/Setting','/Logout','/OrderIndividual'];
     return !pathsWithoutNavbar.includes(location.pathname);
   };

   // Function to determine if the footer should be shown
   const shouldShowFooter = () => {
     // Array of paths where footer should not be shown
     const pathsWithoutFooter = ['/login', '/signup', '/forgetpassword','/seller-dashboard','/ProductUpload','/ExistingProduct','/dispatch','/RevenueGenerate','/Orderr','/Settings','/admin-dashboard','/Users','/Products','/Order','/Reports','/Setting','/Logout','/OrderIndividual'];
     return !pathsWithoutFooter.includes(location.pathname);
   };
   const shouldShowSideNavbar = () => {
    //     // Array of paths where sidebar should not be shown
        const pathsWithoutSidenavbar = ['/','/login', '/signup', '/forgetpassword','/dashboard','/cart','/wishlist','/mens','/women','/orders','/account','/kids','/popular','/shop','/newcollections','/productdisplay','/product/:productId','/checkout','/payment'];
         return !pathsWithoutSidenavbar.includes(location.pathname);
       };
       const shouldShowSellerNavbar = () => {
        // Array of paths where navbar should not be shown
        const pathsWithoutSellerNavbar = ['/','/login', '/signup', '/forgetpassword','/dashboard','/cart','/wishlist','/mens','/women','/orders','/account','/kids','/popular','/shop','/newcollections','/productdisplay','/product/:productId','/checkout','/payment'];
        return !pathsWithoutSellerNavbar.includes(location.pathname);
      };
    

   return (
     <div className="App">
       {shouldShowNavbar() && <ENavbar />}
       {shouldShowSidebar() && <Sidenav />}
       {shouldShowSideNavbar() && <SideNavbar />}
       {shouldShowSellerNavbar() && <SellerNavbar />}
       <Routes>
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
         <Route path="/OrderIndividual" element={<OrderIndividual/>} />
         <Route path="/seller-dashboard" element={<SellerDashboard />} />
         <Route path="/ProductUpload" element={<ProductUpload />} />
         <Route path="/ExistingProduct" element={<ExistingProduct />} />
         <Route path="/Orderr" element={<Orderr />} />
         <Route path="/Dispatch" element={<Dispatch />} />
         <Route path="/RevenueGenerate" element={<RevenueGenerate />} />
         <Route path="/Settings" element={<Settings />} />
         <Route path="/Users" element={<Users/>} />
         <Route path="/Products" element={<Products/>} />
         <Route path="/Order" element={<Order/>} />
         <Route path="/Reports" element={<Reports/>} />
         <Route path="/Setting" element={<Setting/>} />
         <Route path="/Logout" element={<Logout/>} />
         <Route path="/SellerNavbar" element={<SellerNavbar/>} />
       </Routes>
       {shouldShowFooter() && <Footer />}
     </div>
   );
 }

 export default App;
