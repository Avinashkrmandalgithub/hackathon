// src/store/recipientStore.js
import { create } from "zustand";
import axios from "axios";

const recipientStore = create((set, get) => ({
  isLoading: false,
  error: null,
  message: null,
  recipients: [],
  recipient: null,  // single recipient profile
  isAuthenticated: false, // track login state

  createRecipient: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/recipients`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      set({
        isLoading: false,
        message: res.data.message,
        recipient: res.data.data,
        isAuthenticated: true, // mark as logged in
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

  // ✅ Recipient Login
  loginRecipient: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/recipients/login`,
        data ,
        { headers: { "Content-Type": "application/json" } }
      );

      set({
        isLoading: false,
        recipient: res.data.data,
        message: res.data.message,
        isAuthenticated: true,
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

  logoutRecipient: () => {
    set({
      recipient: null,
      message: "Logged out successfully",
      isAuthenticated: false,
    });
  },

  getRecipientById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/recipients/${id}`
      );
      set({ recipient: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  updateRecipientProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/recipients/profile`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      set({
        isLoading: false,
        recipient: res.data.data,
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

  getAllRecipients: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recipients`);
      set({ recipients: res.data.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),
}));

export default recipientStore;
