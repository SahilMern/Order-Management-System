<h1 align="center">🛍️ Product Order Management System</h1>
<p align="center">A complete E-commerce solution with admin dashboard, real-time order tracking, and Cloudinary image management</p>

<br />

<h2 align="center">🛠 Tech Stack</h2>

<div align="center">
  
| Frontend | Backend |
|----------|---------|
| <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react"> <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux"> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss"> | <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb"> <img src="https://img.shields.io/badge/Cloudinary-FF7B00?style=for-the-badge&logo=cloudinary"> |

</div>

<br />

## ✨ Key Features

### 🛒 User Side
- **Product Catalog** with search/filter
- **Single Product View** with gallery
- **Cart Management** with quantity adjustment
- **Order Tracking** with status updates
- **Profile Dashboard** with order history

### ⚙️ Admin Panel
- **Product Management** (CRUD operations)
- **Order Processing** (Status updates)
- **User Management** system
- **Cloudinary Integration** for media

<br />

## 📸 System Screenshots

<div align="center">

| Home Page | Product Details |
|-----------|-----------------|
| ![Home Page](https://github.com/user-attachments/assets/b5aa00ee-8e57-4ec8-9049-4c2ecee03b27) | ![Product Details](https://github.com/user-attachments/assets/b9b76aa3-4a65-40b5-9380-ed0f1ebb819f) |

| Shopping Cart | Admin dashboard |
|--------------|----------------|
| ![Cart](https://github.com/user-attachments/assets/d284f95b-ad57-40e1-ad08-12571cba6243) | ![Orders](https://github.com/user-attachments/assets/f81db0bd-bea8-43c7-81ce-67d7354a3c4d) |

| Admin Dashboard | Product Management |
|----------------|--------------------|
| ![Admin](https://github.com/user-attachments/assets/fa36c0e0-0bc3-42bc-b679-2beae5d7ed30) | ![Main page](https://github.com/user-attachments/assets/1cef4f42-9cd9-4f2f-b6fc-39343dd05b53) |

</div>

<br />

## 🚀 Installation Guide
### Backend Setup
1. Create `.env` file in root directory:
```bash
cd backend
touch .env

## 🔒 Environment Variables Setup

### Backend Configuration (.env)
Create a `.env` file in your backend directory with these **required** variables:

```env
# MongoDB Configuration (Required)
DB_URL=your_mongodb_connection_string

# JWT Authentication (Required)
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=30d

# Cloudinary Configuration (Required for image uploads)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration (Required)
PORT=your_preferred_port
FRONTEND_URL=http://localhost:3000
