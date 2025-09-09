// src/store/recipientRequestStore.js
import { create } from "zustand";
import axios from "axios";

const recipientRequestStore = create((set, get) => ({
  isLoading: false,
  error: null,
  message: null,
  recipientRequests: [],
  recipientRequest: null,

  createRecipientRequest: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/recipientRequests`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      set({
        isLoading: false,
        recipientRequest: res.data.data,
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

  getAllRecipientRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/recipientRequests`
      );
      set({ recipientRequests: res.data.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
    }
  },

  getUrgentRecipientRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/recipientRequests/urgent`
      );
      set({ recipientRequests: res.data.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
    }
  },

  getRecipientRequestById: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/recipientRequests/${requestId}`
      );
      set({ recipientRequest: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  confirmRecipientRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recipientRequests/confirm/${requestId}`
      );
      set({ message: res.data.message, isLoading: false });

      const updatedRequests = get().recipientRequests.map((req) =>
        req._id === requestId ? { ...req, status: "confirmed" } : req
      );
      set({ recipientRequests: updatedRequests });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),
}));

export default recipientRequestStore;
