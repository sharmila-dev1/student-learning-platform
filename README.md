# LearnHub - Student Learning Platform

## Project Overview

LearnHub is a full-stack student learning platform developed as part of my Yuvaintern internship project. It allows students to explore courses, enroll in learning programs, access lessons, take quizzes, and manage their learning activities.The project integrates a React frontend with a Node.js and Express backend and uses MongoDB for data storage.

## Live Demo
- **Frontend:** https://student-learning-platform-phi.vercel.app/
- **Backend:** https://student-learning-platform-hrje.vercel.app/

## Objective

Integrate the frontend application with the backend REST APIs developed in the previous task. The frontend sends HTTP requests to the backend,displays data returned by the APIs, and handles loading or error responses.

## Technologies Stack

**Frontend** - React - JavaScript - HTML and CSS - Bootstrap - Axios

**Backend** - Node.js - Express.js - JavaScript - MongoDB - Mongoose - JSON Web Token(JWT) authentication - bcrypts

**Testing** - Postman for API request testing - Browser for frontend and integration testing

**Tools and Platforms** - VS code - Git and GitHub - Postman - Vercel - MongoDB Atlas

## Features 

### Student Features

- Student registration and login
- Browse available courses
- View course details
- Enroll in courses
- Access enrolled courses through the student dashboard
- View profile information
- Access lesson content
- Take quizzes and view results
- Track learning progress where supported

### Admin Features

- Manage courses
- Add courses
- Update or delete courses where supported
- Manage learning content and quizzes where implemented

### Application Features

- React-based user interface
- Frontend and backend API integration
- MongoDB database integration
- REST API architecture
- JWT-based authentication and role-based authorization
- API request and error handling
- Deployment using Vercel

### Security

- Passwords hashed with bcrypt
- JWT-protected routes
- Role-based access control (student / admin)
- Centralized error handling

## Project Structure

```
student-learning-platform/
├── backend/
│   ├── config/
│   ├── controllers/               # Request handlers
│   ├── middleware/
│   ├── models/                    # Mongoose schemas
│   ├── routes/                    # API route definitions
│   ├── seedCourses.js             # Seeds sample courses
│   ├── seedQuiz.js                # Seeds sample quizzes
│   └── server.js                  # Backend entry point
├── public/
├── src/
│   ├── api/api.js                 # Axios instance
│   ├── assets/
│   ├── components/                # Navbar, Footer, CourseCard, ProgressBar
│   ├── pages/                     # Home, Courses, Quiz, Dashboard, ...
│   ├── App.jsx                    # Routes
│   └── main.jsx                   # Frontend entry point
├── index.html
├── vite.config.js
├── package.json                   # Frontend dependencies
└── README.md
```

## Component-Based Architecture

The application follows a component-based architecture.Resuable components such as Navbar, Footer, CourseCard and ProgressBar are separted from page-level components.This make the appliaction easier to maintain, reuse, and extend.

## Navigation

React Router DOM is used for client-side navigation.Main routes include:

- /
- /courses
- /courses/:id
- /login
- /register
- /student/dashboard
- /student/my-courses
- /student/learning/:courseId
- /student/quiz/:quiId
- /student/result/quizId
- /student/profile
- /admin/dashboard

## Installation and Setup

### Prerequisites

Install the following before running the project:

-   Node.js and npm
-   MongoDB Atlas account or a local MongoDB instance
-   Git
-   A modern web browser
-   Postman (for API testing)

### Environment Configuration

Create a `.env` file inside the backend directory. A typical configuration is:

``` env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
```

### Navigate to the Project

cd student-learning-platform

### Install Frontend Dependencies

npm install

### Start the frontend Server

npm run dev

The app will run at ` http://localhost:5173/`

### Install Backend Dependencies

cd backend
npm install

### Configure backend environment variables

Create a .env file inside the backend/ directory.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Start the backend server

npm run dev

