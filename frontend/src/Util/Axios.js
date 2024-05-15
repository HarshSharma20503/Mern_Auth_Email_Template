import { toast } from "react-toastify";
import axios from "axios";

const handleApiError = (error) => {
  if (error.response.data.message) {
    if (error.response.data.message === "Unauthorized Access") {
      localStorage.removeItem("user");
      toast.error("Please Login Again");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      toast.error(error.response.data.message);
    }
  } else {
    toast.error("Something went wrong, Please try again later.");
  }
};

const GetApiCall = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

const PostApiCall = async (url, formData) => {
  try {
    const { data } = await axios.post(url, formData);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

const PutApiCall = async (url, formData) => {
  try {
    const { data } = await axios.put(url, formData);
    return data;
  } catch (err) {
    handleApiError(err);
  }
};

const DeleteApiCall = async (url) => {
  try {
    const { data } = await axios.delete(url);
    return data;
  } catch (err) {
    handleApiError(err);
  }
};

export { GetApiCall, PostApiCall, PutApiCall, DeleteApiCall };
