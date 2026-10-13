const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
          validate: {
            validator: (options) => options.length >= 4,
            message: "Each question must have at least four options",
          },
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Quiz", quizSchema);
