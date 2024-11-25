import React, { useState, useEffect } from 'react';
import './Revenue.css'; // Make sure this path is correct
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

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Revenue = () => {
    // Initialize states
    const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
    const [topRevenueProducts, setTopRevenueProducts] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [averageMonthlyRevenue, setAverageMonthlyRevenue] = useState(0);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] }); // Initialize with empty structure
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch sellerId from localStorage (or any other auth method)
    const sellerId = localStorage.getItem('sellerId'); // Retrieve sellerId dynamically

    // Fetch data for total revenue, average monthly revenue, and monthly revenue
    const fetchRevenueData = async () => {
        if (!sellerId) {
            setError('Seller ID not found. Please log in.');
            setLoading(false);
            return;
        }

        setLoading(true); // Show loading spinner while data is being fetched
        try {
            // Fetch Total Revenue
            const totalRevenueResponse = await axios.get(`http://localhost:5000/analytics?sellerId=${sellerId}&type=totalRevenue`);
            setTotalRevenue(totalRevenueResponse.data.data.totalRevenue);  // Extracting total revenue value

            // Fetch Average Monthly Revenue
            const averageMonthlyRevenueResponse = await axios.get(`http://localhost:5000/analytics?sellerId=${sellerId}&type=averageMonthlyRevenue`);
            setAverageMonthlyRevenue(averageMonthlyRevenueResponse.data.data.averageMonthlyRevenue); // Assuming API returns `data.averageMonthlyRevenue`

            // Fetch Monthly Revenue Data
            const monthlyRevenueResponse = await axios.get(`http://localhost:5000/analytics?sellerId=${sellerId}&type=monthlyRevenue`);
            const monthlyRevenueData = monthlyRevenueResponse.data.data; // Assuming the response is in the `data` object
            setMonthlyRevenueData(monthlyRevenueData);  // Save this for chart generation

            // Format Monthly Revenue Data for Chart
            const labels = monthlyRevenueData.map(item => item.month); // Extract months for the labels
            const revenueValues = monthlyRevenueData.map(item => item.revenue); // Extract revenue values for the chart
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
            
            // Prepare data to display (product ID and revenue)
            const topRevenueProductsList = topRevenueData.map(([productId, revenue]) => ({
                productId, 
                revenue
            }));

            setTopRevenueProducts(topRevenueProductsList);  // Update state with the product revenue data

        } catch (error) {
            console.error('Error fetching revenue data', error);
            setError('Error fetching revenue data. Please try again later.');
        } finally {
            setLoading(false); // Hide the loading spinner when the data fetch is complete
        }
    };

    // Fetch data when the component mounts or sellerId changes
    useEffect(() => {
        fetchRevenueData();
    }, [sellerId]);

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

    if (loading) return <p>Loading...</p>; // Show loading spinner or message

    if (error) return <p>{error}</p>; // Show error message if there's an issue with fetching data

    return (
        <div className="revenue-generate-container">
            {/* Header */}
            <header className="revenue-header">
                <h2>Revenue Generation</h2>
                <div className="revenue-user-info">
                    <span className="username"></span> {/* Replace with actual username */}
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

            {/* Bar Chart Section */}
            {chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
                <div className="revenue-chart">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            ) : (
                <p>No data available for the chart.</p> // Show message when there's no data
            )}

            {/* Monthly Revenue Table Section */}
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

export default Revenue;
