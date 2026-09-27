import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";

function MyCourses() {
  const myCourses = [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      category: "Frontend",
      level: "Beginner",
      progress: 80,
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      category: "JavaScript",
      level: "Beginner",
      progress: 55,
    },
    {
      id: 3,
      title: "React.js Development",
      category: "Frontend",
      level: "Intermediate",
      progress: 30,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          {/* Page Header */}
          <div className="mb-4">
            <h2 className="fw-bold">My Courses</h2>
            <p className="text-muted">
              Continue learning and track your course progress.
            </p>
          </div>

          {/* Course Cards */}
          <div className="row g-4">
            {myCourses.map((course) => (
              <div className="col-md-6 col-lg-4" key={course.id}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <span className="badge bg-primary align-self-start mb-3">
                      {course.category}
                    </span>

                    <h5 className="fw-bold">{course.title}</h5>

                    <p className="text-muted small mb-3">
                      Level: {course.level}
                    </p>

                    <ProgressBar value={course.progress} />

                    <div className="mt-auto pt-4">
                      <Link
                        to={`/student/learning/${course.id}`}
                        className="btn btn-primary w-100"
                      >
                        Continue Learning
                      </Link>

                      <Link
                        to={`/courses/${course.id}`}
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
        </div>
      </main>

      <Footer />
    </>
  );
}

export default MyCourses;
