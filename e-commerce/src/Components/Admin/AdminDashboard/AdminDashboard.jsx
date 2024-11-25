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

  // Retrieve sellerId dynamically from localStorage (or any other auth method)
  const sellerId = localStorage.getItem('sellerId'); // Example of getting sellerId from localStorage

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
          fetch(`http://localhost:5000/analytics?sellerId=${sellerId}&type=totalUsers`, { headers }),
          fetch(`http://localhost:5000/analytics?sellerId=${sellerId}&type=totalProducts`, { headers }),
          fetch(`http://localhost:5000/analytics?sellerId=${sellerId}&type=weeklyOrders&startMonthYear=2024-11&endMonthYear=2024-12`, { headers }), // Adjusted weeklyOrders endpoint
          fetch(`http://localhost:5000/analytics?sellerId=${sellerId}&type=recentOrders`, { headers }),
          fetch(`http://localhost:5000/analytics?sellerId=${sellerId}&type=percentageOrdersLost`, { headers }),
          fetch(`http://localhost:5000/analytics?sellerId=${sellerId}&type=percentageOrdersGained`, { headers }),
          fetch(`http://localhost:5000/analytics?sellerId=${sellerId}&type=topSellingProduct`, { headers }),
          fetch(`http://localhost:5000/analytics?sellerId=${sellerId}&type=topRevenueGeneratingProduct`, { headers }),
          fetch(`http://localhost:5000/analytics?sellerId=${sellerId}&type=totalRevenue`, { headers })
        ]);

        const data = await Promise.all(responses.map(res => res.json()));

        setTotalUsers(data[0].data.totalUsers);
        setTotalProducts(data[1].data.totalProducts);
        setWeeklyOrders(data[2].data.weeklyOrders); // Using API response for weekly orders
        setRecentOrders(data[3].data.recentOrders);
        setOrdersLostPercentage(data[4].data.percentageOrdersLost); // Set orders lost percentage
        setOrdersGainedPercentage(data[5].data.percentageOrdersGained); // Set orders gained percentage
        setTopSellingProduct(data[6].data.topSellingProducts); // Set top selling products
        setTopRevenueGeneratingProduct(data[7].data.topRevenueGeneratingProducts); // Set top revenue generating products
        setTotalRevenue(data[8].data.totalRevenue);

        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId]); // Effect runs when sellerId changes

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

  // Top Selling Products Mapping
  const formatTopSellingProducts = () => {
    return topSellingProduct.map(([productId, quantity]) => (
      <li key={productId}>
        <strong>Product ID:</strong> {productId} - Sold: {quantity} units
      </li>
    ));
  };

  // Top Revenue Generating Products Mapping
  const formatTopRevenueGeneratingProducts = () => {
    return topRevenueGeneratingProduct.map(([productId, revenue]) => (
      <li key={productId}>
        <strong>Product ID:</strong> {productId} - Revenue: ₹{revenue}
      </li>
    ));
  };

  return (
    <div className="admin-dashboard">
      <main className="dashboard-main">
        <div className="admin-main-content">
          <div className="dashboard-overview">
            <h2>Admin Dashboard</h2>
            <div className="dashboard-widgets">
              <div className="dashboard-widget users-widget">
                <h3>Total Users</h3>
                <div className="widget-content">
                  <span className="widget-icon"><FaUsers /></span>
                  <span className="widget-data">{totalUsers}</span>
                </div>
              </div>

              <div className="dashboard-widget products-widget">
                <h3>Total Products</h3>
                <div className="widget-content">
                  <span className="widget-icon"><FaBoxOpen /></span>
                  <span className="widget-data">{totalProducts}</span>
                </div>
              </div>

              <div className="dashboard-widget sales-widget">
                <h3>Total Sales</h3>
                <div className="widget-content">
                  <span className="widget-icon"><FaMoneyBillAlt /></span>
                  <span className="widget-data">₹{totalRevenue}</span>
                </div>
              </div>

              <div className="dashboard-widget lost-orders-widget" style={{ backgroundColor: '#f8d7da' }}>
                <h3>Orders Lost (%)</h3>
                <div className="widget-content">
                  <span className="widget-icon"><FaChartLine /></span>
                  <span className="widget-data">{ordersLostPercentage}%</span>
                </div>
              </div>

              <div className="dashboard-widget gained-orders-widget" style={{ backgroundColor: '#d4edda' }}>
                <h3>Orders Gained (%)</h3>
                <div className="widget-content">
                  <span className="widget-icon"><FaChartLine /></span>
                  <span className="widget-data">{ordersGainedPercentage}%</span>
                </div>
              </div>
            </div>

            <div className="dashboard-charts">
              <div className="chart-widget">
                <h3>Weekly Orders Overview</h3>
                <Bar data={weeklySalesData} />
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="recent-orders">
            <h3>Recent Orders</h3>
            <table className="orders-table">
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
                        <td>{new Date(order.orderedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Products Section */}
          <div className="top-products">
            <h3>Top Selling Products</h3>
            <ul>
              {topSellingProduct.length > 0 ? formatTopSellingProducts() : <p>No top-selling products found.</p>}
            </ul>
          </div>

          {/* Top Revenue Generating Products Section */}
          <div className="top-revenue-products">
            <h3>Top Revenue Generating Products</h3>
            <ul>
              {topRevenueGeneratingProduct.length > 0 ? formatTopRevenueGeneratingProducts() : <p>No top revenue generating products found.</p>}
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
