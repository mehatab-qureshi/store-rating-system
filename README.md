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

## 🗄️ Database Schema

### Users
- id
- name
- email
- password
- address
- role

### Stores
- id
- name
- email
- address
- owner_id

### Ratings
- id
- rating
- user_id
- store_id
---

## 👨‍💻 Author

**Mehatab Qureshi**

B.E. Computer Science

Full Stack Developer

GitHub: https://github.com/mehatab-qureshi