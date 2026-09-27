import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="display-4 fw-bold">Learn. Grow. Achieve.</h1>

              <p className="lead text-muted mt-3">
                Build your skills with structured courses, interactive lessons,
                quizzes, and progress tracking.
              </p>

              <div className="mt-4">
                <Link to="/courses" className="btn btn-primary btn-lg me-2">
                  Browse Courses
                </Link>

                <Link to="/register" className="btn btn-outline-primary btn-lg">
                  Get Started
                </Link>
              </div>
            </div>

            <div className="col-lg-5 text-center mt-4 mt-lg-0">
              <div className="bg-primary text-white rounded-4 p-5 shadow">
                <h2>LearnHub</h2>
                <p className="mb-0">Your learning journey starts here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why LearnHub */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why LearnHub?</h2>
            <p className="text-muted">
              Everything you need to manage your learning journey.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4">
                <h4>📚 Learn</h4>
                <p className="text-muted">
                  Access structured courses and lessons designed for continuous
                  learning.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4">
                <h4>📊 Track Progress</h4>
                <p className="text-muted">
                  Monitor your course progress and completed lessons.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4">
                <h4>📝 Take Quizzes</h4>
                <p className="text-muted">
                  Test your knowledge and view your quiz results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Ready to start learning?</h2>

          <p className="text-muted">
            Explore our courses and begin your learning journey.
          </p>

          <Link to="/courses" className="btn btn-primary">
            Explore Courses
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
