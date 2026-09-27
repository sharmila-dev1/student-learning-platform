# LearnHub - Student Learning Platform

## Project Overview

LearnHub is a responsive Student Learning Platform developed as part of the YuvaIntern Full Stack Developer Virtual Internship.The application provides students with a user-friendly interface to explore courses, view course details, track their learning progress, complete quizzes, view results, and manage their profiles.An admin dashboard is also included for managing courses and viewing platform statistics

## Week 2 - Front-End Application Development

This week's focus was on developing the Front-End Application using React.js, designed with resuable components, responsive layouts,, interactive elements, and client-side navigation.

## Technologies Used

- React.js
- Vite
- JavaScript (ES6+)
- React Router DOM
- Bootstrap
- CSS

## Features

### Student Features

- Home Page
- Browse courses
- Search and Filter courses
- View course details
- Student registration
- Student login
- Student dashbaord
- View enrolled courses
- Learning page with lessons
- Course progress tracking
- Interactive quizzes
- Quix result page
- student profile management

### Admin Features

- Admin dashboard
- Course management interface
- Course statistics
- Student statistics
- Lesson and quiz statistics
- Recent activity section
- Add, edit and delete course interface

## Project Structure

student-learning-platform/
│
├── public/
│
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ ├── CourseCard.jsx
│ │ └── ProgressBar.jsx
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Courses.jsx
│ │ ├── CourseDetails.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── StudentDashboard.jsx
│ │ ├── MyCourses.jsx
│ │ ├── Learning.jsx
│ │ ├── Quiz.jsx
│ │ ├── Result.jsx
│ │ ├── Profile.jsx
│ │ └── AdminDashboard.jsx
│ │
│ ├── data/
│ │ └── courses.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── package.json
├── package-lock.json
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

## Development Process

The front-end was developed in the following stages:

- Project setup using Vite and React.
- Installation and configuration of required dependencies.
- Creation of reusable UI components.
- Development of the home page.
- Development of the course listing and search/filter functionality.
- Development of course details.
- Implementation of login and registration interfaces.
- Development of the student dashboard.
- Development of enrolled courses and learning pages.
- Implementation of the quiz and result pages.
- Development of the student profile page.
- Development of the admin dashboard.
- Testing navigation and user interactions.
- Testing the production build using npm run build.

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### Clone the Repository

### Navigate to the Project

cd student-learning-platform

### Install Dependencies

npm install

### Start the Development Server

npm run dev

## Current Project Status

This current version uses static/mock data for several features.Backend APIs, database integration, authentication with JWT, and persistent data storage will be implemented in the upcoming backend and integration stages.

## Future Enchancements

- Node.js and Express.js REST APIs
- MongoDB database integration
- Mongoose models
- JWT authentication
- Role-based access control
- Real course CRUD operations
- Real student enrollment
- Persistent learning progress
- Persistent quiz results
- Backend validation and error handling
- Full front-end and back-end integration

## Author

**Sharmila P**
