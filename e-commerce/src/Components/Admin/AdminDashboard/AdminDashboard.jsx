import React, { useState, useEffect } from 'react';
import UsersList from '../UserList/UsersList';
import ProductsList from '../ProductsList/ProductsList';
import OrdersList from '../OrdersList/OrdersList';
import './AdminDashboard.css'

const AdminDashboard = () => {
    // Mock data (replace with actual data handling in a real backend)
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    // Mock data initialization (can be replaced with fetch calls to a mock API or local storage)
    useEffect(() => {
        // Simulate fetching users
        setUsers([
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ]);

        // Simulate fetching products
        setProducts([
            { id: 1, name: 'Product A', price: 50 },
            { id: 2, name: 'Product B', price: 75 }
        ]);

        // Simulate fetching orders
        setOrders([
            { id: 1, orderId: 'ORD-001', total: 100 },
            { id: 2, orderId: 'ORD-002', total: 150 }
        ]);
    }, []);

    return (
        <div className="admin-dashboard">
            <h1 className="admin-heading">Admin Dashboard</h1>

            <div className="list-container">
                <h2 className="admin-heading">Users</h2>
                <UsersList users={users} />
            </div>

            <div className="list-container">
                <h2 className="admin-heading">Products</h2>
                <ProductsList products={products} />
            </div>

            <div className="list-container">
                <h2 className="admin-heading">Orders</h2>
                <OrdersList orders={orders} />
            </div>
        </div>
    );
};

export default AdminDashboard;
