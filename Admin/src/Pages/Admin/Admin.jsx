import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Navbar/Sidebar/Sidebar';
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Inventory from '../../Components/Inventory/Inventory';
import Adaccount from '../../Components/Adaccount/Adaccount';
import Settings from '../../Components/Settings/Settings';
import Adorder from '../../Components/AdOrder/Adorder';
import AdUser from '../../Components/AdUser/AdUser';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/listproduct' element={<ListProduct/>}/>
      <Route path='/inventory' element={<Inventory/>}/>
      <Route path='/adaccount' element={<Adaccount/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/adorder' element={<Adorder/>}/>

      <Route path='/user' element={<AdUser/>}/>
      <Route path='/listproduct' element={<ListProduct/>}/>
      <Route path='/listproduct' element={<ListProduct/>}/>
       <Route path='/listproduct' element={<ListProduct/>}/>
     
      </Routes>

    </div>
  );
};

export default Admin;
