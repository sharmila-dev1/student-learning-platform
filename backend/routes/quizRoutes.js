const express = require("express");
const {
  getQuizById,
  submitQuiz,
  getMyQuizResults,
  getQuizByCourseId,
  getQuizByCourseIdAdmin,
  createQuiz,
  updateQuiz,
} = require("../controllers/quizController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/results/my", protect, authorizeRoles("student"), getMyQuizResults);
router.get(
  "/course/:courseId",
  protect,
  authorizeRoles("student"),
  getQuizByCourseId,
);
router.get("/:quizId", protect, authorizeRoles("student"), getQuizById);
router.post("/:quizId/submit", protect, authorizeRoles("student"), submitQuiz);

// Admin route: create a quiz
router.post("/", protect, authorizeRoles("admin"), createQuiz);
router.get(
  "/admin/course/:courseId",
  protect,
  authorizeRoles("admin"),
  getQuizByCourseIdAdmin,
);
router.put("/:quizId", protect, authorizeRoles("admin"), updateQuiz);

module.exports = router;
