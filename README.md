# E-Commerce Platform

A full-stack e-commerce platform built with React.js and Node.js, featuring user authentication, product management, and shopping cart functionality.

## Features

- User Authentication (Customer & Admin)
- Product Management
- Shopping Cart
- Search Functionality
- Responsive Design
- Image Upload
- Secure Routes

## Tech Stack

### Frontend
- React.js
- React Router
- Context API
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (File Upload)

## Project Structure

```
├── frontend/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # Reusable components
│       ├── context/       # Context providers
│       ├── pages/         # Page components
│       └── App.js         # Main app component
│
└── backend/               # Node.js backend
    ├── controllers/       # Route controllers
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    └── uploads/          # Product images
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/MONARK018/PRODIGY_FS_03.git
   cd PRODIGY_FS_03
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. Start the development servers:
   ```bash
   # Start backend server (from backend directory)
   npm start

   # Start frontend server (from frontend directory)
   npm start
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- POST /api/auth/admin/login - Admin login

### Products
- GET /api/products - Get all products
- POST /api/products - Add new product (Admin only)
- PUT /api/products/:id - Update product (Admin only)
- DELETE /api/products/:id - Delete product (Admin only)

### Cart
- GET /api/cart - Get user's cart
- POST /api/cart - Add item to cart
- DELETE /api/cart/:id - Remove item from cart

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 