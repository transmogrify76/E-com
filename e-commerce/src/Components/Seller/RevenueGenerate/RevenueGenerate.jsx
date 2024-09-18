
import React, { useState } from 'react';
import './RevenueGenerate.css'; // Make sure this path is correct
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

const RevenueGenerate = () => {
    const [revenueData, setRevenueData] = useState([
        { id: 1, month: 'January', revenue: 1000 },
        { id: 2, month: 'February', revenue: 1500 },
        { id: 3, month: 'March', revenue: 1800 },
        { id: 4, month: 'April', revenue: 1200 },
        { id: 5, month: 'May', revenue: 2000 },
        { id: 6, month: 'June', revenue: 2500 }
    ]);
    const [newRevenue, setNewRevenue] = useState('');

    // Function to generate revenue for July
    const generateRevenue = () => {
        if (newRevenue) {
            const newData = { id: revenueData.length + 1, month: 'July', revenue: parseFloat(newRevenue) };
            setRevenueData([...revenueData, newData]);
            setNewRevenue(''); // Clear input after submission
        }
    };

    // Chart data
    const chartData = {
        labels: revenueData.map(data => data.month),
        datasets: [
            {
                label: 'Monthly Revenue (₹)',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: revenueData.map(data => data.revenue),
            },
        ],
    };

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
            {/* Header */}
            <header className="revenue-header">
                <h2>Revenue Generation</h2>
                <div className="revenue-user-info">
                    <span className="username">Seller Name</span> {/* Replace with actual username */}
                </div>
            </header>

            {/* Revenue Generation Section */}
            <div className="revenue-generate-section">
                <h3>Generate Revenue</h3>
                <input
                    type="number"
                    value={newRevenue}
                    onChange={(e) => setNewRevenue(e.target.value)}
                    placeholder="Enter revenue amount (₹)"
                    className="revenue-input"
                />
                <button onClick={generateRevenue} className="generate-revenue-button">Generate Revenue</button>
            </div>

            {/* Bar Chart Section */}
            <div className="revenue-chart">
                <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Revenue Table Section */}
            <div className="revenue-table-container">
                <h3 className="table-title">Revenue Summary</h3>
                <table className="revenue-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Revenue (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revenueData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.month}</td>
                                <td>{data.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Analytics Overview */}
            <div className="analytics-overview">
                <h3>Analytics Overview</h3>
                <div className="analytics-card">
                    <h4>Total Revenue</h4>
                    <p>₹{revenueData.reduce((acc, item) => acc + item.revenue, 0)}</p>
                </div>
                <div className="analytics-card">
                    <h4>Average Monthly Revenue</h4>
                    <p>₹{(revenueData.reduce((acc, item) => acc + item.revenue, 0) / revenueData.length).toFixed(2)}</p>
                </div>
            </div>

            {/* Recent Activities Section */}
            <div className="recent-activities">
                <h3>Recent Activities</h3>
                <ul>
                    <li>Sale of Product X on June 30 - ₹500</li>
                    <li>Sale of Product Y on June 28 - ₹700</li>
                    <li>Promotion for Product Z on June 25 - ₹300</li>
                </ul>
            </div>

            {/* Export Options Section */}
            <div className="export-options">
                <button className="export-button">Export as CSV</button>
                <button className="export-button">Export as PDF</button>
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
