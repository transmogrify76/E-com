import React from 'react';

const OrderList = ({ orders }) => {
    return (
        <div>
            <h2>Order List</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <strong>Order ID:</strong> {order.orderId} <br />
                        <strong>Total:</strong> ${order.total}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
