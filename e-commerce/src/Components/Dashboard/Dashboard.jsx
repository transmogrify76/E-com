// dashboard.jsx

import React, { useState } from 'react';
import './Dashboard.css'; // Import your CSS for styling

// Dummy data for illustration
const salesData = [
  { month: 'January', sales: 100 },
  { month: 'February', sales: 200 },
  { month: 'March', sales: 150 },
  // Add more data as needed
];

const productData = [
  { id: 1, name: 'Product 1', price: 50, stock: 20 },
  { id: 2, name: 'Product 2', price: 100, stock: 10 },
  // Add more products as needed
];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('sales');

  const renderSalesData = () => (
    <div className="dashboard-content">
      <h2>Sales Data</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((data, index) => (
            <tr key={index}>
              <td>{data.month}</td>
              <td>{data.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderProductData = () => (
    <div className="dashboard-content">
      <h2>Product Analytics</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="sidebar">
        <button onClick={() => setSelectedTab('sales')}>Sales Data</button>
        <button onClick={() => setSelectedTab('products')}>Product Analytics</button>
        {/* Add more buttons for other dashboard sections */}
      </div>
      <div className="main-content">
        {selectedTab === 'sales' && renderSalesData()}
        {selectedTab === 'products' && renderProductData()}
        {/* Add more conditions for other dashboard sections */}
      </div>
    </div>
  );
};

export default Dashboard;
