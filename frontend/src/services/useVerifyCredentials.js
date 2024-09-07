import axios from "axios";
import { API_URL } from "../utils/Constents";

const useVerifyCredential = async (userCredentials) => {

  if (
    userCredentials.email == "" ||
    !userCredentials.email.includes("@") ||
    !userCredentials.email.includes(".") ||
    userCredentials.password == ""
  ) {
    return { response: null, type: "error", msg: "Invalid Credential" };
  }

  try {
    const response = await axios.post(`${API_URL}/user/login`, userCredentials);
    if(response.status === 200){
      return { msg: response.data.msg, response, };
    }

  } catch (error) {
    console.log("Error:", error);
    const errorInfo = error?.response?.data?.msg || error.message;
    return { type:"error", msg: errorInfo, response: error?.response };
  }
};

export default useVerifyCredential ;
