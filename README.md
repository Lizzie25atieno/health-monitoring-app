# 🌐 Live URLs:
- Frontend: https://health-monitoring-app-frontend.netlify.app/
- Backend: https://health-monitoring-app-backend.onrender.com

# 🏥 HealthTracker Pro - Personal Health Monitoring App

https://img.shields.io/badge/HealthTracker-Pro-brightgreen
https://img.shields.io/badge/React-18.x-blue
https://img.shields.io/badge/Node.js-Express-green
https://img.shields.io/badge/MongoDB-Database-green

A comprehensive full-stack health monitoring application that helps users track their health metrics, analyze symptoms, and maintain their wellness journey with AI-powered insights.

## ✨ Features

## 🎯 Core Functionality
- User Authentication - Secure registration and login with JWT
- Health Record Management - Add, view, edit, and delete health records
- AI Symptom Checker - Get insights about symptoms and possible conditions
- Progress Tracking - Monitor your health journey with visual metrics
- Data Export - Download your health records as CSV files

## 🎨 User Experience
1. Beautiful Dashboard - Animated gradients and modern UI
2. Motivational Messages - Daily encouragement and health tips
3. Mood Tracking - Quick emotional state logging
4. Achievement System - Earn badges for consistent tracking
5. Health Reminders - Set daily tracking reminders
6. Responsive Design - Works perfectly on all devices

## 🔒 Security & Privacy
1. Password Hashing - Secure bcrypt encryption
2. JWT Authentication - Protected routes and API endpoints
3. User Data Isolation - Users can only access their own records
4. Input Validation - Client and server-side validation

## 🚀 Quick Start
- Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation
1. Clone the repository
2. Backend setup
3. Frontend setup
4. Environment configuration
5. Start Application (Frontend terminal 1, Backend terminal 2)
6. Access the application
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

# 📁 Project Structure
```
healthtracker-pro/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # User authentication logic
│   │   └── healthController.js   # Health record CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protection middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── HealthRecord.js      # Health record schema
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication endpoints
│   │   └── healthRoutes.js      # Health record endpoints
│   ├── utils/
│   │   └── generateToken.js     # JWT token generation
│   └── server.js                # Express server setup
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js           # Axios instance and interceptors
│   │   ├── components/
│   │   │   ├── AddHealthForm.jsx    # Form to add health records
│   │   │   ├── EditHealthForm.jsx   # Modal to edit records
│   │   │   ├── HealthCard.jsx       # Individual record display
│   │   │   ├── Navbar.jsx           # Navigation component
│   │   │   ├── SymptomChecker.jsx   # AI symptom analysis
│   │   │   └── ErrorBoundary.jsx    # Error handling component
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication state management
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx    # Main dashboard
│   │   │   ├── LoginPage.jsx        # User login
│   │   │   ├── RegisterPage.jsx     # User registration
│   │   │   └── WelcomePage.jsx      # Landing page
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React DOM rendering
│   │   └── index.css                # Global styles and Tailwind
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md   
```
# 🛠️ Technology Stack
## Frontend
1. React 18 - UI library
2. React Router DOM - Client-side routing
3. Axios - HTTP client for API calls
4. Tailwind CSS - Utility-first CSS framework
5. Context API - State management

## Backend
1. Node.js - Runtime environment
2. Express.js - Web framework
3. MongoDB - NoSQL database
4. Mongoose - ODM for MongoDB
5. JWT - JSON Web Tokens for authentication
6. bcryptjs - Password hashing
7. CORS - Cross-origin resource sharing

# 📊 API Endpoints
## Authentication Routes (/api/auth)
- POST /register - Create new user account
- POST /login - Authenticate user and return token

## Health Records Routes (/api/health)
- GET / - Get all health records for logged-in user
- POST / - Create new health record
- PUT /:id - Update specific health record
- DELETE /:id - Delete health record

# 🎮 Usage Guide
## For New Users
1. Visit the Welcome Page - Learn about app features
2. Register Account - Create your personal health profile
3. Add First Record - Start tracking your health metrics
4. Explore Dashboard - View your progress and get health tips

## Daily Use
1. Log Health Metrics - Track weight, blood pressure, heart rate
2.  Check Symptoms - Use AI symptom checker for insights
3. Monitor Progress - View your health journey on dashboard
4. Export Data - Download records for doctor visits

## Health Tracking Tips
1. Record measurements at consistent times
2. Use notes to track symptoms or feelings
3. Check the symptom checker for unusual patterns
4. Set daily reminders for consistent tracking

# 🔧 Development
## Running in Development Mode
```
# Backend with auto-restart
cd backend && npm run dev

# Frontend with hot reload
cd frontend && npm run dev
```
## Building for Production
```
# Build frontend
cd frontend && npm run build
```
## Environment Variables
See .env.example for required environment variables.
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/healthtracker?retryWrites=true&w=majority
JWT_SECRET=very_long_random_string_at_least_32_characters_long
PORT=5000
```

# 🤝 Contributing
We welcome contributions! Please feel free to submit issues and enhancement requests.

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

# 🆘 Support
If you encounter any issues or have questions:

1. Check the Issues page
2. Create a new issue with detailed description
3. Contact: elizabethatienoochieng2019@gmail.com

---

**Built with ❤️ for better health tracking**

*Remember: This app provides health insights but is not a substitute for professional medical advice. Always consult healthcare professionals for medical concerns.*

