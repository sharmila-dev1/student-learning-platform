# LearnHub Backend API

Backend REST API for the LearnHub Student Learning Platform

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authenctication
- bcryptjs
- Postman

## Project Setup

### Install dependencies

npm install

### Create .env

PORT = 5000
MOMGO_URI = YOUR_MONGODB_ATLAS_CONNECTION_STRING
JWT_SCERET = YOUR_JWT_sECRET

### Start teh development server

npm run dev

The API runs at: `http://localhost:5000`

## Authentication APIs

1. Register User

Endpoint:
POST /api/auth/register

Request Body:
{
"name": "Test Student",
"email": "test@example.com",
"password": "123456"
}

Success Response:
201 Created
{
"message": "User registered successfully",
"user": {
"id": "USER_ID",
"name": "Test Student",
"email": "test@example.com",
"role": "student"
}
}

Validation Error:
400 Bad Request
{
"message": "Please provide name, email, and password"
}

Duplicate Email:
400 Bad Request
{
"message": "User already exists"
}
New Users are registered as students.Admin accounts are not created through public registration.

2. Login User

Endpoint:
POST /api/auth/login

Request Body:
{
"email": "test@example.com",
"password": "123456"
}

Success Response:
200 OK
{
"message": "Login successful",
"token": "JWT_TOKEN",
"user": {
"id": "USER_ID",
"name": "Test Student",
"email": "test@example.com",
"role": "student"
}
}

Invalid Credentails:
401 Unathorized
{
"message": "Invalid email or password"
}

3. Get User Profile

This is a protected route.

Endpoint:
GET /api/auth/profile

Authorization:
Authorization: Bearer JWT_TOKEN

Success Response:
200 OK
{
"message": "You accessed a protected route",
"user": {
"userId": "USER_ID",
"role": "student"
}
}

Missing Token:
401 Unathorized
{
"message": "Not authorized. No token provided"
}

Invalid Token:
401 Unauthorized
{
"message": "Not authorized. Invalid or expired token"
}

## Course APIs

Authorization:
POST /api/courses
PUT /api/courses/:id
DELETE /api/courses/:id
Students can access the course read operations

1. Create Course

Endpoint:
POST /api/courses

Authorization:
Bearer ADMIN_JWT_TOKEN

Request Body:
{
"title": "JavaScript Fundamentals",
"description": "Learn JavaScript fundamentals from scratch.",
"instructor": "LearnHub Instructor",
"category": "Web Development",
"level": "Beginner",
"duration": "4 Weeks",
"thumbnail": "https://example.com/course.jpg",
"price": 0
}

Success Response:
201 Created
{
"message": "Course created successfully",
"course": {
"\_id": "COURSE_ID",
"title": "JavaScript Fundamentals",
"description": "Learn JavaScript fundamentals from scratch.",
"instructor": "LearnHub Instructor",
"category": "Web Development",
"level": "Beginner",
"duration": "4 Weeks",
"thumbnail": "https://example.com/course.jpg",
"price": 0
}
}

Student Access:
403 Forbidden
{
"message": "Access denied. Admin privileges required"
}

2. Get All Courses

Endpoint:
GET /api/courses

Authorization:
No authentication required

Success Response:
200 OK
{
"count": 1,
"courses": [
{
"_id": "COURSE_ID",
"title": "JavaScript Fundamentals",
"description": "Learn JavaScript fundamentals from scratch.",
"instructor": "LearnHub Instructor",
"category": "Web Development",
"level": "Beginner",
"duration": "4 Weeks",
"price": 0
}
]
}

3. Get Course by ID

Endpoint:
GET /api/courses/:id

Example:
GET /api/courses/COURSE_ID

Authorization:
No authentication required

Success Response:
200 OK
{
"course": {
"\_id": "COURSE_ID",
"title": "JavaScript Fundamentals",
"description": "Learn JavaScript fundamentals from scratch.",
"instructor": "LearnHub Instructor",
"category": "Web Development",
"level": "Beginner",
"duration": "4 Weeks",
"price": 0
}
}

Invalid ID:
400 Bad Request
{
"message": "Invalid ID format"
}

Course Not Found:
404 Not Found
{
"message": "Course not found"
}

4. Update Course

Endpoint:
PUT /api/courses/:id

Authorization:
Bearer ADMIN_JWT_TOKEN

Request Body:
{
"title": "Advanced JavaScript Fundamentals",
"level": "Intermediate",
"duration": "8 Weeks"
}

Success Response:
200 OK
{
"message": "Course updated successfully",
"course": {
"\_id": "COURSE_ID",
"title": "Advanced JavaScript Fundamentals",
"level": "Intermediate",
"duration": "8 Weeks"
}
}

5. Delete Course

Endpoint:
DELETE /api/courses/:id

Authorization:
Bearer ADMIN_JWT_TOKEN

Success Response:
200 OK
{
  "message": "Course deleted successfully"
}

Course Not Found:
404 Not Found
{
  "message": "Course not found"
}

## Authentication Flow

Register
   ↓
Login
   ↓
JWT Token Generated
   ↓
Send JWT with Protected Requests
   ↓
JWT Middleware Verifies Token
   ↓
Role Middleware Checks User Role
   ↓
Allow / Deny Request

## Role-Based Access Control

| Operation     | Student | Admin |
| ------------- | ------- | ----- |
| Register      | ✅       | —     |
| Login         | ✅       | ✅     |
| View Courses  | ✅       | ✅     |
| Create Course | ❌       | ✅     |
| Update Course | ❌       | ✅     |
| Delete Course | ❌       | ✅     |

## API Testing
The APIs were tested using Postman.Tested scenarios include:

- User registration
- Duplicate email validation
- Missing registration fields
- Successful login
- Invalid password
- Protected route without token
- Protected route with valid token
- Student attempting admin operation
- Admin creating a course
- Create course
- Get all courses
- Get course by ID
- Update course
- Delete course
- Invalid MongoDB ID

## Error Handling

The API handles:

- Missing required fields
- Duplicate users
- Invalid credentials
- Missing authentication tokens
- Invalid or expired JWT tokens
- Unauthorized student access
- Invalid MongoDB IDs
- Course not found
- Validation errors
- Unexpected server errors