import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Quiz() {
  const { quizId } = useParams();

  const questions = [
    {
      id: 1,
      question:
        "Which technology is used to create the structure of a webpage?",
      options: ["CSS", "HTML", "JavaScript", "MongoDB"],
      answer: "HTML",
    },
    {
      id: 2,
      question: "Which technology is mainly used for styling webpages?",
      options: ["HTML", "CSS", "Node.js", "Express"],
      answer: "CSS",
    },
    {
      id: 3,
      question:
        "Which language is commonly used to add interactivity to webpages?",
      options: ["JavaScript", "MongoDB", "Bootstrap", "Mongoose"],
      answer: "JavaScript",
    },
    {
      id: 4,
      question:
        "Which library is used to create resuable component?",
      options: ["Express.js", "React.js", "MongoDB", "Node.js"],
      answer: "React.js",
    },
    {
      id: 5,
      question: "Which database is NoSQL Database?",
      options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
      answer: "MongoDB",
    },
  ];

  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, answer) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const unanswered = questions.some((question) => !answers[question.id]);

    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let score = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        score++;
      }
    });

    alert(`Quiz submitted! Your score is ${score}/${questions.length}`);
  };

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          {/* Header */}
          <div className="mb-4">
            <h2 className="fw-bold">Course Quiz</h2>
            <p className="text-muted mb-0">
              Test your knowledge before viewing your results.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div className="card border-0 shadow-sm mb-4" key={question.id}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    {index + 1}. {question.question}
                  </h5>

                  {question.options.map((option) => (
                    <div className="form-check mb-3" key={option}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question-${question.id}`}
                        id={`question-${question.id}-${option}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => handleAnswer(question.id, option)}
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`question-${question.id}-${option}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5">
                Submit Quiz
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <Link
              to={`/student/learning/${quizId}`}
              className="text-decoration-none"
            >
              ← Back to Learning
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Quiz;
