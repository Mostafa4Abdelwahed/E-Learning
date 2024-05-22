import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Layout from "./Pages/components/layout"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/register"
import Profile from "./Pages/Profile/Profile"
import Error from "./Pages/Error/Error"
import Details from "./Pages/Profile/Details/Details"
import Courses from "./Pages/Profile/Courses/Courses"
import Subscription from "./Pages/Profile/Subscription/Subscription"
import Settings from "./Pages/Profile/Settings/Settings"
import DetailsUserCourse from "./Pages/Profile/Courses/DetailsUserCourse"
import DetailsUserSession from "./Pages/Profile/Courses/DetailsUserSession"
import "video-react/dist/video-react.css"
import DetailsClasses from "./Pages/Courses/DetailsClasses"
import DetailsCourse from "./Pages/Courses/DetailsCourse"
import { useSelector } from "react-redux"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./Pages/payment/Checkout"
import HomeDash from "./Pages/Dashboard/home"
import LayoutDash from "./Pages/Dashboard/components/LayoutDash"
import CoursesDash from "./Pages/Dashboard/Courses/Courses"
import CourseOnlyDash from "./Pages/Dashboard/Courses/courseOnly"
import LevelsDash from "./Pages/Dashboard/Levels/Levels"
import OrdersDash from "./Pages/Dashboard/Orders/Orders"
import PaymentsDash from "./Pages/Dashboard/Payments/Payments"
import UsersDash from "./Pages/Dashboard/Users/Users"


function App() {
  const { user } = useSelector(state => state.auth)
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="class/:slug" element={<DetailsClasses />} />
            <Route path="class/:classSlug/:CourseSlug" element={<DetailsCourse />} />
            <Route path="class/:classSlug/:CourseSlug/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/me" >
              <Route element={!user ? <Navigate to="/" /> : <Profile />}>
                <Route path="profile" element={!user ? <Navigate to="/" /> : <Details />} />
                <Route path="courses" element={!user ? <Navigate to="/" /> : <Courses />} />
                <Route path="courses/:id" element={!user ? <Navigate to="/" /> : <DetailsUserCourse />} />
                <Route path="courses/:id/:session" element={!user ? <Navigate to="/" /> : <DetailsUserSession />} />
                <Route path="subscription" element={!user ? <Navigate to="/" /> : <Subscription />} />
                <Route path="settings" element={!user ? <Navigate to="/" /> : <Settings />} />
              </Route>
            </Route>
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="/dashboard" element={user?.isAdmin ? <LayoutDash /> : <Navigate to="/" />} >
            <Route index element={user?.isAdmin ? <HomeDash /> : <Navigate to="/" />} />
            <Route path="courses" element={user?.isAdmin ? <CoursesDash /> : <Navigate to="/" />} />
            <Route path="courses/:id" element={user?.isAdmin ? <CourseOnlyDash /> : <Navigate to="/" />} />
            <Route path="levels" element={user?.isAdmin ? <LevelsDash /> : <Navigate to="/" />} />
            <Route path="orders" element={user?.isAdmin ? <OrdersDash /> : <Navigate to="/" />} />
            <Route path="payments" element={user?.isAdmin ? <PaymentsDash /> : <Navigate to="/" />} />
            <Route path="users" element={user?.isAdmin ? <UsersDash /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
