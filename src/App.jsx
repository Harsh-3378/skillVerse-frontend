import "./App.css";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Navbar from "./components/comman/Navbar";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import ResetComplete from "./pages/ResetComplete";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import Error from "./pages/Error";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import Cart from "./components/core/Dashboard/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catelog"
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import CourseDetails from "./pages/CourseDetails";


function App() {

  const {user} = useSelector((state)=>state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path="contact" element={<ContactUs />} />
        <Route path="reset-complete" element={<ResetComplete />} />
        <Route path="about" element={<About />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              <Route path="dashboard/instructor" element={<Instructor />} />
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
