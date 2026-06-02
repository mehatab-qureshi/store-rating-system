# 🏪 Store Rating System

A full-stack web application that allows users to view stores and submit ratings (1–5). The platform supports three roles: Admin, Normal User, and Store Owner with role-based dashboards and permissions.

---

## 🚀 Features

### 👨‍💼 System Administrator
- View dashboard statistics:
  - Total Users
  - Total Stores
  - Total Ratings
- View & filter users (Name, Email, Role)
- View & filter stores (Name, Address, Rating)
- View store ratings
- Logout

---

### 👤 Normal User
- Register & Login
- View all stores
- Search stores by name/address
- Submit rating (1–5)
- Update rating
- View own rating for each store
- Logout

---

### 🏪 Store Owner
- Login
- View dashboard of owned store
- See:
  - Average rating
  - Total ratings
- View list of users who rated their store
- Logout

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt

---

## 🔐 Authentication & Roles

Single login system for all users. Role-based access control:

- ADMIN → Admin Dashboard
- USER → Stores & Rating System
- STORE_OWNER → Store Analytics Dashboard

---

## 🔑 Demo Credentials

### Admin
Email: admin@gmail.com  
Password: Password@123  

---

### Normal User
Email: test@gmail.com  
Password: Password@123  

---

### Store Owner
Email: owner@gmail.com  
Password: Password@123 

---
# 📦 Installation Guide

### 1️⃣ Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/store-rating-system.git
cd store-rating-system

## ▶️ How to Run Project

Create .env file in backend folder:
PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
JWT_SECRET=your_jwt_secret

### Backend
```bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev
```
