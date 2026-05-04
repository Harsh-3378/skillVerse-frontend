import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import {BsChevronDown} from "react-icons/bs"
import IconBtn from '../../comman/IconBtn'
import { toast } from "react-hot-toast";
import axios from 'axios'
import { formatDate } from '../../../services/formatDate'

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const {sectionId, subSectionId} = useParams()
    const location = useLocation()
    const navigate = useNavigate()


    //get required data from store
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse)

    const {user} = useSelector((state)=>state.profile)



// const GenerateCertificate = async () => {
//   // Check if the user has completed the course
//   if (completedLectures.length !== totalNoOfLectures) {
//     toast.error("You Have not Completed the Course!!");
//     return;
//   }

// const options = {
//   method: "POST",
//   url: "https://app.simplecert.net/api/projects/261629/recipient/add",
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//     "api-key": "51TTKmY4U7Bg86NdQXB3M1FL97YyTQSDNCToBmFF7yv6SNS5krFm3TItCKFF",
//   },
//   data: {
//     FIRST_NAME: user.firstName,
//     LAST_NAME: user.lastName,
//     EMAIL_ADDRESS: user.email,
//     DATE: formatDate(new Date().toLocaleDateString()),
//     COURSE_NAME: courseEntireData.courseName,
//     dont_send_email: "false",
//   },
// };
// console.log(options.data);


// axios
//   .request(options)
//   .then((res) => console.log(res.data))
//   .catch((err) => console.error(err));
// };

const GenerateCertificate = async () => {
  // Check if the user has completed the course
  if (completedLectures.length !== totalNoOfLectures) {
    toast.error("You have not completed the course yet!");
    return;
  }

  const toastId = toast.loading("Generating your certificate...");

  try {
    // Format the date properly
    const formatDate = (date) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    };

    const options = {
      method: "POST",
      url: "https://app.simplecert.net/api/projects/261629/recipient/add",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key":
          "51TTKmY4U7Bg86NdQXB3M1FL97YyTQSDNCToBmFF7yv6SNS5krFm3TItCKFF",
      },
      data: {
        project_id: "261629",
        FIRST_NAME: user.firstName,
        LAST_NAME: user.lastName,
        EMAIL_ADDRESS: user.email,
        "DATE MERGE FIELD": formatDate(new Date()),
        COURSE_NAME: courseEntireData.courseName,
        dont_send_email: "false", // This will automatically send email with certificate
      },
    };

    console.log("Sending certificate data:", options.data);

    const response = await axios.request(options);

    console.log("Certificate API Response:", response.data);

    // Dismiss loading toast
    toast.dismiss(toastId);

    // Success message
    toast.success(
      "🎉 Congratulations! Your certificate has been generated and sent to your email!",
      { duration: 5000 }
    );

    // Optional: Store certificate info in your backend
    // await saveCertificateToDatabase(response.data);
  } catch (error) {
    console.error("Certificate generation error:", error);
    toast.dismiss(toastId);

    if (error.response) {
      // Server responded with error
      toast.error(
        `Failed to generate certificate: ${
          error.response.data.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      // Request made but no response
      toast.error("Network error. Please check your connection and try again.");
    } else {
      // Other errors
      toast.error("Failed to generate certificate. Please try again.");
    }
  }
};


    useEffect(() => {
      ;( () => {

        if(!courseSectionData.length) return
        
        //find the current index of section
        const currentSectionIndx = courseSectionData.findIndex(
          (data) => data._id === sectionId
        )
        
        //find the current index of subSection
        const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
          (data) => data._id === subSectionId
        )

        //now set the current sectionId and current SubSectionId
        setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
        setVideoBarActive(
          courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id
        );

        console.log("Active Status",activeStatus);
        console.log("Active video Bar", videoBarActive);
        console.log("courseSectionData", courseSectionData);
      })()
    }, [courseSectionData, courseEntireData, location.pathname])


  return (
    <>
      <div className="flex flex-col w-[320px] max-w-[350px] h-[calc(100vh-3.5rem)] border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 text-lg font-bold text-richblack-25 py-5 mx-5">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`);
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={20} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto text-sm"
              onClick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(section?._id)}
              key={index}
            >
              {/* Section part */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === section?._id ? "rotate-0" : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* subSection part */}
              {activeStatus === section?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {section.subSection.map((topic, index) => (
                    <div
                      className={`flex gap-3 px-5 py-2
                            ${
                              videoBarActive === topic._id
                                ? "bg-yellow-200 font-semibold text-richblack-800"
                                : "hover:bg-richblack-900"
                            }
                          `}
                      key={index}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                        );
                        setVideoBarActive(topic._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <IconBtn
            text="Generate Certificate"
            customClasses="mx-auto"
            onClick={() => GenerateCertificate()}
          />
        </div>
      </div>
    </>
  );
}

export default VideoDetailsSidebar
