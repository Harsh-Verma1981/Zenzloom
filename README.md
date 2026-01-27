This project is still on development some features are there only.
Sorry for Inconvenience.


Zenzloom – MERN E-Commerce Platform

Zenzloom is a full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js).
It provides a complete shopping experience for users and a powerful admin panel for managing products, categories, users, and orders.

This project is ideal for learning full-stack development, college presentations, and portfolio showcasing.

Features
User Features

User registration and login (JWT authentication)

Browse products on homepage and shop page

Search products by name

Filter products by category and price

View product details with images

Add product reviews and ratings

Responsive UI

🛠️ Admin Features

Admin login

Create, update, and delete products

Upload product images

Create and manage product categories

View all users

View and manage orders

Admin dashboard

⚙️ Backend Features

REST APIs using Express.js

MongoDB database with Mongoose

JWT-based authentication & authorization

Image upload using Multer

Pagination and filtering support

Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

React Router DOM

Redux Toolkit

Axios

Backend

Node.js

Express.js

MongoDB

Mongoose

Multer

JWT (JSON Web Token)

Project Structure
Zenzloom/
│
├── backend/
│   ├── controllers/    # Business logic
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middlewares/    # Auth & error handling
│   ├── uploads/        # Uploaded product images
│   ├── index.js        # Backend entry point
│   
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Home, Shop, Admin pages
│   │   ├── redux/      # State management
│   │   ├── config.js   # Backend base URL
│   │   └── main.jsx
│   └── package.json
|
|
│   └── .env            # Environment variables
├── package.json        # Root scripts
└── README.md

How to Run Zenzloom Locally (Step-by-Step)
Prerequisites

Node.js installed

MongoDB installed and running

npm installed

🔹 Step 1: Clone the Repository
git clone https://github.com/your-username/zenzloom.git
cd zenzloom

🔹 Step 2: Backend Setup
cd backend
npm install


Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start backend server:

npm run backend


Backend will run on:

http://localhost:5000

🔹 Step 3: Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev


Frontend will run on:

http://localhost:5173

🔹 Step 4: Image Upload Configuration (Already Done)

Images are stored in backend/uploads

Backend serves images using /uploads

Frontend automatically displays images from backend

Admin Access

Admin users can manage products and categories

Admin panel is available after login

Admin-only routes are protected using JWT

🧪 Testing the Application

Register a new user

Login as admin

Create categories

Create products with image uploads

View products on homepage and shop page

⏱️ Presentation Duration (5 Minutes Guide)

Project Introduction – 30 seconds

Frontend Walkthrough – 2 minutes

Admin Panel Demo – 2 minutes

Backend & Tech Overview – 30 seconds

🎯 Learning Outcomes

Hands-on experience with MERN stack

Understanding of authentication & authorization

Image handling in full-stack apps

Real-world project structure

API integration with frontend

🚀 Future Enhancements

Online payment integration

Order tracking

Cloud image storage (Cloudinary)

Deployment on AWS / Render / Vercel

👨‍💻 Author

Harsh Verma
Full Stack Developer (MERN)
