const Course = require("../models/Course");

// Create a course
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      category,
      level,
      duration,
      thumbnail,
      price,
    } = req.body;

    if (!title || !description || !instructor || !category || !duration) {
      return res.status(400).json({
        message: "Please provide all required course details",
      });
    }

    const course = await Course.create({
      title,
      description,
      instructor,
      category,
      level,
      duration,
      thumbnail,
      price,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get a single course
const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      course,
    });
  } catch (error) {
    console.error("Get course error:", error.message);
    next(error)
  }
};

// Update a course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Update course error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
