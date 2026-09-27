import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      category: "Frontend",
      students: 45,
      status: "Published",
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      category: "JavaScript",
      students: 38,
      status: "Published",
    },
    {
      id: 3,
      title: "React.js Development",
      category: "Frontend",
      students: 32,
      status: "Published",
    },
    {
      id: 4,
      title: "Node.js & Express",
      category: "Backend",
      students: 24,
      status: "Draft",
    },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmDelete) return;

    setCourses((previousCourses) =>
      previousCourses.filter((course) => course.id !== id),
    );
  };

  const handleAddCourse = () => {
    alert("Add Course functionality will be connected to the backend later.");
  };

  const handleEdit = (courseTitle) => {
    alert(`Edit "${courseTitle}" functionality will be connected later.`);
  };

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          {/* Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Admin Dashboard</h2>
              <p className="text-muted mb-0">
                Manage courses, students, lessons, and quizzes.
              </p>
            </div>

            <button
              className="btn btn-primary mt-3 mt-md-0"
              onClick={handleAddCourse}
            >
              + Add Course
            </button>
          </div>

          {/* Statistics */}
          <div className="row g-4 mb-5">
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Total Courses</p>
                  <h2 className="fw-bold mb-0">{courses.length}</h2>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Total Students</p>
                  <h2 className="fw-bold mb-0">139</h2>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Total Lessons</p>
                  <h2 className="fw-bold mb-0">42</h2>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">Total Quizzes</p>
                  <h2 className="fw-bold mb-0">18</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Course Management */}
          <div className="card border-0 shadow-sm mb-5">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold mb-1">Course Management</h4>
                  <p className="text-muted mb-0">
                    View and manage available courses.
                  </p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Category</th>
                      <th>Students</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td className="fw-semibold">{course.title}</td>

                        <td>
                          <span className="badge bg-light text-dark">
                            {course.category}
                          </span>
                        </td>

                        <td>{course.students}</td>

                        <td>
                          <span
                            className={`badge ${
                              course.status === "Published"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {course.status}
                          </span>
                        </td>

                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(course.title)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(course.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {courses.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          No courses available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Recent Activity</h4>

              <div className="border-bottom pb-3 mb-3">
                <strong>New student registered</strong>
                <p className="text-muted mb-0 small">
                  A new student joined LearnHub.
                </p>
              </div>

              <div className="border-bottom pb-3 mb-3">
                <strong>Course enrollment</strong>
                <p className="text-muted mb-0 small">
                  A student enrolled in React.js Development.
                </p>
              </div>

              <div>
                <strong>Quiz completed</strong>
                <p className="text-muted mb-0 small">
                  A student completed the JavaScript Essentials quiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminDashboard;
