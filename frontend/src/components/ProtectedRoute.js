import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const CustomerProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {

    console.log('Protected Route Check:', {
      hasToken: !!token,
      currentPath: location.pathname,
      tokenValue: token
    });
  }, [token, location]);

  if (!token || token === 'undefined' || token === 'null') {
    console.log('No valid token found, redirecting to login');
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.log('Invalid token format, redirecting to login');
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {

    console.log('Admin Protected Route Check:', {
      hasToken: !!token,
      currentPath: location.pathname,
      tokenValue: token
    });
  }, [token, location]);

  if (!token || token === 'undefined' || token === 'null') {
    console.log('No valid admin token found, redirecting to admin login');
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.log('Invalid admin token format, redirecting to admin login');
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}; 