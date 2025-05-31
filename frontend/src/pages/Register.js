import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); 
  const [message, setMessage] = useState('');

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); 
    const registrationData = {
      name,
      email,
      phone,
      password,
      role,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'User registered successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      } else {
        
        setMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegisterSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" id="name" name="name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" name="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone No.:</label>
          <input type="text" id="phone" name="phone" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" id="password" name="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="role" className="form-label">Role:</label>
          <input type="text" id="role" name="role" className="form-input" disabled value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>

      {message && <div className="registration-message">{message}</div>}

      <div className="button-group">
        <Link to="/admin/login" className="admin-login-link-button">
            <button>Go to Admin Login</button>
        </Link>
        <Link to="/login" className="login-button">
          <button>Already Registered? Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Register; 