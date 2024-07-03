// import React from 'react';
// import './SellerNavbar.css';
// import { Link } from 'react-router-dom';
// import { IoSearch } from "react-icons/io5";
// import { FaBell } from 'react-icons/fa'; // Import notification icon
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// function SellerNavbar() {
//     // Placeholder values or components
//     const notificationCount = 3; // Example notification count
//     const userAvatarUrl = 'https://via.placeholder.com/40'; // Example user avatar URL
//     const username = 'John Doe'; // Example username

//     return (
//         <div className="navbar">
//             <div className="nav-logo">
//                 {/* <img src={logo} alt='logo' /> */}
//                 <p style={{ color: 'white' }}>E-Com</p>
//             </div>

//             <ul className="nav-menu">
//                 {/* <li>
                  
//                     <Link to="/dashboard">Dashboard</Link>
//                 </li>
//                 <li>
//                     <Link to="/products">Products</Link>
//                 </li>
//                 */}
//             </ul>

//             <div className='headerSearch'>
//                 <input type='text' />
//                 <button className='btn-search'><IoSearch /></button>
//             </div>

//             <div className="notifications">
//                         <FontAwesomeIcon icon={FaBell} />
//                         <span className="badge">5</span>
                        
//                     </div>
//                 {/* User avatar and username */}
//                 <div className="user-profile">
//                     <img src={userAvatarUrl} alt="User Avatar" className="avatar" />
//                     <span className="username">{username}</span>
//                 </div>
//             </div>

       
//     );
// }

// export default SellerNavbar;

import React from 'react';
import './SellerNavbar.css';
import { IoSearch } from "react-icons/io5";
import { FaBell } from 'react-icons/fa'; // Import notification icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function SellerNavbar() {
    // Placeholder values or components
    const notificationCount = 5; // Example notification count
    const userAvatarUrl = 'https://via.placeholder.com/40'; // Example user avatar URL
    const username = 'John Doe'; // Example username

    return (
        <div className="navbar">
            <div className="nav-logo">
                {/* <img src={logo} alt='logo' /> */}
                <p style={{ color: 'white' }}>E-Com</p>
            </div>

            <ul className="nav-menu">
                {/* Your menu items can go here */}
                {/* <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li> */}
                {/* Add more menu items as needed */}
            </ul>

            <div className='headerSearch'>
                <input type='text' placeholder="Search..." />
                <button className='btn-search'><IoSearch /></button>
            </div>

            <div className="notifications">
                <FontAwesomeIcon icon={faBell} className="notification-icon" />
                <span className="badge">{notificationCount}</span>
            </div>

            {/* User avatar and username */}
            <div className="user-profile">
                <img src={userAvatarUrl} alt="User Avatar" className="avatar" />
                <span className="username">{username}</span>
            </div>
        </div>
    );
}

export default SellerNavbar;
