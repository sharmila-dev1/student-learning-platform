import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";

function StudentDashboard() {
  const enrolledCourses = [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      progress: 80,
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      progress: 55,
    },
    {
      id: 3,
      title: "React.js Development",
      progress: 30,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-4">
            <h2 className="fw-bold">Welcome back</h2>
            <p className="text-muted mb-0">
              Continue your learning journey and keep making progress.
            </p>
          </div>

          {/* Statistics */}
          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Enrolled Courses</p>
                  <h3 className="fw-bold mb-0">3</h3>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Completed Lessons</p>
                  <h3 className="fw-bold mb-0">12</h3>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Average Quiz Score</p>
                  <h3 className="fw-bold mb-0">82%</h3>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Overall Progress</p>
                  <h3 className="fw-bold mb-0">68%</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">Continue Learning</h4>

              <Link
                to="/student/my-courses"
                className="btn btn-outline-primary btn-sm"
              >
                View My Courses
              </Link>
            </div>

            <div className="row g-4">
              {enrolledCourses.map((course) => (
                <div className="col-md-6 col-lg-4" key={course.id}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <span className="badge bg-primary mb-3">Course</span>

                      <h5 className="fw-bold mb-3">{course.title}</h5>

                      <ProgressBar value={course.progress} />

                      <Link
                        to={`/student/learning/${course.id}`}
                        className="btn btn-primary w-100 mt-4"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="fw-bold mb-3">Recent Activity</h4>

            <div className="card border-0 shadow-sm">
              <div className="list-group list-group-flush">
                <div className="list-group-item p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>Completed a lesson</strong>
                      <p className="text-muted mb-0 small">
                        HTML & CSS Fundamentals
                      </p>
                    </div>

                    <small className="text-muted">Today</small>
                  </div>
                </div>

                <div className="list-group-item p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>Completed a quiz</strong>
                      <p className="text-muted mb-0 small">
                        JavaScript Essentials
                      </p>
                    </div>

                    <small className="text-muted">Yesterday</small>
                  </div>
                </div>

                <div className="list-group-item p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>Enrolled in a course</strong>
                      <p className="text-muted mb-0 small">
                        React.js Development
                      </p>
                    </div>

                    <small className="text-muted">2 days ago</small>
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

export default StudentDashboard;
