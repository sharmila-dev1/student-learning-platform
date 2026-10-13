import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/api";

function Quiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to take this quiz.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(`/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuiz(response.data.quiz);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load the quiz.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!quiz) return;

    if (Object.keys(answers).length !== quiz.questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to submit the quiz.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const formattedAnswers = quiz.questions.map((question, index) => ({
        questionIndex: index,
        answer: answers[index],
      }));

      const response = await API.post(
        `/quizzes/${quizId}/submit`,
        { answers: formattedAnswers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate(`/student/result/${quizId}`, {
        state: { result: response.data },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit the quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container py-5 text-center">
          <p>Loading quiz...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error && !quiz) {
    return (
      <>
        <Navbar />
        <main className="container py-5 text-center">
          <div className="alert alert-danger">{error}</div>
          <Link to="/courses" className="btn btn-primary">
            Browse Courses
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (!quiz) return null;

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          <div className="mb-4">
            <h2 className="fw-bold">{quiz.title}</h2>
            <p className="text-muted">
              Answer all questions and submit your quiz to view your results.
            </p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {quiz.questions.map((question, index) => (
              <div
                className="card border-0 shadow-sm mb-4"
                key={question._id || index}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    {index + 1}. {question.question}
                  </h5>

                  {question.options.map((option) => (
                    <div className="form-check mb-3" key={option}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question-${index}`}
                        id={`question-${index}-${option}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={() => handleAnswer(index, option)}
                        disabled={submitting}
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`question-${index}-${option}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-5"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <Link to="/student/dashboard" className="text-decoration-none">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Quiz;
