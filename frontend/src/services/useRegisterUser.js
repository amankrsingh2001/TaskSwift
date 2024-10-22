import { addCurrentUser } from "../Slices/UserSlice.js";
import { API_URL } from "../utils/Constents";
import { ApiResponseHandler } from "./useApiResponseHandler.js";

export const sentOTP = async (email) => {
  try {
    const response = await ApiResponseHandler( 'post' ,`${API_URL}/user/otp`, email)
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}


export const validateUser =  async(userCredentials, setShowOtpForm) => {
  const { firstName, lastName, username, password } = userCredentials;
  let response = {
    success: false,
    type: "error",
    message: "Something went wrong",
  };
  // validation :- null or empty value, email-validate, strong-password-checking
  if (
    !firstName ||
    !lastName ||
    !username ||
    !password
  ) {
    console.log('error of emplhs')
    return { ...response, message: "Please fill all info." };
  }
  if (!username.includes("@") || !username.includes(".")) {
    return { ...response, message: "Invalid Email." };
  }
  if (password.length < 8) {
    // strong password regex ->> future update...
    return { ...response, message: "Use strong password.", type:"warn" };
  }
  
  localStorage.setItem('user', JSON.stringify(userCredentials));

  try {
    response = await sentOTP({username : userCredentials.username}); /// sent OTP to the mail ****
    console.log(response);
    if(response.success){
      setShowOtpForm(true); // navigate to OTP component
      return { ...response, type:"success" };
    }
  } catch ( error ) {
    console.log(error);
    localStorage.removeItem('user')
    return { ...error, message: error.message, type:"success" };   
  }
}

const useRegisterUser = async ( userCredentials ) => {
  console.log(userCredentials)
  try {
    const response = await ApiResponseHandler('post', `${API_URL}/user/signup`, userCredentials);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default useRegisterUser;
