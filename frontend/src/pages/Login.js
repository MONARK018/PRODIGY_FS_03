import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './CustomerLogin.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); 

    console.log('Login form submitted', { email, password });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
    
        if (data.token) {
          localStorage.setItem('token', data.token);
          setMessage('Login successful!');
      
          const from = location.state?.from || '/dashboard';
          navigate(from, { replace: true });
        } else {
          setMessage('Login failed: No token received');
        }
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="customer-login-container">
      <h2>Customer Login</h2>
      <form className="customer-login-form" onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" name="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" id="password" name="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="customer-login-button">Login</button>
      </form>

      {message && <div className="login-message">{message}</div>}

      <div className="register-link-container">
        <Link to="/register" className="register-link-button">
          <button>New User? Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Login; 