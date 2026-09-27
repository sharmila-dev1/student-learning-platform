import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import courses from "../data/courses";

function CourseDetails() {
  const { id } = useParams();

  const course = courses.find((item) => item.id === Number(id));

  if (!course) {
    return (
      <>
        <Navbar />

        <div className="container py-5 text-center">
          <h2>Course Not Found</h2>
          <p className="text-muted">
            The course you are looking for does not exist.
          </p>

          <Link to="/courses" className="btn btn-primary">
            Back to Courses
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        {/* Course Header */}
        <section className="bg-light py-5">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <span className="badge bg-primary mb-3">{course.category}</span>

                <h1 className="fw-bold">{course.title}</h1>

                <p className="lead text-muted mt-3">{course.description}</p>

                <div className="d-flex gap-4 mt-4 flex-wrap">
                  <span>
                    <strong>Level:</strong> {course.level}
                  </span>

                  <span>
                    <strong>Duration:</strong> {course.duration}
                  </span>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">Course Overview</h5>

                    <p className="text-muted">
                      Start learning this course and track your progress through
                      the Student Dashboard.
                    </p>

                    <Link
                      to="/student/my-courses"
                      className="btn btn-primary w-100"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <h3 className="fw-bold mb-4">What You'll Learn</h3>

                <div className="list-group">
                  <div className="list-group-item py-3">
                    <strong>01.</strong> Introduction
                  </div>

                  <div className="list-group-item py-3">
                    <strong>02.</strong> Core Concepts
                  </div>

                  <div className="list-group-item py-3">
                    <strong>03.</strong> Practical Implementation
                  </div>

                  <div className="list-group-item py-3">
                    <strong>04.</strong> Hands-on Practice
                  </div>

                  <div className="list-group-item py-3">
                    <strong>05.</strong> Final Assessment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default CourseDetails;
