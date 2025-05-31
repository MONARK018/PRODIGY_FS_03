import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../../context/CartContext';

function Navbar({ pathname }) {
  const navigate = useNavigate();
  const isCustomerDashboardOrProfile = pathname === '/dashboard' || pathname === '/profile';
  const { cartItems, clearCart } = useCart();

  const handleLogout = () => {
   
    localStorage.removeItem('token');
    clearCart();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="logo">
          ShopApp
        </Link>

        <div className="nav-links">
          {!isCustomerDashboardOrProfile && <Link to="/" className="nav-link">Home</Link>}
          {!isCustomerDashboardOrProfile && <Link to="/products" className="nav-link">Products</Link>}
          {!isCustomerDashboardOrProfile && <Link to="/orders" className="nav-link">Orders</Link>}
        </div>

        <div className="nav-icons">
          {isCustomerDashboardOrProfile && (
            <Link to="/cart" className="icon-link">
              Cart ({cartItems.length})
            </Link>
          )}
          {isCustomerDashboardOrProfile && (
            <Link to="/profile" className="icon-link">
              Profile
            </Link>
          )}
          {isCustomerDashboardOrProfile && (
            <button onClick={handleLogout} className="icon-link logout-button">
              Logout
            </button>
          )}
          {!isCustomerDashboardOrProfile && (
            <Link to="/cart" className="icon-link">
              Cart ({cartItems.length})
            </Link>
          )}
          {!isCustomerDashboardOrProfile && (
            <Link to="/profile" className="icon-link">
              Profile
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 