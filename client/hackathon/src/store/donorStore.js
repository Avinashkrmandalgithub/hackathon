import { create } from "zustand";
import axios from "axios";

const donorStore = create((set) => ({
  isLoading: false,
  donors: [],
  donor: null,
  error: null,
  message: null,
  isAuthenticated: null,

  createDonor: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        $`{import.meta.env.VITE_BACKEND_URL}/donors`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      set({
        isLoading: false,
        message: res.data.message,
        donor: res.data.data,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });

      throw error;
    }
  },

  loginDonor: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        $`{import.meta.env.VITE_BACKEND_URL}/donors/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
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

  logoutDonor: () => {
    set({
      donor: null,
      message: "Logged out successfully",
      isAuthenticated: false,
    });
  },

  getDonorById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        $`{import.meta.env.VITE_BACKEND_URL}/donors/${id}`
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

  updateDonorProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/donors/profile`,
        data,
        { headers: { "Content-Type": "application/json" } }
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

  getAllDonors: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/donors`);
      set({ donors: res.data.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
    }
  },
}));
