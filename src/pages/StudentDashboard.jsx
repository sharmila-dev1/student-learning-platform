import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import API from "../api/api";

function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [averageQuizScore, setAverageQuizScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const quizResponse = await API.get("/quizzes/results/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const quizResults = quizResponse.data.results || [];
      const quizActivities = quizResults.map((result) => ({
        id: result._id,
        type: "quiz",
        title: "Completed a quiz",
        description: result.quiz?.title || result.title || "Course quiz",
        score: `${result.percentage}%`,
        date: result.attemptedAt || result.createdAt,
      }));

      setRecentActivity(quizActivities);

      // Fetch course enrollment activities
      const enrollmentResponse = await API.get("/enrollments/my-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const enrollments = enrollmentResponse.data.enrollments || [];

      const enrollmentActivities = enrollments.map((enrollment) => ({
        id: `enrollment-${enrollment._id}`,
        type: "enrollment",
        title: "Enrolled in a course",
        description: enrollment.course?.title || "Course",
        date: enrollment.enrolledAt || enrollment.createdAt,
      }));

      setRecentActivity((previousActivities) =>
        [...previousActivities, ...enrollmentActivities].sort(
          (a, b) => new Date(b.date || 0) - new Date(a.date || 0),
        ),
      );

      const average =
        quizResults.length > 0
          ? quizResults.reduce(
              (total, result) => total + result.percentage,
              0,
            ) / quizResults.length
          : null;

      setAverageQuizScore(average);
      const savedUser = localStorage.getItem("user");

      if (!token) {
        setError("Please log in to view your dashboard.");
        setLoading(false);
        return;
      }

      // Display saved user details while fetching enrolled courses
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem("user");
        }
      }

      try {
        const response = await API.get("/enrollments/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const enrollments = response.data.enrollments || [];

        const courses = await Promise.all(
          enrollments
            .filter((enrollment) => enrollment.course)
            .map(async (enrollment) => {
              const course = enrollment.course;

              try {
                const progressResponse = await API.get(
                  `/progress/${course._id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );

                const completedCount = progressResponse.data.count || 0;
                const totalLessons = progressResponse.data.totalLessons || 0;

                const progress =
                  totalLessons > 0
                    ? Math.round((completedCount / totalLessons) * 100)
                    : 0;

                return {
                  ...course,
                  enrollmentId: enrollment._id,
                  progress,
                };
              } catch (progressError) {
                console.error(
                  `Unable to fetch progress for ${course.title}:`,
                  progressError.response?.data?.message ||
                    progressError.message,
                );

                return {
                  ...course,
                  enrollmentId: enrollment._id,
                  progress: 0,
                };
              }
            }),
        );

        setEnrolledCourses(courses);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load your dashboard. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const firstName = user?.name ? user.name.split(" ")[0] : "Student";

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-4">
            <h2 className="fn-bold">Welcome back, {firstName}!</h2>

            <p className="text-muted mb-0">
              Continue your learning journey and keep making progress.
            </p>
          </div>

          <Link
            to="/student/profile"
            className="btn btn-primary align-self-start align-self-md-auto"
          >
            <i className="bi bi-person-circle me-2"></i>
            My Profile
          </Link>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}

              {!localStorage.getItem("token") && (
                <div className="mt-2">
                  <Link to="/login" className="btn btn-primary">
                    Go to Login
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Statistics */}
          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Enrolled Courses</p>
                  <h3 className="fw-bold mb-0">
                    {loading ? "..." : enrolledCourses.length}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Completed Courses</p>
                  <h3 className="fw-bold mb-0">
                    {loading
                      ? "..."
                      : enrolledCourses.filter(
                          (course) => course.progress === 100,
                        ).length}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Average Quiz Score</p>
                  <h3 className="fw-bold mb-0">
                    {averageQuizScore === null
                      ? "—"
                      : `${Math.round(averageQuizScore)}%`}
                  </h3>
                  <small className="text-muted">
                    {averageQuizScore === null
                      ? "No quiz attempts yet"
                      : "Based on your quiz attempts"}
                  </small>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Overall Progress</p>
                  <h3 className="fw-bold mb-0">
                    {loading
                      ? "..."
                      : enrolledCourses.length > 0
                        ? `${Math.round(
                            enrolledCourses.reduce(
                              (total, course) => total + course.progress,
                              0,
                            ) / enrolledCourses.length,
                          )}%`
                        : "0%"}
                  </h3>
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

            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading your courses...</p>
              </div>
            ) : (
              <>
                {!error && enrolledCourses.length === 0 && (
                  <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                      <h5 className="fw-bold">No enrolled courses yet</h5>

                      <p className="text-muted">
                        Explore our courses and start learning today.
                      </p>

                      <Link to="/courses" className="btn btn-primary">
                        Explore Courses
                      </Link>
                    </div>
                  </div>
                )}

                <div className="row g-4">
                  {enrolledCourses.map((course) => (
                    <div
                      className="col-md-6 col-lg-4"
                      key={course.enrollmentId}
                    >
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                          <span className="badge bg-primary mb-3">
                            {course.category}
                          </span>

                          <h5 className="fw-bold mb-2">{course.title}</h5>

                          <p className="text-muted small">
                            Instructor: {course.instructor}
                          </p>

                          <ProgressBar value={course.progress} />

                          <Link
                            to={`/student/learning/${course._id}`}
                            className="btn btn-primary w-100 mt-4"
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
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Recent Activity */}
          <div className="mb-4">
            <h4 className="fw-bold mb-3">Recent Activity</h4>

            <div className="card border-0 shadow-sm">
              <div className="list-group list-group-flush">
                {recentActivity.length > 0 ? (
                  recentActivity.slice(0, 5).map((activity) => (
                    <div className="list-group-item p-3" key={activity.id}>
                      <div className="d-flex justify-content-between align-items-start gap-3">
                        <div>
                          <strong>{activity.title}</strong>

                          <p className="text-muted small mb-1">
                            {activity.description}
                          </p>

                          {activity.score && (
                            <span className="badge bg-success">
                              Score: {activity.score}
                            </span>
                          )}
                        </div>

                        <small className="text-muted text-nowrap">
                          {activity.date
                            ? new Date(activity.date).toLocaleDateString()
                            : ""}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card-body text-center py-4">
                    <p className="text-muted mb-1">No recent activity yet.</p>
                    <small className="text-muted">
                      Complete a quiz to see your activity here.
                    </small>
                  </div>
                )}
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
