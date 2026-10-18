const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    instructor: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    duration: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    learningOutcomes: {
      type: [String],
      default: [],
    },

    prerequisites: {
      type: [String],
      default: [],
    },

    modules: [
      {
        title: {
          type: String,
          required: true,
        },

        lessons: {
          type: [String],
          default: [],
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

module.exports = Course;
