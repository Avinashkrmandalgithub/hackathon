// src/store/userStore.js
import { create } from "zustand";
import axios from "axios";

const userStore = create((set, get) => ({
  isLoading: false,
  error: null,
  message: null,
  user: null,
  isAuthenticated: false,

  // User registration
  signUp: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        message: response.data.message,
      });

      return response.data.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },

  // User login
  logIn: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store tokens in localStorage
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      set({
        user: response.data.data,
        isAuthenticated: true,
        isLoading: false,
        message: response.data.message,
      });

      return response.data.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },

  // User logout
  logOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Remove tokens from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        message: response.data.message,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },

  // Fetch authenticated user profile
  fetchAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      set({
        user: response.data.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data.data;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },

  // Clear error message
  clearError: () => set({ error: null }),

  // Clear success message
  clearMessage: () => set({ message: null }),
}));

export default userStore;
