import { FcGoogle } from "react-icons/fc";

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm";
import { useSelector } from "react-redux";

function Template({title, description1, description2, image, formType}){

    const {loading} = useSelector((state)=>state.auth)

    return (
      <div>
        {loading ? (
          <div className="grid place-items-center min-h-[calc(100vh-3.5rem)]">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="mx-auto mt-16 w-11/12 max-w-maxContent flex md:flex-row flex-col-reverse justify-between md:gap-y-0 gap-y-12 md:gap-x-12 py-12 ">
            <div className="w-11/12 mx-auto max-w-[450px] md:mx-0">
              <h1 className="text-richblack-5 text-[1.875rem] font-semibold leading-[2.375rem]">
                {title}
              </h1>
              <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                <span className="text-richblack-100">{description1}</span>
                <span className="font-edu-sa font-bold italic text-blue-100">
                  {description2}
                </span>
              </p>
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
            <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
              <img
                src={frameImg}
                alt="Pattern"
                width={558}
                height={504}
                loading="lazy"
                className="rounded-md"
              />
              <img
                src={image}
                alt="Students"
                width={558}
                height={504}
                loading="lazy"
                className="absolute -top-4 right-4 z-10 rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    );
}

export default Template;