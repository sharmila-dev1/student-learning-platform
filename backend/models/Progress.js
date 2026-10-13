const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    moduleIndex: {
      type: Number,
      required: true,
      min: 0,
    },

    lessonIndex: {
      type: Number,
      required: true,
      min: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Prevent duplicate progress records for the same student and lesson.
progressSchema.index(
  { student: 1, course: 1, moduleIndex: 1, lessonIndex: 1 },
  { unique: true },
);

module.exports = mongoose.model("Progress", progressSchema);
