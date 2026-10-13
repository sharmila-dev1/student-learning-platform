const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");


const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Validate course ID
    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required",
      });
    }

    // Check whether the course ID is valid
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      return res.status(400).json({
        message: "Invalid course ID format",
      });
    }

    // Check whether the course exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Prevent duplicate enrollment
    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(409).json({
        message: "You are already enrolled in this course",
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });

    return res.status(201).json({
      message: "Successfully enrolled in the course",
      enrollment,
    });
  } catch (error) {
    // Handle duplicate enrollment if simultaneous requests occur
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You are already enrolled in this course",
      });
    }

    console.error("Enrollment error:", error.message);

    return res.status(500).json({
      message: "Failed to enroll in the course",
    });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    })
      .populate("course")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    console.error("Fetch enrollments error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch your enrolled courses",
    });
  }
};

module.exports = {
  enrollInCourse,
  getMyCourses,
};