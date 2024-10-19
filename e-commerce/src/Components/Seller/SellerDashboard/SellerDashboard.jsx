

import React, { useState } from 'react';
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
import './SellerDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SellerDashboard = () => {
    const navigate = useNavigate();
    const [isSellerDashboard, setIsSellerDashboard] = useState(true); // State to manage dashboard type

    const salesData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [65, 59, 80, 81, 56, 55, 40],
            },
        ],
    };

    const orderTrendsData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Orders',
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                data: [12, 19, 3, 5],
            },
        ],
    };

    const handleAddProduct = () => {
        navigate('/ProductUpload');
    };

    // Toggle function to switch between dashboards
    const toggleDashboard = () => {
        setIsSellerDashboard(!isSellerDashboard);
        navigate(isSellerDashboard ? '/dashboard' : '/seller-dashboard'); // Navigate based on current state
    };

    return (
        <div className="seller-dashboard">
            {/* Toggle Button Section */}
          

            <main className="dashboard-mainn">
                <div className="seller-main-content">
                    {isSellerDashboard && (
                        <div className="dashboard-overvieww">
                            <h2>Dashboard Overview</h2>
                            <div className="dashboard-navigation">
                <button onClick={toggleDashboard} className="toggle-button">
                    {isSellerDashboard ? 'Switch to User Dashboard' : 'Switch to Seller Dashboard'}
                </button>
            </div>
                            <div className="dashboard-widgetss">
                                <div className="dashboard-widgett users-widget">
                                    <h3>Total Users</h3>
                                    <div className="widget-contentt">
                                        <span className="widget-iconn"><FaUsers /></span>
                                        <span className="widget-dataa">500</span>
                                    </div>
                                </div>
                                <div className="dashboard-widgett products-widget">
                                    <h3>Total Products</h3>
                                    <div className="widget-contentt">
                                        <span className="widget-iconn"><FaBoxOpen /></span>
                                        <span className="widget-dataa">200</span>
                                    </div>
                                </div>
                                <div className="dashboard-widgett sales-widget">
                                    <h3>Total Sales</h3>
                                    <div className="widget-contentt">
                                        <span className="widget-iconn"><FaMoneyBillAlt /></span>
                                        <span className="widget-dataa">₹1,500,000</span>
                                    </div>
                                </div>
                                <div className="dashboard-widgett orders-widget">
                                    <h3>Recent Orders</h3>
                                    <div className="widget-contentt">
                                        <ul className="recent-orders-listt">
                                            <li>#1234 - Product A</li>
                                            <li>#1235 - Product B</li>
                                            <li>#1236 - Product C</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-chartss">
                                <div className="chart-widgett">
                                    <h3>Sales Overview</h3>
                                    <Bar data={salesData} />
                                </div>
                               
                                <div className="chart-widgett">
                                    <h3>Order Trends</h3>
                                    <Bar data={orderTrendsData} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Management Section */}
                    <div className="product-managementt">
                        <h2>Product Management</h2>
                        <button onClick={handleAddProduct} className="add-product-button">Add New Product</button>
                        <div className="product-listt">
                            <h3>Your Products</h3>
                            <ul>
                                <li>Product 1</li>
                                <li>Product 2</li>
                                <li>Product 3</li>
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
                                    <th>Product Name</th>
                                    <th>Amount (₹)</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#1234</td>
                                    <td>Product A</td>
                                    <td>₹500</td>
                                    <td>2023-07-01</td>
                                </tr>
                                <tr>
                                    <td>#1235</td>
                                    <td>Product B</td>
                                    <td>₹800</td>
                                    <td>2023-07-10</td>
                                </tr>
                                <tr>
                                    <td>#1236</td>
                                    <td>Product C</td>
                                    <td>₹200</td>
                                    <td>2023-07-15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SellerDashboard;
