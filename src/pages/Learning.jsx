import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import API from "../api/api";

function Learning() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [quizId, setQuizId] = useState(null);

  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to access your lessons.");
        setLoading(false);
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const courseResponse = await API.get(`/courses/${courseId}`);
        const fetchedCourse = courseResponse.data.course;
        
        setCourse(fetchedCourse);

        const allLessons = (fetchedCourse.modules || []).flatMap(
          (module, moduleIndex) =>
            (module.lessons || []).map((lesson, lessonIndex) => ({
              id: `${moduleIndex + 1}-${lessonIndex + 1}`,
              title:
                typeof lesson === "string"
                  ? lesson
                  : lesson.title || `Lesson ${lessonIndex + 1}`,
              moduleTitle: module.title,
              moduleIndex,
              lessonIndex,
              completed: false,
            })),
        );

        const progressResponse = await API.get(`/progress/${courseId}`, {
          headers,
        });

        const completedIds = progressResponse.data.completedLessons || [];

        const updatedLessons = allLessons.map((lesson) => ({
          ...lesson,
          completed: completedIds.includes(lesson.id),
        }));

        setLessons(updatedLessons);

        setCurrentLesson(
          updatedLessons.find((lesson) => !lesson.completed) ||
            updatedLessons[0] ||
            null,
        );
        try {
          const quizResponse = await API.get(
            `/quizzes/course/${fetchedCourse._id}`,
            { headers },
          );

          setQuizId(quizResponse.data.quiz?._id || null);
        } catch (quizError) {
          console.log("No quiz available for this course yet.");
          setQuizId(null);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load the course. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndProgress();
  }, [courseId]);

  const completedLessons = lessons.filter((lesson) => lesson.completed).length;

  const progress = lessons.length
    ? Math.round((completedLessons / lessons.length) * 100)
    : 0;

  const handlePreviousLesson = () => {
    if (!currentLesson) return;

    const currentIndex = lessons.findIndex(
      (lesson) => lesson.id === currentLesson.id,
    );

    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
      setMessage("");
      setError("");
    }
  };

  const handleNextLesson = () => {
    if (!currentLesson) return;

    const currentIndex = lessons.findIndex(
      (lesson) => lesson.id === currentLesson.id,
    );

    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
      setMessage("");
      setError("");
    }
  };
  const handleMarkComplete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to save your progress.");
      return;
    }

    if (!course || !currentLesson) {
      setError("Please select a lesson first.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await API.post(
        "/progress",
        {
          courseId: course._id,
          moduleIndex: currentLesson.moduleIndex,
          lessonIndex: currentLesson.lessonIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setLessons((previousLessons) =>
        previousLessons.map((lesson) =>
          lesson.id === currentLesson.id
            ? { ...lesson, completed: true }
            : lesson,
        ),
      );

      setMessage("Lesson completed! Your progress has been saved.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save progress. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

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
                  {message && (
                    <div className="alert alert-success" role="alert">
                      {message}
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <h4 className="fw-bold mb-3">
                    {currentLesson
                      ? `Lesson ${currentLesson.id}: ${currentLesson.title}`
                      : "No lessons available"}
                  </h4>

                  <p className="text-muted">
                    {currentLesson
                      ? `You are currently learning "${currentLesson.title}" in the ${currentLesson.moduleTitle} module. Complete this lesson to track your learning progress.`
                      : "There are no lessons available for this course yet."}
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
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handlePreviousLesson}
                      disabled={
                        !currentLesson ||
                        lessons.findIndex(
                          (lesson) => lesson.id === currentLesson.id,
                        ) === 0
                      }
                    >
                      ← Previous
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleNextLesson}
                      disabled={
                        !currentLesson ||
                        lessons.findIndex(
                          (lesson) => lesson.id === currentLesson.id,
                        ) ===
                          lessons.length - 1
                      }
                    >
                      Next →
                    </button>

                    <button
                      className="btn btn-primary"
                      onClick={handleMarkComplete}
                      disabled={
                        !currentLesson || currentLesson.completed || saving
                      }
                    >
                      {saving
                        ? "Saving..."
                        : currentLesson?.completed
                          ? "Completed ✓"
                          : "Mark as Complete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson List */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Course Modules & Lessons</h5>

                  {course.modules?.length > 0 ? (
                    course.modules.map((module, moduleIndex) => (
                      <div className="mb-4" key={module._id || moduleIndex}>
                        <h6 className="fw-bold text-primary">
                          Module {moduleIndex + 1}: {module.title}
                        </h6>

                        <div className="list-group">
                          {lessons
                            .filter(
                              (lesson) => lesson.moduleIndex === moduleIndex,
                            )
                            .map((lesson) => (
                              <button
                                type="button"
                                key={lesson.id}
                                onClick={() => {
                                  setCurrentLesson(lesson);
                                  setMessage("");
                                  setError("");
                                }}
                                className={`list-group-item list-group-item-action text-start ${
                                  currentLesson?.id === lesson.id
                                    ? "border-primary bg-light"
                                    : ""
                                }`}
                              >
                                <div className="d-flex justify-content-between align-items-start gap-2">
                                  <span>
                                    {lesson.moduleIndex + 1}.
                                    {lesson.lessonIndex + 1} {lesson.title}
                                  </span>

                                  {lesson.completed && (
                                    <span className="badge bg-success">
                                      Completed ✓
                                    </span>
                                  )}
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">
                      No modules or lessons have been added to this course yet.
                    </p>
                  )}

                  {quizId ? (
                    <Link
                      to={`/student/quiz/${quizId}`}
                      className="btn btn-primary w-100 mt-3"
                    >
                      Take Quiz
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-3"
                      disabled
                    >
                      Quiz Not Available Yet
                    </button>
                  )}
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
