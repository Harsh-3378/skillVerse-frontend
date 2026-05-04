import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from '../../services/apis'
import toast from 'react-hot-toast'

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm()

    const submitContactForm = async(data)=>{
        console.log('logging data',data);
        try {
          setLoading(true)
          const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data)
          console.log(response);
          setLoading(false)
          toast.success("Message Sent Successfully")
          
        } catch (error) {
            console.log("Error while submitting the contactUsForm",error);
            setLoading(false)
            toast.error("Message Can't Sent")
        }
        
    }

    useEffect(() => {
      if (isSubmitSuccessful) {
        reset({
          firstname: "",
          lastname: "",
          email: "",
          message: "",
          phoneNo: "",
        });
      }
    }, [reset,isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* firstName and lastName */}
      <div className="flex lg:flex-row flex-col gap-5">
        <div className="flex flex-col lg:w-[48%] gap-2">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name.."
            className="form-style"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col lg:w-[48%] gap-2">
          <label htmlFor="firstName" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name.."
            className="form-style"
            {...register("lastname", { required: true })}
          />
        </div>
      </div>

      {/* email address */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      {/* phone number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex flex-row gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              name="dropdown"
              id="dropdown"
              className="form-style"
              {...register("countryCode", { required: true })}
            >
              {CountryCode.map((country, index) => {
                return (
                  <option value={country.code} key={index}>
                    {country.code} -{country.country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-[calc(100%-90px)] flex flex-col gap-2">
            <input
              type="text"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your phone number",
                },
                maxLength: { value: 10, message: "Invalid Phone number" },
                minLength: { value: 8, message: "Invalid phone number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* message area */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Enter your message here..."
          cols="30"
          rows="7"
          className="form-style"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message...
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`bg-yellow-50 rounded-md text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] text-[13px] font-bold px-6 py-3 text-center
          ${
            !loading &&
            "transition-all duration-200 hover:scale-95 hover:shadow-none"
          } disabled:bg-richblack-500 sm:text-[16px]
        `}
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactUsForm
