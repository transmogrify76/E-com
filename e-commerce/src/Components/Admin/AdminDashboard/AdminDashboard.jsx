// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUsers, faBoxOpen, faClipboardList, faChartLine, faCog, faSignOutAlt, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
// import './AdminDashboard.css'; // Ensure to adjust path as per your project structure

// const AdminDashboard = () => {
//     const user = {
//         username: 'Admin', // Replace with actual admin username
//         avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
//     };

//     // State to manage active menu item
//     const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

//     // Function to handle click on menu item
//     const handleMenuItemClick = (itemName) => {
//         setActiveMenuItem(itemName);
//     };
//    return (
//         <div className="admin-dashboard">
//             {/* Header */}
//             <header className="header">
//                 <div className="header-left">
//                     <h1>Welcome, {user.username}!</h1>
//                 </div>
//                 <div className="header-right">
//                     <div className="user-profile">
//                         <img src={user.avatar} alt="User Avatar" className="avatar" />
//                         <span className="username">{user.username}</span>
//                     </div>
//                     <div className="notifications">
//                         <FontAwesomeIcon icon={faBell} />
//                         <span className="badge">5</span>
//                         <div className="search-bar">
//                             <input type="text" placeholder="Search..." />
//                             <button><FontAwesomeIcon icon={faSearch} /></button>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             {/* Sidebar (sidenav) */}
//             <div className="dashboard-container">
//                 <nav className="sidenav">
//                     <ul>
//                         {/* <li className={activeMenuItem === 'Dashboard' ? 'active' : ''}>
//                             <Link to="/admin/dashboard" onClick={() => handleMenuItemClick('Dashboard')}>
//                                 <FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />
//                                 Dashboard
//                             </Link>
//                         </li> */}
//                         <li className={activeMenuItem === 'Users' ? 'active' : ''}>
//                             <Link to="/Users" onClick={() => handleMenuItemClick('Users')}>
//                                 <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
//                                 Users Management
//                             </Link>
//                         </li>
//                         <li className={activeMenuItem === 'Products' ? 'active' : ''}>
//                             <Link to="/Products" onClick={() => handleMenuItemClick('Products')}>
//                                 <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '8px' }} />
//                                 Products Management
//                             </Link>
//                         </li>
//                         <li className={activeMenuItem === 'Orders' ? 'active' : ''}>
//                             <Link to="/Order" onClick={() => handleMenuItemClick('Order')}>
//                                 <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
//                                 Orders Management
//                             </Link>
//                         </li>
//                         <li className={activeMenuItem === 'Reports' ? 'active' : ''}>
//                             <Link to="/Reports" onClick={() => handleMenuItemClick('Reports')}>
//                                 <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
//                                 Reports & Analytics
//                             </Link>
//                         </li>
//                         <li className={activeMenuItem === 'Settings' ? 'active' : ''}>
//                             <Link to="/Setting" onClick={() => handleMenuItemClick('Setting')}>
//                                 <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
//                                 Settings
//                             </Link>
//                         </li>
//                         <li>
//                             <a href="/Logout">
//                                 <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
//                                 Logout
//                             </a>
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* Main Content */}
//                 <main className="dashboard-main">
//                     <div className="admin-main-content">
//                         <h2>Dashboard Overview</h2>
//                         <p>Admin dashboard content...</p>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBoxOpen, faClipboardList, faChartLine, faCog, faSignOutAlt, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css'; // Ensure to adjust path as per your project structure

const AdminDashboard = () => {
    const user = {
        username: 'Admin', // Replace with actual admin username
        avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
    };

    // State to manage active menu item
    const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

    // Function to handle click on menu item
    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <h1>Welcome, {user.username}!</h1>
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <img src={user.avatar} alt="User Avatar" className="avatar" />
                        <span className="username">{user.username}</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="badge">5</span>
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." />
                            <button><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar (sidenav) */}
            <div className="dashboard-container">
                <nav className="sidenav">
                    <ul>
                        <li className={activeMenuItem === 'Dashboard' ? 'active' : ''}>
                            <Link to="/admin/dashboard" onClick={() => handleMenuItemClick('Dashboard')}>
                                <FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />
                                Dashboard
                            </Link>
                        </li>
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
                            <Link to="/Order" onClick={() => handleMenuItemClick('Orders')}>
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
                            <Link to="/Settings" onClick={() => handleMenuItemClick('Settings')}>
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
