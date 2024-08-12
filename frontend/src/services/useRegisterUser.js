import axios from "axios";
import { API_URL } from "../utils/Constents";
import { generateUniqueUserName } from "./useUsernameGenertor.js";

const useRegisterUser = async (userCredentials) => {
  const { fName, lName, email, password } = userCredentials;
  const newUserCredential = {
    name: fName + " " + lName,
    email,
    password,
  };

  let response = {
    msg: "",
    response: null,
    type: "warn",
  };
  if (
    newUserCredential.name.trim() == "" ||
    newUserCredential.email == "" ||
    newUserCredential.password == ""
  ) {
    return { ...response, msg: "Please fill all info." };
  }
  if (
    !newUserCredential.email.includes("@") ||
    !newUserCredential.email.includes(".")
  ) {
    return { ...response, msg: "Invalid Email.", type: "error" };
  }
  if (password.length < 6) {
    return { ...response, msg: "Use strong password." };
  }

  const username = await generateUniqueUserName(email);

  try {
    const result = await axios.post(`${API_URL}/user/register`, {
      ...newUserCredential,
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
