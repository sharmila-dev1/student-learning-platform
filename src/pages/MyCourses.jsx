import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import API from "../api/api";

function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view your enrolled courses.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/enrollments/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const enrollments = response.data.enrollments || [];

        // Convert enrollment records into course cards
        const enrolledCourses = enrollments
          .filter((enrollment) => enrollment.course)
          .map((enrollment) => ({
            ...enrollment.course,
            enrollmentId: enrollment._id,
            progress: 0,
          }));

        setMyCourses(enrolledCourses);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load your courses. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          {/* Page Header */}
          <div className="mb-4">
            <h2 className="fw-bold">My Courses</h2>
            <p className="text-muted">
              Continue learning and explore your enrolled courses.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading your courses...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="alert alert-danger" role="alert">
              {error}
              <div className="mt-3">
                <Link to="/login" className="btn btn-primary">
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && myCourses.length === 0 && (
            <div className="text-center bg-white rounded shadow-sm p-5">
              <h4 className="fw-bold">No courses yet!</h4>
              <p className="text-muted">
                Explore our courses and enroll in one to start learning.
              </p>

              <Link to="/courses" className="btn btn-primary">
                Explore Courses
              </Link>
            </div>
          )}

          {/* Course Cards */}
          {!loading && !error && myCourses.length > 0 && (
            <div className="row g-4">
              {myCourses.map((course) => (
                <div className="col-md-6 col-lg-4" key={course.enrollmentId}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <span className="badge bg-primary align-self-start mb-3">
                        {course.category}
                      </span>

                      <h5 className="fw-bold">{course.title}</h5>

                      <p className="text-muted small mb-2">
                        Instructor: {course.instructor}
                      </p>

                      <p className="text-muted small mb-3">
                        Level: {course.level}
                      </p>

                      <ProgressBar value={course.progress} />

                      <div className="mt-auto pt-4">
                        <Link
                          to={`/student/learning/${course._id}`}
                          className="btn btn-primary w-100"
                        >
                          Continue Learning
                        </Link>

                        <Link
                          to={`/courses/${course._id}`}
                          className="btn btn-outline-secondary w-100 mt-2"
                        >
                          View Course
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default MyCourses;
