import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Orders = () => {
    const[orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('jwtToken');
            try {
                const response = await axios.get('http://localhost:8080/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders", error);
            }
        };

        fetchOrders();
    }, []);

    return(
        <div>
            <h2>Your Orders</h2>
            {orders.length===0 && <p>You have no orders.</p>}
            {orders.map(order => (
                <div key={order.id}>
                    <h3>Order</h3>
                    <p>Total: {order.totalPrice}€</p>
                    <ul>
                        {order.orderItems.map((item, index) => (
                            <li key={index}>
                                {item.quantity} x {item.title} - {item.totalPrice}€
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Orders;

