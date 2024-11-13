import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/order');
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch order history');
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleOkClick = () => {
    navigate('/'); // Use navigate instead of history.push
  };

  return (
    <div>
      <h2>Order History</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-item">
              <h3>Order ID: {order._id}</h3>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Status: {order.status}</p>
            </div>
          ))
        )}
      </div>
      <button onClick={handleOkClick}>OK</button>
    </div>
  );
};

export default OrderHistory;
