import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderWidgets.css'; // Import the CSS for styling

const OrderWidgets = () => {
  // State to store order statistics
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  // Fetching order statistics and analytics
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetching data for active, completed, cancelled, and recent orders
        const [active, completed, cancelled, recent, total] = await Promise.all([
          axios.get('http://localhost:5000/admin_analytics?type=activeOrders'),
          axios.get('http://localhost:5000/admin_analytics?type=completedOrders'),
          axios.get('http://localhost:5000/admin_analytics?type=cancelledOrders'),
          axios.get('http://localhost:5000/admin_analytics?type=recentOrders'),
          axios.get('http://localhost:5000/admin_analytics?type=totalOrders'),
        ]);

        // Setting the state for each category
        setActiveOrders(active.data);
        setCompletedOrders(completed.data);
        setCancelledOrders(cancelled.data);
        setRecentOrders(recent.data);
        setTotalOrders(total.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrders();
  }, []);

  // Calculate percentage of active, completed, and cancelled orders
  const activePercentage = (activeOrders.length / totalOrders) * 100;
  const completedPercentage = (completedOrders.length / totalOrders) * 100;
  const canceledPercentage = (cancelledOrders.length / totalOrders) * 100;

  return (
    <div className="order-widgets-container">
      {/* Active Orders Widget */}
      <div className="card active-orders" onClick={() => console.log('Active Orders clicked')}>
        <div className="card-content">
          <h4>Active Orders</h4>
          <div className="progress-circle">
            <span>{activePercentage.toFixed(0)}%</span>
          </div>
          <div className="card-details">
            <span>{activeOrders.length} active</span>
          </div>
        </div>
      </div>

      {/* Completed Orders Widget */}
      <div className="card completed-orders" onClick={() => console.log('Completed Orders clicked')}>
        <div className="card-content">
          <h4>Completed Orders</h4>
          <div className="progress-circle">
            <span>{completedPercentage.toFixed(0)}%</span>
          </div>
          <div className="card-details">
            <span>{completedOrders.length} completed</span>
          </div>
        </div>
      </div>

      {/* Cancelled Orders Widget */}
      <div className="card cancelled-orders" onClick={() => console.log('Cancelled Orders clicked')}>
        <div className="card-content">
          <h4>Cancelled Orders</h4>
          <div className="progress-circle">
            <span>{canceledPercentage.toFixed(0)}%</span>
          </div>
          <div className="card-details">
            <span>{cancelledOrders.length} cancelled</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Widget */}
      <div className="card recent-orders" onClick={() => console.log('Recent Orders clicked')}>
        <div className="card-content">
          <h4>Recent Orders</h4>
          <div className="card-details">
            <span>{recentOrders.length} recent</span>
          </div>
        </div>
      </div>

      {/* Total Orders Widget */}
      <div className="card total-orders" onClick={() => console.log('Total Orders clicked')}>
        <div className="card-content">
          <h4>Total Orders</h4>
          <div className="card-details">
            <span>{totalOrders} total</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderWidgets;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './OrderWidgets.css'; // Import the CSS for styling

// const OrderWidgets = () => {
//   // State to store order statistics
//   const [activeOrders, setActiveOrders] = useState([]);
//   const [completedOrders, setCompletedOrders] = useState([]);
//   const [cancelledOrders, setCancelledOrders] = useState([]);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [weeklyOrders, setWeeklyOrders] = useState(0);
//   const [adminId, setAdminId] = useState(null);  // State to hold the logged-in admin's ID
//   const [loading, setLoading] = useState(true); // State to manage loading status

//   // Fetching the admin ID (this could come from a global state or session)
//   useEffect(() => {
//     const loggedInAdminId = localStorage.getItem('adminId'); // Or from a global state like Redux or Context API
//     setAdminId(loggedInAdminId); // Set the adminId to state
//   }, []);

//   // Fetching order statistics and analytics once adminId is available
//   useEffect(() => {
//     if (adminId) {
//       const fetchOrders = async () => {
//         try {
//           setLoading(true); // Start loading when the request begins

