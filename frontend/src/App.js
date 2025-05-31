import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerProfile from './pages/CustomerProfile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';
import EditProduct from './pages/EditProduct';
import { CartProvider } from './context/CartContext';
import { CustomerProtectedRoute, AdminProtectedRoute } from './components/ProtectedRoute';

function Home() {
  return (
    <div className="page">
      <h1>Welcome to ShopApp</h1>
      <p>Your one-stop shop for all your needs</p>
    </div>
  );
}

function Products() {
  return (
    <div className="page">
      <h1>Our Products</h1>
      <div className="product-list">
        <div className="product-card">
          <h3>Product 1</h3>
          <p>Description of product 1</p>
          <button className="btn">Add to Cart</button>
        </div>
        <div className="product-card">
          <h3>Product 2</h3>
          <p>Description of product 2</p>
          <button className="btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

function Orders() {
  return (
    <div className="page">
      <h1>Your Orders</h1>
      <p>No orders yet</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="page">
      <h1>Your Profile</h1>
      <div className="profile-info">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/dashboard" element={
              <CustomerProtectedRoute>
                <CustomerDashboard />
              </CustomerProtectedRoute>
            } />
            <Route path="/profile" element={
              <CustomerProtectedRoute>
                <CustomerProfile />
              </CustomerProtectedRoute>
            } />
            <Route path="/cart" element={
              <CustomerProtectedRoute>
                <Cart />
              </CustomerProtectedRoute>
            } />
            <Route path="/checkout" element={
              <CustomerProtectedRoute>
                <Checkout />
              </CustomerProtectedRoute>
            } />

            <Route path="/admin/dashboard" element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/products/add" element={
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <AdminProtectedRoute>
                <ManageProducts />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/products/edit/:id" element={
              <AdminProtectedRoute>
                <EditProduct />
              </AdminProtectedRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App; 