The local backend normally uses ` http://localhost:5000 `

### Verify the integration

1.  Confirm the backend starts without database connection errors.
2.  Confirm the frontend opens in the browser.
3.  Register or log in with a test account.
4.  Open the course list and course details.
5.  Enroll in a course and check the student dashboard or My Courses page.
6.  Open a lesson and test the available progress action.
7.  Open a quiz, submit answers, and verify the result.
8.  If using an admin account, test course management features.
9.  Use the browser console and backend terminal to investigate any failed request.

## API Integration

The frontend communicates with the backend through HTTP requests. The backend processes requests, interacts with MongoDB, and returns responses to the frontend.

The application includes API route groups for:

| API Route          | Purpose                              |
| ------------------ | ------------------------------------ |
| `/api/auth`        | User registration and authentication |
| `/api/courses`     | Course-related operations            |
| `/api/enrollments` | Course enrollment operations         |
| `/api/progress`    | Learning progress operations         |
| `/api/quizzes`     | Quiz-related operations              |


## Integration and Error Handling

-   The frontend sends requests to the backend and uses returned JSON data to update the interface.
-   Authentication tokens are included when calling protected APIs.
-   Backend validation errors are returned to the frontend and should be shown to the user where handled.
-   When a request fails, check the HTTP status and response body in the browser's Network panel or Postman.
-   Check the backend terminal for server-side errors.
-   Use the correct protocol and backend URL. For a local Express server, `http://localhost:5000` is typically used unless HTTPS has been explicitly configured.
-   Confirm that the MongoDB connection string is loaded from the backend environment variables.

## Testing Performed

The application can be tested using the following scenarios:

- Verify that the frontend loads successfully.
- Verify that the backend root route responds.
- Test student registration and login.
- Verify that courses load from the backend.
- Test course details and enrollment.
- Verify that enrolled courses appear in the student dashboard.
- Test profile information.
- Test lesson and quiz functionality.
- Check API responses and errors using Postman.
- Review browser developer tools when a request fail

## Challenges and solutions

### Connecting the frontend to the local backend

**Challenge:** Frontend requests may fail if the backend URL or protocol is incorrect.

**Solution:** Verify the backend is running, use the correct local URL, and inspect the browser Network panel and backend terminal when a request fails.

### Validation errors during registration

**Challenge:** The backend can reject a request when required fields such as name, email, or password are missing or do not match the expected format.

**Solution:** Ensure the frontend sends the required fields using the names expected by the backend and display the returned validation message.

### Loading course and lesson data

**Challenge:** A course or lesson may not appear if its ID is invalid or the corresponding database record does not exist.

**Solution:** Verify IDs and database records, and handle not-found responses in the UI.

### Authentication and role restrictions

**Challenge:** Student and admin endpoints have different access permissions.

**Solution:** Send the authentication token for protected requests and use the correct account role when testing admin-only functionality.

### Learning progress records

**Challenge:** Progress updates may fail when required lesson identifiers are missing or invalid.

**Solution:** Verify that the frontend sends the correct lesson identifier and that the backend validates it before saving progress.

## Future Improvements

- Improve mobile responsiveness across all pages.
- Add automated frontend and backend tests.
- Improve loading indicators and error messages.
- Expand API documentation with verified request and response examples.
- Improve accessibility and form validation.
- Complete and thoroughly test all learning progress features.
- Add further learning analytics and reporting features.

## Learning Outcomes

Through this project, I gained practical experience in:

- Building React-based frontend applications.
- Developing REST APIs with Node.js and Express.js.
- Connecting a frontend application to a backend.
- Working with MongoDB and Mongoose.
- Implementing authentication and role-based authorization.
- Testing API endpoints using Postman.
- Managing source code with Git and GitHub.
- Deploying web applications using Vercel.

## Author

**Sharmila P**
[Github] - (https://github.com/sharmila-dev1/student-learning-platform)
