
import React, { useState, useEffect } from 'react';
import './RevenueGenerate.css'; // Ensure the path is correct
import axios from 'axios';
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

// Register the necessary components for chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueGenerate = () => {
    // Initialize states
    const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
    const [topRevenueProducts, setTopRevenueProducts] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [averageMonthlyRevenue, setAverageMonthlyRevenue] = useState(0);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [sellerId, setSellerId] = useState(null);  // Start with null sellerId

    // Fetch sellerId from localStorage when the component mounts
    useEffect(() => {
        const storedSellerId = localStorage.getItem('sellerId');
        if (storedSellerId) {
            setSellerId(parseInt(storedSellerId));  // Set sellerId from localStorage
        }
    }, []);

    // Fetch revenue data from the server
    const fetchRevenueData = async () => {
        if (!sellerId) return; // Ensure sellerId is available

        try {
            // Fetch Total Revenue
            const totalRevenueResponse = await axios.get(`http://localhost:5000/analytics?sellerId=${sellerId}&type=totalRevenue`);
            setTotalRevenue(totalRevenueResponse.data.data.totalRevenue);

            // Fetch Average Monthly Revenue
            const averageMonthlyRevenueResponse = await axios.get(`http://localhost:5000/analytics?sellerId=${sellerId}&type=averageMonthlyRevenue`);
            setAverageMonthlyRevenue(averageMonthlyRevenueResponse.data.data.averageMonthlyRevenue);

            // Fetch Monthly Revenue Data
            const monthlyRevenueResponse = await axios.get(`http://localhost:5000/analytics?sellerId=${sellerId}&type=monthlyRevenue`);
            const monthlyRevenueData = monthlyRevenueResponse.data.data;
            setMonthlyRevenueData(monthlyRevenueData);

            // Format Monthly Revenue Data for Chart
            const labels = monthlyRevenueData.map(item => item.month);
            const revenueValues = monthlyRevenueData.map(item => item.revenue);
            setChartData({
                labels: labels,
                datasets: [{
                    label: 'Revenue (₹)',
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: revenueValues,
                }]
            });

            // Fetch Top Revenue Generating Products
            const topRevenueResponse = await axios.get(`http://localhost:5000/analytics?sellerId=${sellerId}&type=topRevenueGeneratingProduct`);
            const topRevenueData = topRevenueResponse.data.data.topRevenueGeneratingProducts;

            const topRevenueProductsList = topRevenueData.map(([productId, revenue]) => ({
                productId, 
                revenue
            }));
            setTopRevenueProducts(topRevenueProductsList);

        } catch (error) {
            console.error('Error fetching revenue data', error);
        }
    };

    // Fetch data when the component mounts or sellerId changes
    useEffect(() => {
        if (sellerId) {
            fetchRevenueData();
        }
    }, [sellerId]);

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Revenue Chart',
            },
        },
    };

    return (
        <div className="revenue-generate-container">
            <header className="revenue-header">
                <h2>Revenue Generation</h2>
                <div className="revenue-user-info">
                    <span className="username">Seller Name</span> {/* Replace with actual username */}
                </div>
            </header>

            {/* Total Revenue */}
            <div className="analytics-card">
                <h4>Total Revenue</h4>
                <p>₹{totalRevenue}</p>
            </div>

            {/* Average Monthly Revenue */}
            <div className="analytics-card">
                <h4>Average Monthly Revenue</h4>
                <p>₹{averageMonthlyRevenue.toFixed(2)}</p>
            </div>

            {/* Bar Chart */}
            {chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
                <div className="revenue-chart">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            ) : (
                <p>No data available for the chart.</p>
            )}

            {/* Monthly Revenue Table */}
            <div className="revenue-table-container">
                <h3 className="table-title">Monthly Revenue Summary</h3>
                <table className="revenue-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Revenue (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyRevenueData.length > 0 ? (
                            monthlyRevenueData.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.month}</td>
                                    <td>{data.revenue}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="2">No revenue data available</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Top Revenue Generating Products */}
            <div className="top-revenue-products">
                <h3>Top Revenue Generating Products</h3>
                <ul>
                    {topRevenueProducts.length > 0 ? (
                        topRevenueProducts.map((product, index) => (
                            <li key={index}>
                                Product ID: {product.productId} - ₹{product.revenue}
                            </li>
                        ))
                    ) : (
                        <li>No top revenue products found</li>
                    )}
                </ul>
            </div>

            {/* Help/Support Section */}
            <div className="help-support">
                <h3>Need Help?</h3>
                <p>If you have any questions, please contact our support team.</p>
                <button className="support-button">Contact Support</button>
            </div>
        </div>
    );
};

export default RevenueGenerate;
