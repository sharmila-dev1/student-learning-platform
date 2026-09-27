import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body d-flex flex-column">
        <span className="badge bg-primary align-self-start mb-3">
          {course.category}
        </span>

        <h5 className="card-title fw-bold">{course.title}</h5>

        <p className="text-muted small">{course.description}</p>

        <div className="mt-auto">
          <div className="d-flex justify-content-between mb-3">
            <small className="text-muted">Level: {course.level}</small>

            <small className="text-muted">{course.duration}</small>
          </div>

          <Link
            to={`/courses/${course.id}`}
            className="btn btn-outline-primary w-100"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
