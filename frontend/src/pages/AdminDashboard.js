import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderStatuses = ['Pending', 'Shipped', 'Delivered'];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('Admin not authenticated.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/orders', { 
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch orders' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
       
        if (data && Array.isArray(data.orders)) {
             setOrders(data.orders);
        } else if (Array.isArray(data)){
             setOrders(data)
        }
        else {
             throw new Error('Unexpected data format from backend');
        }

      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); 

  const handleStatusChange = async (orderId, newStatus) => {

    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('Admin not authenticated.');
        alert('Admin not authenticated. Please log in again.');

        return;
      }

      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update order status' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      console.log(`Order ${orderId} status updated to ${newStatus} successfully.`);

    } catch (err) {
      console.error('Error updating order status:', err);
      alert(`Error updating order status: ${err.message}`);
     
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: order.status } : order 
        )
      ); 
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard - Orders</h2>

      <div className="orders-list">
        <h3>All Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Email</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.customer?.email || order.customer}</td>
                  <td>₹{order.totalAmount.toFixed(2)}</td>
                  <td>
                    <select 
                      className="status-select"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      {orderStatuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <ul>
                      {order.items.map((item, itemIndex) => (
                        <li key={item._id || itemIndex}> 
                           {item.name} (Qty: {item.quantity}) - ₹{(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard; 