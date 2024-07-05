// RevenueGenerate.jsx
import React, { useState } from 'react';
import './RevenueGenerate.css'; // Ensure to adjust path as per your project structure
import usericon from '../../Assests/user.png';


const RevenueGenerate = () => {
    const user = {
        username: 'Esha Ghosal',
    };


    // Mock data for revenue statistics (replace with actual data handling)
    const [revenueData] = useState([
        { id: 1, month: 'January', revenue: 1000 },
        { id: 2, month: 'February', revenue: 1500 },
        { id: 3, month: 'March', revenue: 1800 },
        { id: 4, month: 'April', revenue: 1200 },
        { id: 5, month: 'May', revenue: 2000 },
        { id: 6, month: 'June', revenue: 2500 }
    ]);

    return (
        <div className="revenue-generate-container">
            {/* Header */}
            <header className="revenue-header">
                <h2>Revenue Statistics</h2>
                <div className="revenue-user-info">
                    <img src={usericon} alt="User " className="user" />
                    <span className="username">{user.username}</span>
                </div>
            </header>

            {/* Main Content */}
            <div className="revenue-content">
                <div className="revenue-chart">
                    <h3 className="chart-title">Monthly Revenue Chart</h3>
                    <div className="chart-bars">
                        {revenueData.map((data) => (
                            <div key={data.id} className="chart-bar" style={{ height: `${data.revenue / 10}px` }}>
                                <span className="bar-label">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

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
            </div>
        </div>
    );
};

export default RevenueGenerate;
