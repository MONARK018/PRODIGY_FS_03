import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
   

    const orderData = {
      items: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        total: item.price * item.quantity
      })),
      totalAmount: getCartTotal(),

    };

    console.log('Attempting to place order with data:', orderData);

    const token = localStorage.getItem('token'); 
    if (!token) {
      alert('You need to be logged in to place an order.');
      navigate('/login'); 
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to place order' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Order placed successfully:', result);

      clearCart();

      alert('Order placed successfully!'); 
      navigate('/dashboard'); 

    } catch (error) {
      console.error('Error placing order:', error);
      alert(`Error placing order: ${error.message}`); 
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Your cart is empty. Please add items before checking out.</p>
   
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout Summary</h2>

      <div className="order-summary">
        <h3>Items in your cart:</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item._id}>
              {item.name} (Quantity: {item.quantity}) - ₹{(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="order-total">
          <strong>Total:</strong> ₹{getCartTotal().toFixed(2)}
        </div>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout; 