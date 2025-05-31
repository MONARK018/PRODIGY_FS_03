import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddProduct.css'; 
function AddProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleAddProductSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); 

    console.log('Add Product form submitted', { productName, description, price, imageFile });

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    if (imageFile) {
      formData.append('image', imageFile);
    } else {
        setMessage('Please select a product image.');
        return;
    }

    try {
      const token = localStorage.getItem('adminToken'); 
      if (!token) {
        setMessage('Admin not authenticated.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/products', { 
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Product added successfully!');
   
        setProductName('');
        setDescription('');
        setPrice('');
        setImageFile(null);
      
        const fileInput = document.getElementById('image');
        if (fileInput) fileInput.value = '';

      } else {
        setMessage(data.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('An error occurred while adding the product.');
    }

  };

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard'); 
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form className="add-product-form" onSubmit={handleAddProductSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input 
            type="text" 
            id="productName" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            placeholder="Product Name" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            id="price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Price" 
            required 
            min="0" 
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input 
            type="file" 
            id="image" 
            onChange={(e) => setImageFile(e.target.files[0])} 
            required 
          />
        </div>
        
        <button type="submit" className="add-product-btn">Add Product</button>
      </form>
      
      {message && <div className="message">{message}</div>}

      <button onClick={handleBackToDashboard} className="back-btn">Back to Dashboard</button>
    </div>
  );
}

export default AddProduct; 