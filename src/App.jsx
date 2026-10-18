import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const Learning = lazy(() => import("./pages/Learning"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Result = lazy(() => import("./pages/Result"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p className="text-center mt-5">Loading page...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/my-courses" element={<MyCourses />} />
          <Route path="/student/learning/:courseId" element={<Learning />} />
          <Route path="/student/quiz/:quizId" element={<Quiz />} />
          <Route path="/student/result/:quizId" element={<Result />} />
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
