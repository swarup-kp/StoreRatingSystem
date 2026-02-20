# 🏪 Store Rating System

A full-stack web application that allows users to rate and review stores, with separate dashboards for customers, store owners, and administrators.

## ✨ Features

### 👤 User Features
- **User Registration & Authentication**: Secure signup and login with JWT tokens
- **Browse Stores**: View all available stores with their ratings
- **Rate Stores**: Submit 1-5 star ratings for stores
- **Real-time Updates**: See average ratings update instantly

### 🏪 Store Owner Features
- **Owner Dashboard**: View ratings and feedback for owned stores
- **Performance Analytics**: Track average ratings and customer feedback
- **Customer Insights**: See detailed reviews and ratings from customers

### 👑 Admin Features
- **Platform Overview**: Monitor total users, stores, and ratings
- **System Management**: Comprehensive admin dashboard with platform statistics
- **User Management**: Tools for managing platform users and stores

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with modern design

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=store_rating_db
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Set up MySQL database:**
   - Create a database named `store_rating_db`
   - The application will create tables automatically on first run

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd store-rating-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📊 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Store Routes
- `GET /api/stores` - Get all stores (User)
- `GET /api/stores/owner/dashboard` - Get owner's store dashboard
- `GET /api/stores/admin/stats` - Get admin statistics

### Rating Routes
- `POST /api/ratings` - Submit a rating
- `GET /api/ratings/store/:id` - Get ratings for a store

## 🏗️ Project Structure

```
store-rating-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── ratingController.js   # Rating operations
│   │   └── storeController.js    # Store management
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── ratingRoutes.js       # Rating endpoints
│   │   └── storeRoutes.js        # Store endpoints
│   ├── server.js                 # Main server file
│   └── package.json
├── store-rating-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation component
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── UserDashboard.jsx # Customer dashboard
│   │   │   ├── OwnerDashboard.jsx # Store owner dashboard
│   │   │   └── AdminDashboard.jsx # Admin dashboard
│   │   ├── services/
│   │   │   └── api.js            # API service functions
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # App entry point
│   │   ├── index.css             # Global styles
│   │   └── style.css             # Component styles
│   ├── index.html
│   └── package.json
└── README.md
```

## 🎯 Usage

### For Users
1. Register a new account or login
2. Browse available stores
3. Click on star ratings to rate stores
4. View average ratings and feedback

### For Store Owners
1. Login with owner credentials
2. View your store's performance
3. Monitor customer ratings and feedback
4. Track rating trends

### For Administrators
1. Login with admin credentials
2. Monitor platform statistics
3. Manage users and stores
4. View system health metrics

## 🔐 Authentication & Authorization

The application uses JWT (JSON Web Tokens) for authentication with role-based access control:

- **USER**: Can browse stores and submit ratings
- **OWNER**: Can view their store's ratings and analytics
- **ADMIN**: Full platform access and management

## 🎨 Design Features

- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Mobile-Friendly**: Responsive layout for all screen sizes
- **Intuitive UX**: Clear navigation and user feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

## 🔄 Future Enhancements

- [ ] Email notifications for new ratings
- [ ] Advanced analytics and reporting
- [ ] Store photo uploads
- [ ] Review comments and replies
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Social media integration

---

**Made with ❤️ for better shopping experiences**