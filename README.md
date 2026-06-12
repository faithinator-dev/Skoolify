# Skoolify 🎓

Skoolify is a robust School Management System designed to streamline educational administration. It provides a comprehensive platform for managing schools, students, teachers, subjects, attendance, and academic performance.

## 🚀 Features

- **Authentication & Authorization**: Secure login and registration with role-based access control (RBAC).
- **User Management**: Manage different user roles including Administrators, Teachers, and Students.
- **Academic Management**: 
  - Manage School profiles.
  - Track Student and Teacher records.
  - Manage Subjects and curriculum.
- **Attendance Tracking**: Digital attendance management for students.
- **Performance Tracking**: Record and calculate student scores and grades.
- **Resource Management**: Manage school resources and materials.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT (JSON Web Tokens) for authentication, Bcrypt.js for password hashing
- **Environment Management**: Dotenv
- **Cross-Origin Resource Sharing**: CORS

## 📁 Project Structure

```text
Skoolify/
├── client/             # Frontend application (Placeholder)
└── server/             # Backend API
    ├── src/
    │   ├── config/     # Database and environment configurations
    │   ├── controllers/# Business logic for routes
    │   ├── middleware/ # Custom Express middlewares (Auth, Error handling)
    │   ├── models/     # Mongoose schemas
    │   ├── routes/     # API route definitions
    │   ├── utils/      # Utility functions (Grading, Token generation)
    │   ├── app.js      # Express app setup
    │   └── server.js   # Server entry point
    └── .env            # Environment variables
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB account (Local or Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Skoolify
   ```

2. **Setup the Server**:
   ```bash
   cd server
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the `server` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**:
   - For development: `npm run dev`
   - For production: `npm start`

## 🔌 API Endpoints (Initial)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

*More endpoints for students, teachers, and schools are under development.*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
