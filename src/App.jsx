import { BrowserRouter, Routes, Route} from "react-router-dom"

import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import MyCourses from './pages/MyCourses'
import Learning from './pages/Learning'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/courses" element = {<Courses />}/>
        <Route path="/courses/:id" element = {<CourseDetails />}/>
        <Route path="/login" element = {<Login />}/>
        <Route path="/register" element = {<Register />}/>
        <Route path="/student/dashboard" element = {<StudentDashboard />}/>
        <Route path="/student/my-courses" element = {<MyCourses />}/>
        <Route path="/student/learning/:courseId" element = {<Learning />}/>
        <Route path="/student/quiz/:quizId" element = {<Quiz />}/>
        <Route path="/student/result/:quizId" element = {<Result />}/>
        <Route path="/student/profile" element = {<Profile />}/>
        <Route path="/admin/dashboard" element = {<AdminDashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App