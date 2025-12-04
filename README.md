# 🚀 Employee Management System (EMS)

A full-stack **Employee Task Management System** built using the **MERN stack**, featuring authentication, task assignment, task state updates, and a fully responsive modern UI.  
This system allows employees to track tasks (New, Active, Completed, Failed) with real-time updates.

---

## 📌 Features

### 👨‍💼 Employee Functions
- 🔐 Login & Signup (JWT + HTTP-Only Cookies)
- 📥 View assigned tasks  
  - New Tasks  
  - Active Tasks  
  - Completed Tasks  
  - Failed Tasks  
- ✏ Accept tasks  
- ✅ Mark tasks completed  
- ❌ Mark tasks failed  
- 📊 Dashboard statistics  
- ⚡ Smooth state updates via Context API  
- 📱 Fully mobile-responsive design  

### 🛠 Admin Functions (Future Scope)
- Add employees  
- Assign tasks  
- Manage user roles  
- Analytics dashboard  

---

## 🧰 Tech Stack

### 🌐 Frontend
- **React.js (Vite)**
- **Tailwind CSS**
- React Router DOM
- Context API
- React Hot Toast
- Custom reusable UI components

### 🖥 Backend
- **Node.js**
- **Express.js**
- JWT Authentication
- bcrypt.js (Password Hashing)
- Cookie-Parser
- CORS configured for local + deployed domains
- MVC structured backend

### 🗄 Database
- **MongoDB Atlas**
- Mongoose ODM
- Employee Model
- Task Model

## ⚙️ Backend Setup

### 1️⃣ Install Dependencies
cd backend
npm install

### 2️⃣ Create .env
- PORT=4044
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret

### 3️⃣ Run Backend
npm start


Backend runs on: http://localhost:4044

### 🌐 Frontend Setup
## 1️⃣ Install Dependencies
cd frontend
npm install

## 2️⃣ Start React App
npm run dev


Frontend runs on: http://localhost:5173

### 🚀 Deployment
#### Service	Purpose
- Vercel	Frontend Hosting
- Render Backend Hosting
- MongoDB Atlas	Database

### CORS is configured for:

- localhost

- Vercel frontend domain

### 📸 Screenshots (Add Here)

Add the following:

Login Page

Signup Page

Dashboard

Task Cards (New/Active/Completed/Failed)

### 👤 Author

- Sumit Raj Tiwari
- Int. MTech CSE in Cyber Security
- VIT Bhopal University
