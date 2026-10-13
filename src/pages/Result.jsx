import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/api";

function Result() {
  const { quizId } = useParams();
  const location = useLocation();

  const [result, setResult] = useState(location.state?.result || null);
  const [loading, setLoading] = useState(!location.state?.result);
  const [error, setError] = useState("");

  useEffect(() => {
    // Use the result received immediately after quiz submission.
    if (location.state?.result) {
      setResult(location.state.result);
      setLoading(false);
      return;
    }

    // If the page is refreshed, retrieve saved results from the backend.
    const fetchResult = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view your quiz result.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/quizzes/results/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const results = response.data.results || [];

        // Find the latest saved result for this quiz.
        const savedResult = results.find((item) => {
          const savedQuizId =
            typeof item.quiz === "object" ? item.quiz?._id : item.quiz;

          return savedQuizId === quizId;
        });

        if (savedResult) {
          setResult({
            ...savedResult,
            title:
              typeof savedResult.quiz === "object"
                ? savedResult.quiz?.title
                : "Quiz Result",
          });
        } else {
          setError("No saved result found for this quiz.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load your quiz result.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [quizId, location.state]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container py-5 text-center">
          <p>Loading your quiz result...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !result) {
    return (
      <>
        <Navbar />
        <main className="container py-5">
          <div className="alert alert-warning" role="alert">
            {error || "Quiz result is unavailable."}
          </div>

          <Link to="/student/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const score = result.score;
  const total = result.totalQuestions;
  const percentage = result.percentage;
  const passed = percentage >= 50;

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body p-5">
                  <h5 className="text-muted mb-3">
                    {result.title || "Course Quiz"}
                  </h5>

                  <div
                    className={`display-4 fw-bold ${
                      passed ? "text-success" : "text-danger"
                    }`}
                  >
                    {percentage}%
                  </div>

                  <h2 className="fw-bold mt-3">Quiz Completed!</h2>

                  <p className="text-muted">
                    {passed
                      ? "Great job! You have successfully completed the quiz."
                      : "Keep practicing and try the quiz again."}
                  </p>

                  <div className="row g-3 my-4">
                    <div className="col-6">
                      <div className="bg-light rounded p-3">
                        <small className="text-muted d-block">
                          Correct Answers
                        </small>

                        <h4 className="fw-bold mb-0">{score}</h4>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="bg-light rounded p-3">
                        <small className="text-muted d-block">
                          Total Questions
                        </small>

                        <h4 className="fw-bold mb-0">{total}</h4>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`alert ${
                      passed ? "alert-success" : "alert-warning"
                    }`}
                  >
                    {passed
                      ? "You passed the quiz!"
                      : "You need more practice."}
                  </div>

                  <div className="d-grid gap-2">
                    <Link
                      to={`/student/quiz/${quizId}`}
                      className="btn btn-primary"
                    >
                      Retake Quiz
                    </Link>

                    <Link
                      to="/student/dashboard"
                      className="btn btn-outline-secondary"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Result;
