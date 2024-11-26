import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaUsers, FaBoxOpen, FaMoneyBillAlt, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './AdminDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [weeklyOrders, setWeeklyOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLostPercentage, setOrdersLostPercentage] = useState(0);
  const [ordersGainedPercentage, setOrdersGainedPercentage] = useState(0);
  const [topSellingProduct, setTopSellingProduct] = useState([]);
  const [topRevenueGeneratingProduct, setTopRevenueGeneratingProduct] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]); // Default to empty array
  const [isSellerDashboard, setIsSellerDashboard] = useState(false); // State to toggle between dashboards

  // Retrieve sellerId dynamically from localStorage (or any other auth method)
  const sellerId = localStorage.getItem('sellerId');

  useEffect(() => {
    const fetchData = async () => {
      if (!sellerId) {
        setError('Seller ID not found. Please log in.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const headers = new Headers();
        headers.append('Cache-Control', 'no-cache');

        // Fetch data for total users, total products, weekly orders, etc.
        const responses = await Promise.all([
          fetch(`http://localhost:5000/admin_analytics?type=totalUsers`, { headers }),
          fetch(`http://localhost:5000/admin_analytics?type=totalProducts`, { headers }),
          fetch(`http://localhost:5000/admin_analytics?type=weeklyOrders`, { headers }),
          fetch(`http://localhost:5000/admin_analytics?type=recentOrders`, { headers }),
          fetch(`http://localhost:5000/admin_analytics?type=percentageOrdersLost`, { headers }),
          fetch(`http://localhost:5000/admin_analytics?type=percentageOrdersGained`, { headers }),
          fetch(`http://localhost:5000/admin_analytics?type=topSellingProduct`, { headers }),
          fetch(`http://localhost:5000/admin_analytics?type=topRevenueGeneratingProduct`, { headers }),
          fetch(`http://localhost:5000/admin_analytics?type=totalRevenue`, { headers }),
          fetch(`http://localhost:5000/admin_analytics?type=monthlyRevenue&startMonthYear=2024-11&endMonthYear=2024-11`, { headers }) // Monthly Revenue API
        ]);

        const data = await Promise.all(responses.map(res => res.json()));

        setTotalUsers(data[0].data.totalUsers);
        setTotalProducts(data[1].data.totalProducts);
        setWeeklyOrders(data[2].data.weeklyOrders);
        setRecentOrders(data[3].data.recentOrders);
        setOrdersLostPercentage(data[4].data.percentageOrdersLost);
        setOrdersGainedPercentage(data[5].data.percentageOrdersGained);
        setTopSellingProduct(data[6].data.topSellingProducts);
        setTopRevenueGeneratingProduct(data[7].data.topRevenueGeneratingProducts);
        setTotalRevenue(data[8].data.totalRevenue);
        setMonthlyRevenue(data[9].data.monthlyRevenue || []); // Ensure it's an array or empty array if not set

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

  // Weekly Sales Chart Data
  const weeklySalesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Dummy weeks, can be replaced with actual week labels
    datasets: [
      {
        label: 'Orders',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: weeklyOrders.length > 0 ? weeklyOrders.map(order => order) : [1, 1, 1, 1], // Mocking data if not available
      },
    ],
  };

  // Monthly Revenue Chart
  const monthlyRevenueData = {
    labels: monthlyRevenue && Array.isArray(monthlyRevenue) ? monthlyRevenue.map(item => item.month) : [], // Ensure monthlyRevenue is an array before mapping
    datasets: [
      {
        label: 'Monthly Revenue (₹)',
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        data: monthlyRevenue && Array.isArray(monthlyRevenue) ? monthlyRevenue.map(item => item.revenue) : [], // Ensure monthlyRevenue is an array before mapping
      },
    ],
  };

  // Top Revenue Generating Products Chart
  const topRevenueGeneratingProductData = {
    labels: topRevenueGeneratingProduct && Array.isArray(topRevenueGeneratingProduct) 
      ? topRevenueGeneratingProduct.map(item => item.productId) : [], // Use product IDs as labels
    datasets: [
      {
        label: 'Revenue (₹)',
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        data: topRevenueGeneratingProduct && Array.isArray(topRevenueGeneratingProduct) 
          ? topRevenueGeneratingProduct.map(item => item.revenue) : [], // Use revenue as data points
      },
    ],
  };

  // Toggle Dashboard View
  const toggleDashboard = () => {
    setIsSellerDashboard(prev => !prev);
  };

  return (
    <div className="admin-dashboard">
     

      <main className="dashboard-main">
        <div className="admin-main-content">
          {/* Admin Dashboard Content */}
          {!isSellerDashboard ? (
            <div className="dashboard-overview">
              <h2>Admin Dashboard</h2>
              <div className="dashboard-widgets">
                {/* Total Users Widget */}
                <div className="dashboard-widget users-widget">
                  <h3>Total Users</h3>
                  <div className="widget-content">
                    <span className="widget-icon"><FaUsers /></span>
                    <span className="widget-data">{totalUsers}</span>
                  </div>
                </div>

                {/* Total Products Widget */}
                <div className="dashboard-widget products-widget">
                  <h3>Total Products</h3>
                  <div className="widget-content">
                    <span className="widget-icon"><FaBoxOpen /></span>
                    <span className="widget-data">{totalProducts}</span>
                  </div>
                </div>

                {/* Total Sales Widget */}
                <div className="dashboard-widget sales-widget">
                  <h3>Total Sales</h3>
                  <div className="widget-content">
                    <span className="widget-icon"><FaMoneyBillAlt /></span>
                    <span className="widget-data">₹{totalRevenue}</span>
                  </div>
                </div>

                {/* Orders Lost Widget */}
                <div className="dashboard-widget lost-orders-widget" style={{ backgroundColor: '#f8d7da' }}>
                  <h3>Orders Lost (%)</h3>
                  <div className="widget-content">
                    <span className="widget-icon"><FaChartLine /></span>
                    <span className="widget-data">{ordersLostPercentage}%</span>
                  </div>
                </div>

                {/* Orders Gained Widget */}
                <div className="dashboard-widget gained-orders-widget" style={{ backgroundColor: '#d4edda' }}>
                  <h3>Orders Gained (%)</h3>
                  <div className="widget-content">
                    <span className="widget-icon"><FaChartLine /></span>
                    <span className="widget-data">{ordersGainedPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="dashboard-charts">
                <div className="chart-widget">
                  <h3>Weekly Orders Overview</h3>
                  <Bar data={weeklySalesData} />
                </div>

                {/* Monthly Revenue Chart */}
                <div className="chart-widget">
                  <h3>Monthly Revenue Overview</h3>
                  <Bar data={monthlyRevenueData} />
                </div>

                {/* Top Revenue Generating Products Chart */}
                <div className="chart-widget">
                  <h3>Top Revenue Generating Products</h3>
                  <Bar data={topRevenueGeneratingProductData} />
                </div>
              </div>

              {/* Top Selling Products List */}
              <div className="top-products">
                <h3>Top Selling Products</h3>
                <ul>
                  {topSellingProduct.length > 0 ? topSellingProduct.map(([productId, quantity]) => (
                    <li key={productId}>
                      <strong>Product ID:</strong> {productId} - Sold: {quantity} units
                    </li>
                  )) : <p>No top-selling products found.</p>}
                </ul>
              </div>

              {/* Top Revenue Products List */}
              <div className="top-revenue-products">
                <h3>Top Revenue Generating Products</h3>
                <ul>
                  {topRevenueGeneratingProduct.length > 0 ? topRevenueGeneratingProduct.map(([productId, revenue]) => (
                    <li key={productId}>
                      <strong>Product ID:</strong> {productId} - Revenue: ₹{revenue}
                    </li>
                  )) : <p>No top revenue generating products found.</p>}
                </ul>
              </div>
            </div>
          ) : (
            <div className="seller-dashboard">
              <h2>Seller Dashboard</h2>
              {/* Seller Dashboard content goes here */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


