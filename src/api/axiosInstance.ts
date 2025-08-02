import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://localhost:7271/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
