const express = require("express");

const {
  markLessonComplete,
  getCourseProgress,
} = require("../controllers/progressController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("student"), markLessonComplete);
router.get("/:courseId", protect, authorizeRoles("student"), getCourseProgress);

module.exports = router;
