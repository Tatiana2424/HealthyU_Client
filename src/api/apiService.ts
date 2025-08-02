import { ArticleEntry } from "../components/UserArticles/UserArticles";
import { User } from "../models/User";
import axiosInstance from "./axiosInstance";

export const apiService = {
  // GET request
  get: async <T>(url: string): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async <T>(url: string): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const response = await apiService.get<User>(
      `https://localhost:7271/api/User/GetById/${id}`
    );
    return response; // Assuming this returns the data in the correct shape
  } catch (error) {
    console.error("Failed to fetch user data", error);
    return null;
  }
};

export const updateUser = async (id: number, userData: User) => {
  return await apiService.put(
    `https://localhost:7271/api/User/Update/${id}`,
    userData
  );
};

export const createArticle = async (articleData: ArticleEntry) => {
  return await apiService.post(
    `https://localhost:7271/api/Article/Create`,
    articleData
  );
};
