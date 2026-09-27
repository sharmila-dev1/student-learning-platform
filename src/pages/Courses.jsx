import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import courses from "../data/courses";

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category)),
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main>
        {/* Header */}
        <section className="bg-light py-5">
          <div className="container text-center">
            <h1 className="fw-bold">Explore Courses</h1>

            <p className="text-muted mb-0">
              Choose a course and start your learning journey.
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-4">
          <div className="container">
            <div className="row g-3">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Course Cards */}
        <section className="pb-5">
          <div className="container">
            <div className="row g-4">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <div className="col-md-6 col-lg-4" key={course.id}>
                    <CourseCard course={course} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <h5>No courses found</h5>
                  <p className="text-muted">
                    Try a different search term or category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Courses;
