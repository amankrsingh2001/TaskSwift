import axios from "axios";
import { API_URL } from "../utils/Constents";

const useForgotPassword = async (email) => {

  if (
    email.trim() == "" || !email.includes("@") || !email.includes(".") ) {
    return { response: null, type: "error", msg: "Invalid Credential" };
  }

  try {
    const response = await axios.post(`${API_URL}/user/login`, {email});
    if(response.status === 200){
      return { msg: response.data.msg, response, };
    }

  } catch (error) {
    console.log("Error:", error);
    const errorInfo = error?.response?.data?.msg || error.message;
    return { type:"error", msg: errorInfo, response: error?.response };
  }
};

export default useForgotPassword ;
