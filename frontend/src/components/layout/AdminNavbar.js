import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        
        <Link to="/admin/dashboard" className="admin-logo">
          Admin Panel
        </Link>

        <div className="admin-nav-links">
          <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
          <Link to="/admin/products/add" className="admin-nav-link">Add Product</Link>
          <Link to="/admin/products" className="admin-nav-link">Manage Products</Link>
        </div>

        <div className="admin-nav-icons">
          <button onClick={handleLogout} className="admin-icon-link logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar; 