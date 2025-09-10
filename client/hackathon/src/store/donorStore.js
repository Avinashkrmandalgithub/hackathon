// src/store/donorStore.js
import { create } from "zustand";
import axios from "axios";

const donorStore = create((set) => ({
  isLoading: false,
  donors: [],
  donor: null,
  error: null,
  message: null,
  isAuthenticated: false,

  // Create donor profile
  createDonor: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/donor/createdonor`,
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
        message: res.data.message,
        donor: res.data.data,
        isAuthenticated: true,
      });
      return res.data.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Login donor
  loginDonor: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/donor/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Store token in localStorage
      if (res.data.data?.token) {
        localStorage.setItem("token", res.data.data.token);
      }

      set({
        isLoading: false,
        message: res.data.message,
        donor: res.data.data,
        isAuthenticated: true,
      });
      return res.data.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout donor
  logoutDonor: () => {
    localStorage.removeItem("token");
    set({
      donor: null,
      message: "Logged out successfully",
      isAuthenticated: false,
    });
  },

  // Get donor by ID
  getDonorById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/donor/getDonorById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      set({ donor: res.data.data, isLoading: false });
      return res.data.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Get donor profile (current user)
  getDonorProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/donor/getDonorProfile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      set({ donor: res.data.data, isLoading: false });
      return res.data.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Update donor profile
  updateDonorProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/donor/updateDonorProfile`,
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
        donor: res.data.data,
        message: res.data.message,
      });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  // Get all donors
  getAllDonors: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/donor/getAllDonors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: filters,
        }
      );
      set({ donors: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  // Clear error message
  clearError: () => set({ error: null }),

  // Clear success message
  clearMessage: () => set({ message: null }),
}));

export default donorStore;
