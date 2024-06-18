import React, { useState, useEffect } from 'react';
import UsersList from '../UserList/UsersList';
import ProductsList from '../ProductsList/ProductsList';
import OrdersList from '../OrdersList/OrdersList';
import './AdminDashboard.css';

const AdminDashboard = () => {
    // Mock data (replace with actual data handling in a real backend)
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate data fetching with useEffect
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Simulate fetching users
                await new Promise((resolve) => {
                    setTimeout(() => {
                        setUsers([
                            { id: 1, name: 'John Doe', email: 'john@example.com' },
                            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
                        ]);
                        resolve();
                    }, 1000); // Simulate delay
                });
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        const fetchProducts = async () => {
            try {
                // Simulate fetching products
                await new Promise((resolve) => {
                    setTimeout(() => {
                        setProducts([
                            { id: 1, name: 'Product A', price: 50 },
                            { id: 2, name: 'Product B', price: 75 }
                        ]);
                        resolve();
                    }, 1500); // Simulate delay
                });
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        const fetchOrders = async () => {
            try {
                // Simulate fetching orders
                await new Promise((resolve) => {
                    setTimeout(() => {
                        setOrders([
                            { id: 1, orderId: 'ORD-001', total: 100 },
                            { id: 2, orderId: 'ORD-002', total: 150 }
                        ]);
                        setIsLoading(false);
                        resolve();
                    }, 2000); // Simulate delay
                });
            } catch (error) {
                console.error('Failed to fetch orders', error);
            }
        };

        fetchUsers();
        fetchProducts();
        fetchOrders();
    }, []);

    return (
        <div className="admin-dashboard">
            <header>
                <h1 className="admin-heading">Admin Dashboard</h1>
            </header>

            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                <main>
                    <section className="list-container">
                        <h2 className="admin-subheading">Users</h2>
                        <UsersList users={users} />
                    </section>

                    <section className="list-container">
                        <h2 className="admin-subheading">Products</h2>
                        <ProductsList products={products} />
                    </section>

                    <section className="list-container">
                        <h2 className="admin-subheading">Orders</h2>
                        <OrdersList orders={orders} />
                    </section>
                </main>
            )}
        </div>
    );
};

export default AdminDashboard;
