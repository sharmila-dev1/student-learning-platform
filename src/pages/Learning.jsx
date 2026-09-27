import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import courses from "../data/courses";

function Learning() {
  const { courseId } = useParams();

  const course = courses.find((item) => item.id === Number(courseId));

  const lessons = [
    {
      id: 1,
      title: "Introduction",
      duration: "10 min",
      completed: true,
    },
    {
      id: 2,
      title: "Core Concepts",
      duration: "20 min",
      completed: true,
    },
    {
      id: 3,
      title: "Practical Implementation",
      duration: "25 min",
      completed: false,
    },
    {
      id: 4,
      title: "Hands-on Practice",
      duration: "30 min",
      completed: false,
    },
    {
      id: 5,
      title: "Final Assessment",
      duration: "15 min",
      completed: false,
    },
  ];

  if (!course) {
    return (
      <>
        <Navbar />

        <main className="container py-5 text-center">
          <h2 className="fw-bold">Course Not Found</h2>

          <Link to="/student/my-courses" className="btn btn-primary mt-3">
            Back to My Courses
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const completedLessons = lessons.filter((lesson) => lesson.completed).length;

  const progress = Math.round((completedLessons / lessons.length) * 100);

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          {/* Course Header */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <span className="badge bg-primary mb-3">{course.category}</span>

              <h2 className="fw-bold">{course.title}</h2>

              <p className="text-muted">{course.description}</p>

              <ProgressBar value={progress} />
            </div>
          </div>

          <div className="row g-4">
            {/* Lesson Content */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">
                    Lesson 3: Practical Implementation
                  </h4>

                  <p className="text-muted">
                    In this lesson, you will apply the concepts learned in the
                    previous lessons through practical examples and exercises.
                  </p>

                  <h5 className="fw-bold mt-4">Learning Objectives</h5>

                  <ul className="text-muted">
                    <li>Understand the main concepts.</li>
                    <li>Apply concepts using practical examples.</li>
                    <li>Build a small working example.</li>
                    <li>Practice the concepts independently.</li>
                  </ul>

                  <div className="alert alert-info mt-4">
                    💡 Complete this lesson before moving to the next lesson.
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-outline-secondary">
                      ← Previous
                    </button>

                    <button className="btn btn-primary">
                      Mark as Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson List */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Course Lessons</h5>

                  <div className="list-group">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`list-group-item ${
                          lesson.id === 3 ? "border-primary" : ""
                        }`}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <strong>
                              {lesson.id}. {lesson.title}
                            </strong>

                            <small className="d-block text-muted mt-1">
                              {lesson.duration}
                            </small>
                          </div>

                          {lesson.completed && (
                            <span className="badge bg-success">✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/student/quiz/1"
                    className="btn btn-primary w-100 mt-4"
                  >
                    Take Quiz
                  </Link>
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

export default Learning;
