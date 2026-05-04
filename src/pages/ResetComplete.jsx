import React from 'react'
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const ResetComplete = () => {

    // const user = JSON.parse(localStorage.getItem("user"));
    // const email = user.email

    // console.log("user", user)
    // console.log("email", email);
    

    // const generateHideEmail = (email)=>{
    //     const [userName, domain] = email.split('@')
    //     const hideUserName = userName[0] + userName.slice(1).replace(/./g,"*") 
    //     return `${hideUserName}@${domain}`
    // }

    
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375] text-richblack-5">
          Reset Complete!
        </h1>
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
          All done! We have sent an email to registered email id to confirm
        </p>
        <div className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
          <Link to="/login">
            <p className='text-center font-semibold'>Return to login</p>
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/login">
            <p className="flex items-center gap-x-2 text-richblack-5">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetComplete
