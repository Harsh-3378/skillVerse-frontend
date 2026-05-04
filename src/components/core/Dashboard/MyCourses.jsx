import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import IconBtn from "../../comman/IconBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import CoursesTable from "./InstructorCourses/CoursesTable";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      
      const response = await fetchInstructorCourses(token);
      console.log("instructor all courses", response);
      if (response) {
        setCourses(response);
      }
      
    };
setLoading(false);
    fetchCourses();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="grid place-items-center min-h-[calc(100vh-3.5rem)]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-richblack-5">
              My Courses
            </h1>
            <IconBtn
              text="Add Course"
              onClick={() => navigate("/dashboard/add-course")}
            >
              <VscAdd />
            </IconBtn>
          </div>
          {courses && (
            <CoursesTable courses={courses} setCourses={setCourses} />
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
