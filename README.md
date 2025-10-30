<div align="center">
  <img src="client/public/logo.png" alt="BookIt Logo" width="120" height="120">
  
  # 🎫 BookIt
  
  ### Your Gateway to Unforgettable Experiences
<div align="center">
  
  ### 🌐 Live Demo
  
  [![Visit Live Site](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-brightgreen?style=for-the-badge&logo=vercel&logoColor=white)](https://bookit-experiences.vercel.app)
  
  **Experience BookIt in action! Click above to visit the live deployment.**
  
</div>
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  
  **A modern, full-stack travel experience booking platform built with React, TypeScript, Node.js, and MongoDB**
  
  [Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API Documentation](#-api-documentation) • [Future Plans](#-future-plans)
  
</div>

---

## 📖 About BookIt

BookIt is a comprehensive travel experience booking platform that allows users to discover, book, and manage exciting travel experiences. From adventure activities to cultural tours, BookIt provides a seamless booking experience with real-time availability, promo code support, and secure user authentication.

### ✨ Key Highlights

- 🔐 **Secure Authentication** - Bcrypt-encrypted passwords with JWT-ready architecture
- 🎟️ **Real-time Booking** - Live slot availability with atomic transactions
- 💰 **Promo Code System** - Flexible discount codes (percentage & fixed amount)
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔔 **Toast Notifications** - Real-time user feedback for all actions
- 📊 **Booking Management** - View, track, and cancel bookings easily
- ⚡ **Fast & Efficient** - Optimized MongoDB queries with proper indexing
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations

---

## 🚀 Features

### For Users

#### 🏠 Browse Experiences
- View all available travel experiences
- Filter by category, location, and price
- See detailed information including highlights and inclusions
- Real-time availability status

#### 📅 Smart Booking System
- Select from available time slots
- Adjust quantity based on availability
- Apply promo codes for discounts
- Instant booking confirmation with unique reference number

#### 👤 User Account Management
- Secure registration and login
- Auto-filled checkout forms for logged-in users
- View booking history
- Cancel bookings with automatic slot restoration

#### 💳 Checkout Experience
- Clear price breakdown (subtotal, taxes, discounts)
- Promo code validation with instant feedback
- Secure payment flow
- Booking confirmation page

#### 🎫 Promo Code Management
- Create percentage or fixed-amount discounts


## 🎬 Demo

### Screenshots

**Home Page - Browse Experiences**
```
┌─────────────────────────────────────────────────────────┐
│  🎫 BookIt                    🏠 Home  📋 My Bookings   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ [Image]  │  │ [Image]  │  │ [Image]  │             │
│  │ Scuba    │  │ Paraglide│  │ Trekking │             │
│  │ ₹2,500   │  │ ₹3,000   │  │ ₹1,500   │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Experience Details with Booking**
```
┌─────────────────────────────────────────────────────────┐
│  ← Details                                               │
├─────────────────────────────────────────────────────────┤
│  [Experience Image]                                      │
│                                                          │
│  Scuba Diving Adventure                                 │
│  📍 Goa, India                                          │
│                                                          │
│  Select Time Slot:                                      │
│  ○ Dec 25 - 10:00 AM  ○ Dec 25 - 2:00 PM              │
│  ● Dec 26 - 10:00 AM  ○ Dec 26 - 2:00 PM              │
│                                                          │
│  ┌─────────────────┐                                    │
│  │ Subtotal: ₹2,500│                                    │
│  │ Taxes:    ₹148  │                                    │
│  │ Total:    ₹2,648│                                    │
│  │                 │                                    │
│  │  [Confirm]      │                                    │
│  └─────────────────┘                                    │
└─────────────────────────────────────────────────────────┘
```

### Live Demo

**Demo Account:**
- **Email:** demo@gmail.com
- **Password:** demo123

**Available Promo Codes:**
- `SAVE10` - 10% off
- `SAVE20` - 20% off
- `FLAT50` - ₹50 off
- `FLAT100` - ₹100 off

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ts-node-dev** - TypeScript development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/bookit.git
cd bookit
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookit
CORS_ORIGIN=http://localhost:3000
EOL

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### Step 3: Frontend Setup

Open a new terminal window:

```bash
# Navigate to client directory (from BOOKIT Again folder)
cd client

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
VITE_API_URL=http://localhost:5000/api
EOL

# Start the frontend development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### Step 4: Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health

---

## 🎯 Quick Start Guide

### 1. Login with Demo Account (Fastest Way)
- Click "Login" in the navigation bar
- Use demo credentials:
  - **Email:** demo@gmail.com
  - **Password:** demo123
- Click "Sign In"

**OR Register a New Account**
- Click "Register" in the navigation bar
- Fill in your name, email, and password
- Click "Register" to create your account

### 2. Browse Experiences
- View all available experiences on the home page
- Click on any experience card to see details

### 3. Book an Experience
- Select a time slot from available options
- Adjust quantity if needed
- Apply a promo code (optional)
- Click "Confirm" to proceed to checkout
- Fill in your details (auto-filled if logged in)
- Click "Pay and Confirm" to complete booking

### 4. Manage Your Bookings
- Click "My Bookings" in the navigation
- View all your bookings (confirmed and cancelled)
- Click "View Details" to see the experience
- Click "Cancel Booking" to cancel (if confirmed)

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Experience Endpoints

#### Get All Experiences
```http
GET /experiences
```

#### Get Experience by ID
```http
GET /experiences/:id
```

### Booking Endpoints

#### Create Booking
```http
POST /bookings
Content-Type: application/json

{
  "experienceId": "507f1f77bcf86cd799439011",
  "slotId": "507f1f77bcf86cd799439012",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "promoCode": "SAVE10"
}
```

#### Get User Bookings
```http
GET /bookings?email=john@example.com
```

#### Cancel Booking
```http
PATCH /bookings/:id/cancel
```

### Promo Code Endpoints

#### Validate Promo Code
```http
POST /promo/validate
Content-Type: application/json

{
  "code": "SAVE10",
  "originalPrice": 2500
}
```

---

## 🗂️ Project Structure

```
BOOKIT Again/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   │   └── logo.png         # Application logo
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── ExperienceCard.tsx
│   │   │   ├── SlotSelector.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── PriceBreakdown.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ExperienceDetailPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── ResultPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── MyBookingsPage.tsx
│   │   ├── lib/             # Utility functions
│   │   │   └── api.ts       # API client
│   │   ├── types/           # TypeScript type definitions
│   │   │   └── index.ts
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── server/                   # Backend Node.js application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   └── database.ts  # MongoDB connection
│   │   ├── controllers/     # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── experiencesController.ts
│   │   │   ├── bookingsController.ts
│   │   │   └── promoController.ts
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── User.ts
│   │   │   ├── Experience.ts
│   │   │   ├── Booking.ts
│   │   │   └── PromoCode.ts
│   │   ├── routes/          # API routes
│   │   │   ├── auth.ts
│   │   │   ├── experiences.ts
│   │   │   ├── bookings.ts
│   │   │   └── promo.ts
│   │   ├── scripts/         # Utility scripts
│   │   │   └── seed.ts      # Database seeding
│   │   └── server.ts        # Express server setup
│   ├── package.json
│   └── tsconfig.json
│
├── README.md                 # This file
├── PRODUCTION_READY.md      # Production deployment guide
└── SETUP_COMPLETE.md        # Setup documentation
```

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/bookit

# CORS
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration with validation
- [ ] User login with correct/incorrect credentials
- [ ] Browse experiences and view details
- [ ] Select time slots and adjust quantity
- [ ] Apply valid/invalid promo codes
- [ ] Complete booking flow
- [ ] View bookings in My Bookings page
- [ ] Cancel confirmed bookings
- [ ] Logout functionality
- [ ] Responsive design on mobile devices
- [ ] Toast notifications for all actions
- [ ] Error handling for network failures

### Running Tests

```bash
# Backend tests (when implemented)
cd server
npm test

# Frontend tests (when implemented)
cd client
npm test
```

---

## 🚀 Deployment

### Deployment Platforms

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

### Environment Setup for Production

1. Update `MONGODB_URI` to your production database
2. Update `CORS_ORIGIN` to your production frontend URL
3. Update `VITE_API_URL` to your production backend URL
4. Set `NODE_ENV=production`

---

## 🔐 Security Features

- ✅ **Password Hashing** - Bcrypt with 10 salt rounds
- ✅ **Input Validation** - Server-side validation for all inputs
- ✅ **SQL Injection Protection** - MongoDB with Mongoose ODM
- ✅ **XSS Protection** - React's built-in XSS protection
- ✅ **CORS Configuration** - Configurable allowed origins
- ✅ **Error Handling** - No sensitive data exposed in errors
- ✅ **Atomic Transactions** - Prevent race conditions in bookings

---

## 🎨 Design System

### Color Palette
- **Primary:** `#FACC15` (Yellow-400) - Main brand color
- **Primary Dark:** `#EAB308` (Yellow-500) - Hover states
- **Background:** `#F9FAFB` (Gray-50) - Page background
- **Text:** `#1F2937` (Gray-800) - Primary text
- **Border:** `#E5E7EB` (Gray-200) - Borders and dividers

### Typography
- **Font Family:** Inter, system-ui, sans-serif
- **Headings:** Bold, 24-32px
- **Body:** Regular, 14-16px
- **Small:** Regular, 12-14px

---

## 🌟 Future Plans

### Phase 1: Enhanced Features
- [ ] **Payment Integration** - Stripe/Razorpay for real payments
- [ ] **Email Notifications** - Booking confirmations and reminders
- [ ] **SMS Notifications** - Booking updates via SMS
- [ ] **Reviews & Ratings** - User reviews for experiences
- [ ] **Wishlist** - Save favorite experiences
- [ ] **Advanced Search** - Filter by date, price range, category
- [ ] **Multi-language Support** - i18n implementation

### Phase 2: Admin Dashboard
- [ ] **Admin Panel** - Comprehensive admin dashboard
- [ ] **Analytics** - Booking statistics and revenue reports
- [ ] **User Management** - View and manage users
- [ ] **Experience Management** - CRUD operations for experiences
- [ ] **Promo Code Analytics** - Track promo code usage
- [ ] **Booking Management** - View and manage all bookings

### Phase 3: AI & Personalization
- [ ] **AI Recommendations** - Personalized experience suggestions
- [ ] **Chatbot** - AI-powered customer support
- [ ] **Predictive Analytics** - Forecast demand and trends

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---


## 👥 Authors

**Your Name**
- GitHub: [@brijeshpatel49](https://github.com/brijeshpatel49)
- LinkedIn: [Brijesh Patel](https://linkedin.com/in/brijesh-patel-b1195b288)
- Email: brijeshp3349@gmail.com

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **MongoDB** - For the flexible NoSQL database
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the lightning-fast build tool
- **Open Source Community** - For inspiration and support

---

<div align="center">
  
  ### ⭐ Star this repo if you find it helpful!
  
  **Made with ❤️ by Brijesh Patel**
  
  [Back to Top](#-bookit)
  
</div>
