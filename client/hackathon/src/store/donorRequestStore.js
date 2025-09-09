import { create } from "zustand";
import axios from "axios";

const donorRequestStore = create((set, get) => ({
  isLoading: false,
  error: null,
  message: null,
  donorRequests: [],
  donorRequest: null,

  createDonorRequest: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/donorRequests`,
        { data },
        { headers: { "Content-Type": "application/json" } }
      );

      set({
        isLoading: false,
        donorRequest: res.data.data,
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

  getAllDonorRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/donorRequests`
      );
      set({ donorRequests: res.data.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
    }
  },

  getDonorRequestById: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/donorRequests/${requestId}`
      );
      set({ donorRequest: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  confirmDonorRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/donorRequests/confirm/${requestId}`
      );
      set({ message: res.data.message, isLoading: false });

      const updatedRequests = get().donorRequests.map((req) =>
        req._id === requestId ? { ...req, status: "confirmed" } : req
      );
      set({ donorRequests: updatedRequests });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },
}));

export default donorRequestStore;
