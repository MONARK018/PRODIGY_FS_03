import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CustomerProfile.css';
function CustomerProfile() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 

        if (!token) {
          setError(new Error('User not logged in.'));
          setLoading(false);
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.user) {
          setCustomer(data.user);
        } else {
          throw new Error(data.message || 'Failed to load profile data');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer profile:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCustomerProfile();
  }, [navigate]); 

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

  return (
    <div className="customer-profile-container">
      <h2>Customer Profile</h2>
      {customer ? (
        <div className="profile-details">
          <div className="profile-item">
            <span className="profile-label">Name:</span>
            <span className="profile-value">{customer.name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{customer.email}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Phone:</span>
            <span className="profile-value">{customer.phone || 'Not provided'}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Role:</span>
            <span className="profile-value role-badge">{customer.role}</span>
          </div>
          <div className="profile-actions">
            <Link to="/dashboard" className="back-to-dashboard-btn">
              Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-profile">No profile data available.</div>
      )}
    </div>
  );
}

export default CustomerProfile; 