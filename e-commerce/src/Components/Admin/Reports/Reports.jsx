import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faClipboardList, faChartLine, faCog, faSignOutAlt, faBell, faSearch,faSave,faTimes,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';

import './Reports.css'; // Adjust path as per your project structure
import { FaBoxOpen } from 'react-icons/fa';

const Reports = () => {
    const user = {
        username: 'Admin', // Replace with actual admin username
        avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
    };

    const [activeMenuItem, setActiveMenuItem] = useState('Reports');
    const [reports, setReports] = useState([
        { id: 1, title: 'Sales Report', description: 'Monthly sales data', author: 'Admin', date: '2024-06-25' },
        { id: 2, title: 'User Engagement Report', description: 'Website user activity', author: 'Admin', date: '2024-06-24' },
        { id: 3, title: 'Inventory Report', description: 'Current stock levels', author: 'Admin', date: '2024-06-23' },
    ]);
    const [editingReport, setEditingReport] = useState(null);

    const handleEditReport = (reportId) => {
        const reportToEdit = reports.find(report => report.id === reportId);
        setEditingReport({ ...reportToEdit }); // Copy the report to edit to avoid mutating state directly
    };

    const cancelEdit = () => {
        setEditingReport(null);
    };

    const saveReport = () => {
        const updatedReports = reports.map(report =>
            report.id === editingReport.id ? editingReport : report
        );
        setReports(updatedReports);
        setEditingReport(null);
    };

    const handleDeleteReport = (reportId) => {
        const updatedReports = reports.filter(report => report.id !== reportId);
        setReports(updatedReports);
        setEditingReport(null); // Clear editing state if deleting the currently edited report
    };

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingReport(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <h2>Reports & Analytics</h2>
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="badge">5</span>
         
                    </div>
                </div>
            </header>

            {/* Sidebar (sidenav) */}
            <div className="admin-container">
                <nav className="sidenav">
                    <ul>
                        <li className={activeMenuItem === 'Users' ? 'active' : ''}>
                            <Link to="/Users" onClick={() => handleMenuItemClick('Users')}>
                                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
                                Users Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Products' ? 'active' : ''}>
                            <Link to="/Products" onClick={() => handleMenuItemClick('Products')}>
                                <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '8px' }} />
                                Products Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Orders' ? 'active' : ''}>
                            <Link to="/Order" onClick={() => handleMenuItemClick('Order')}>
                                <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                                Orders Management
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Reports' ? 'active' : ''}>
                            <Link to="/Reports" onClick={() => handleMenuItemClick('Reports')}>
                                <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
                                Reports & Analytics
                            </Link>
                        </li>
                        <li className={activeMenuItem === 'Settings' ? 'active' : ''}>
                            <Link to="/Setting" onClick={() => handleMenuItemClick('Setting')}>
                                <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                                Settings
                            </Link>
                        </li>
                        <li>
                            <a href="/Logout">
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="admin-main-content">
                        {/* Reports & Analytics */}
                        <div className="reports-analytics">
                            <h2>Reports & Analytics</h2>
                            <div className="reports-list">
                                {reports.map(report => (
                                    <div className="report-item" key={report.id}>
                                        {editingReport && editingReport.id === report.id ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={editingReport.title}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={editingReport.description}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="author"
                                                    value={editingReport.author}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="date"
                                                    value={editingReport.date}
                                                    onChange={handleInputChange}
                                                />
                                                <button onClick={saveReport}>Save</button>
                                                <button onClick={cancelEdit}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div>
                                                <p><strong>Title:</strong> {report.title}</p>
                                                <p><strong>Description:</strong> {report.description}</p>
                                                <p><strong>Author:</strong> {report.author}</p>
                                                <p><strong>Date:</strong> {report.date}</p>
                                                <div className="report-actions">
                                                    <button onClick={() => handleEditReport(report.id)}>
                                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteReport(report.id)}>
                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Reports;
