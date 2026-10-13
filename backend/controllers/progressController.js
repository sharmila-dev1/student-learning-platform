const mongoose = require("mongoose");
const Progress = require("../models/Progress");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// Mark a lesson as complete
const markLessonComplete = async (req, res) => {
  try {
    const { courseId, moduleIndex, lessonIndex } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(courseId) ||
      !Number.isInteger(moduleIndex) ||
      !Number.isInteger(lessonIndex) ||
      moduleIndex < 0 ||
      lessonIndex < 0
    ) {
      return res.status(400).json({
        message: "Valid courseId, moduleIndex, and lessonIndex are required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(403).json({
        message: "Enroll in this course before tracking progress",
      });
    }

    const module = course.modules[moduleIndex];

    if (!module || !module.lessons[lessonIndex]) {
      return res.status(404).json({
        message: "Lesson not found in this course",
      });
    }

    const progress = await Progress.findOneAndUpdate(
      {
        student: req.user._id,
        course: courseId,
        moduleIndex,
        lessonIndex,
      },
      {
        $set: {
          completed: true,
          completedAt: new Date(),
        },
      },
      {
        upsert: true,
        returnDocument: "after",
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json({
      message: "Lesson marked as complete",
      progress,
    });
  } catch (error) {
    console.error("Mark lesson complete error:", error.message);

    res.status(500).json({
      message: "Failed to update lesson progress",
    });
  }
};

// Get completed lessons for a course
const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid course ID",
      });
    }

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(403).json({
        message: "Enroll in this course to view its progress",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const records = await Progress.find({
      student: req.user._id,
      course: courseId,
      completed: true,
    }).select("moduleIndex lessonIndex");

    const completedLessons = records.map(
      (record) => `${record.moduleIndex + 1}-${record.lessonIndex + 1}`,
    );

    res.status(200).json({
      courseId,
      completedLessons,
      count: completedLessons.length,
      totalLessons: course.modules.reduce(
        (total, module) => total + module.lessons.length,
        0,
      ),
    });
  } catch (error) {
    console.error("Get course progress error:", error.message);

    res.status(500).json({
      message: "Failed to fetch lesson progress",
    });
  }
};

module.exports = {
  markLessonComplete,
  getCourseProgress,
};
