import axios from "axios";
import { API_URL } from "../utils/Constents";
import { ApiResponseHandler } from "./useApiResponseHandler";

const useVerifyCredential = async (userCredentials) => {
  if (
    !userCredentials.username ||
    !userCredentials.username.includes("@") ||
    !userCredentials.username.includes(".") ||
    !userCredentials.password
  ) {
    return { success: false, type: "error", message: "Invalid Credential" };
  }

  try {
    const response = await   ApiResponseHandler('post', `${API_URL}/user/signin`, userCredentials);
   return response;
  } catch (error) {
    console.log("Error:", error);
    return { type: "error", ...error};
  }
};

export default useVerifyCredential;
