import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './ManageProducts.css'; 

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('adminToken'); 
        if (!token) {
          setError('Admin not authenticated.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/products', { 
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch products' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && Array.isArray(data.products)) {
             setProducts(data.products);
        } else if (Array.isArray(data)){
             setProducts(data)
        }
        else {
             throw new Error('Unexpected data format from backend');
        }

      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          alert('Admin not authenticated.');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/products/${productId}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
           const errorData = await response.json().catch(() => ({ message: 'Failed to delete product' }));
           throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        alert('Product deleted successfully!');

      } catch (err) {
        console.error('Error deleting product:', err);
        alert(`Error deleting product: ${err.message}`);
      }
    }
  };

  const handleEditProduct = (productId) => {
      console.log('Edit product with ID:', productId);
      navigate(`/admin/products/edit/${productId}`); 
  };


  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="manage-products-container">
      <h2>Manage Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody> 
            {products.map(product => (
              <tr key={product._id}>
                <td>
                   <img src={`http://localhost:5000/uploads/${product.image.split('/').pop()}`} alt={product.name} className="product-thumbnail" />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleEditProduct(product._id)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageProducts; 