const express = require("express");
const router = express.Router();

const {
  enrollInCourse,
  getMyCourses,
} = require("../controllers/enrollmentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Enroll in a course
router.post("/", protect, authorizeRoles("student"), enrollInCourse);

// Get courses enrolled by the logged-in student
router.get("/my-courses", protect, authorizeRoles("student"), getMyCourses);

module.exports = router;
