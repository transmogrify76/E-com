// RevenueGenerate.jsx
import React, { useState } from 'react';
import './RevenueGenerate.css'; // Ensure to adjust path as per your project structure
import { Link } from 'react-router-dom';

const RevenueGenerate = () => {
    // Mock data for revenue statistics (replace with actual data handling)
    const [revenueData, setRevenueData] = useState([
        { id: 1, month: 'January', revenue: 1000 },
        { id: 2, month: 'February', revenue: 1500 },
        { id: 3, month: 'March', revenue: 1800 },
        { id: 4, month: 'April', revenue: 1200 },
        { id: 5, month: 'May', revenue: 2000 },
        { id: 6, month: 'June', revenue: 2500 }
    ]);

    return (
        <div className="app-container">
            {/* Header */}
            <header>
                <h1>Revenue Generation</h1>
                {/* Add any additional header content here */}
            </header>

            {/* Side Navigation (sidenav) */}
            <nav className="sidenav">
                <ul>
                <li><Link to="/seller-dashboard">Dashboard</Link></li>
                <li><Link to="/ProductUpload">Product Upload</Link></li>
                <li><Link to="/ExistingProduct">Excisting Products</Link></li>
                <li><Link to="/Orderr">Orders</Link></li>
                <li><Link to="/Dispatch">Dispatch</Link></li>
                <li><Link to="/RevenueGenerate">Revenue Generate</Link></li>
                <li><Link to="/Settings">Settings</Link></li>
                    {/* Add more navigation items as needed */}
                </ul>
            </nav>

            {/* Main Content */}
            <div className="revenue-generate-container">
                <h2>Revenue Statistics</h2>
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

                <div className="revenue-chart">
                    {revenueData.map((data) => (
                        <div key={data.id} className="bar" style={{ height: `${data.revenue / 10}px` }}>
                            <span className="bar-label">{data.month}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RevenueGenerate;
