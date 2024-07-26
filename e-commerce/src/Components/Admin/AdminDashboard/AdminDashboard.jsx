 
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faMoneyBillAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

const AdminDashboard = () => {
    

    // State to manage active menu item
    const [activeMenuItem] = useState('Dashboard');

    // Function to handle click on menu item
    // // const handleMenuItemClick = (itemName) => {
    //     setActiveMenuItem(itemName);
    // };

    return (
        <div className="admin-dashboard">
            {/* Header */}
           

            {/* Sidebar (sidenav) */}
            <div className="dashboard-container">
               

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="admin-main-content">
                        {/* Dashboard Overview */}
                        {activeMenuItem === 'Dashboard' && (
                            <div>
                                <h2>Dashboard Overview</h2>
                                <div className="dashboard-widgets">
                                    {/* Example Widget: Total Users */}
                                    <div className="dashboard-widget">
                                        <h3>Total Users</h3>
                                        <div className="widget-content">
                                            <span className="widget-icon"><FontAwesomeIcon icon={faUsers} /></span>
                                            <span className="widget-data">500</span>
                                        </div>
                                        
                                    </div>
                                    <div className="dashboard-widget">
                                        <h3>Total Products</h3>
                                        <div className="widget-content">
                                            <span className="widget-icon"><FontAwesomeIcon icon={faBoxOpen} /></span>
                                            <span className="widget-data">200</span>
                                        </div>
                                    </div>
                                    
                                    {/* Example Widget: Total Products */}
                                  
                                    {/* Example Widget: Recent Orders */}
                                    <div className="dashboard-widget">
                                        <h3>Recent Orders</h3>
                                        <div className="widget-content">
                                            <ul className="recent-orders-list">
                                                <li>#1234 - Product A</li>
                                                <li>#1235 - Product B</li>
                                                <li>#1236 - Product C</li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Add more widgets as needed */}
                                </div>
                            </div>
                        )}

                        {/* Users Management */}
                        {activeMenuItem === 'Users' && (
                            <div>
                                <h2>Users Management</h2>
                                <p>Manage users, view details, and perform administrative tasks.</p>
                                {/* Additional user management features can be added here */}
                            </div>
                        )}

                        {/* Products Management */}
                        {activeMenuItem === 'Products' && (
                            <div>
                                <h2>Products Management</h2>
                                <p>Manage products, inventory, pricing, and product-related settings.</p>
                                {/* Additional product management features can be added here */}
                            </div>
                        )}

                        {/* Orders Management */}
                        {activeMenuItem === 'Orders' && (
                            <div>
                                <h2>Orders Management</h2>
                                <p>View and manage customer orders, track order statuses, and handle returns.</p>
                                {/* Additional order management features can be added here */}
                            </div>
                        )}

                        {/* Reports & Analytics */}
                        {activeMenuItem === 'Reports' && (
                            <div>
                                <h2>Reports & Analytics</h2>
                                <p>Generate and analyze reports, track business performance metrics.</p>
                                {/* Additional analytics and reporting features can be added here */}
                            </div>
                        )}

                        {/* Settings */}
                        {activeMenuItem === 'Settings' && (
                            <div>
                                <h2>Settings</h2>
                                <p>Configure system settings, security options, and customize dashboard preferences.</p>
                                {/* Additional settings and customization options can be added here */}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
