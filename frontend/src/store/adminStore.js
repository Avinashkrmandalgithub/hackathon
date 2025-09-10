// src/store/adminStore.js
import { create } from "zustand";
import axios from "axios";

const adminStore = create((set) => ({
  isLoading: false,
  error: null,
  message: null,
  approvals: [],
  admin: null,
  isAuthenticated: false,
  adminIdPass: null,

  // Register admin
  registerAdmin: async (data) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      set({
        isLoading: false,
        message: response.data.message,
        admin: response.data.data,
      });

      return response.data.data; // Return the created admin
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Admin login
  loginAdmin: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store tokens in localStorage
      if (response.data.accessToken) {
        localStorage.setItem("adminToken", response.data.accessToken);
        localStorage.setItem("adminRefreshToken", response.data.refreshToken);
      }

      set({
        admin: response.data.admin,
        isAuthenticated: true,
        isLoading: false,
        message: response.data.message,
      });

      return response.data; // Return the full response data
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },

  // Logout admin
  logoutAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/logout`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // Remove tokens from localStorage
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRefreshToken");

      set({
        admin: null,
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

  // Fetch admin profile
  fetchAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      set({
        admin: response.data.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data.data;
    } catch (error) {
      set({
        admin: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },

  // Update admin profile
  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/update`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      set({
        message: response.data.message,
        isLoading: false,
        admin: response.data.data,
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

  // Generate admin password
  generatePassword: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/password/generate`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      set({
        isLoading: false,
        message: response.data.message,
        adminIdPass: response.data.data,
      });

      return response.data.data; // Return credentials {username, password}
    } catch (error) {
      set({
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

export default adminStore;