//           // Fetching data for active, completed, cancelled, recent, total, and weekly orders
//           const [
//             active,
//             completed,
//             cancelled,
//             recent,
//             total,
//             weekly,
//           ] = await Promise.all([
//             axios.get(`http://localhost:5000/analytics?sellerId=${adminId}&type=activeOrders`, {
//               headers: {
//                 'Cache-Control': 'no-cache',
//                 'Pragma': 'no-cache',
//               }
//             }),
//             axios.get(`http://localhost:5000/analytics?sellerId=${adminId}&type=totalOrdersFulfilled`, {
//               headers: {
//                 'Cache-Control': 'no-cache',
//                 'Pragma': 'no-cache',
//               }
//             }),
//             axios.get(`http://localhost:5000/analytics?sellerId=${adminId}&type=totalOrdersCancelled`, {
//               headers: {
//                 'Cache-Control': 'no-cache',
//                 'Pragma': 'no-cache',
//               }
//             }),
//             axios.get(`http://localhost:5000/analytics?sellerId=${adminId}&type=recentOrders`, {
//               headers: {
//                 'Cache-Control': 'no-cache',
//                 'Pragma': 'no-cache',
//               }
//             }),
//             axios.get(`http://localhost:5000/analytics?sellerId=${adminId}&type=totalOrders`, {
//               headers: {
//                 'Cache-Control': 'no-cache',
//                 'Pragma': 'no-cache',
//               }
//             }),
//             axios.get(`http://localhost:5000/analytics?sellerId=${adminId}&type=weeklyOrders`, {
//               headers: {
//                 'Cache-Control': 'no-cache',
//                 'Pragma': 'no-cache',
//               }
//             }),
//           ]);

//           // Setting the state for each category
//           setActiveOrders(active.data);
//           setCompletedOrders(completed.data);
//           setCancelledOrders(cancelled.data);
//           setRecentOrders(recent.data);
//           setTotalOrders(total.data);
//           setWeeklyOrders(weekly.data);

//           setLoading(false); // Stop loading when the request finishes successfully
//         } catch (error) {
//           console.error('Error fetching order data:', error);
//           setLoading(false); // Stop loading on error
//         }
//       };

//       fetchOrders();
//     }
//   }, [adminId]);

//   // Calculate percentage of active, completed, and cancelled orders
//   const activePercentage = (activeOrders.length / totalOrders) * 100;
//   const completedPercentage = (completedOrders.length / totalOrders) * 100;
//   const canceledPercentage = (cancelledOrders.length / totalOrders) * 100;

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <p>Loading...</p>
//         {/* Optionally, you can add a spinner here */}
//         <div className="spinner"></div>
//       </div>
//     ); // Show a loading message or spinner while fetching data
//   }

//   return (
//     <div className="order-widgets-container">
//       {/* Active Orders Widget */}
//       <div className="card active-orders" onClick={() => console.log('Active Orders clicked')}>
//         <div className="card-content">
//           <h4>Active Orders</h4>
//           <div className="progress-circle">
//             <span>{activePercentage.toFixed(0)}%</span>
//           </div>
//           <div className="card-details">
//             <span>{activeOrders.length} active</span>
//           </div>
//         </div>
//       </div>

//       {/* Completed Orders Widget */}
//       <div className="card completed-orders" onClick={() => console.log('Completed Orders clicked')}>
//         <div className="card-content">
//           <h4>Completed Orders</h4>
//           <div className="progress-circle">
//             <span>{completedPercentage.toFixed(0)}%</span>
//           </div>
//           <div className="card-details">
//             <span>{completedOrders.length} completed</span>
//           </div>
//         </div>
//       </div>

//       {/* Cancelled Orders Widget */}
//       <div className="card cancelled-orders" onClick={() => console.log('Cancelled Orders clicked')}>
//         <div className="card-content">
//           <h4>Cancelled Orders</h4>
//           <div className="progress-circle">
//             <span>{canceledPercentage.toFixed(0)}%</span>
//           </div>
//           <div className="card-details">
//             <span>{cancelledOrders.length} cancelled</span>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders Widget */}
//       <div className="card recent-orders" onClick={() => console.log('Recent Orders clicked')}>
//         <div className="card-content">
//           <h4>Recent Orders</h4>
//           <div className="card-details">
//             <span>{recentOrders.length} recent</span>
//           </div>
//         </div>
//       </div>

//       {/* Total Orders Widget */}
//       <div className="card total-orders" onClick={() => console.log('Total Orders clicked')}>
//         <div className="card-content">
//           <h4>Total Orders</h4>
//           <div className="card-details">
//             <span>{totalOrders} total</span>
//           </div>
//         </div>
//       </div>

//       {/* Weekly Orders Widget */}
//       <div className="card weekly-orders" onClick={() => console.log('Weekly Orders clicked')}>
//         <div className="card-content">
//           <h4>Weekly Orders</h4>
//           <div className="card-details">
//             <span>{weeklyOrders} weekly</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderWidgets;

