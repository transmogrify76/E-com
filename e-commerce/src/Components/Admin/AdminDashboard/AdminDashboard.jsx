import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers, faBoxOpen, faMoneyBillAlt,faUserFriends } from '@fortawesome/free-solid-svg-icons';
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
import './AdminDashboard.css';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const [activeMenuItem] = useState('Dashboard');
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
    return (
        <div className="admin-dashboard">
            <main className="dashboard-main">
                <div className="admin-main-content">
                    {activeMenuItem === 'Dashboard' && (
                        <div className="dashboard-overview">
                            <h2>Dashboard Overview</h2>
                            <div className="dashboard-widgets">
                                <div className="dashboard-widget users-widget">
                                    <h3>Total Users</h3>
                                    <div className="widget-content">
                                        {/* <span className="widget-icon"><FontAwesomeIcon icon={faUsers} /></span> */}
                                        <span className="widget-data">500</span>
                                    </div>
                                </div>
                                <div className="dashboard-widget products-widget">
                                    <h3>Total Products</h3>
                                    <div className="widget-content">
                                        {/* <span className="widget-icon"><FontAwesomeIcon icon={faBoxOpen} /></span> */}
                                        <span className="widget-data">200</span>
                                    </div>
                                </div>
                                <div className="dashboard-widget seller-widget">
                                    <h3>Total Sellers</h3>
                                    <div className="widget-content">
                                        {/* <span className="widget-icon"><FontAwesomeIcon icon={faUserFriends} /></span> */}
                                        <span className="widget-data">300</span>
                                    </div>
                                </div>
                                <div className="dashboard-widget sales-widget">
                                    <h3>Total Sales</h3>
                                    <div className="widget-content">
                                        {/* <span className="widget-icon"><FontAwesomeIcon icon={faMoneyBillAlt} /></span> */}
                                        <span className="widget-data">₹1,500,000</span>
                                    </div>
                                </div>
                                <div className="dashboard-widget orders-widget">
                                    <h3>Recent Orders</h3>
                                    <div className="widget-content">
                                        <ul className="recent-orders-list">
                                            <li>#1234 - Product A</li>
                                            <li>#1235 - Product B</li>
                                            <li>#1236 - Product C</li>
                                        </ul>
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
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
