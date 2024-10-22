import axios from "axios";

export const ApiResponseHandler = async (reqType, url, data) => {
  try {
    const response = await axios[reqType](url, data, { withCredentials:true });
    console.log(response);

    if (response.data.success) {
      return { ...response?.data, type: "success" };
    }
  } catch (error) {
    console.log("Something went wrong:", error);
    return { ...error?.response?.data, type: "error" };
  }
};
