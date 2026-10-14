# LearnHub - Student Learning Platform

## Project Overview

A full-satck student learning platform built as part of the YuvaIntern internship project. LearnHub connects a React frontend to a Node.js/Express backend and MongoDB database. Students can register, browse courses, enroll, access lessons, and complete quizzes. Admins can manage courses and quizzes from admin dashboard.

## [Live Demo] - https://student-learning-platform-phi.vercel.app/

## Week 4 - Front-End -- Back-End Integration

### Objective

Integrate the frontend application with the backend REST APIs developed in the previous task. The frontend sends HTTP requests to the backend,displays data returned by the APIs, and handles loading or error responses.

### Technologies Stack

**Frontend** - React - JavaScript - HTML and CSS - Bootstrap - Axios

**Backend** - Node.js - Express.js - MongoDB - Mongoose - JSON Web Token(JWT) authentication / role-based authorization, as configured in the project

**Testing** - Postman for API request testing - Browser for frontend and integration testing

## Features 

### Student

- Browse, search, and filter courses
- View course details
- Register and log in (JWT authentication)
- Enroll in courses and view enrolled courses
- Learning page with modules and lessons
- Lesson-by-lesson progress tracking
- Take quizzes and view results
- View and update profile

### Admin

- Admin dashboard with platform statistics
- Create, update, and delete courses
- Create and update quizzes for a course

### Security

- Passwords hashed with bcrypt
- JWT-protected routes
- Role-based access control (student / admin)
- Centralized error handling

## Project Structure

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

### Install Dependencies

npm install

### Start the backend server

npm run dev

The backend is run at ` http://localhost:5000 `

### Start the frontend Server

npm run dev

The app will run at ` http://localhost:5173/`

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

The frontend communicates with the backend through HTTP requests.Protected endpoints require the authentication token used by the project, typically sent as a Bearer token in the `Authorization` header.

Examples of routes present in the project include:

---------------------------------------------------------------------------------------
  Method                  Endpoint                                Purpose
  ----------------------- --------------------------------------- -----------------------
  `POST`                  `/api/quizzes`                          Admin creates a quiz

  `GET`                   `/api/quizzes/course/:courseId`         Student retrieves a
                                                                  quiz for a course

  `GET`                   `/api/quizzes/:quizId`                  Student retrieves quiz
                                                                  questions

  `POST`                  `/api/quizzes/:quizId/submit`           Student submits quiz
                                                                  answers

  `GET`                   `/api/quizzes/results/my`               Student retrieves their
                                                                  quiz results

  `PUT`                   `/api/quizzes/:quizId`                  Admin updates an
                                                                  existing quiz

  `GET`                   `/api/quizzes/admin/course/:courseId`   Admin retrieves quiz
                                                                  details, including
                                                                  correct answers, for
                                                                  editing
  ---------------------------------------------------------------------------------------

## Integration and Error Handling

-   The frontend sends requests to the backend and uses returned JSON data to update the interface.
-   Authentication tokens are included when calling protected APIs.
-   Backend validation errors are returned to the frontend and should be shown to the user where handled.
-   When a request fails, check the HTTP status and response body in the browser's Network panel or Postman.
-   Check the backend terminal for server-side errors.
-   Use the correct protocol and backend URL. For a local Express server, `http://localhost:5000` is typically used unless HTTPS has been explicitly configured.
-   Confirm that the MongoDB connection string is loaded from the backend environment variables.

## Testing Performed

- Frontend starts successfully.
- Backend starts and connects to MongoDB.
- Student registration works.
- Student login works. 
- Course enrollment appears in the student account.
- Course data loads in the frontend.
- Lesson content loads.
- Learning progress action works.
- Quiz questions load and quiz submission returns a result.
- Admin can add a course.
- Admin can edit a course.
- Admin can delete a course and the deletion persists after refresh.
- API errors are handled without breaking the page.

## Challenges and Resolutions

### Connecting the frontend to the local backend

**Challenge:** Frontend requests may fail if the backend URL or protocol is incorrect.

**Resolution:** Verify the backend is running, use the correct local URL, and inspect the browser Network panel and backend terminal when a request fails.

### 2. Validation errors during registration

**Challenge:** The backend can reject a request when required fields such as name, email, or password are missing or do not match the expected format.

**Resolution:** Ensure the frontend sends the required fields using the names expected by the backend and display the returned validation message.

### 3. Loading course and lesson data

**Challenge:** A course or lesson may not appear if its ID is invalid or the corresponding database record does not exist.

**Resolution:** Verify IDs and database records, and handle not-found responses in the UI.

### 4. Authentication and role restrictions

**Challenge:** Student and admin endpoints have different access permissions.

**Resolution:** Send the authentication token for protected requests and use the correct account role when testing admin-only functionality.

### 5. Learning progress records

**Challenge:** Progress updates may fail when required lesson identifiers are missing or invalid.

**Resolution:** Verify that the frontend sends the correct lesson identifier and that the backend validates it before saving progress.

## Future Improvements

-   Add automated frontend and API tests.
-   Improve loading indicators and user-facing error messages.
-   Add responsive layout checks for mobile screens.
-   Expand API documentation with verified request and response
    examples.
-   Improve accessibility, form validation, and empty-state messages.
-   Add deployment configuration and environment-specific API URLs.

## Author

**Sharmila P**
[Github] - (https://github.com/sharmila-dev1/student-learning-platform)
