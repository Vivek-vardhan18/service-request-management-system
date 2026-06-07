# Service Request Management System

## Overview

A full-stack Service Request Management System developed using React.js, Node.js, Express.js, MySQL, and JWT Authentication.

The application allows users to create and track service requests, while administrators can manage, update, and delete requests through a dedicated admin dashboard.

---

## Features

### User Features

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Create Service Requests
* View Personal Requests
* Request Status Tracking
* Logout Functionality

### Admin Features

* Admin Dashboard
* View All Requests
* Update Request Status
* Delete Requests
* Dashboard Statistics
* Role-Based Access Control

---

## Technologies Used

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js

### Database

* MySQL

---

## Project Structure

service-request-app/

├── frontend/

│ ├── src/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── App.jsx

│ │ └── main.jsx

│ └── package.json

│

├── backend/

│ ├── middleware/

│ ├── routes/

│ ├── db.js

│ ├── server.js

│ └── package.json

│

└── README.md

---

## Installation

### Clone Repository

git clone https://github.com/Vivek-vardhan18/service-request-management-system.git

cd service-request-management-system

---

### Backend Setup

cd backend

npm install

Create a .env file:

PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=zepnest

JWT_SECRET=your_secret_key

Start Backend:

npm start

---

### Frontend Setup

cd frontend

npm install

npm run dev

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### User Requests

POST /api/request/create

GET /api/request/myrequests

### Admin

GET /api/request/all

PUT /api/request/update/:id

DELETE /api/request/delete/:id

---

## Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Admin Dashboard
* Request Management

---

## Future Enhancements

* Search and Filter Requests
* Charts and Analytics
* Email Notifications
* User Profile Page
* Cloud Deployment
* Responsive Mobile Design

---

## Author

Y Vivekananda Vardhan

B.Tech Computer Science and Engineering

Full Stack Developer | AI/ML Enthusiast
