import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/api";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [savingCourse, setSavingCourse] = useState(false);
  const [formError, setFormError] = useState("");

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    level: "Beginner",
    duration: "",
    price: 0,
    modules: [
      {
        title: "",
        lessons: [""],
      },
    ],
  });
  const [includeQuiz, setIncludeQuiz] = useState(false);

  const [quizForm, setQuizForm] = useState({
    title: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
  });

  const fetchQuizzes = async () => {
    try {
      const response = await API.get("/quizzes/admin/all");
      setQuizzes(response.data.quizzes || []);
    } catch (error) {
      console.error(
        "Failed to fetch quizzes:",
        error.response?.data?.message || error.message,
      );
    }
  };

  useEffect(() => {
    console.log("Form visibility:", showCourseForm);
    console.log("Editing course ID:", editingCourseId);
  }, [showCourseForm, editingCourseId]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(response.data.courses || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    fetchQuizzes();
  }, []);

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      await API.delete(`/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses((previous) =>
        previous.filter((course) => course._id !== courseId),
      );

      window.alert("Course deleted successfully!");
    } catch (error) {
      console.error("Delete course error:", error);

      window.alert(
        error.response?.data?.message ||
          "Failed to delete course. Please try again.",
      );
    }
  };

  const handleAddCourse = () => {
    setCourseForm({
      title: "",
      description: "",
      instructor: "",
      category: "",
      level: "Beginner",
      duration: "",
      price: 0,
      modules: [
        {
          title: "",
          lessons: [""],
        },
      ],
    });

    setFormError("");
    setShowCourseForm(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course._id);
    setCourseForm({
      title: course.title || "",
      description: course.description || "",
      instructor: course.instructor || "",
      category: course.category || "",
      level: course.level || "Beginner",
      duration: course.duration || "",
      price: course.price ?? 0,
      modules:
        course.modules?.length > 0
          ? course.modules.map((module) => ({
              title: module.title || "",
              lessons: module.lessons?.length > 0 ? [...module.lessons] : [""],
            }))
          : [{ title: "", lessons: [""] }],
    });

    setIncludeQuiz(false);
    setFormError("");
    setShowCourseForm(true);
  };

  const handleCourseFormChange = (event) => {
    const { name, value } = event.target;

    setCourseForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleQuizTitleChange = (value) => {
    setQuizForm((previous) => ({
      ...previous,
      title: value,
    }));
  };

  const handleQuestionChange = (questionIndex, value) => {
    setQuizForm((previous) => ({
      ...previous,
      questions: previous.questions.map((question, index) =>
        index === questionIndex ? { ...question, question: value } : question,
      ),
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuizForm((previous) => ({
      ...previous,
      questions: previous.questions.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              options: question.options.map((option, optionIndex2) =>
                optionIndex2 === optionIndex ? value : option,
              ),
            }
          : question,
      ),
    }));
  };

  const handleAnswerChange = (questionIndex, value) => {
    setQuizForm((previous) => ({
      ...previous,
      questions: previous.questions.map((question, index) =>
        index === questionIndex ? { ...question, answer: value } : question,
      ),
    }));
  };

  const handleAddQuestion = () => {
    setQuizForm((previous) => ({
      ...previous,
      questions: [
        ...previous.questions,
        {
          question: "",
          options: ["", "", "", ""],
          answer: "",
        },
      ],
    }));
  };

  const handleRemoveQuestion = (questionIndex) => {
    setQuizForm((previous) => ({
      ...previous,
      questions: previous.questions.filter(
        (_, index) => index !== questionIndex,
      ),
    }));
  };

  const handleModuleTitleChange = (moduleIndex, value) => {
    setCourseForm((previousForm) => ({
      ...previousForm,
      modules: previousForm.modules.map((module, index) =>
        index === moduleIndex ? { ...module, title: value } : module,
      ),
    }));
  };

  const handleLessonChange = (moduleIndex, lessonIndex, value) => {
    setCourseForm((previousForm) => ({
      ...previousForm,
      modules: previousForm.modules.map((module, index) =>
        index === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.map((lesson, index) =>
                index === lessonIndex ? value : lesson,
              ),
            }
          : module,
      ),
    }));
  };

  const handleAddModule = () => {
    setCourseForm((previousForm) => ({
      ...previousForm,
      modules: [
        ...previousForm.modules,
        {
          title: "",
          lessons: [""],
        },
      ],
    }));
  };

  const handleRemoveModule = (moduleIndex) => {
    setCourseForm((previousForm) => ({
      ...previousForm,
      modules: previousForm.modules.filter((_, index) => index !== moduleIndex),
    }));
  };

  const handleAddLesson = (moduleIndex) => {
    setCourseForm((previousForm) => ({
      ...previousForm,
      modules: previousForm.modules.map((module, index) =>
        index === moduleIndex
          ? {
              ...module,
              lessons: [...module.lessons, ""],
            }
          : module,
      ),
    }));
  };

  const handleRemoveLesson = (moduleIndex, lessonIndex) => {
    setCourseForm((previousForm) => ({
      ...previousForm,
      modules: previousForm.modules.map((module, index) =>
        index === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.filter(
                (_, index) => index !== lessonIndex,
              ),
            }
          : module,
      ),
    }));
  };

  const handleCourseSubmit = async (event) => {
    event.preventDefault();
    setSavingCourse(true);
    setFormError("");

    const token = localStorage.getItem("token");

    try {
      if (
        courseForm.modules.length === 0 ||
        courseForm.modules.some(
          (module) =>
            !module.title.trim() ||
            !module.lessons.some((lesson) => lesson.trim()),
        )
      ) {
        setFormError(
          "Please provide a title and at least one lesson for every module.",
        );
        return;
      }

      // Validate quiz only when creating a new quiz
      if (includeQuiz && !editingCourseId) {
        if (!quizForm.title.trim() || quizForm.questions.length === 0) {
          setFormError(
            "Please provide a quiz title and at least one question.",
          );
          return;
        }

        for (let i = 0; i < quizForm.questions.length; i++) {
          const question = quizForm.questions[i];
          const options = question.options.map((option) => option.trim());

          if (
            !question.question.trim() ||
            options.some((option) => !option) ||
            new Set(options).size !== options.length ||
            !question.answer.trim() ||
            !options.includes(question.answer.trim())
          ) {
            setFormError(
              `Please complete question ${i + 1}, provide four distinct options, and select its correct answer.`,
            );
            return;
          }
        }
      }

      // Prepare course data
      const coursePayload = {
        ...courseForm,
        price: Number(courseForm.price),
        modules: courseForm.modules.map((module) => ({
          ...module,
          lessons: module.lessons
            .map((lesson) => lesson.trim())
            .filter(Boolean),
        })),
      };

      // Update an existing course or create a new one
      const courseResponse = editingCourseId
        ? await API.put(`/courses/${editingCourseId}`, coursePayload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : await API.post("/courses", coursePayload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

      const savedCourse = courseResponse.data.course || courseResponse.data;

      if (!savedCourse?._id) {
        throw new Error(
          "The course was saved, but the response did not contain its ID.",
        );
      }

      const isEditing = Boolean(editingCourseId);

      // Create a quiz only when creating a new course
      if (includeQuiz && !isEditing) {
        try {
          const quizPayload = {
            title: quizForm.title.trim(),
            course: savedCourse._id,
            questions: quizForm.questions.map((question) => ({
              question: question.question.trim(),
              options: question.options.map((option) => option.trim()),
              answer: question.answer.trim(),
            })),
          };

          await API.post("/quizzes", quizPayload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (quizError) {
          setCourses((previous) => [
            savedCourse,
            ...previous.filter((course) => course._id !== savedCourse._id),
          ]);

          setFormError(
            `Course created successfully, but quiz creation failed: ${
              quizError.response?.data?.message || quizError.message
            }. Please retry creating the quiz separately.`,
          );

          setEditingCourseId(null);
          return;
        }
      }

      // Update the existing course in the list or add the new course
      setCourses((previous) =>
        isEditing
          ? previous.map((course) =>
              course._id === savedCourse._id ? savedCourse : course,
            )
          : [
              savedCourse,
              ...previous.filter((course) => course._id !== savedCourse._id),
            ],
      );

      setShowCourseForm(false);
      setEditingCourseId(null);

      setCourseForm({
        title: "",
        description: "",
        instructor: "",
        category: "",
        level: "Beginner",
        duration: "",
        price: 0,
        modules: [{ title: "", lessons: [""] }],
      });

      setIncludeQuiz(false);
      setQuizForm({
        title: "",
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            answer: "",
          },
        ],
      });
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          error.message ||
          "Failed to save course.",
      );
    } finally {
      setSavingCourse(false);
    }
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

          <div className="alert alert-success">
            Form visibility: {String(showCourseForm)}
          </div>

          {showCourseForm && (
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3>{editingCourseId ? "Edit Course" : "Add Course"}</h3>

                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close form"
                    onClick={() => setShowCourseForm(false)}
                  />
                </div>

                {formError && (
                  <div className="alert alert-danger">{formError}</div>
                )}

                <form onSubmit={handleCourseSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Course Title *</label>
                      <input
                        className="form-control"
                        name="title"
                        value={courseForm.title}
                        onChange={handleCourseFormChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Instructor *</label>
                      <input
                        className="form-control"
                        name="instructor"
                        value={courseForm.instructor}
                        onChange={handleCourseFormChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Description *</label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows="3"
                        value={courseForm.description}
                        onChange={handleCourseFormChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Category *</label>
                      <input
                        className="form-control"
                        name="category"
                        value={courseForm.category}
                        onChange={handleCourseFormChange}
                        placeholder="e.g. Web Development"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Level *</label>
                      <select
                        className="form-select"
                        name="level"
                        value={courseForm.level}
                        onChange={handleCourseFormChange}
                        required
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Duration *</label>
                      <input
                        className="form-control"
                        name="duration"
                        value={courseForm.duration}
                        onChange={handleCourseFormChange}
                        placeholder="e.g. 6 Weeks"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="price"
                        value={courseForm.price}
                        onChange={handleCourseFormChange}
                      />
                    </div>
                  </div>

                  {/* Modules and Lessons */}
                  <div className="col-12 mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">Course Modules & Lessons</h5>

                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleAddModule}
                      >
                        + Add Module
                      </button>
                    </div>

                    {courseForm.modules.map((module, moduleIndex) => (
                      <div className="card mb-3" key={`module-${moduleIndex}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0">
                              Module {moduleIndex + 1}
                            </h6>

                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleRemoveModule(moduleIndex)}
                            >
                              Remove Module
                            </button>
                          </div>

                          <label className="form-label">Module Title *</label>
                          <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="e.g. JavaScript Basics"
                            value={module.title}
                            onChange={(event) =>
                              handleModuleTitleChange(
                                moduleIndex,
                                event.target.value,
                              )
                            }
                            required
                          />

                          <label className="form-label">Lessons *</label>

                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              className="d-flex gap-2 mb-2"
                              key={`lesson-${moduleIndex}-${lessonIndex}`}
                            >
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`Lesson ${lessonIndex + 1} title`}
                                value={lesson}
                                onChange={(event) =>
                                  handleLessonChange(
                                    moduleIndex,
                                    lessonIndex,
                                    event.target.value,
                                  )
                                }
                                required
                              />

                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() =>
                                  handleRemoveLesson(moduleIndex, lessonIndex)
                                }
                                aria-label={`Remove lesson ${lessonIndex + 1}`}
                              >
                                ✕
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm mt-2"
                            onClick={() => handleAddLesson(moduleIndex)}
                          >
                            + Add Lesson
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quiz Creation */}
                  <div className="card mt-4">
                    <div className="card-body">
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="includeQuiz"
                          checked={includeQuiz}
                          onChange={(event) =>
                            setIncludeQuiz(event.target.checked)
                          }
                        />

                        <label
                          className="form-check-label fw-bold"
                          htmlFor="includeQuiz"
                        >
                          Create a quiz for this course
                        </label>
                      </div>

                      {includeQuiz && (
                        <>
                          <h5 className="fw-bold mb-3">Quiz Details</h5>

                          <label className="form-label">Quiz Title *</label>
                          <input
                            type="text"
                            className="form-control mb-4"
                            placeholder="e.g. Java Fundamentals Quiz"
                            value={quizForm.title}
                            onChange={(event) =>
                              handleQuizTitleChange(event.target.value)
                            }
                            required={includeQuiz}
                          />

                          {quizForm.questions.map((question, questionIndex) => (
                            <div
                              className="border rounded p-3 mb-3"
                              key={questionIndex}
                            >
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="fw-bold mb-0">
                                  Question {questionIndex + 1}
                                </h6>

                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  disabled={quizForm.questions.length === 1}
                                  onClick={() =>
                                    handleRemoveQuestion(questionIndex)
                                  }
                                >
                                  Remove
                                </button>
                              </div>

                              <label className="form-label">Question *</label>
                              <textarea
                                className="form-control mb-3"
                                value={question.question}
                                onChange={(event) =>
                                  handleQuestionChange(
                                    questionIndex,
                                    event.target.value,
                                  )
                                }
                                required={includeQuiz}
                              />

                              <label className="form-label">Options *</label>

                              {question.options.map((option, optionIndex) => (
                                <input
                                  key={optionIndex}
                                  className="form-control mb-2"
                                  placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                  value={option}
                                  onChange={(event) =>
                                    handleOptionChange(
                                      questionIndex,
                                      optionIndex,
                                      event.target.value,
                                    )
                                  }
                                  required={includeQuiz}
                                />
                              ))}

                              <label className="form-label mt-2">
                                Correct Answer *
                              </label>
                              <select
                                className="form-select"
                                value={question.answer}
                                onChange={(event) =>
                                  handleAnswerChange(
                                    questionIndex,
                                    event.target.value,
                                  )
                                }
                                required={includeQuiz}
                              >
                                <option value="">Select correct answer</option>

                                {question.options.map((option, optionIndex) => (
                                  <option
                                    key={optionIndex}
                                    value={option}
                                    disabled={!option.trim()}
                                  >
                                    {`Option ${String.fromCharCode(65 + optionIndex)}`}
                                    {option.trim() ? ` — ${option}` : ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}

                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={handleAddQuestion}
                          >
                            + Add Question
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button type="submit" disabled={savingCourse}>
                      {savingCourse
                        ? "Saving..."
                        : editingCourseId
                          ? "Update Course"
                          : "Save Course"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowCourseForm(false)}
                      disabled={savingCourse}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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

              {loading && (
                <p className="text-center py-4">Loading courses...</p>
              )}

              {error && <div className="alert alert-danger">{error}</div>}

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
                    {!loading &&
                      !error &&
                      courses.map((course) => (
                        <tr key={course._id}>
                          <td className="fw-semibold">{course.title}</td>

                          <td>
                            <span className="badge bg-light text-dark">
                              {course.category}
                            </span>
                          </td>

                          <td>—</td>

                          <td>
                            <span className="badge bg-success">Available</span>
                          </td>

                          <td className="text-end">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleEditCourse(course)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(course._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                    {!loading && !error && courses.length === 0 && (
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

          {/* Quiz Management */}
          <div className="card border-0 shadow-sm mb-5">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold mb-1">Quiz Management</h4>
                  <p className="text-muted mb-0">
                    View and manage quizzes for your courses.
                  </p>
                </div>
                <span className="badge bg-primary">
                  Total Quizzes: {quizzes.length}
                </span>
              </div>

              {quizzes.length === 0 ? (
                <p className="text-center text-muted py-4">
                  No quizzes available.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Quiz Title</th>
                        <th>Course</th>
                        <th>Questions</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {quizzes.map((quiz) => (
                        <tr key={quiz._id}>
                          <td className="fw-semibold">{quiz.title}</td>
                          <td>{quiz.course?.title || "Course unavailable"}</td>
                          <td>{quiz.questions?.length || 0}</td>
                          <td className="text-end">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => setEditingQuizId(quiz._id)}
                            >
                              Edit Quiz
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
