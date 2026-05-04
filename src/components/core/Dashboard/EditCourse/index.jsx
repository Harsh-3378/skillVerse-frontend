import React, { useEffect, useState } from 'react'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'
import { useParams } from 'react-router-dom'
import RenderSteps from "../AddCourse/RenderSteps"

const   EditCourse = () => {

    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course} = useSelector((state)=>state.course)
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state)=> state.auth)

    useEffect(() => {

        console.log("courseId", courseId);
        

        const populateCourseDetails = async () => {
                setLoading(true);
                const response = await getFullDetailsOfCourse(
                      courseId,
                      token
                );

                if (response?.courseDetails) {
                      dispatch(setEditCourse(true));
                      dispatch(setCourse(response?.courseDetails));
                }
                setLoading(false);
        }

        populateCourseDetails()
    }, [])

    
  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }


  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  );
}

export default EditCourse
