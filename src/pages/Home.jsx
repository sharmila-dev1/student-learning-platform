import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import API from "../api/api";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get("/courses");
        setCourses(response.data.courses || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load featured courses.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const featuredCourses = courses.slice(0, 3);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-5">
          <div className="container py-lg-5">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <span className="badge bg-light text-primary mb-3 px-3 py-2">
                  YOUR LEARNING JOURNEY STARTS HERE
                </span>

                <h1 className="display-3 fw-bold">
                  Learn New Skills.
                  <br />
                  Build Your Future.
                </h1>

                <p className="lead mt-4">
                  Discover practical courses, learn at your own pace, track your
                  progress, and test your knowledge with interactive quizzes.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Link
                    to="/courses"
                    className="btn btn-light btn-lg text-primary fw-semibold"
                  >
                    Explore Courses →
                  </Link>

                  <Link to="/register" className="btn btn-outline-light btn-lg">
                    Get Started
                  </Link>
                </div>

                <div className="d-flex flex-wrap gap-4 mt-5">
                  <div>
                    <h4 className="fw-bold mb-0">Learn</h4>
                    <small>At your own pace</small>
                  </div>

                  <div>
                    <h4 className="fw-bold mb-0">Practice</h4>
                    <small>Test your knowledge</small>
                  </div>

                  <div>
                    <h4 className="fw-bold mb-0">Progress</h4>
                    <small>Track your growth</small>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="bg-white text-dark rounded-4 shadow p-4 p-lg-5">
                  <div className="text-center mb-4">
                    <div className="display-1">🎓</div>
                    <h2 className="fw-bold mt-3">Welcome to LearnHub</h2>
                    <p className="text-muted">
                      Your skills. Your goals. Your future.
                    </p>
                  </div>

                  <div className="border rounded-3 p-3 mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="fs-2">📚</span>
                      <div>
                        <h6 className="fw-bold mb-1">Structured Courses</h6>
                        <small className="text-muted">
                          Learn one step at a time
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-3 p-3 mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="fs-2">📈</span>
                      <div>
                        <h6 className="fw-bold mb-1">Track Your Progress</h6>
                        <small className="text-muted">
                          Keep moving towards your goals
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-3 p-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="fs-2">🏆</span>
                      <div>
                        <h6 className="fw-bold mb-1">Interactive Quizzes</h6>
                        <small className="text-muted">
                          Check what you have learned
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-5">
          <div className="container py-3">
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
              <div>
                <span className="text-primary fw-semibold">START LEARNING</span>
                <h2 className="fw-bold mt-2">Featured Courses</h2>
                <p className="text-muted mb-0">
                  Find a course that matches your learning goals.
                </p>
              </div>

              <Link to="/courses" className="btn btn-outline-primary">
                View All Courses →
              </Link>
            </div>

            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-3">Loading courses...</p>
              </div>
            )}

            {!loading && error && (
              <div className="alert alert-warning">{error}</div>
            )}

            {!loading && !error && courses.length === 0 && (
              <div className="text-center py-5">
                <h5>No courses available yet.</h5>
                <p className="text-muted">
                  Please check back when courses are added.
                </p>
              </div>
            )}

            {!loading && !error && featuredCourses.length > 0 && (
              <div className="row g-4">
                {featuredCourses.map((course) => (
                  <div className="col-md-6 col-lg-4" key={course._id}>
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why LearnHub */}
        <section className="bg-light py-5">
          <div className="container py-3">
            <div className="text-center mb-5">
              <span className="text-primary fw-semibold">WHY LEARNHUB?</span>
              <h2 className="fw-bold mt-2">Everything You Need to Grow</h2>
              <p className="text-muted">
                Learn, practice, and monitor your progress in one place.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="fs-1 mb-3">📖</div>
                  <h4 className="fw-bold">Learn at Your Pace</h4>
                  <p className="text-muted mb-0">
                    Explore structured courses and lessons designed to help you
                    build your skills step by step.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="fs-1 mb-3">📊</div>
                  <h4 className="fw-bold">Track Your Progress</h4>
                  <p className="text-muted mb-0">
                    Monitor completed lessons and keep track of your learning
                    journey through your student dashboard.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="fs-1 mb-3">🧠</div>
                  <h4 className="fw-bold">Test Your Knowledge</h4>
                  <p className="text-muted mb-0">
                    Take course quizzes, review your scores, and identify
                    opportunities to improve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-5">
          <div className="container py-3">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Your Learning Journey</h2>
              <p className="text-muted">Three simple steps to get started.</p>
            </div>

            <div className="row g-4 text-center">
              <div className="col-md-4">
                <div className="border rounded-4 p-4 h-100">
                  <div className="display-5 mb-3">1️⃣</div>
                  <h5 className="fw-bold">Choose a Course</h5>
                  <p className="text-muted mb-0">
                    Browse the available courses and find a topic you want to
                    learn.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="border rounded-4 p-4 h-100">
                  <div className="display-5 mb-3">2️⃣</div>
                  <h5 className="fw-bold">Learn and Practice</h5>
                  <p className="text-muted mb-0">
                    Study lessons and complete quizzes to practice your
                    knowledge.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="border rounded-4 p-4 h-100">
                  <div className="display-5 mb-3">3️⃣</div>
                  <h5 className="fw-bold">Track Your Growth</h5>
                  <p className="text-muted mb-0">
                    Review your progress and quiz results from your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white py-5">
          <div className="container text-center py-4">
            <h2 className="fw-bold">Ready to Start Your Learning Journey?</h2>
            <p className="lead mt-3">
              Take the next step towards building your skills.
            </p>

            <Link
              to="/courses"
              className="btn btn-light btn-lg text-primary fw-semibold mt-2"
            >
              Explore Courses →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
