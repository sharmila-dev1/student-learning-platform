import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/api";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentMessage, setEnrollmentMessage] = useState("");

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setEnrollmentMessage("Please log in before enrolling.");
      return;
    }

    try {
      setEnrolling(true);
      setEnrollmentMessage("");

      const response = await API.post(
        "/enrollments",
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEnrollmentMessage(response.data.message || "Successfully enrolled!");
    } catch (error) {
      setEnrollmentMessage(
        error.response?.data?.message || "Enrollment failed. Please try again.",
      );
    } finally {
      setEnrolling(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await API.get(`/courses/${id}`);
        setCourse(response.data.course);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="container py-5 text-center">
          <p className="lead">Loading course...</p>
        </div>

        <Footer />
      </>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <>
        <Navbar />

        <div className="container py-5 text-center">
          <h2>Course Not Found</h2>

          <p className="text-muted">
            {error || "The course you are looking for does not exist."}
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

      {/* Course Header */}
      <section className="bg-light py-5">
        <div className="container">
          <span className="badge bg-primary mb-3">{course.category}</span>

          <h1 className="display-5 fw-bold">{course.title}</h1>

          <p className="lead text-muted">{course.description}</p>

          <div className="row mt-4">
            <div className="col-md-3 mb-3">
              <strong>Instructor</strong>
              <p className="mb-0">{course.instructor}</p>
            </div>

            <div className="col-md-3 mb-3">
              <strong>Level</strong>
              <p className="mb-0">{course.level}</p>
            </div>

            <div className="col-md-3 mb-3">
              <strong>Duration</strong>
              <p className="mb-0">{course.duration}</p>
            </div>

            <div className="col-md-3 mb-3">
              <strong>Price</strong>
              <p className="mb-0">
                {course.price === 0 ? "Free" : `₹${course.price}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* Learning Outcomes */}
              <div className="mb-5">
                <h3 className="fw-bold mb-3">What You'll Learn</h3>

                <ul className="list-group">
                  {course.learningOutcomes?.map((outcome, index) => (
                    <li key={index} className="list-group-item">
                      ✓ {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites */}
              <div className="mb-5">
                <h3 className="fw-bold mb-3">Prerequisites</h3>

                {course.prerequisites?.length > 0 ? (
                  <ul>
                    {course.prerequisites.map((item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No prerequisites required.</p>
                )}
              </div>

              {/* Course Modules */}
              <div>
                <h3 className="fw-bold mb-3">Course Content</h3>

                {course.modules?.map((module, moduleIndex) => (
                  <div className="card mb-3" key={moduleIndex}>
                    <div className="card-header fw-bold">
                      Module {moduleIndex + 1}: {module.title}
                    </div>

                    <ul className="list-group list-group-flush">
                      {module.lessons?.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="list-group-item">
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="col-lg-4">
              <div
                className="card shadow-sm sticky-top"
                style={{ top: "90px" }}
              >
                <div className="card-body">
                  <h4 className="fw-bold">
                    {course.price === 0 ? "Free Course" : `₹${course.price}`}
                  </h4>

                  <p className="text-muted">
                    Start learning today and build your skills.
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"}
                  </button>

                  {enrollmentMessage && (
                    <div className="alert alert-info mt-3 mb-0" role="alert">
                      {enrollmentMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CourseDetails;
