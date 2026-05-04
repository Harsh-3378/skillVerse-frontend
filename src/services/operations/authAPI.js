import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { resetCart } from "../../slices/cartSlice";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOTP(email, navigate){
    return async (dispatch)=>{
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SENDOTP_API,{
          email,
          checkUserPresent: true
        })
        console.log("sendOTP API response...", response);

        if(!response.data.success){
          throw new Error(response.data.message)
        }

        toast.success("OTP Sent Successfully")
        navigate('/verify-email')
        
      } catch (error) {
        console.log("sendotp api error", error);
        toast.error("Could Not Send OTP")
        
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
}

export function signUp(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate){
  return async (dispatch)=>{
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        });

        console.log("signup api response.....", response);

        if(!response.data.success){
          throw new Error(response.data.message)
        }

        toast.success("Signup Successful")
        navigate('/login')
        
      } catch (error) {
        console.log("singup api error", error);
        toast.error("signup failed")
        navigate('/signup')
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
  }
}

export function login(email, password, navigate){
  return async (dispatch)=>{
    dispatch(setLoading(true))

    try {
      const response =  await apiConnector("POST", LOGIN_API, {email, password})

      console.log("login api response.......", response);

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Login Successfully")
      dispatch(setToken(response.data.token))
      
      const userImg = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}%20${response.data.user.lastName}`;

      dispatch(setUser({...response.data.user, image: userImg}))

      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      navigate("/dashboard/my-profile");
      
    } catch (error) {
      console.log("login ni api ma kai error che", error);
      toast.error("Login Faield")
    }
    dispatch(setLoading(false))
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {

      console.log("entered into getpasswordResettoken function");
      console.log(RESETPASSTOKEN_API);
      console.log(email);
      
      
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token, navigate){
  return async (dispatch)=>{
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token})

      console.log("RESETPASSWORD API RESPONSE...", response);
      
      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Password has been reset successfully")
      navigate('/reset-complete')

    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR", error);
      toast.error("Unable to reset password")
    }
    dispatch(setLoading(false))

  }
}

export function logout(navigate){
  return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
  }
}