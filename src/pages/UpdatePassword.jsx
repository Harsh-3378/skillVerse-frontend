import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const {loading} = useSelector((state)=>(state.auth))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [formData, setFormData] = useState({
        password : "",
        confirmPassword : ""
    })

    const {password, confirmPassword} = formData

    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [validPassword, setValidPassword] = useState({
        isLowerCharacter : false,
        isUpperCharacter : false,
        isSpecialCharacter : false,
        isMinimumLength8 : false,
        isAteastOneNumber : false,
    })

    const {
        isLowerCharacter,
        isUpperCharacter,
        isSpecialCharacter,
        isMinimumLength8,
        isAtleastOneNumber
    } = validPassword;


    const handleOnChange = (e) =>{
        setFormData((prev)=>({
            ...prev, [e.target.name] : e.target.value
        }))
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const allValid = isLowerCharacter && isUpperCharacter && isSpecialCharacter && isMinimumLength8 && isAtleastOneNumber;
        if(!allValid){
          console.log("enter strong password");
          
          toast.error("Enter Strong Password")
          return

        }
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }

const validation = (password) => {
  setValidPassword({
    isLowerCharacter: /[a-z]/.test(password),
    isUpperCharacter: /[A-Z]/.test(password),
    isSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    isMinimumLength8: password.length >= 8,
    isAtleastOneNumber: /[0-9]/.test(password),
  });
};

useEffect(() => {
  validation(password);
}, [password]);


  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full !pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style w-full !pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <div className="flex flex-wrap gap-x-2 mt-3">
              <div
                className={`flex items-center gap-x-2 w-[200px] text-richblack-5`}
              >
                <FaCheckCircle
                  className={`${
                    isLowerCharacter
                      ? "text-caribbeangreen-500"
                      : "text-richblack-5"
                  }`}
                  fontSize={14}
                />
                <p>one lowercase character</p>
              </div>
              <div
                className={`flex items-center gap-x-2 w-[200px] text-richblack-5`}
              >
                <FaCheckCircle
                  className={`${
                    isUpperCharacter
                      ? "text-caribbeangreen-500"
                      : "text-richblack-5"
                  }`}
                  fontSize={14}
                />
                <p>one uppercase character</p>
              </div>
              <div
                className={`flex items-center gap-x-2 w-[200px] text-richblack-5`}
              >
                <FaCheckCircle
                  className={`${
                    isSpecialCharacter
                      ? "text-caribbeangreen-500"
                      : "text-richblack-5"
                  }`}
                  fontSize={14}
                />
                <p>one special character</p>
              </div>
              <div
                className={`flex items-center gap-x-2 w-[200px] text-richblack-5`}
              >
                <FaCheckCircle
                  className={`${
                    isMinimumLength8
                      ? "text-caribbeangreen-500"
                      : "text-richblack-5"
                  }`}
                  fontSize={14}
                />
                <p>8 character minimum</p>
              </div>
              <div
                className={`flex items-center gap-x-2 w-[200px] text-richblack-5`}
              >
                <FaCheckCircle
                  className={`${
                    isAtleastOneNumber
                      ? "text-caribbeangreen-500"
                      : "text-richblack-5"
                  }`}
                  fontSize={14}
                />
                <p>one number</p>
              </div>
            </div>
            <button
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
              disabled={loading}
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword
