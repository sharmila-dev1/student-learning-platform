import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Result() {
  const { quizId } = useParams();

  // Temporary static result for Week 2
  const result = {
    score: 4,
    total: 5,
  };

  const percentage = Math.round((result.score / result.total) * 100);

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
                  <div className="mb-4">
                    <div
                      className={`display-4 fw-bold ${
                        passed ? "text-success" : "text-danger"
                      }`}
                    >
                      {percentage}%
                    </div>

                    <h2 className="fw-bold mt-3">Quiz Completed</h2>

                    <p className="text-muted">
                      {passed
                        ? "Great job! You have successfully completed the quiz."
                        : "Keep practicing and try the quiz again."}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <div className="bg-light rounded p-3">
                        <small className="text-muted d-block">
                          Correct Answers
                        </small>

                        <h4 className="fw-bold mb-0">{result.score}</h4>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="bg-light rounded p-3">
                        <small className="text-muted d-block">
                          Total Questions
                        </small>

                        <h4 className="fw-bold mb-0">{result.total}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`alert ${
                      passed ? "alert-success" : "alert-warning"
                    }`}
                  >
                    {passed
                      ? "You passed the quiz."
                      : "You need more practice."}
                  </div>

                  {/* Actions */}
                  <div className="d-grid gap-2">
                    <Link
                      to={`/student/quiz/${quizId}`}
                      className="btn btn-primary"
                    >
                      Retake Quiz
                    </Link>

                    <Link
                      to={`/student/learning/${quizId}`}
                      className="btn btn-outline-secondary"
                    >
                      Back to Learning
                    </Link>

                    <Link
                      to="/student/dashboard"
                      className="btn btn-outline-primary"
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
