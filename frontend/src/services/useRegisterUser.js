import axios from "axios";
import { API_URL } from "../utils/Constents";
import { generateUniqueUserName } from "./useUsernameGenertor.js";

const useRegisterUser = async (userCredentials) => {
  const { fullName, email, password } = userCredentials;

  let response = {
    msg: "",
    response: null,
    type: "warn",
  };
  // validation :- null or empty value, email-validate, strong-password-checking
  if (!fullName.trim() || !email.trim() || !password.trim()) {
    return { ...response, msg: "Please fill all info." };
  }
  if (!email.includes("@") || !email.includes(".")) {
    return { ...response, msg: "Invalid Email.", type: "error" };
  }
  if (password.length < 8) {
    // strong password regex ->> future update...
    return { ...response, msg: "Use strong password." };
  }

  const username = await generateUniqueUserName(email); // Generate unique Username

  try {
    const result = await axios.post(`${API_URL}/user/register`, {
      name: fullName,
      email,
      password,
      username,
    });
    console.log(result);

    if (result.status === 200) {
      return { msg: result?.data?.msg, response: result };
    }
  } catch (error) {
    const errorInfo = error.response?.data?.msg || error.message;
    console.log("Error:", error);
    return { msg: errorInfo, response: errorInfo, type: "error" };
  }
};

export default useRegisterUser;
