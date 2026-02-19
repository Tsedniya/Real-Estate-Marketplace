
# 🏠 MERN Real Estate Marketplace

A full-stack real estate marketplace built with the **MERN stack**.
Users can sign up, sign in (including Google OAuth), browse property listings, create their own listings, and manage their profile. Authentication is handled with **JWT**, and global state is managed using **Redux Toolkit**.

This project is built as a real-world practice app to understand how modern full-stack applications work end to end.

---

## 🚀 Tech Stack

### Frontend

* **React**
* **React Router**
* **Redux Toolkit**
* **Firebase Authentication** (Google Sign-In)
* **Tailwind CSS**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **JWT Authentication**
* **bcrypt** for password hashing

---

## ✨ Features

* User authentication (Sign Up / Sign In)
* Google OAuth authentication
* JWT-based authorization
* Protected routes (private pages)
* Create, update, and delete property listings
* User profile management
* Secure cookies for auth tokens
* Centralized state management with Redux Toolkit

---

## 📁 Project Structure

```
root
├── api
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── index.js
│   └── config
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── utils
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

## 🔐 Authentication Flow

* Users sign in using email/password or Google OAuth.
* Backend generates a **JWT token** on successful login.
* Token is stored in an **HTTP-only cookie**.
* Protected routes are handled on the frontend using a `PrivateRoute` component.
* Redux stores the authenticated user state.

---

## 🔒 Private Routes (Frontend)

Certain pages (like the profile page) are only accessible when the user is authenticated.
This is handled using React Router’s `<Outlet />` and Redux state.

---

## 🛠 Environment Variables

Create a `.env` file inside the **api** folder:

```
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

For the frontend (`client/.env`):

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

---

## ▶️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/real-estate-mern.git
```

### 2. Install backend dependencies

```
cd api
npm install
npm run dev
```

### 3. Install frontend dependencies

```
cd client
npm install
npm run dev
```

---

## 🌐 API Routes (Example)

```
POST   /api/auth/signup
POST   /api/auth/signin
POST   /api/auth/google
GET    /api/user/:id
```

---

## 📌 What This Project Focuses On

* Real-world authentication with JWT
* Secure backend-frontend communication
* Redux Toolkit for scalable state management
* Clean project structure
* Full MERN integration

---
