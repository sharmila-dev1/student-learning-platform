const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const progressRoutes = require("./routes/progressRoutes");
const quizRoutes = require("./routes/quizRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: ["https://student-learning-platform-phi.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quizzes", quizRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Learnhub API is running",
  });
});

app.use(errorHandler);

module.exports = app;
