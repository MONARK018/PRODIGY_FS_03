import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css'; 

function EditProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const [existingImage, setExistingImage] = useState(''); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('Admin not authenticated.');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch product' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const productData = data.product || data;

        setProduct(productData);
        setProductName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price.toString());
        setExistingImage(productData.image);

      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError('No product ID provided.');
      setLoading(false);
    }
  }, [id]);

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    setMessage('');

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      setMessage('Please enter a valid price');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', priceNum);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setMessage('Admin not authenticated.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Product updated successfully!');
      } else {
        setMessage(data.message || 'Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('An error occurred while updating the product.');
    }
  };

  const handleBackToManageProducts = () => {
    navigate('/admin/products'); 
  };

  if (loading) {
    return <div className="loading">Loading product data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!product) {
      return <div className="loading">Product not found or data unavailable.</div>;
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form className="edit-product-form" onSubmit={handleUpdateProduct}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input 
            type="text" 
            id="productName" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input 
            type="number" 
            id="price" 
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
                setPrice(value);
              }
            }}
            required  
            placeholder="Enter price"
          />
        </div>
        <div className="form-group">
          <label>Current Image:</label>
          {existingImage && (
            <img src={`http://localhost:5000${existingImage}`} alt="Current Product Image" className="current-product-image-thumbnail" />
          )}
        </div>
         <div className="form-group">
          <label htmlFor="image">Upload New Image (Optional)</label>
          <input 
            type="file" 
            id="image" 
            onChange={(e) => setImageFile(e.target.files[0])} 
          />
        </div>
        
        <button type="submit" className="update-product-btn">Update Product</button>
      </form>
      
      {message && <div className="message">{message}</div>}

      <button onClick={handleBackToManageProducts} className="back-btn">Back to Manage Products</button>
    </div>
  );
}

export default EditProduct; 