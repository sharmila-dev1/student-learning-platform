# LearnHub - Student Learning Platform

## Project Overview

LearnHub is a full-stack student learning platform developed as part of my Yuvaintern internship project. It allows students to explore courses, enroll in learning programs, access lessons, take quizzes, and manage their learning activities.The project integrates a React frontend with a Node.js and Express backend and uses MongoDB for data storage.

## 🌐 Live Demo

- **Frontend:** https://student-learning-platform-phi.vercel.app/
- **Backend:** https://student-learning-platform-hrje.vercel.app/
- **Github:** https://github.com/sharmila-dev1/student-learning-platform

## 📌 Objective

- Develop a responsive and user-friendly online learning platform.
- Integrate a React frontend with a Node.js and Express.js backend.
- Implement user authentication and role-based authorization.
- Provide course enrollment, learning materials, and quiz functionality.
- Enable administrators to manage courses.
- Deploy the frontend and backend to public hosting platforms.

## 🧰 Technologies Used

**Frontend** - React - Vite - JavaScript - HTML and CSS - Bootstrap -React Router - Axios

**Backend** - Node.js - Express.js - JavaScript - MongoDB - Mongoose - JSON Web Token(JWT) authentication - bcrypts

**Testing** - Postman for API request testing - Browser for frontend and integration testing

**Tools and Platforms** - VS code - Git and GitHub - Postman - Vercel - MongoDB Atlas

## ✨ Features

### 👨‍🎓 Student Features

- User registration and login.
- Secure authentication using JSON Web Tokens (JWT).
- Browse and explore available courses.
- View course details, including modules and lessons.
- Enroll in courses.
- Access enrolled courses through the student dashboard.
- Take quizzes and view results.
- Access lesson content.
- Track learning progress.
- View profile information and learning statistics.

### 🛠️ Admin Features

- Access the administrative dashboard.
- Add new courses with course information, modules, and lessons.
- View available courses.
- Manage course-related information.
- Control access to administrative features through role-based authorization.

### 📱 General Features

- Responsive user interface.
- Frontend and backend API integration.
- MongoDB database integration.
- REST API architecture.
- JWT-based authentication and role-based authorization.
- Error handling and validation.
- Deployment using Vercel.

## Project Structure

```
student-learning-platform/
├── backend/
│   ├── config/
│   ├── controllers/               # Request handlers
│   ├── middleware/
│   ├── models/                    # Mongoose schemas
│   ├── routes/                    # API route definitions
│   ├── tests/
│   └── server.js                  # Backend entry point
├── public/
├── reports/
├── src/
│   ├── api/api.js                 # Axios instance
│   ├── assets/
│   ├── components/                # Navbar, Footer, CourseCard, ProgressBar
│   ├── pages/                     # Home, Courses, Quiz, Dashboard, ...
│   ├── tests/
│   ├── App.jsx                    # Routes
│   └── main.jsx                   # Frontend entry point
├── index.html
├── vite.config.js
├── package.json                   # Frontend dependencies
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance
- Git
- A modern web browser
- Postman (for API testing)

### 1. Navigate to the Project

cd student-learning-platform

### 2. Install Frontend Dependencies

npm install

### 3. Configure the Backend

Navigate to the backend directory:

cd backend

Install the backend dependencies:

npm install

Create a `.env` file inside the backend directory. A typical configuration is:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the backend server

npm run dev

The local backend normally uses `http://localhost:5000`

### 5. Start the frontend Server

npm run dev

The app will run at ` http://localhost:5173/`

## 🔗 API Integration

The frontend communicates with the backend through HTTP requests. The backend processes requests, interacts with MongoDB, and returns responses to the frontend.

The application includes API functionality for the following areas:

| Module            | HTTP Method | Purpose                                          |
| ----------------- | ----------- | ------------------------------------------------ |
| Authentication    | POST        | Register a new user                              |
| Authentication    | POST        | Log in an existing user                          |
| Courses           | GET         | Retrieve available courses                       |
| Courses           | GET         | Retrieve course details                          |
| Courses           | POST        | Create a course with administrator authorization |
| Courses           | DELETE      | Delete a course, subject to authorization        |
| Enrollment        | POST        | Enroll a student in a course                     |
| Learning Progress | POST        | Record lesson completion                         |
| Quizzes           | GET         | Retrieve quiz information                        |
| Quiz Result       | POST        | Submit quiz answers and process results          |

## Authentication and Authorization

JWT is used to authenticate users.
Protected endpoints require a valid authentication token.
Role-based middleware restricts administrator-only operations.
Passwords are hashed before storage when the configured password-hashing implementation is used.
Invalid requests and unauthorized operations are handled by the backend.

## 🗄️ Database

LearnHub uses MongoDB to store application data. MongoDB Atlas can be used to host the database online.The database supports application data such as:

- User accounts and roles.
- Course information.
- Course modules and lessons.
- Student enrollments.
- Quiz questions and answers.
- Quiz results and learning progress.

Mongoose is used to define data models and interact with MongoDB.

## 🚀 Deployment

The application is deployed using Vercel.

| Component | Hosting Platform | URL                                                |
| --------- | ---------------- | -------------------------------------------------- |
| Frontend  | Vercel           | https://student-learning-platform-phi.vercel.app/  |
| Backend   | Vercel           | https://student-learning-platform-hrje.vercel.app/ |
| Database  | Vercel           | Configured through backend environment variables   |

### Deployment Process

1. Upload and maintain the source code in GitHub.
2. Configure the frontend project in Vercel.
3. Configure the backend project in Vercel.
4. Add the required environment variables to the backend deployment.
5. Configure the frontend to use the deployed backend API.
6. Configure CORS to allow requests from the deployed frontend.
7. Test registration, login, course retrieval, enrollment, and other implemented features.
8. Verify that the deployed application works correctly in a browser.

## 🧪 Testing

The application can be tested using a browser and Postman.The main testing areas include:

- User registration and login.
- Authentication and authorization.
- Course creation and retrieval.
- Course details and learning content.
- Student enrollment.
- Lesson completion and learning progress.
- Quiz retrieval and submission.
- Error handling and invalid requests.
- Frontend and backend integration.
- Deployed application accessibility.

Postman can be used to verify API requests, response status codes, response bodies, and authorization behavior.

## 🔮 Future Enhancements

- Add a complete quiz creation interface for administrators.
- Improve course editing and deletion functionality.
- Add more detailed learning analytics.
- Implement course completion certificates.
- Improve accessibility and responsive design.
- Add notifications for course updates and quiz results.

## 🎯 Learning Outcomes

Developing LearnHub provided practical experience in:

- Building full-stack web applications.
- Creating reusable React components.
- Developing REST APIs using Node.js and Express.js.
- Integrating MongoDB with Mongoose.
- Implementing JWT authentication and role-based authorization.
- Connecting frontend components to backend APIs.
- Handling asynchronous requests and application errors.
- Testing APIs using Postman.
- Deploying a full-stack application using Vercel.
- Managing source code using Git and GitHub.

## 👩‍💻 Developer

**Sharmila P**
[Github] - (https://github.com/sharmila-dev1)
