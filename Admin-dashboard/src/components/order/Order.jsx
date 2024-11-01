import React, { useEffect, useState } from 'react';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/shipping/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="order-table">
      <div className="table-header">
        <h2>All Orders</h2>
        <div className="filters">
          {/* Optional: Add date range and status filters here */}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.orderId} className={`status-${order.status?.toLowerCase() || 'unknown'}`}>
                <td>#{order.orderId || 'N/A'}</td>
                <td>{order.name || 'No Name'}</td>
                <td>{order.address || 'No Address'}</td>
                <td>${order.price?.toFixed(2) || '0.00'}</td>
                <td className="status">
                  <span className={`status-label ${order.status?.toLowerCase() || 'unknown'}`}>
                    {order.status || 'Unknown'}
                  </span>
                </td>
                <td>
                  <button className="action-button">Actions</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {/* Add pagination controls here if needed */}
      </div>
    </div>
  );
};

export default OrderTable;
