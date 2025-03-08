import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaMoneyBillAlt } from 'react-icons/fa';
import './WholesaleSellerdashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WholesaleSellerDashboard = () => {
  const navigate = useNavigate();
  const [isWholesaleSellerDashboard, setIsWholesaleSellerDashboard] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [topRevenueGeneratingProducts, setTopRevenueGeneratingProducts] = useState([]);
  const [weeklyOrders, setWeeklyOrders] = useState([]);

  const sellerId = localStorage.getItem('sellerId'); // Get sellerId from localStorage

  useEffect(() => {
    if (!sellerId) {
      navigate('/login');
    }
  }, [sellerId, navigate]);

  // Fetch data from APIs
  useEffect(() => {
    if (!sellerId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = new Headers();
        headers.append('Cache-Control', 'no-cache');

        // Fetch Total Users
        const usersResponse = await fetch(
          `http://localhost:5000/analytics?sellerId=${sellerId}&type=totalUsers`,
          { headers }
        );
        const usersData = await usersResponse.json();
        setTotalUsers(usersData.data.totalUsers);

        // Fetch Total Products
        const productsResponse = await fetch(
          `http://localhost:5000/analytics?sellerId=${sellerId}&type=totalProducts`,
          { headers }
        );
        const productsData = await productsResponse.json();
        setTotalProducts(productsData.data.totalProducts);

        // Fetch Recent Orders
        const ordersResponse = await fetch(
          `http://localhost:5000/analytics?sellerId=${sellerId}&type=recentOrders`,
          { headers }
        );
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData.data.recentOrders || []);

        // Fetch Top Selling Products
        const topSellingResponse = await fetch(
          `http://localhost:5000/analytics?sellerId=${sellerId}&type=topSellingProduct`,
          { headers }
        );
        const topSellingData = await topSellingResponse.json();
        const topSellingProducts = topSellingData.data.topSellingProducts || [];

        // Fetch product details for each top-selling product
        const productDetailsPromises = topSellingProducts.map(async ([productId, sales]) => {
          const productResponse = await fetch(`http://localhost:5000/products/${productId}`);
          const productData = await productResponse.json();
          return { ...productData, sales };
        });

        // Wait for all product details to be fetched
        const productDetails = await Promise.all(productDetailsPromises);
        setTopSellingProducts(productDetails);

        // Fetch Top Revenue Generating Products
        const revenueProductsResponse = await fetch(
          `http://localhost:5000/analytics?sellerId=${sellerId}&type=topRevenueGeneratingProduct&startMonthYear=2024-11&endMonthYear=2024-12`,
          { headers }
        );
        const revenueProductsData = await revenueProductsResponse.json();
        const revenueProducts = revenueProductsData.data.topRevenueGeneratingProducts || [];

        // Fetch product details for revenue-generating products
        const revenueProductDetailsPromises = revenueProducts.map(async ([productId, revenue]) => {
          const productResponse = await fetch(`http://localhost:5000/products/${productId}`);
          const productData = await productResponse.json();
          return { ...productData, revenue };
        });

        const revenueProductDetails = await Promise.all(revenueProductDetailsPromises);
        setTopRevenueGeneratingProducts(revenueProductDetails);

        // Fetch Weekly Orders for Order Trends
        const weeklyOrdersResponse = await fetch(
          `http://localhost:5000/analytics?sellerId=${sellerId}&type=weeklyOrders`,
          { headers }
        );
        const weeklyOrdersData = await weeklyOrdersResponse.json();
        if (Array.isArray(weeklyOrdersData.data.weeklyOrders)) {
          setWeeklyOrders(weeklyOrdersData.data.weeklyOrders);
        } else {
          console.error('weeklyOrders is not an array', weeklyOrdersData);
          setWeeklyOrders([]); 
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Calculate total sales for recent orders
  const totalRecentOrders = recentOrders.length;
  const totalSales = recentOrders.reduce((total, order) => {
    const orderTotal = order.orderedItems.reduce((sum, item) => sum + (item.priceAfterDiscount * item.quantity), 0);
    return total + orderTotal;
  }, 0);

  // Sales Data for Weekly Orders Chart
  const salesData = {
    labels: weeklyOrders.length > 0 ? weeklyOrders.map(order => order.week) : ['Week 1', 'Week 2', 'Week 3'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: weeklyOrders.length > 0 ? weeklyOrders.map(order => order.sales) : [50, 60, 70],
      },
    ],
  };

  // Chart data for Order Trends
  const orderTrendsData = {
    labels: weeklyOrders.length > 0 ? weeklyOrders.map(order => order.week) : ['Week 1', 'Week 2', 'Week 3'],
    datasets: [
      {
        label: 'Orders',
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        data: weeklyOrders.length > 0 ? weeklyOrders.map(order => order.orders) : [10, 20, 30],
      },
    ],
  };

  return (
    <div className="wholesale-seller-dashboard">
      <main className="dashboard-main">
        <div className="wholesale-seller-main-content">
          {isWholesaleSellerDashboard && (
            <div className="dashboard-overview">
              <h2>Dashboard Overview</h2>
              <div className="dashboard-navigation">
                <button onClick={() => navigate('/dashboard')} className="toggle-button">
                  Switch to User Dashboard
                </button>
              </div>
              <div className="dashboard-widgets">
                <div className="dashboard-widget users-widget">
                  <h3>Total Users</h3>
                  <div className="widget-content">
                    <span className="widget-icon"><FaUsers /></span>
                    <span className="widget-data">{totalUsers || 0}</span>
                  </div>
                </div>

                <div className="dashboard-widget products-widget">
                  <h3>Total Products</h3>
                  <div className="widget-content">
                    <span className="widget-icon"><FaBoxOpen /></span>
                    <span className="widget-data">{totalProducts || 0}</span>
                  </div>
                </div>

                <div className="dashboard-widget sales-widget">
                  <h3>Total Sales</h3>
                  <div className="widget-content">
                    <span className="widget-icon"><FaMoneyBillAlt /></span>
                    <span className="widget-data">₹{totalSales}</span>
                  </div>
                </div>

                <div className="dashboard-widget orders-widget">
                  <h3>Recent Orders</h3>
                  <div className="widget-content">
                    {totalRecentOrders > 0 ? (
                      <>
                        <ul className="recent-orders-list">
                          {recentOrders.slice(0, 5).map((order, index) => (
                            <li key={index}>
                              Order #{index + 1} - {order.orderedItems.map(item => item.productId).join(', ')}
                              <br />
                              Total: ₹{order.orderedItems.reduce((sum, item) => sum + (item.priceAfterDiscount * item.quantity), 0)}
                            </li>
                          ))}
                        </ul>
                        <p>Total Recent Orders: {totalRecentOrders}</p>
                      </>
                    ) : (
                      <p>No recent orders found.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="dashboard-charts">
                <div className="chart-widget">
                  <h3>Sales Overview</h3>
                  <Bar data={salesData} />
                </div>
                <div className="chart-widget">
                  <h3>Order Trends</h3>
                  <Bar data={orderTrendsData} />
                </div>
              </div>
            </div>
          )}

          {/* Product Management Section */}
          <div className="product-management">
            <h2>Product Management</h2>
            <button onClick={() => navigate('/productmanagement')} className="add-product-button">
              Add New Product
            </button>
            <div className="product-list">
              <h3>Top Selling Products</h3>
              <ul>
                {topSellingProducts.length > 0 ? (
                  topSellingProducts.map((product, index) => (
                    <li key={index}>
                      <strong>{product.name}</strong> - Sold: {product.sales} units
                    </li>
                  ))
                ) : (
                  <p>No top-selling products found.</p>
                )}
              </ul>
            </div>

            {/* Top Revenue Generating Products Section */}
            <div className="product-list">
              <h3>Top Revenue Generating Products</h3>
              <ul>
                {topRevenueGeneratingProducts.length > 0 ? (
                  topRevenueGeneratingProducts.map((product, index) => (
                    <li key={index}>
                      <strong>{product.name}</strong> - Revenue: ₹{product.revenue}
                    </li>
                  ))
                ) : (
                  <p>No revenue generating products found.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Sales History Section */}
          <div className="sales-history">
            <h2>Sales History</h2>
            <table className="sales-history-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Amount (₹)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 5).map((order, index) => (
                  <React.Fragment key={index}>
                    {order.orderedItems.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td>{order.orderId}</td>
                        <td>{item.productId}</td>
                        <td>{item.quantity}</td>
                        <td>₹{(item.priceAfterDiscount * item.quantity).toFixed(2)}</td>
                        <td>{new Date(order.orderedAt).toLocaleDateString('en-IN', {
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric'
                        })}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WholesaleSellerDashboard;
