const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");
const QuizResult = require("../models/quizResult");
const Course = require("../models/Course");

// Get quiz questions without revealing correct answers
const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }

    const quiz = await Quiz.findById(quizId).select("-questions.answer");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ quiz });
  } catch (error) {
    console.error("Get quiz error:", error.message);
    res.status(500).json({ message: "Failed to fetch quiz" });
  }
};

// Submit answers and calculate score on the server
const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        message: "Answers must be provided as an array",
      });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.questions.length === 0) {
      return res.status(400).json({
        message: "This quiz has no questions",
      });
    }

    if (answers.length !== quiz.questions.length) {
      return res.status(400).json({
        message: "Please answer every question",
      });
    }

    let score = 0;

    const checkedAnswers = [];

    for (let i = 0; i < quiz.questions.length; i++) {
      const submitted = answers[i];

      if (
        !submitted ||
        submitted.questionIndex !== i ||
        typeof submitted.answer !== "string" ||
        !quiz.questions[i].options.includes(submitted.answer)
      ) {
        return res.status(400).json({
          message: "One or more submitted answers are invalid",
        });
      }

      const isCorrect = submitted.answer === quiz.questions[i].answer;

      if (isCorrect) {
        score++;
      }

      checkedAnswers.push({
        questionIndex: i,
        answer: submitted.answer,
        isCorrect,
      });
    }

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    const result = await QuizResult.create({
      student: req.user._id,
      quiz: quiz._id,
      score,
      totalQuestions,
      percentage,
      answers: checkedAnswers,
    });

    res.status(201).json({
      message: "Quiz submitted successfully",
      resultId: result._id,
      quizId: quiz._id,
      title: quiz.title,
      score,
      totalQuestions,
      percentage,
      attemptedAt: result.attemptedAt,
    });
  } catch (error) {
    console.error("Submit quiz error:", error.message);
    res.status(500).json({
      message: "Failed to submit quiz",
    });
  }
};

// Get quiz results for the logged-in student
const getMyQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({
      student: req.user._id,
    })
      .populate("quiz", "title")
      .sort({ attemptedAt: -1 });

    res.status(200).json({
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Get quiz results error:", error.message);

    res.status(500).json({
      message: "Failed to fetch quiz results",
    });
  }
};

const getQuizByCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid course ID",
      });
    }

    const quiz = await Quiz.findOne({
      course: courseId,
    }).select("-questions.answer");

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found for this course",
      });
    }

    res.status(200).json({ quiz });
  } catch (error) {
    next(error);
  }
};

const getQuizByCourseIdAdmin = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const quiz = await Quiz.findOne({ course: courseId });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Get admin quiz error:", error.message);
    res.status(500).json({ message: "Failed to fetch quiz" });
  }
};

const createQuiz = async (req, res) => {
  try {
    const { title, course, questions } = req.body;

    // Validate required fields
    if (
      !title?.trim() ||
      !course ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(400).json({
        message: "Please provide a quiz title, course ID, and questions",
      });
    }

    // Validate course ID
    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({
        message: "Invalid course ID",
      });
    }

    // Check whether the course exists
    const existingCourse = await Course.findById(course);

    if (!existingCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      if (
        !question.question?.trim() ||
        !Array.isArray(question.options) ||
        question.options.length < 4 ||
        question.options.some(
          (option) => typeof option !== "string" || !option.trim(),
        ) ||
        typeof question.answer !== "string" ||
        !question.answer.trim()
      ) {
        return res.status(400).json({
          message: `Question ${i + 1} must have question text, at least four non-empty options, and a correct answer`,
        });
      }

      // Ensure the correct answer matches one of the options
      const options = question.options.map((option) => option.trim());
      const answer = question.answer.trim();

      if (!options.includes(answer)) {
        return res.status(400).json({
          message: `The correct answer for question ${i + 1} must match one of its options`,
        });
      }
    }

    // Prevent multiple quizzes for the same course
    const existingQuiz = await Quiz.findOne({ course });

    if (existingQuiz) {
      return res.status(409).json({
        message: "A quiz already exists for this course",
      });
    }

    const quiz = await Quiz.create({
      title: title.trim(),
      course,
      questions: questions.map((question) => ({
        question: question.question.trim(),
        options: question.options.map((option) => option.trim()),
        answer: question.answer.trim(),
      })),
    });

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    console.error("Create quiz error:", error.message);

    res.status(500).json({
      message: "Failed to create quiz",
    });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { title, questions } = req.body;

    // Validate quiz ID
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        message: "Invalid quiz ID",
      });
    }

    // Validate required fields
    if (!title?.trim() || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "Please provide a quiz title and at least one question",
      });
    }

    // Validate questions and answers
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      if (
        !question.question?.trim() ||
        !Array.isArray(question.options) ||
        question.options.length < 4 ||
        question.options.some(
          (option) => typeof option !== "string" || !option.trim(),
        ) ||
        typeof question.answer !== "string" ||
        !question.answer.trim()
      ) {
        return res.status(400).json({
          message: `Please complete question ${i + 1} with at least four options and a correct answer`,
        });
      }

      const options = question.options.map((option) => option.trim());

      if (
        new Set(options).size !== options.length ||
        !options.includes(question.answer.trim())
      ) {
        return res.status(400).json({
          message: `Question ${i + 1} must have unique options, and its correct answer must match one of them`,
        });
      }
    }

    // Find the existing quiz
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    // Update the existing quiz without creating a duplicate
    quiz.title = title.trim();
    quiz.questions = questions.map((question) => ({
      question: question.question.trim(),
      options: question.options.map((option) => option.trim()),
      answer: question.answer.trim(),
    }));

    await quiz.save();

    res.status(200).json({
      message: "Quiz updated successfully",
      quiz,
    });
  } catch (error) {
    console.error("Update quiz error:", error.message);

    res.status(500).json({
      message: "Failed to update quiz",
    });
  }
};

module.exports = {
  getQuizById,
  submitQuiz,
  getMyQuizResults,
  getQuizByCourseId,
  getQuizByCourseIdAdmin,
  createQuiz,
  updateQuiz,
};
